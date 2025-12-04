 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/index.html b/index.html
index 5ca629243ec4a9a9d7d1cf1540b781699df82652..a45aa5e9c555005e24a48424d524b13e48c1a09a 100644
--- a/index.html
+++ b/index.html
@@ -1,560 +1,820 @@
 <!DOCTYPE html>
 <html lang="zh-CN">
 <head>
   <meta charset="UTF-8" />
-  <title>杜鑫的个人小站</title>
-  <meta name="viewport" content="width=device-width, initial-scale=1" />
+  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
+  <title>杜鑫 · 交互式个人空间</title>
   <style>
-    /* ======= 全局样式 ======= */
     :root {
-      --bg: #0f172a;
-      --bg-soft: #111827;
-      --accent: #38bdf8;
-      --accent-soft: rgba(56, 189, 248, 0.15);
+      --bg: #0b1224;
+      --bg-alt: #0f172a;
+      --card: #111827;
       --text: #e5e7eb;
-      --muted: #9ca3af;
+      --muted: #94a3b8;
+      --accent: #38bdf8;
+      --accent-2: #c084fc;
       --border: #1f2937;
+      --glow: 0 20px 60px rgba(56, 189, 248, 0.3);
+    }
+
+    .light {
+      --bg: #f8fafc;
+      --bg-alt: #eef2ff;
+      --card: #ffffff;
+      --text: #0f172a;
+      --muted: #475569;
+      --accent: #0ea5e9;
+      --accent-2: #7c3aed;
+      --border: #e2e8f0;
+      --glow: 0 18px 48px rgba(14, 165, 233, 0.25);
     }
 
     * {
       box-sizing: border-box;
       margin: 0;
       padding: 0;
     }
 
     body {
-      font-family: -apple-system,BlinkMacSystemFont,"SF Pro Text","Segoe UI",Roboto,system-ui,sans-serif;
-      background: radial-gradient(circle at top, #1f2937 0, #020617 55%, #000 100%);
+      font-family: "Inter", "SF Pro Text", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
+      background: radial-gradient(circle at 20% 20%, rgba(56, 189, 248, 0.16), transparent 28%),
+        radial-gradient(circle at 90% 10%, rgba(192, 132, 252, 0.18), transparent 25%),
+        var(--bg);
       color: var(--text);
       min-height: 100vh;
       display: flex;
       justify-content: center;
-      padding: 24px;
+      padding: 32px 16px 64px;
+      transition: background 0.3s ease, color 0.3s ease;
     }
 
-    .page {
+    .shell {
       width: 100%;
-      max-width: 960px;
-      background: rgba(15, 23, 42, 0.9);
-      border-radius: 24px;
-      border: 1px solid rgba(148, 163, 184, 0.1);
-      box-shadow:
-        0 18px 60px rgba(0, 0, 0, 0.8),
-        0 0 0 1px rgba(15, 23, 42, 0.9);
+      max-width: 1100px;
+      background: linear-gradient(135deg, rgba(17, 24, 39, 0.9), rgba(17, 24, 39, 0.7));
+      border: 1px solid rgba(148, 163, 184, 0.15);
+      border-radius: 28px;
+      backdrop-filter: blur(14px);
+      box-shadow: 0 24px 80px rgba(0, 0, 0, 0.55);
       overflow: hidden;
-      backdrop-filter: blur(18px);
     }
 
-    /* ======= 顶部导航 ======= */
+    .light .shell {
+      background: linear-gradient(135deg, rgba(255, 255, 255, 0.96), rgba(255, 255, 255, 0.9));
+      box-shadow: 0 16px 48px rgba(0, 0, 0, 0.1);
+    }
+
     header {
       display: flex;
       align-items: center;
       justify-content: space-between;
       padding: 18px 24px;
       border-bottom: 1px solid var(--border);
-      background: linear-gradient(to right, rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0.95));
+      background: linear-gradient(90deg, rgba(56, 189, 248, 0.12), rgba(192, 132, 252, 0.12));
     }
 
-    .logo {
+    .brand {
       display: flex;
       align-items: center;
-      gap: 10px;
+      gap: 12px;
     }
 
-    .logo-orb {
-      width: 32px;
-      height: 32px;
-      border-radius: 999px;
-      background: radial-gradient(circle at 30% 20%, #e0f2fe 0, #38bdf8 26%, #1d4ed8 70%, #020617 100%);
-      box-shadow:
-        0 0 26px rgba(56, 189, 248, 0.6),
-        0 0 0 1px rgba(15, 23, 42, 0.8);
+    .orb {
+      width: 38px;
+      height: 38px;
+      border-radius: 50%;
+      background: radial-gradient(circle at 30% 30%, #e0f2fe 0, var(--accent) 35%, #0f172a 72%);
+      box-shadow: var(--glow), 0 0 0 1px rgba(255, 255, 255, 0.06);
     }
 
-    .logo-text {
-      font-weight: 600;
+    h1 {
+      font-size: 20px;
       letter-spacing: 0.04em;
-      font-size: 14px;
       text-transform: uppercase;
-      color: #e5e7eb;
     }
 
     nav {
       display: flex;
-      gap: 12px;
-      font-size: 13px;
+      align-items: center;
+      gap: 8px;
     }
 
+    nav button,
     nav a {
-      padding: 6px 10px;
-      border-radius: 999px;
-      color: var(--muted);
-      text-decoration: none;
-      border: 1px solid transparent;
+      border: 1px solid var(--border);
+      background: rgba(255, 255, 255, 0.02);
+      color: var(--text);
+      padding: 8px 12px;
+      border-radius: 12px;
+      cursor: pointer;
+      font-size: 13px;
       transition: all 0.2s ease;
+      text-decoration: none;
     }
 
+    nav button:hover,
     nav a:hover {
-      color: var(--text);
-      border-color: rgba(148, 163, 184, 0.4);
-      background: rgba(15, 23, 42, 0.9);
-    }
-
-    nav a.primary {
-      color: #0b1120;
-      background: #38bdf8;
-      border-color: transparent;
-      font-weight: 500;
-      box-shadow: 0 10px 30px rgba(56, 189, 248, 0.5);
+      border-color: rgba(148, 163, 184, 0.5);
+      transform: translateY(-1px);
     }
 
-    nav a.primary:hover {
-      transform: translateY(-1px);
-      box-shadow: 0 14px 40px rgba(56, 189, 248, 0.7);
+    .badge {
+      display: inline-flex;
+      align-items: center;
+      gap: 8px;
+      padding: 12px 14px;
+      border-radius: 12px;
+      background: rgba(56, 189, 248, 0.12);
+      border: 1px solid rgba(56, 189, 248, 0.3);
+      color: var(--text);
+      font-weight: 600;
+      font-size: 14px;
+      margin-bottom: 14px;
     }
 
-    /* ======= 主体区域布局 ======= */
     main {
       display: grid;
-      grid-template-columns: minmax(0, 1.5fr) minmax(0, 1.2fr);
-      gap: 24px;
-      padding: 24px;
-    }
-
-    @media (max-width: 768px) {
-      body {
-        padding: 16px;
-      }
-
-      main {
-        grid-template-columns: minmax(0, 1fr);
-      }
-
-      header {
-        flex-direction: column;
-        align-items: flex-start;
-        gap: 12px;
-      }
-
-      nav {
-        width: 100%;
-        justify-content: flex-start;
-        flex-wrap: wrap;
-      }
+      grid-template-columns: 1.4fr 1fr;
+      gap: 20px;
+      padding: 22px;
     }
 
-    /* ======= 左侧：简介 ======= */
-    .intro-card {
-      border-radius: 20px;
+    .card {
+      background: var(--card);
       border: 1px solid var(--border);
-      padding: 20px 20px 18px;
-      background: radial-gradient(circle at top left, rgba(56, 189, 248, 0.18) 0, rgba(15, 23, 42, 0.92) 45%, #020617 100%);
-      position: relative;
-      overflow: hidden;
-    }
-
-    .badge-row {
-      display: flex;
-      gap: 8px;
-      margin-bottom: 16px;
-      flex-wrap: wrap;
+      border-radius: 18px;
+      padding: 18px;
+      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
+      transition: transform 0.25s ease, box-shadow 0.25s ease;
     }
 
-    .badge {
-      font-size: 11px;
-      padding: 3px 9px;
-      border-radius: 999px;
-      border: 1px solid rgba(148, 163, 184, 0.5);
-      color: var(--muted);
-      background: rgba(15, 23, 42, 0.9);
-      display: inline-flex;
-      align-items: center;
-      gap: 4px;
+    .card:hover {
+      transform: translateY(-2px);
+      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.28);
     }
 
-    .badge-dot {
-      width: 7px;
-      height: 7px;
-      border-radius: 999px;
-      background: #22c55e;
-      box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.18);
+    .hero {
+      grid-column: span 2;
+      display: grid;
+      grid-template-columns: 1.4fr 1fr;
+      gap: 16px;
     }
 
-    h1 {
-      font-size: 26px;
-      margin-bottom: 8px;
-      letter-spacing: 0.04em;
+    .hero .intro h2 {
+      font-size: 32px;
+      margin-bottom: 12px;
+      line-height: 1.1;
     }
 
-    .subheadline {
-      font-size: 14px;
+    .hero .intro p {
       color: var(--muted);
-      margin-bottom: 16px;
-      line-height: 1.6;
+      line-height: 1.7;
+      margin-bottom: 12px;
     }
 
-    .pill-row {
+    .pills {
       display: flex;
       flex-wrap: wrap;
-      gap: 8px;
-      margin-bottom: 18px;
+      gap: 10px;
+      margin: 12px 0 18px;
     }
 
     .pill {
-      font-size: 11px;
-      padding: 4px 10px;
-      border-radius: 999px;
-      background: rgba(15, 23, 42, 0.9);
-      border: 1px solid rgba(148, 163, 184, 0.5);
-      color: var(--muted);
-    }
-
-    .stats {
-      display: flex;
-      gap: 18px;
-      margin-bottom: 18px;
-      font-size: 11px;
-      color: var(--muted);
-    }
-
-    .stats strong {
-      display: block;
-      font-size: 18px;
+      padding: 8px 12px;
+      background: rgba(255, 255, 255, 0.05);
+      border: 1px solid var(--border);
       color: var(--text);
+      border-radius: 999px;
+      font-size: 13px;
     }
 
-    .buttons {
+    .cta-row {
       display: flex;
       flex-wrap: wrap;
       gap: 10px;
-      margin-bottom: 8px;
+      margin-top: 4px;
     }
 
     .btn {
-      font-size: 13px;
-      padding: 7px 14px;
-      border-radius: 999px;
-      border: 1px solid rgba(148, 163, 184, 0.6);
-      background: rgba(15, 23, 42, 0.9);
-      color: var(--text);
+      border: none;
+      padding: 10px 14px;
+      border-radius: 12px;
       cursor: pointer;
+      font-weight: 600;
       display: inline-flex;
       align-items: center;
-      gap: 6px;
-      transition: all 0.18s ease;
+      gap: 8px;
+      transition: transform 0.15s ease, box-shadow 0.2s ease;
     }
 
-    .btn span {
-      font-size: 14px;
+    .btn.primary {
+      background: linear-gradient(120deg, var(--accent), var(--accent-2));
+      color: #0b1021;
+      box-shadow: var(--glow);
+    }
+
+    .btn.ghost {
+      border: 1px solid var(--border);
+      background: transparent;
+      color: var(--text);
     }
 
     .btn:hover {
-      border-color: #38bdf8;
-      color: #e0f2fe;
       transform: translateY(-1px);
-      box-shadow: 0 10px 30px rgba(15, 23, 42, 0.9);
+      box-shadow: 0 14px 30px rgba(0, 0, 0, 0.25);
     }
 
-    .btn.primary {
-      background: linear-gradient(135deg, #38bdf8, #22c55e);
-      border-color: transparent;
-      color: #0b1120;
-      font-weight: 500;
+    .stats {
+      display: grid;
+      grid-template-columns: repeat(3, minmax(0, 1fr));
+      gap: 12px;
+      margin-top: 10px;
     }
 
-    .btn.primary:hover {
-      box-shadow:
-        0 12px 36px rgba(56, 189, 248, 0.7),
-        0 0 0 1px rgba(15, 23, 42, 0.8);
+    .stat {
+      border: 1px solid var(--border);
+      border-radius: 14px;
+      padding: 12px;
+      background: rgba(255, 255, 255, 0.03);
     }
 
-    .footnote {
-      font-size: 11px;
-      color: var(--muted);
-      opacity: 0.8;
+    .stat strong {
+      display: block;
+      font-size: 22px;
     }
 
-    /* ======= 右侧：卡片集合 ======= */
-    .right-column {
-      display: flex;
-      flex-direction: column;
-      gap: 16px;
+    .highlighted-card {
+      position: relative;
+      overflow: hidden;
     }
 
-    .card {
-      border-radius: 18px;
-      border: 1px solid var(--border);
-      background: rgba(15, 23, 42, 0.85);
-      padding: 14px 14px 12px;
+    .highlighted-card::before {
+      content: "";
+      position: absolute;
+      inset: 0;
+      background: radial-gradient(circle at 20% 20%, rgba(56, 189, 248, 0.14), transparent 45%),
+        radial-gradient(circle at 80% 10%, rgba(192, 132, 252, 0.12), transparent 55%);
+      pointer-events: none;
     }
 
-    .card-header {
+    .section-title {
       display: flex;
-      justify-content: space-between;
       align-items: center;
-      margin-bottom: 8px;
+      justify-content: space-between;
+      margin-bottom: 10px;
     }
 
-    .card-title {
-      font-size: 13px;
-      font-weight: 500;
-      letter-spacing: 0.03em;
-      text-transform: uppercase;
+    .section-title h3 {
+      font-size: 18px;
+    }
+
+    .filter-tabs {
+      display: inline-flex;
+      gap: 8px;
+      padding: 6px;
+      border-radius: 12px;
+      background: rgba(255, 255, 255, 0.04);
+      border: 1px solid var(--border);
+    }
+
+    .filter-tabs button {
+      border: none;
+      background: transparent;
+      padding: 8px 12px;
+      border-radius: 10px;
       color: var(--muted);
+      cursor: pointer;
+      font-weight: 600;
+      transition: background 0.2s ease, color 0.2s ease;
     }
 
-    .card-tag {
-      font-size: 11px;
-      padding: 3px 8px;
-      border-radius: 999px;
-      background: var(--accent-soft);
-      color: #bae6fd;
-      border: 1px solid rgba(56, 189, 248, 0.4);
+    .filter-tabs button.active {
+      background: rgba(56, 189, 248, 0.16);
+      color: var(--text);
+      box-shadow: var(--glow);
     }
 
-    .timeline {
-      list-style: none;
-      font-size: 12px;
+    .projects {
+      display: grid;
+      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
+      gap: 12px;
+      margin-top: 12px;
+    }
+
+    .project-card {
+      border: 1px solid var(--border);
+      border-radius: 14px;
+      padding: 12px;
+      background: rgba(255, 255, 255, 0.02);
       display: flex;
       flex-direction: column;
+      gap: 8px;
+    }
+
+    .project-card .tags {
+      display: flex;
       gap: 6px;
+      flex-wrap: wrap;
     }
 
-    .timeline li {
+    .tag {
+      background: rgba(56, 189, 248, 0.14);
+      color: var(--text);
+      padding: 4px 8px;
+      border-radius: 8px;
+      border: 1px solid rgba(56, 189, 248, 0.25);
+      font-size: 12px;
+    }
+
+    .timeline {
+      display: grid;
+      gap: 10px;
+    }
+
+    .timeline-item {
+      border: 1px solid var(--border);
+      border-radius: 14px;
+      padding: 12px;
+      background: rgba(255, 255, 255, 0.02);
+      cursor: pointer;
+      transition: background 0.2s ease, border-color 0.2s ease;
+    }
+
+    .timeline-item:hover {
+      background: rgba(56, 189, 248, 0.06);
+      border-color: rgba(56, 189, 248, 0.4);
+    }
+
+    .timeline-item .meta {
       display: flex;
+      align-items: center;
       justify-content: space-between;
-      gap: 8px;
+      font-weight: 600;
+      margin-bottom: 4px;
+    }
+
+    .timeline-item .content {
       color: var(--muted);
+      line-height: 1.6;
+      max-height: 0;
+      overflow: hidden;
+      transition: max-height 0.25s ease;
     }
 
-    .timeline span.label {
-      color: var(--text);
+    .timeline-item.active .content {
+      max-height: 120px;
     }
 
     .skills {
       display: flex;
       flex-wrap: wrap;
-      gap: 6px;
-      font-size: 11px;
+      gap: 8px;
     }
 
-    .skills span {
-      padding: 3px 8px;
+    .skill {
+      border: 1px solid var(--border);
+      padding: 10px 12px;
+      border-radius: 10px;
+      min-width: 120px;
+      background: rgba(255, 255, 255, 0.02);
+    }
+
+    .progress {
+      height: 8px;
       border-radius: 999px;
-      border: 1px dashed rgba(148, 163, 184, 0.7);
-      color: var(--muted);
+      background: rgba(148, 163, 184, 0.3);
+      margin-top: 8px;
+      overflow: hidden;
+    }
+
+    .progress span {
+      display: block;
+      height: 100%;
+      background: linear-gradient(120deg, var(--accent), var(--accent-2));
+      border-radius: inherit;
     }
 
-    .status-row {
+    form {
+      display: grid;
+      gap: 10px;
+    }
+
+    label {
+      font-weight: 600;
+      font-size: 14px;
       display: flex;
-      justify-content: space-between;
-      align-items: baseline;
-      font-size: 12px;
+      align-items: center;
+      gap: 6px;
     }
 
-    .status-row strong {
-      color: #f9fafb;
+    input,
+    textarea,
+    select {
+      width: 100%;
+      padding: 10px 12px;
+      border-radius: 10px;
+      border: 1px solid var(--border);
+      background: rgba(255, 255, 255, 0.02);
+      color: var(--text);
       font-size: 14px;
     }
 
-    .status-row small {
-      color: var(--muted);
-      font-size: 11px;
+    textarea {
+      resize: vertical;
+      min-height: 90px;
     }
 
-    /* 小的发光点装饰 */
-    .glow-dots {
-      position: absolute;
-      inset: 0;
-      pointer-events: none;
-      opacity: 0.5;
+    .note {
+      color: var(--muted);
+      font-size: 13px;
     }
 
-    .glow-dots span {
-      position: absolute;
-      width: 4px;
-      height: 4px;
-      border-radius: 999px;
-      background: rgba(56, 189, 248, 0.9);
-      filter: blur(1px);
+    .message-log {
+      margin-top: 10px;
+      display: grid;
+      gap: 8px;
     }
 
-    .glow-dots span:nth-child(1) { top: 8%; left: 60%; }
-    .glow-dots span:nth-child(2) { top: 38%; left: 90%; }
-    .glow-dots span:nth-child(3) { top: 75%; left: 70%; }
+    .message-log .item {
+      border: 1px solid var(--border);
+      border-radius: 10px;
+      padding: 8px 10px;
+      background: rgba(255, 255, 255, 0.02);
+    }
 
     footer {
-      padding: 0 24px 18px;
-      font-size: 11px;
-      color: var(--muted);
+      border-top: 1px solid var(--border);
+      padding: 14px 20px;
       display: flex;
+      flex-wrap: wrap;
+      align-items: center;
+      gap: 8px;
       justify-content: space-between;
-      gap: 12px;
-      border-top: 1px solid var(--border);
-      background: rgba(15, 23, 42, 0.96);
+      color: var(--muted);
     }
 
     footer a {
-      color: #93c5fd;
+      color: var(--accent);
       text-decoration: none;
     }
 
-    footer a:hover {
-      text-decoration: underline;
+    @media (max-width: 860px) {
+      main {
+        grid-template-columns: 1fr;
+      }
+      .hero {
+        grid-template-columns: 1fr;
+      }
+    }
+
+    @media (max-width: 540px) {
+      header {
+        flex-direction: column;
+        align-items: flex-start;
+        gap: 12px;
+      }
+
+      nav {
+        width: 100%;
+        justify-content: flex-start;
+        flex-wrap: wrap;
+      }
+
+      .cta-row {
+        width: 100%;
+      }
+
+      .cta-row .btn {
+        flex: 1;
+        justify-content: center;
+      }
     }
   </style>
 </head>
 <body>
-  <div class="page">
+  <div class="shell">
     <header>
-      <div class="logo">
-        <div class="logo-orb"></div>
-        <div class="logo-text">DUXIN SPACE</div>
+      <div class="brand">
+        <div class="orb"></div>
+        <div>
+          <div class="badge">杜鑫 · Product & UI 体验</div>
+          <h1>Personal Playground</h1>
+        </div>
       </div>
       <nav>
-        <a href="#about">关于我</a>
-        <a href="#work">项目</a>
-        <a href="#contact" class="primary">联系我</a>
+        <a href="#projects">项目</a>
+        <a href="#timeline">动态</a>
+        <a href="#contact">联系</a>
+        <button id="theme-toggle" aria-label="切换主题">🌙 主题</button>
       </nav>
     </header>
 
     <main>
-      <!-- 左侧：简介 -->
-      <section class="intro-card" id="about">
-        <div class="glow-dots">
-          <span></span><span></span><span></span>
-        </div>
-
-        <div class="badge-row">
-          <div class="badge">
-            <span class="badge-dot"></span>
-            正在探索 · 个人小站 v0.1
+      <section class="hero">
+        <div class="card highlighted-card intro">
+          <h2>你好，我是杜鑫 👋</h2>
+          <p>一名正在把产品思维和视觉体验结合起来的设计师，喜欢用小实验验证想法。这个页面记录了我最近的项目、学习和生活状态，并提供了几个好玩的交互入口。</p>
+
+          <div class="pills">
+            <div class="pill">🎨 UI / 交互</div>
+            <div class="pill">💻 前端实践</div>
+            <div class="pill">🤖 AI 工作流</div>
+            <div class="pill">📈 数据可视化</div>
           </div>
-          <div class="badge">
-            ⚙️  GitHub Pages 练习中
+
+          <div class="stats">
+            <div class="stat">
+              <strong>30+</strong>
+              <span>交付落地的界面</span>
+            </div>
+            <div class="stat">
+              <strong>12</strong>
+              <span>自研小工具</span>
+            </div>
+            <div class="stat">
+              <strong>∞</strong>
+              <span>想法待验证</span>
+            </div>
           </div>
-        </div>
 
-        <h1>嗨，我是杜鑫 👋</h1>
-        <p class="subheadline">
-          一名对产品、体验和视觉都有点较真的 UI 设计师。<br />
-          这个页面是我用 GitHub Pages 搭的第一个小站，用来折腾各种想法、Demo 和 Side Project。
-        </p>
-
-        <div class="pill-row">
-          <div class="pill">🎨 UI / 交互设计</div>
-          <div class="pill">💻 前端入门中</div>
-          <div class="pill">📈 投资 & 数字化</div>
-          <div class="pill">🧪 各种小实验</div>
+          <div class="cta-row">
+            <button class="btn primary" onclick="document.getElementById('projects').scrollIntoView({behavior: 'smooth'})">🚀 查看作品</button>
+            <button class="btn ghost" onclick="document.getElementById('contact').scrollIntoView({behavior: 'smooth'})">✉️ 留言</button>
+          </div>
         </div>
 
-        <div class="stats">
-          <div>
-            <strong>3+</strong>
-            <span>年设计经验</span>
+        <div class="card highlighted-card">
+          <div class="section-title">
+            <h3>灵感清单</h3>
+            <small class="note" id="idea-count">共 0 条</small>
           </div>
-          <div>
-            <strong>20+</strong>
-            <span>上线项目</span>
-          </div>
-          <div>
-            <strong>∞</strong>
-            <span>灵光一闪</span>
+          <p class="note">点击下方标签，随机抽取一个今日可尝试的小练习。</p>
+          <div class="pills" id="idea-pills"></div>
+          <div class="card" style="margin-top: 10px; background: rgba(255,255,255,0.04);">
+            <div class="section-title">
+              <strong>今日挑战</strong>
+              <button class="btn ghost" style="padding:6px 10px;font-size:12px;" onclick="drawIdea()">再抽一个</button>
+            </div>
+            <p id="idea-display" style="line-height:1.6; color: var(--text);">点击上方标签开始抽取吧。</p>
           </div>
         </div>
+      </section>
 
-        <div class="buttons" id="contact">
-          <button class="btn primary" onclick="scrollToSection('work')">
-            <span>🚀</span> 看看我在做什么
-          </button>
-          <button class="btn" onclick="alert('这里可以改成你的邮箱、微信二维码等链接。')">
-            <span>✉️</span> 联系我（示例弹窗）
-          </button>
+      <section class="card" id="projects">
+        <div class="section-title">
+          <h3>项目集锦</h3>
+          <div class="filter-tabs" id="filter-tabs"></div>
         </div>
+        <p class="note">选择不同的标签筛选我最近在玩的项目，点击卡片可以查看详述。</p>
+        <div class="projects" id="project-grid"></div>
+      </section>
 
-        <p class="footnote">
-          当前版本只是静态 HTML + CSS。后面会慢慢加上：深色模式切换、作品展示、博客等等。
-        </p>
+      <section class="card" id="timeline">
+        <div class="section-title">
+          <h3>动态时间线</h3>
+          <small class="note">点击条目展开细节</small>
+        </div>
+        <div class="timeline" id="timeline-list"></div>
       </section>
 
-      <!-- 右侧：信息卡片 -->
-      <div class="right-column">
-        <section class="card" id="work">
-          <div class="card-header">
-            <div class="card-title">近期在折腾</div>
-            <div class="card-tag">Side Project Log</div>
-          </div>
-          <ul class="timeline">
-            <li>
-              <span class="label">🧼 在线抠图小工具</span>
-              <span>2025</span>
-            </li>
-            <li>
-              <span class="label">📱 银行生活服务 UI 组件整理</span>
-              <span>进行中</span>
-            </li>
-            <li>
-              <span class="label">🤖 AI Prompt & 设计工作流优化</span>
-              <span>长期</span>
-            </li>
-          </ul>
-        </section>
-
-        <section class="card">
-          <div class="card-header">
-            <div class="card-title">技能快照</div>
-            <div class="card-tag">Toolbox</div>
-          </div>
-          <div class="skills">
-            <span>Figma</span>
-            <span>Sketch</span>
-            <span>Web / App UX</span>
-            <span>信息架构</span>
-            <span>视觉规范</span>
-            <span>HTML & CSS 入门</span>
-            <span>GitHub Pages</span>
-            <span>AI 辅助设计</span>
-          </div>
-        </section>
+      <section class="card" id="skills">
+        <div class="section-title">
+          <h3>技能与熟练度</h3>
+          <small class="note">动态进度条展示当前关注</small>
+        </div>
+        <div class="skills" id="skill-list"></div>
+      </section>
 
-        <section class="card">
-          <div class="card-header">
-            <div class="card-title">当前状态</div>
-            <div class="card-tag">Now</div>
+      <section class="card" id="contact">
+        <div class="section-title">
+          <h3>留言与偏好</h3>
+          <small class="note">填写表单可生成定制化回复</small>
+        </div>
+        <form id="contact-form">
+          <div>
+            <label for="name">昵称</label>
+            <input id="name" name="name" placeholder="称呼我什么都可以" required />
           </div>
-          <div class="status-row">
-            <div>
-              <strong>学习部署个人网站</strong>
-              <small>从一个简单的 index.html 开始</small>
-            </div>
-            <div>
-              <small>目标：</small>
-              <strong>持续更新</strong>
-            </div>
+          <div>
+            <label for="topic">感兴趣的话题</label>
+            <select id="topic" name="topic" required>
+              <option value="设计体验">设计体验</option>
+              <option value="前端实践">前端实践</option>
+              <option value="AI 工作流">AI 工作流</option>
+              <option value="副业/投资">副业 / 投资</option>
+            </select>
           </div>
-        </section>
-      </div>
+          <div>
+            <label for="message">留言</label>
+            <textarea id="message" name="message" placeholder="想聊的事情..." required></textarea>
+          </div>
+          <button class="btn primary" type="submit">发送并生成回复</button>
+          <p class="note" id="form-hint">表单不会发送到服务器，内容仅在本地存储，方便你反复修改。</p>
+        </form>
+        <div class="message-log" id="message-log"></div>
+      </section>
     </main>
 
     <footer>
-      <div>© <span id="year"></span> Duxin Space · 这是一个用于练习的个人测试站点。</div>
-      <div>代码托管于 <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a></div>
+      <span>© <span id="year"></span> 杜鑫 · 用代码记录灵感</span>
+      <span>托管于 <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a></span>
     </footer>
   </div>
 
   <script>
-    // 设置年份
-    document.getElementById('year').textContent = new Date().getFullYear();
-
-    // 简单滚动到指定区域
-    function scrollToSection(id) {
-      var el = document.getElementById(id);
-      if (!el) return;
-      window.scrollTo({
-        top: el.getBoundingClientRect().top + window.scrollY - 80,
-        behavior: 'smooth'
+    // 主题切换
+    const themeToggle = document.getElementById('theme-toggle');
+    themeToggle.addEventListener('click', () => {
+      document.body.classList.toggle('light');
+      themeToggle.textContent = document.body.classList.contains('light') ? '🌞 主题' : '🌙 主题';
+      localStorage.setItem('duxin-theme', document.body.classList.contains('light') ? 'light' : 'dark');
+    });
+
+    // 恢复主题
+    const savedTheme = localStorage.getItem('duxin-theme');
+    if (savedTheme === 'light') {
+      document.body.classList.add('light');
+      themeToggle.textContent = '🌞 主题';
+    }
+
+    // 基本数据
+    const ideas = [
+      { tag: '前端', text: '用原生 JS 做一个带动画的导航菜单或 Loading 组件。' },
+      { tag: '设计', text: '拆解一个常用 App 的首页信息架构，并重绘视觉层级。' },
+      { tag: 'AI', text: '写一条 Prompt 帮助你把需求转成线框，记录最佳实践。' },
+      { tag: '体验', text: '观察线下体验（咖啡馆/地铁），总结可迁移到 App 的微交互。' },
+      { tag: '数据', text: '用 CSV + Chart.js 做一个个人习惯追踪 Dashboard。' }
+    ];
+
+    const projects = [
+      { title: '在线抠图小工具', tags: ['前端', 'AI'], desc: '基于 Canvas 与开源模型接口，提供快速抠图与批量导出。' },
+      { title: '银行生活服务组件库', tags: ['设计', '前端'], desc: '整理高频场景的 UI 组件，附规范、动效与可视化示例。' },
+      { title: '工作流自动化助手', tags: ['AI'], desc: '用提示工程把重复需求拆解成可复用的工作流模板。' },
+      { title: '个人数据仪表盘', tags: ['数据', '前端'], desc: '集中展示习惯、阅读、健身等数据的可视化 Dashboard。' },
+      { title: '体验微实验合集', tags: ['体验', '设计'], desc: '每周一个小交互实验，记录思路、原型和反馈。' }
+    ];
+
+    const timeline = [
+      { title: '搭建个人站', time: '2025.02', detail: '第一次把个人信息放在 GitHub Pages 上，开始记录侧项目。' },
+      { title: '整理组件库', time: '2025.03', detail: '在团队内输出“生活服务”场景组件，沉淀交互规范。' },
+      { title: '前端练习月', time: '2025.04', detail: '用原生 HTML/CSS/JS 重做过往作品，熟悉部署流程。' },
+      { title: 'AI Prompt 手册', time: '持续', detail: '每周更新 2 条针对设计协作的提示词，并做效果复盘。' }
+    ];
+
+    const skills = [
+      { name: '产品 / 交互', level: 86 },
+      { name: 'UI 视觉', level: 82 },
+      { name: '前端基础', level: 60 },
+      { name: '数据可视化', level: 55 },
+      { name: '提示词工程', level: 70 }
+    ];
+
+    // 渲染灵感
+    const ideaPills = document.getElementById('idea-pills');
+    const ideaDisplay = document.getElementById('idea-display');
+    const ideaCount = document.getElementById('idea-count');
+    ideaCount.textContent = `共 ${ideas.length} 条`;
+
+    ideas.forEach((idea, index) => {
+      const pill = document.createElement('button');
+      pill.className = 'btn ghost';
+      pill.style.padding = '8px 12px';
+      pill.textContent = idea.tag;
+      pill.addEventListener('click', () => drawIdea(index));
+      ideaPills.appendChild(pill);
+    });
+
+    function drawIdea(fixedIndex) {
+      const id = fixedIndex !== undefined ? fixedIndex : Math.floor(Math.random() * ideas.length);
+      ideaDisplay.textContent = ideas[id].text;
+    }
+
+    // 项目筛选
+    const filterTabs = document.getElementById('filter-tabs');
+    const projectGrid = document.getElementById('project-grid');
+    const allTags = Array.from(new Set(projects.flatMap(p => p.tags)));
+    let activeTag = '全部';
+
+    ['全部', ...allTags].forEach(tag => {
+      const btn = document.createElement('button');
+      btn.textContent = tag;
+      btn.className = tag === '全部' ? 'active' : '';
+      btn.addEventListener('click', () => {
+        activeTag = tag;
+        document.querySelectorAll('.filter-tabs button').forEach(el => el.classList.remove('active'));
+        btn.classList.add('active');
+        renderProjects();
+      });
+      filterTabs.appendChild(btn);
+    });
+
+    function renderProjects() {
+      projectGrid.innerHTML = '';
+      projects
+        .filter(p => activeTag === '全部' || p.tags.includes(activeTag))
+        .forEach(p => {
+          const card = document.createElement('div');
+          card.className = 'project-card';
+          card.innerHTML = `<strong>${p.title}</strong><p class="note">${p.desc}</p>`;
+          const tagsWrap = document.createElement('div');
+          tagsWrap.className = 'tags';
+          p.tags.forEach(t => {
+            const span = document.createElement('span');
+            span.className = 'tag';
+            span.textContent = t;
+            tagsWrap.appendChild(span);
+          });
+          card.appendChild(tagsWrap);
+          card.addEventListener('click', () => {
+            alert(`${p.title}\n\n${p.desc}\n\n标签: ${p.tags.join(', ')}`);
+          });
+          projectGrid.appendChild(card);
+        });
+    }
+
+    renderProjects();
+
+    // 时间线
+    const timelineList = document.getElementById('timeline-list');
+    timeline.forEach((item, idx) => {
+      const row = document.createElement('div');
+      row.className = 'timeline-item';
+      row.innerHTML = `
+        <div class="meta"><span>${item.title}</span><small class="note">${item.time}</small></div>
+        <div class="content">${item.detail}</div>
+      `;
+      row.addEventListener('click', () => {
+        document.querySelectorAll('.timeline-item').forEach(el => el.classList.remove('active'));
+        row.classList.toggle('active');
       });
+      if (idx === 0) row.classList.add('active');
+      timelineList.appendChild(row);
+    });
+
+    // 技能条
+    const skillList = document.getElementById('skill-list');
+    skills.forEach(skill => {
+      const box = document.createElement('div');
+      box.className = 'skill';
+      box.innerHTML = `<strong>${skill.name}</strong><div class="progress"><span style="width:${skill.level}%"></span></div>`;
+      skillList.appendChild(box);
+    });
+
+    // 表单互动：生成定制回复 + 本地存储
+    const contactForm = document.getElementById('contact-form');
+    const messageLog = document.getElementById('message-log');
+
+    const savedMessages = JSON.parse(localStorage.getItem('duxin-messages') || '[]');
+    savedMessages.forEach(renderMessage);
+
+    contactForm.addEventListener('submit', event => {
+      event.preventDefault();
+      const data = new FormData(contactForm);
+      const name = data.get('name').trim();
+      const topic = data.get('topic');
+      const message = data.get('message').trim();
+      if (!name || !message) return;
+
+      const reply = generateReply(name, topic, message);
+      const record = { name, topic, message, reply, ts: new Date().toLocaleString() };
+      renderMessage(record, true);
+
+      savedMessages.push(record);
+      localStorage.setItem('duxin-messages', JSON.stringify(savedMessages));
+
+      contactForm.reset();
+      document.getElementById('form-hint').textContent = '已生成定制回复，内容保存在本地，可以继续修改。';
+    });
+
+    function renderMessage(record, prepend = false) {
+      const item = document.createElement('div');
+      item.className = 'item';
+      item.innerHTML = `
+        <strong>${record.name} · ${record.topic}</strong>
+        <div class="note">${record.ts}</div>
+        <p style="margin:6px 0;">${record.message}</p>
+        <div class="note">回复：${record.reply}</div>
+      `;
+      if (prepend) {
+        messageLog.prepend(item);
+      } else {
+        messageLog.appendChild(item);
+      }
+    }
+
+    function generateReply(name, topic, message) {
+      const tone = {
+        '设计体验': '保持用户视角的敏锐度，并强调可用性验证',
+        '前端实践': '关注性能与细节体验，同时用实验驱动学习',
+        'AI 工作流': '多做小样本验证，把模型当搭档而非黑盒',
+        '副业 / 投资': '控制风险，用可积累的技能驱动现金流'
+      }[topic] || '保持好奇，持续记录';
+
+      return `${name}，谢谢你的留言！我会围绕「${topic}」继续输出内容。你的想法「${message}」听起来很棒，后续更新会优先考虑这一方向，也欢迎随时交流。建议：${tone}。`;
     }
+
+    // 年份
+    document.getElementById('year').textContent = new Date().getFullYear();
   </script>
 </body>
 </html>
 
EOF
)
