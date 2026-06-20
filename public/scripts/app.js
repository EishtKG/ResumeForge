import { tailorResume } from './api.js';
import { renderPortfolio, renderCoverLetter, renderAtsReport } from './renderPreview.js';
import { exportToPdf } from './exportPdf.js';
import { exportToHtml } from './exportHtml.js';

// --- State ---
const state = {
  data: null,
  theme: 'minimal',
  accentColor: '#171717',
  activeTab: 'portfolio',
};

// --- DOM Refs ---
const els = {
  resumeInput: document.getElementById('resumeInput'),
  jobInput: document.getElementById('jobInput'),
  generateBtn: document.getElementById('generateBtn'),
  btnLoading: document.getElementById('btnLoading'),
  loadingStep: document.getElementById('loadingStep'),
  progressSteps: document.getElementById('progressSteps'),
  themePicker: document.getElementById('themePicker'),
  accentColor: document.getElementById('accentColor'),
  darkModeToggle: document.getElementById('darkModeToggle'),
  previewContent: document.getElementById('previewContent'),
  previewToolbar: document.getElementById('previewToolbar'),
  emptyState: document.getElementById('emptyState'),
  portfolioTab: document.getElementById('portfolioTab'),
  coverLetterTab: document.getElementById('coverLetterTab'),
  atsReportTab: document.getElementById('atsReportTab'),
  exportPdf: document.getElementById('exportPdf'),
  exportHtml: document.getElementById('exportHtml'),
};

// --- Init ---
function init() {
  els.generateBtn.addEventListener('click', handleGenerate);
  els.themePicker.addEventListener('click', handleThemeChange);
  els.accentColor.addEventListener('input', handleColorChange);
  els.darkModeToggle.addEventListener('click', toggleDarkMode);
  els.exportPdf.addEventListener('click', handleExportPdf);
  els.exportHtml.addEventListener('click', handleExportHtml);

  // Restore dark mode from session
  if (sessionStorage.getItem('rf_dark') === 'true') {
    document.body.classList.add('dark');
  }

  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => switchTab(tab.dataset.tab));
  });

  els.previewContent.addEventListener('input', handleContentEdit);

  // Keyboard shortcuts
  els.resumeInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleGenerate();
    }
  });
  els.jobInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleGenerate();
    }
  });
}

// --- Generate ---
async function handleGenerate() {
  const resume = els.resumeInput.value.trim();
  const jobDesc = els.jobInput.value.trim();

  if (!resume) { shake(els.resumeInput); return; }
  if (!jobDesc) { shake(els.jobInput); return; }

  setLoading(true);
  try {
    updateStep('parse');
    await sleep(300);
    updateStep('match');
    await sleep(200);

    const data = await tailorResume(resume, jobDesc);
    state.data = data;

    updateStep('cover');
    await sleep(100);
    updateStep('portfolio');
    await sleep(100);

    renderAll();
  } catch (err) {
    showError(err.message);
  } finally {
    setLoading(false);
  }
}

function renderAll() {
  if (!state.data) return;
  els.emptyState.style.display = 'none';
  els.previewToolbar.style.display = 'flex';
  renderPortfolioTab();
  renderCoverLetterTab();
  renderAtsTab();
}

function renderPortfolioTab() {
  els.portfolioTab.innerHTML = renderPortfolio(state.data, state.theme, state.accentColor);
}

function renderCoverLetterTab() {
  els.coverLetterTab.innerHTML = renderCoverLetter(state.data);
}

function renderAtsTab() {
  els.atsReportTab.innerHTML = renderAtsReport(state.data);
}

// --- Theme ---
function handleThemeChange(e) {
  const btn = e.target.closest('.theme-btn');
  if (!btn) return;
  els.themePicker.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  state.theme = btn.dataset.theme;
  if (state.data) {
    renderPortfolioTab();
    renderCoverLetterTab();
    renderAtsTab();
  }
}

// --- Color ---
function handleColorChange(e) {
  state.accentColor = e.target.value;
  if (state.data) renderPortfolioTab();
}

// --- Dark Mode ---
function toggleDarkMode() {
  document.body.classList.toggle('dark');
  sessionStorage.setItem('rf_dark', document.body.classList.contains('dark'));
}

// --- Tabs ---
function switchTab(tab) {
  state.activeTab = tab;
  document.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
  document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
  const tabIdMap = { 'portfolio': 'portfolioTab', 'cover-letter': 'coverLetterTab', 'ats-report': 'atsReportTab' };
  document.getElementById(tabIdMap[tab]).classList.add('active');
}

// --- Inline Editing ---
function handleContentEdit(e) {
  const target = e.target;
  if (!target.hasAttribute('contenteditable') || !state.data) return;
  const field = target.dataset.field;
  const newText = target.textContent.trim();

  if (field === 'bullets') {
    const expItems = els.portfolioTab.querySelectorAll('.pf-exp-item');
    expItems.forEach((expEl, expIdx) => {
      expEl.querySelectorAll('[data-field="bullets"]').forEach((bulletEl, bulletIdx) => {
        if (bulletEl === target && state.data.experience[expIdx]) {
          state.data.experience[expIdx].bullets[bulletIdx] = newText;
        }
      });
    });
  } else if (field === 'coverLetter') {
    state.data.coverLetter = newText;
  }
}

// --- Exports ---
async function handleExportPdf() {
  els.exportPdf.textContent = 'Exporting...';
  els.exportPdf.disabled = true;
  try { await exportToPdf(); }
  catch (err) { console.error('PDF export failed:', err); showError('PDF export failed.'); }
  finally { els.exportPdf.textContent = 'Export PDF'; els.exportPdf.disabled = false; }
}

function handleExportHtml() {
  if (!state.data) return;
  exportToHtml(state.data, state.theme, state.accentColor);
}

// --- UI Helpers ---
function setLoading(loading) {
  els.generateBtn.classList.toggle('loading', loading);
  els.generateBtn.disabled = loading;
}

function updateStep(step) {
  const steps = ['parse', 'match', 'cover', 'portfolio'];
  const labels = { parse: 'Parsing...', match: 'Matching...', cover: 'Writing...', portfolio: 'Building...' };
  els.loadingStep.textContent = labels[step] || '';
  els.progressSteps.querySelectorAll('.step').forEach(el => {
    const idx = steps.indexOf(el.dataset.step);
    const currentIdx = steps.indexOf(step);
    el.classList.toggle('active', el.dataset.step === step);
    el.classList.toggle('done', idx < currentIdx);
  });
}

function showError(msg) {
  const div = document.createElement('div');
  div.style.cssText = `position:fixed;top:20px;left:50%;transform:translateX(-50%);background:#f7d4d6;color:#c50000;padding:12px 20px;border-radius:8px;font-size:14px;z-index:9999;box-shadow:0 4px 12px rgba(0,0,0,0.1);max-width:500px;text-align:center;`;
  div.textContent = msg;
  document.body.appendChild(div);
  setTimeout(() => div.remove(), 5000);
}

function shake(el) {
  el.style.animation = 'none';
  el.offsetHeight;
  el.style.animation = 'shake 0.4s ease';
  el.focus();
  setTimeout(() => el.style.animation = '', 400);
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

init();
