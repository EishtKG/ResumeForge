export async function exportToPdf() {
  const el = document.querySelector('.pf-page');
  if (!el) return;

  const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent-color').trim() || '#171717';

  const styleTag = el.querySelector('style');
  let themeCSS = styleTag ? styleTag.textContent : '';
  const content = el.innerHTML.replace(/<style[\s\S]*?<\/style>/, '').trim();

  themeCSS = themeCSS.replace(/@import url\([^)]+\);?\s*/g, '');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Resume Portfolio</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
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

  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Pop-up blocked. Please allow pop-ups for this site and try again.');
    return;
  }

  printWindow.document.write(html);
  printWindow.document.close();

  printWindow.onload = () => {
    setTimeout(() => {
      printWindow.print();
    }, 500);
  };
}
