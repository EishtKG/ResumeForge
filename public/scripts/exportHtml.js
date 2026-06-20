export function exportToHtml(data, theme, accentColor) {
  const el = document.querySelector('.portfolio-page');
  if (!el) return;

  const styles = el.querySelector('style')?.textContent || '';
  const content = el.innerHTML;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(data.candidateName)} — ${esc(data.targetRole)}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@300;400;500;600&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
<style>
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Inter', system-ui, sans-serif; color: #171717; background: #fff; line-height: 1.5; }
.portfolio-page { max-width: 800px; margin: 0 auto; }
a { text-decoration: none; }
[contenteditable] { outline: none; }
${styles}
</style>
</head>
<body>
<div class="portfolio-page">${content}</div>
</body>
</html>`;

  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'resume-portfolio.html';
  a.click();
  URL.revokeObjectURL(url);
}

function esc(str) {
  if (!str) return '';
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
