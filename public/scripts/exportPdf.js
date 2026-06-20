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

  openPrintWindow(html);
}

export async function exportCoverLetterToPdf(data) {
  const coverLetter = data.coverLetter || 'No cover letter generated.';

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Cover Letter</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Inter', system-ui, sans-serif; color: #171717; background: #fff; margin: 0; padding: 60px 80px; line-height: 1.8; -webkit-font-smoothing: antialiased; }
h1 { font-size: 28px; font-weight: 600; letter-spacing: -1px; margin-bottom: 32px; }
p { font-size: 15px; margin-bottom: 16px; white-space: pre-wrap; }
</style>
</head>
<body>
<h1>Cover Letter</h1>
<div>${escHtml(coverLetter).replace(/\n/g, '<br>')}</div>
</body>
</html>`;

  openPrintWindow(html);
}

export async function exportAtsResumeToPdf(data) {
  const resumeText = data.atsResume || buildFallbackResume(data);

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Resume — ${escHtml(data.candidateName || 'Candidate')}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Inter', system-ui, sans-serif; color: #171717; background: #fff; margin: 0; padding: 48px 64px; font-size: 13px; line-height: 1.6; -webkit-font-smoothing: antialiased; }
.resume-text { white-space: pre-wrap; font-family: 'JetBrains Mono', monospace; }
</style>
</head>
<body>
<div class="resume-text">${escHtml(resumeText)}</div>
</body>
</html>`;

  openPrintWindow(html);
}

function buildFallbackResume(data) {
  let r = '';
  r += (data.candidateName || 'Candidate Name').toUpperCase() + '\n';
  const contact = data.contact || {};
  const contactParts = [contact.email, contact.phone, contact.location, contact.linkedin, contact.github].filter(Boolean);
  if (contactParts.length) r += contactParts.join(' | ') + '\n';
  r += '\nSUMMARY\n' + (data.tailoredSummary || '') + '\n';
  if (data.skills?.technical?.length) r += '\nSKILLS\n' + data.skills.technical.join(', ') + '\n';
  if (data.skills?.soft?.length) r += data.skills.soft.join(', ') + '\n';
  if (data.experience?.length) {
    r += '\nEXPERIENCE\n';
    data.experience.forEach(exp => {
      r += `${exp.role} — ${exp.company} (${exp.duration})\n`;
      (exp.bullets || []).forEach(b => { r += `• ${b}\n`; });
      r += '\n';
    });
  }
  if (data.education?.length) {
    r += '\nEDUCATION\n';
    data.education.forEach(edu => {
      r += `${edu.degree} — ${edu.institution} (${edu.year})\n`;
    });
  }
  if (data.projects?.length) {
    r += '\nPROJECTS\n';
    data.projects.forEach(p => {
      r += `${p.name}: ${p.description}\n`;
      if (p.tech?.length) r += `Tech: ${p.tech.join(', ')}\n`;
    });
  }
  return r;
}

function openPrintWindow(html) {
  const win = window.open('', '_blank');
  if (!win) {
    alert('Pop-up blocked. Please allow pop-ups for this site and try again.');
    return;
  }
  win.document.write(html);
  win.document.close();
  win.onload = () => {
    setTimeout(() => { win.print(); }, 500);
  };
}

function escHtml(str) {
  if (!str) return '';
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}
