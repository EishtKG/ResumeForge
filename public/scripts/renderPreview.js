import { renderMinimal } from '../templates/theme-minimal.js';
import { renderEditorial } from '../templates/theme-editorial.js';
import { renderBold } from '../templates/theme-bold.js';

const themes = {
  minimal: renderMinimal,
  editorial: renderEditorial,
  bold: renderBold,
};

export function renderPortfolio(data, theme, accentColor) {
  const root = document.documentElement;
  if (accentColor) root.style.setProperty('--accent-color', accentColor);

  const renderer = themes[theme] || themes.minimal;
  return renderer(data);
}

export function renderCoverLetter(data) {
  const body = data.coverLetter || 'No cover letter generated.';
  return `
    <div class="cover-letter-page">
      <h2>Cover Letter</h2>
      <div class="cover-letter-body" contenteditable="true" data-field="coverLetter">${escHtml(body)}</div>
    </div>
  `;
}

export function renderAtsResume(data) {
  const matchedTags = (data.matchedKeywords || []).map(k =>
    `<span class="keyword-tag matched">${escHtml(k)}</span>`
  ).join('');
  const missingTags = (data.missingKeywords || []).map(k =>
    `<span class="keyword-tag missing">${escHtml(k)}</span>`
  ).join('');

  const scoreColor = data.atsMatchScore >= 70 ? '#16a34a' :
                     data.atsMatchScore >= 40 ? '#f59e0b' : '#dc2626';

  const resumeText = data.atsResume || buildFallbackResume(data);

  return `
    <div class="ats-resume-page">
      <div class="ats-report-compact">
        <div class="ats-score-inline">
          <span class="ats-score-num" style="color: ${scoreColor}">${data.atsMatchScore}</span>
          <span class="ats-score-label">ATS Score</span>
        </div>
        <div class="ats-keywords-row">
          <div class="ats-kw-group">
            <span class="ats-kw-label">Matched</span>
            <div class="ats-kw-list">${matchedTags || '<span class="ats-kw-empty">None</span>'}</div>
          </div>
          <div class="ats-kw-group">
            <span class="ats-kw-label">Missing</span>
            <div class="ats-kw-list">${missingTags || '<span class="ats-kw-empty">None</span>'}</div>
          </div>
        </div>
      </div>
      <div class="ats-resume-divider"></div>
      <div class="ats-resume-preview" contenteditable="true" data-field="atsResume">${escHtml(resumeText)}</div>
    </div>
  `;
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

function escHtml(str) {
  if (!str) return '';
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}
