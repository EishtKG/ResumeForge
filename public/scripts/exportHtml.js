export function exportToHtml(data, theme, accentColor) {
  const el = document.querySelector('.pf-page');
  if (!el) {
    console.error('Export HTML: .pf-page not found');
    return;
  }

  const styles = el.querySelector('style')?.textContent || '';
  const content = el.innerHTML.replace(/<style[\s\S]*?<\/style>/, '');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(data.candidateName)} — ${esc(data.targetRole)}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
:root { --accent-color: ${accentColor || '#171717'}; }
body { margin: 0; padding: 0; -webkit-font-smoothing: antialiased; }
${styles}
</style>
</head>
<body>
${content}
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
