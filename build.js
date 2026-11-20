const fs = require('fs');

const appJs = fs.readFileSync('app.js', 'utf8');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Favicon and Logo in HTML head
html = html.replace(/href="\.\/assets\/logo\.png\?v=3"/g, 'href="./assets/logo_pink.png?v=3"');
html = html.replace(/href="\.\/assets\/logo\.png"/g, 'href="./assets/logo_pink.png"');
html = html.replace(/src="\.\/assets\/logo\.png\?v=3"/g, 'src="./assets/logo_pink.png?v=3"');
html = html.replace(/icons\.forEach\(function\(el\) \{ el\.href = '\.\/logo\.png\?v=3'; \}\);/, "icons.forEach(function(el) { el.href = './logo_pink.png?v=3'; });");
html = html.replace(/testImg\.src = '\.\/assets\/logo\.png\?v=3';/, "testImg.src = './assets/logo_pink.png?v=3';");

// 2. PWA manifest and mobile app meta tags in <head>
if (!html.includes('<link rel="manifest"')) {
  const pwaMetaTags = `  <!-- PWA Manifest & Mobile App Meta Tags -->
  <link rel="manifest" href="./manifest.json">
  <meta name="theme-color" content="#ff4b72">
  <meta name="mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="default">
  <meta name="apple-mobile-web-app-title" content="위드케어">
  <link rel="apple-touch-icon" href="./assets/logo_pink.png?v=3">
`;
  html = html.replace('<meta name="description"', pwaMetaTags + '  <meta name="description"');
}

// 3. Tailwind config brand colors (Vibrant Pink)
html = html.replace(
  /DEFAULT: '(?:#6edfec|#B4939E|#ff4b72)',\s*hover: '(?:#5cd4e2|#9c7c87|#ff5f83)',\s*dark: '(?:#0bbecb|#906b77|#e11d62)',\s*light: '(?:#e8fbfd|#F4EBEE|#fff0f3)'/,
  "DEFAULT: '#ff4b72',\n              hover: '#ff5f83',\n              dark: '#e11d62',\n              light: '#fff0f3'"
);

// 4. Body background gradient (화이트 -> 채도 낮은 분홍 그라데이션)
html = html.replace(
  /<body class="[^"]*"(?: style="[^"]*")?>/,
  '<body class="text-slate-800 antialiased selection:bg-[#ff4b72] selection:text-white" style="background: linear-gradient(180deg, #ffffff 0%, #fff6f8 30%, #fae6ed 100%); background-attachment: fixed; min-height: 100vh;">'
);

// 5. Spinner border
html = html.replace(/border-top-color: (?:#0284c7|#B4939E|#ff4b72);/, 'border-top-color: #ff4b72;');

// 6. Service worker registration
if (!html.includes('navigator.serviceWorker.register')) {
  const swScript = `
  <!-- PWA Service Worker Registration -->
  <script>
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function() {
        navigator.serviceWorker.register('./sw.js').then(function(reg) {
          console.log('WithCare PWA Service Worker registered:', reg.scope);
        }).catch(function(err) {
          console.log('WithCare PWA Service Worker registration error:', err);
        });
      });
    }
  </script>
</body>`;
  html = html.replace('</body>', swScript);
}

// 7. Bundle app.js
const babelScriptStart = html.indexOf('<script type="text/babel">');
const babelScriptEnd = html.indexOf('</script>', babelScriptStart);

if (babelScriptStart === -1 || babelScriptEnd === -1) {
  console.error('Could not find babel script tag in index.html');
  process.exit(1);
}

const bundledHtml = html.slice(0, babelScriptStart) + 
  '<script type="text/babel">\n' + 
  appJs + 
  '\n</script>' + 
  html.slice(babelScriptEnd + '</script>'.length);

fs.writeFileSync('index.html', bundledHtml, 'utf8');
fs.writeFileSync('pink.html', bundledHtml, 'utf8');
console.log('Successfully bundled index.html and pink.html as Pink PWA! Length:', bundledHtml.length);
