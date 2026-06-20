export function exportToHtml(data, theme, accentColor) {
  const el = document.querySelector('.pf-page');
  if (!el) return;

  const accent = accentColor || '#171717';
  const styleTag = el.querySelector('style');
  let themeCSS = styleTag ? styleTag.textContent : '';
  const content = el.innerHTML.replace(/<style[\s\S]*?<\/style>/, '').trim();

  themeCSS = themeCSS.replace(/@import url\([^)]+\);?\s*/g, '');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(data.candidateName)} — ${esc(data.targetRole)}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<script src="https://cdn.tailwindcss.com"><\/script>
<script>
tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      colors: { accent: '${accent}' }
    }
  }
}
<\/script>
<style>
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
:root { --accent-color: ${accent}; }
body { margin: 0; padding: 0; -webkit-font-smoothing: antialiased; }
${themeCSS}
</style>
</head>
<body>
<div class="pf-page" style="--accent-color: ${accent}; --pf-accent: ${accent}; --pf-accent-hover: ${accent}; --pf-accent-bg: ${accent}14; --pf-accent-bg-subtle: ${accent}0a;">
${content}
</div>
</body>
</html>`;

  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'resume-portfolio.html';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function esc(str) {
  if (!str) return '';
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
