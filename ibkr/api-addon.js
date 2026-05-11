(() => {
  const $ = (id) => document.getElementById(id);
  const els = {
    pdfModeButton: $("pdfModeButton"), apiModeButton: $("apiModeButton"), uploadPanel: $("uploadPanel"), apiPanel: $("apiPanel"),
    apiForm: $("apiForm"), token: $("flexTokenInput"), queryId: $("queryIdInput"), proxy: $("proxyUrlInput"), remember: $("rememberApiInput"),
    statusPanel: $("statusPanel"), statusText: $("statusText"), errorPanel: $("errorPanel"), errorText: $("errorText"), resultPanel: $("resultPanel"), resetButton: $("resetButton"),
    endingValue: $("endingValue"), cumulativeDeposit: $("cumulativeDeposit"), totalProfit: $("totalProfit"), profitRate: $("profitRate"), rankList: $("rankList"), symbolCount: $("symbolCount"),
  };

  els.queryId.value = localStorage.getItem("ibkrFlexQueryId") || "";
  els.proxy.value = localStorage.getItem("ibkrFlexProxyUrl") || "";
  els.pdfModeButton.addEventListener("click", () => setMode("pdf"));
  els.apiModeButton.addEventListener("click", () => setMode("api"));
  els.resetButton.addEventListener("click", () => setTimeout(() => setMode(currentMode()), 0));
  els.apiForm.addEventListener("submit", fetchFlexReport);

  function currentMode() { return els.apiModeButton.classList.contains("active") ? "api" : "pdf"; }

  function setMode(mode) {
    const api = mode === "api";
    els.pdfModeButton.classList.toggle("active", !api);
    els.apiModeButton.classList.toggle("active", api);
    hideAll();
    (api ? els.apiPanel : els.uploadPanel).hidden = false;
    els.resetButton.hidden = true;
  }

  async function fetchFlexReport(event) {
    event.preventDefault();
    const token = els.token.value.trim();
    const queryId = els.queryId.value.trim();
    const proxy = els.proxy.value.trim().replace(/\/+$/, "");
    if (!token || !queryId || !proxy) return showError("请填写 Flex Token、Query ID 和代理地址。");
    if (els.remember.checked) {
      localStorage.setItem("ibkrFlexQueryId", queryId);
      localStorage.setItem("ibkrFlexProxyUrl", proxy);
    }
    showStatus("正在连接 IBKR Flex Web Service...");
    try {
      const response = await withTimeout(fetch(proxy, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ token, queryId }) }), 300000);
      const payload = await response.json().catch(() => null);
      if (!response.ok || !payload?.ok) throw new Error(payload?.error || "IBKR API 获取失败，请检查 Token、Query ID 或代理地址。");
      showStatus("正在解析 IBKR Flex 数据...");
      renderResults(parseFlexXmlReport(payload.statement));
    } catch (error) {
      showError(error.message || "IBKR API 获取失败，请稍后重试。");
    }
  }

  function parseFlexXmlReport(xmlText) {
    const doc = new DOMParser().parseFromString(xmlText, "application/xml");
    if (doc.querySelector("parsererror")) throw new Error("IBKR 返回的数据不是有效 XML。");
    const records = [...doc.querySelectorAll("*")].map(toRecord);
    const currency = findCurrency(records);
    const cumulativeDeposit = findAmount(records, ["netdeposits", "cumulativedeposits", "depositswithdrawals", "depositwithdrawal", "deposits"]);
    const endingValue = findAmount(records, ["endingvalue", "endingnetliquidationvalue", "netliquidationvalue", "totalendingvalue", "endingnav", "endingequity"]);
    if (!Number.isFinite(cumulativeDeposit) || !Number.isFinite(endingValue)) throw new Error("未能从 Flex 数据识别累积存款或结束价值，请检查 Flex Query 设置。");
    const symbolProfits = parseSymbols(records);
    if (!symbolProfits.length) throw new Error("未能从 Flex 数据识别股票收益，请确认 Flex Query 包含 MTM 或 Realized/Unrealized Performance Summary。");
    return { accountSummary: { cumulativeDeposit, endingValue, totalProfit: round(endingValue - cumulativeDeposit), profitRate: cumulativeDeposit ? (endingValue - cumulativeDeposit) / cumulativeDeposit : 0, currency }, symbolProfits };
  }

  function toRecord(el) {
    const data = {};
    for (const attr of el.attributes || []) data[key(attr.name)] = attr.value;
    for (const child of el.children || []) if (!child.children.length && child.textContent.trim()) data[key(child.tagName)] = child.textContent.trim();
    return { tag: key(el.tagName), data };
  }

  function findCurrency(records) {
    for (const { data } of records) {
      const value = data.currency || data.basecurrency || data.reportcurrency;
      if (/^[A-Z]{3}$/.test(value || "")) return value.toUpperCase();
    }
    return undefined;
  }

  function findAmount(records, names) {
    for (const { data } of records) for (const [k, v] of Object.entries(data)) if (names.some((n) => k.includes(n))) {
      const amount = amountOf(v); if (Number.isFinite(amount)) return amount;
    }
    return NaN;
  }

  function parseSymbols(records) {
    const buckets = new Map();
    for (const { tag, data } of records) {
      const symbol = first(data, ["underlyingsymbol", "symbol", "ticker"]); if (!symbol) continue;
      const asset = String(first(data, ["assetcategory", "assetclass", "sectype", "securitytype", "type"])).toUpperCase();
      const desc = String(first(data, ["description", "desc", "name"]));
      const option = /OPT|OPTION/.test(asset) || data.putcall || data.expiry || data.strike || /\b\d{1,2}[A-Z]{3}\d{2}\b|\b(CALL|PUT)\b/i.test(desc);
      const normalized = option ? underlying(`${symbol} ${desc}`) : normalizeSymbol(symbol);
      const bucket = getBucket(buckets, normalized || "UNKNOWN");
      if (tag === "mtmperformancesummaryunderlying") {
        const total = firstAmount(data, ["total", "totalwithaccruals"]);
        if (!Number.isFinite(total)) continue;
        if (option) bucket.optionProfit += total;
        else bucket.stockUnrealizedPL += total;
        continue;
      }
      const realized = firstAmount(data, ["stockrealizedpl", "realizedpl", "realizedpnl", "realizedprofitloss", "totalrealizedpl", "mtmrealizedpnl", "fifopnlrealized"]);
      const unrealized = firstAmount(data, ["stockunrealizedpl", "unrealizedpl", "unrealizedpnl", "unrealizedprofitloss", "totalunrealizedpl", "mtmunrealizedpnl", "fifopnlunrealized"]);
      if (!Number.isFinite(realized) && !Number.isFinite(unrealized)) continue;
      if (option) bucket.optionProfit += Number.isFinite(realized) ? realized : 0;
      else { bucket.stockRealizedPL += Number.isFinite(realized) ? realized : 0; bucket.stockUnrealizedPL += Number.isFinite(unrealized) ? unrealized : 0; }
    }
    return [...buckets.values()].map((x) => ({ ...x, stockRealizedPL: round(x.stockRealizedPL), stockUnrealizedPL: round(x.stockUnrealizedPL), optionProfit: round(x.optionProfit), totalProfit: round(x.stockRealizedPL + x.stockUnrealizedPL + x.optionProfit) })).filter((x) => Math.abs(x.totalProfit) > 0.004).sort((a, b) => b.totalProfit - a.totalProfit);
  }

  function renderResults(parsed) {
    const s = parsed.accountSummary;
    hideAll(); els.resultPanel.hidden = false; els.resetButton.hidden = false;
    els.endingValue.textContent = money(s.endingValue, s.currency, false);
    els.cumulativeDeposit.textContent = money(s.cumulativeDeposit, s.currency, false);
    els.totalProfit.textContent = money(s.totalProfit, s.currency, true);
    els.totalProfit.className = s.totalProfit < 0 ? "negative" : "positive";
    els.profitRate.textContent = `${s.profitRate > 0 ? "+" : s.profitRate < 0 ? "-" : ""}${Math.abs(s.profitRate * 100).toFixed(2)}%`;
    els.profitRate.classList.toggle("negative", s.profitRate < 0);
    els.symbolCount.textContent = `${parsed.symbolProfits.length} 个标的`;
    els.rankList.innerHTML = parsed.symbolProfits.map((item, i) => `<article class="rank-card"><div class="rank-main"><div class="symbol"><span class="rank-index">${i + 1}</span><strong>${escapeHtml(item.symbol)}</strong></div><div class="profit-value ${item.totalProfit < 0 ? "negative" : ""}">${money(item.totalProfit, s.currency, true)}</div></div><div class="metric-grid">${metric("已实现盈亏", item.stockRealizedPL, s.currency)}${metric("未实现盈亏", item.stockUnrealizedPL, s.currency)}${metric("期权收益", item.optionProfit, s.currency)}</div></article>`).join("");
  }

  function metric(label, value, currency) { return `<div class="metric"><span>${label}</span><strong class="${value < 0 ? "negative" : value > 0 ? "positive" : ""}">${money(value, currency, true)}</strong></div>`; }
  function showStatus(message) { hideAll(); els.statusPanel.hidden = false; els.statusText.textContent = message; els.resetButton.hidden = true; }
  function showError(message) { hideAll(); els.errorPanel.hidden = false; els.errorText.textContent = message; els.resetButton.hidden = false; }
  function hideAll() { els.uploadPanel.hidden = true; els.apiPanel.hidden = true; els.statusPanel.hidden = true; els.errorPanel.hidden = true; els.resultPanel.hidden = true; }
  function withTimeout(promise, ms) { return Promise.race([promise, new Promise((_, reject) => setTimeout(() => reject(new Error("IBKR API 请求超时，IBKR 可能还在生成 365 天 Flex 数据，请稍后再试。")), ms))]); }
  function first(data, names) { for (const n of names) if (data[key(n)] !== undefined && data[key(n)] !== "") return data[key(n)]; return ""; }
  function firstAmount(data, names) { for (const n of names) { const v = data[key(n)]; if (v !== undefined) { const a = amountOf(v); if (Number.isFinite(a)) return a; } } return NaN; }
  function getBucket(map, symbol) { if (!map.has(symbol)) map.set(symbol, { symbol, stockRealizedPL: 0, stockUnrealizedPL: 0, optionProfit: 0, totalProfit: 0 }); return map.get(symbol); }
  function underlying(v) { const m = String(v).match(/^([A-Z][A-Z0-9]*(?:\s[A-Z])?)/); return m ? normalizeSymbol(m[1]) : "UNKNOWN"; }
  function normalizeSymbol(v) { const m = String(v).trim().toUpperCase().match(/^[A-Z][A-Z0-9]*(?:\s[A-Z])?/); return m ? m[0] : ""; }
  function key(v) { return String(v || "").replace(/[^a-z0-9]/gi, "").toLowerCase(); }
  function amountOf(v) { const t = String(v).trim(); const neg = /^\(.+\)$/.test(t); const n = Number(t.replace(/[(),]/g, "").replace(/[A-Z]{3}/gi, "")); return Number.isFinite(n) ? (neg ? -n : n) : NaN; }
  function round(v) { return Math.round((v + Number.EPSILON) * 100) / 100; }
  function money(v, c, signed) { const p = signed ? (v > 0 ? "+" : v < 0 ? "-" : "") : ""; return `${p}${c ? `${c} ` : ""}${Math.abs(v).toLocaleString("zh-CN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`; }
  function escapeHtml(v) { return String(v).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;"); }
})();
