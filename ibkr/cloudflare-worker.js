const IBKR_BASE = "https://ndcdyn.interactivebrokers.com/AccountManagement/FlexWebService";

export default {
  async fetch(request) {
    if (request.method === "OPTIONS") return new Response(null, { headers: corsHeaders() });
    if (request.method !== "POST") return json({ ok: false, error: "Use POST with token and queryId." }, 405);
    try {
      const { token, queryId } = await request.json();
      if (!token || !queryId) return json({ ok: false, error: "Missing token or queryId." }, 400);
      const referenceCode = await requestStatement(token, queryId);
      const statement = await fetchStatement(token, referenceCode);
      return json({ ok: true, statement });
    } catch (error) {
      return json({ ok: false, error: error.message || "IBKR Flex request failed." }, 502);
    }
  },
};

async function requestStatement(token, queryId) {
  const url = new URL(`${IBKR_BASE}/SendRequest`);
  url.searchParams.set("t", token);
  url.searchParams.set("q", queryId);
  url.searchParams.set("v", "3");
  const xml = await ibkrFetch(url);
  const status = extractTag(xml, "Status");
  const referenceCode = extractTag(xml, "ReferenceCode");
  const errorMessage = extractTag(xml, "ErrorMessage");
  if (status !== "Success" || !referenceCode) throw new Error(errorMessage || "IBKR did not return a Flex reference code.");
  return referenceCode;
}

async function fetchStatement(token, referenceCode) {
  const url = new URL(`${IBKR_BASE}/GetStatement`);
  url.searchParams.set("t", token);
  url.searchParams.set("q", referenceCode);
  url.searchParams.set("v", "3");
  const xml = await ibkrFetch(url);
  if (/FlexStatementResponse/i.test(xml)) throw new Error(extractTag(xml, "ErrorMessage") || "IBKR statement is not ready yet. Try again in a moment.");
  return xml;
}

async function ibkrFetch(url) {
  const response = await fetch(url.toString(), { headers: { "User-Agent": "IBKR-PWA-Flex-Proxy/1.0", Accept: "application/xml,text/xml,*/*" } });
  const text = await response.text();
  if (!response.ok) throw new Error(`IBKR HTTP ${response.status}: ${text.slice(0, 200)}`);
  return text;
}

function extractTag(xml, tagName) {
  const match = xml.match(new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, "i"));
  return match ? decodeXml(match[1].trim()) : "";
}

function decodeXml(value) {
  return value.replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&amp;", "&").replaceAll("&quot;", '"').replaceAll("&apos;", "'");
}

function json(payload, status = 200) {
  return new Response(JSON.stringify(payload), { status, headers: { ...corsHeaders(), "Content-Type": "application/json; charset=utf-8" } });
}

function corsHeaders() {
  return { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type", "Access-Control-Max-Age": "86400" };
}
