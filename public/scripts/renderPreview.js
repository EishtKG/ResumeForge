import { renderMinimal } from '../templates/theme-minimal.js';
import { renderEditorial } from '../templates/theme-editorial.js';
import { renderBold } from '../templates/theme-bold.js';

const themes = {
  minimal: renderMinimal,
  editorial: renderEditorial,
  bold: renderBold,
};

export function renderPortfolio(data, theme, accentColor) {
  const renderer = themes[theme] || themes.minimal;
  return renderer(data, accentColor);
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

export function renderAtsReport(data) {
  const matchedTags = (data.matchedKeywords || []).map(k =>
    `<span class="keyword-tag matched">${escHtml(k)}</span>`
  ).join('');
  const missingTags = (data.missingKeywords || []).map(k =>
    `<span class="keyword-tag missing">${escHtml(k)}</span>`
  ).join('');

  const scoreColor = data.atsMatchScore >= 70 ? '#16a34a' :
                     data.atsMatchScore >= 40 ? '#f59e0b' : '#dc2626';

  return `
    <div class="ats-report">
      <h2>ATS Compatibility Report</h2>
      <div class="ats-score-card">
        <div class="ats-score-value" style="color: ${scoreColor}">${data.atsMatchScore}</div>
        <div class="ats-score-label">out of 100</div>
      </div>

      <div class="keyword-section">
        <h3>Matched Keywords (${(data.matchedKeywords || []).length})</h3>
        <div class="keyword-list">${matchedTags || '<span style="color:#888;font-size:13px">No matched keywords found</span>'}</div>
      </div>

      <div class="keyword-section">
        <h3>Missing Keywords (${(data.missingKeywords || []).length})</h3>
        <div class="keyword-list">${missingTags || '<span style="color:#888;font-size:13px">All keywords matched!</span>'}</div>
      </div>
    </div>
  `;
}

function escHtml(str) {
  if (!str) return '';
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}
