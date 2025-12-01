[index.html](https://github.com/user-attachments/files/23844589/index.html)
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <title>杜鑫的个人小站</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    /* ======= 全局样式 ======= */
    :root {
      --bg: #0f172a;
      --bg-soft: #111827;
      --accent: #38bdf8;
      --accent-soft: rgba(56, 189, 248, 0.15);
      --text: #e5e7eb;
      --muted: #9ca3af;
      --border: #1f2937;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: -apple-system,BlinkMacSystemFont,"SF Pro Text","Segoe UI",Roboto,system-ui,sans-serif;
      background: radial-gradient(circle at top, #1f2937 0, #020617 55%, #000 100%);
      color: var(--text);
      min-height: 100vh;
      display: flex;
      justify-content: center;
      padding: 24px;
    }

    .page {
      width: 100%;
      max-width: 960px;
      background: rgba(15, 23, 42, 0.9);
      border-radius: 24px;
      border: 1px solid rgba(148, 163, 184, 0.1);
      box-shadow:
        0 18px 60px rgba(0, 0, 0, 0.8),
        0 0 0 1px rgba(15, 23, 42, 0.9);
      overflow: hidden;
      backdrop-filter: blur(18px);
    }

    /* ======= 顶部导航 ======= */
    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 18px 24px;
      border-bottom: 1px solid var(--border);
      background: linear-gradient(to right, rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0.95));
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .logo-orb {
      width: 32px;
      height: 32px;
      border-radius: 999px;
      background: radial-gradient(circle at 30% 20%, #e0f2fe 0, #38bdf8 26%, #1d4ed8 70%, #020617 100%);
      box-shadow:
        0 0 26px rgba(56, 189, 248, 0.6),
        0 0 0 1px rgba(15, 23, 42, 0.8);
    }

    .logo-text {
      font-weight: 600;
      letter-spacing: 0.04em;
      font-size: 14px;
      text-transform: uppercase;
      color: #e5e7eb;
    }

    nav {
      display: flex;
      gap: 12px;
      font-size: 13px;
    }

    nav a {
      padding: 6px 10px;
      border-radius: 999px;
      color: var(--muted);
      text-decoration: none;
      border: 1px solid transparent;
      transition: all 0.2s ease;
    }

    nav a:hover {
      color: var(--text);
      border-color: rgba(148, 163, 184, 0.4);
      background: rgba(15, 23, 42, 0.9);
    }

    nav a.primary {
      color: #0b1120;
      background: #38bdf8;
      border-color: transparent;
      font-weight: 500;
      box-shadow: 0 10px 30px rgba(56, 189, 248, 0.5);
    }

    nav a.primary:hover {
      transform: translateY(-1px);
      box-shadow: 0 14px 40px rgba(56, 189, 248, 0.7);
    }

    /* ======= 主体区域布局 ======= */
    main {
      display: grid;
      grid-template-columns: minmax(0, 1.5fr) minmax(0, 1.2fr);
      gap: 24px;
      padding: 24px;
    }

    @media (max-width: 768px) {
      body {
        padding: 16px;
      }

      main {
        grid-template-columns: minmax(0, 1fr);
      }

      header {
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
      }

      nav {
        width: 100%;
        justify-content: flex-start;
        flex-wrap: wrap;
      }
    }

    /* ======= 左侧：简介 ======= */
    .intro-card {
      border-radius: 20px;
      border: 1px solid var(--border);
      padding: 20px 20px 18px;
      background: radial-gradient(circle at top left, rgba(56, 189, 248, 0.18) 0, rgba(15, 23, 42, 0.92) 45%, #020617 100%);
      position: relative;
      overflow: hidden;
    }

    .badge-row {
      display: flex;
      gap: 8px;
      margin-bottom: 16px;
      flex-wrap: wrap;
    }

    .badge {
      font-size: 11px;
      padding: 3px 9px;
      border-radius: 999px;
      border: 1px solid rgba(148, 163, 184, 0.5);
      color: var(--muted);
      background: rgba(15, 23, 42, 0.9);
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }

    .badge-dot {
      width: 7px;
      height: 7px;
      border-radius: 999px;
      background: #22c55e;
      box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.18);
    }

    h1 {
      font-size: 26px;
      margin-bottom: 8px;
      letter-spacing: 0.04em;
    }

    .subheadline {
      font-size: 14px;
      color: var(--muted);
      margin-bottom: 16px;
      line-height: 1.6;
    }

    .pill-row {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 18px;
    }

    .pill {
      font-size: 11px;
      padding: 4px 10px;
      border-radius: 999px;
      background: rgba(15, 23, 42, 0.9);
      border: 1px solid rgba(148, 163, 184, 0.5);
      color: var(--muted);
    }

    .stats {
      display: flex;
      gap: 18px;
      margin-bottom: 18px;
      font-size: 11px;
      color: var(--muted);
    }

    .stats strong {
      display: block;
      font-size: 18px;
      color: var(--text);
    }

    .buttons {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 8px;
    }

    .btn {
      font-size: 13px;
      padding: 7px 14px;
      border-radius: 999px;
      border: 1px solid rgba(148, 163, 184, 0.6);
      background: rgba(15, 23, 42, 0.9);
      color: var(--text);
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.18s ease;
    }

    .btn span {
      font-size: 14px;
    }

    .btn:hover {
      border-color: #38bdf8;
      color: #e0f2fe;
      transform: translateY(-1px);
      box-shadow: 0 10px 30px rgba(15, 23, 42, 0.9);
    }

    .btn.primary {
      background: linear-gradient(135deg, #38bdf8, #22c55e);
      border-color: transparent;
      color: #0b1120;
      font-weight: 500;
    }

    .btn.primary:hover {
      box-shadow:
        0 12px 36px rgba(56, 189, 248, 0.7),
        0 0 0 1px rgba(15, 23, 42, 0.8);
    }

    .footnote {
      font-size: 11px;
      color: var(--muted);
      opacity: 0.8;
    }

    /* ======= 右侧：卡片集合 ======= */
    .right-column {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .card {
      border-radius: 18px;
      border: 1px solid var(--border);
      background: rgba(15, 23, 42, 0.85);
      padding: 14px 14px 12px;
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }

    .card-title {
      font-size: 13px;
      font-weight: 500;
      letter-spacing: 0.03em;
      text-transform: uppercase;
      color: var(--muted);
    }

    .card-tag {
      font-size: 11px;
      padding: 3px 8px;
      border-radius: 999px;
      background: var(--accent-soft);
      color: #bae6fd;
      border: 1px solid rgba(56, 189, 248, 0.4);
    }

    .timeline {
      list-style: none;
      font-size: 12px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .timeline li {
      display: flex;
      justify-content: space-between;
      gap: 8px;
      color: var(--muted);
    }

    .timeline span.label {
      color: var(--text);
    }

    .skills {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      font-size: 11px;
    }

    .skills span {
      padding: 3px 8px;
      border-radius: 999px;
      border: 1px dashed rgba(148, 163, 184, 0.7);
      color: var(--muted);
    }

    .status-row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      font-size: 12px;
    }

    .status-row strong {
      color: #f9fafb;
      font-size: 14px;
    }

    .status-row small {
      color: var(--muted);
      font-size: 11px;
    }

    /* 小的发光点装饰 */
    .glow-dots {
      position: absolute;
      inset: 0;
      pointer-events: none;
      opacity: 0.5;
    }

    .glow-dots span {
      position: absolute;
      width: 4px;
      height: 4px;
      border-radius: 999px;
      background: rgba(56, 189, 248, 0.9);
      filter: blur(1px);
    }

    .glow-dots span:nth-child(1) { top: 8%; left: 60%; }
    .glow-dots span:nth-child(2) { top: 38%; left: 90%; }
    .glow-dots span:nth-child(3) { top: 75%; left: 70%; }

    footer {
      padding: 0 24px 18px;
      font-size: 11px;
      color: var(--muted);
      display: flex;
      justify-content: space-between;
      gap: 12px;
      border-top: 1px solid var(--border);
      background: rgba(15, 23, 42, 0.96);
    }

    footer a {
      color: #93c5fd;
      text-decoration: none;
    }

    footer a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="page">
    <header>
      <div class="logo">
        <div class="logo-orb"></div>
        <div class="logo-text">DUXIN SPACE</div>
      </div>
      <nav>
        <a href="#about">关于我</a>
        <a href="#work">项目</a>
        <a href="#contact" class="primary">联系我</a>
      </nav>
    </header>

    <main>
      <!-- 左侧：简介 -->
      <section class="intro-card" id="about">
        <div class="glow-dots">
          <span></span><span></span><span></span>
        </div>

        <div class="badge-row">
          <div class="badge">
            <span class="badge-dot"></span>
            正在探索 · 个人小站 v0.1
          </div>
          <div class="badge">
            ⚙️  GitHub Pages 练习中
          </div>
        </div>

        <h1>嗨，我是杜鑫 👋</h1>
        <p class="subheadline">
          一名对产品、体验和视觉都有点较真的 UI 设计师。<br />
          这个页面是我用 GitHub Pages 搭的第一个小站，用来折腾各种想法、Demo 和 Side Project。
        </p>

        <div class="pill-row">
          <div class="pill">🎨 UI / 交互设计</div>
          <div class="pill">💻 前端入门中</div>
          <div class="pill">📈 投资 & 数字化</div>
          <div class="pill">🧪 各种小实验</div>
        </div>

        <div class="stats">
          <div>
            <strong>3+</strong>
            <span>年设计经验</span>
          </div>
          <div>
            <strong>20+</strong>
            <span>上线项目</span>
          </div>
          <div>
            <strong>∞</strong>
            <span>灵光一闪</span>
          </div>
        </div>

        <div class="buttons" id="contact">
          <button class="btn primary" onclick="scrollToSection('work')">
            <span>🚀</span> 看看我在做什么
          </button>
          <button class="btn" onclick="alert('这里可以改成你的邮箱、微信二维码等链接。')">
            <span>✉️</span> 联系我（示例弹窗）
          </button>
        </div>

        <p class="footnote">
          当前版本只是静态 HTML + CSS。后面会慢慢加上：深色模式切换、作品展示、博客等等。
        </p>
      </section>

      <!-- 右侧：信息卡片 -->
      <div class="right-column">
        <section class="card" id="work">
          <div class="card-header">
            <div class="card-title">近期在折腾</div>
            <div class="card-tag">Side Project Log</div>
          </div>
          <ul class="timeline">
            <li>
              <span class="label">🧼 在线抠图小工具</span>
              <span>2025</span>
            </li>
            <li>
              <span class="label">📱 银行生活服务 UI 组件整理</span>
              <span>进行中</span>
            </li>
            <li>
              <span class="label">🤖 AI Prompt & 设计工作流优化</span>
              <span>长期</span>
            </li>
          </ul>
        </section>

        <section class="card">
          <div class="card-header">
            <div class="card-title">技能快照</div>
            <div class="card-tag">Toolbox</div>
          </div>
          <div class="skills">
            <span>Figma</span>
            <span>Sketch</span>
            <span>Web / App UX</span>
            <span>信息架构</span>
            <span>视觉规范</span>
            <span>HTML & CSS 入门</span>
            <span>GitHub Pages</span>
            <span>AI 辅助设计</span>
          </div>
        </section>

        <section class="card">
          <div class="card-header">
            <div class="card-title">当前状态</div>
            <div class="card-tag">Now</div>
          </div>
          <div class="status-row">
            <div>
              <strong>学习部署个人网站</strong>
              <small>从一个简单的 index.html 开始</small>
            </div>
            <div>
              <small>目标：</small>
              <strong>持续更新</strong>
            </div>
          </div>
        </section>
      </div>
    </main>

    <footer>
      <div>© <span id="year"></span> Duxin Space · 这是一个用于练习的个人测试站点。</div>
      <div>代码托管于 <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a></div>
    </footer>
  </div>

  <script>
    // 设置年份
    document.getElementById('year').textContent = new Date().getFullYear();

    // 简单滚动到指定区域
    function scrollToSection(id) {
      var el = document.getElementById(id);
      if (!el) return;
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - 80,
        behavior: 'smooth'
      });
    }
  </script>
</body>
</html>
