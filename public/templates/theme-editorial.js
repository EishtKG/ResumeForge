export function renderEditorial(data, accentColor) {
  const accent = accentColor || '#171717';
  return `
    <div class="pf-page" style="--accent: ${accent};">
      <style>${getEditorialCSS(accent)}</style>

      <div class="pf-masthead">
        <div class="pf-masthead-inner">
          <span class="pf-masthead-issue">Portfolio</span>
          <span class="pf-masthead-divider">/</span>
          <span class="pf-masthead-date">${esc(data.targetRole)}</span>
        </div>
      </div>

      <header class="pf-hero">
        <div class="pf-hero-container">
          <h1 class="pf-hero-name">${esc(data.candidateName)}</h1>
          <p class="pf-hero-role">${esc(data.targetRole)}</p>
        </div>
      </header>

      <section class="pf-lead">
        <div class="pf-lead-container">
          <div class="pf-pullquote">
            <span class="pf-pq-mark">"</span>
            <p class="pf-pq-text">${esc(data.tailoredSummary)}</p>
          </div>
        </div>
      </section>

      <section class="pf-section" id="skills">
        <div class="pf-section-container">
          <div class="pf-col-header">
            <span class="pf-col-num">I</span>
            <div class="pf-col-line"></div>
            <h2 class="pf-col-title">Expertise</h2>
          </div>
          <div class="pf-skills-columns">
            <div class="pf-skill-col">
              <h3 class="pf-skill-heading">Technical</h3>
              <div class="pf-skill-list">
                ${data.skills.technical.map(s => `<span class="pf-skill-pill">${esc(s)}</span>`).join('')}
              </div>
            </div>
            <div class="pf-skill-col">
              <h3 class="pf-skill-heading">Professional</h3>
              <div class="pf-skill-list">
                ${data.skills.soft.map(s => `<span class="pf-skill-pill pf-skill-pill-light">${esc(s)}</span>`).join('')}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="pf-section pf-exp-section" id="experience">
        <div class="pf-section-container">
          <div class="pf-col-header">
            <span class="pf-col-num">II</span>
            <div class="pf-col-line"></div>
            <h2 class="pf-col-title">Experience</h2>
          </div>
          ${data.experience.map((exp, i) => `
            <article class="pf-exp-block">
              <div class="pf-exp-meta">
                <span class="pf-exp-idx">${String(i + 1).padStart(2, '0')}</span>
                <span class="pf-exp-dur">${esc(exp.duration)}</span>
              </div>
              <div class="pf-exp-body">
                <h3 class="pf-exp-role">${esc(exp.role)}</h3>
                <p class="pf-exp-company">${esc(exp.company)}</p>
                <ul class="pf-exp-list">
                  ${exp.bullets.map(b => `<li contenteditable="true" data-field="bullets">${esc(b)}</li>`).join('')}
                </ul>
              </div>
            </article>
          `).join('')}
        </div>
      </section>

      ${data.projects.length > 0 ? `
        <section class="pf-section" id="projects">
          <div class="pf-section-container">
            <div class="pf-col-header">
              <span class="pf-col-num">III</span>
              <div class="pf-col-line"></div>
              <h2 class="pf-col-title">Projects</h2>
            </div>
            <div class="pf-projects-grid">
              ${data.projects.map(p => `
                <article class="pf-proj-block">
                  <div class="pf-proj-tags">${p.tech.map(t => `<span class="pf-proj-tag">${esc(t)}</span>`).join('')}</div>
                  <h3 class="pf-proj-name">${esc(p.name)}</h3>
                  <p class="pf-proj-desc">${esc(p.description)}</p>
                </article>
              `).join('')}
            </div>
          </div>
        </section>
      ` : ''}

      <section class="pf-section" id="education">
        <div class="pf-section-container">
          <div class="pf-col-header">
            <span class="pf-col-num">${data.projects.length > 0 ? 'IV' : 'III'}</span>
            <div class="pf-col-line"></div>
            <h2 class="pf-col-title">Education</h2>
          </div>
          ${data.education.map(edu => `
            <div class="pf-edu-row">
              <div>
                <h3 class="pf-edu-degree">${esc(edu.degree)}</h3>
                <p class="pf-edu-inst">${esc(edu.institution)}</p>
              </div>
              <span class="pf-edu-year">${esc(edu.year)}</span>
            </div>
          `).join('')}
        </div>
      </section>

      <footer class="pf-footer" id="contact">
        <div class="pf-footer-container">
          <div class="pf-footer-brand">${esc(data.candidateName)}</div>
          <div class="pf-footer-links">
            ${[
              data.contact.email && `<a href="mailto:${esc(data.contact.email)}">${esc(data.contact.email)}</a>`,
              data.contact.linkedin && `<a href="${esc(data.contact.linkedin)}" target="_blank">LinkedIn</a>`,
              data.contact.github && `<a href="${esc(data.contact.github)}" target="_blank">GitHub</a>`,
              data.contact.website && `<a href="${esc(data.contact.website)}" target="_blank">Website</a>`,
            ].filter(Boolean).join('<span class="pf-dot">&middot;</span>')}
          </div>
          ${data.contact.location ? `<p class="pf-footer-loc">${esc(data.contact.location)}</p>` : ''}
        </div>
      </footer>
    </div>
  `;
}

function getEditorialCSS(accent) {
  return `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
    .pf-page { font-family: 'Inter', system-ui, sans-serif; color: #171717; background: #faf9f7; line-height: 1.6; }

    /* Masthead */
    .pf-masthead { padding: 16px 40px; border-bottom: 1px solid #e8e5df; }
    .pf-masthead-inner { display: flex; align-items: center; gap: 10px; }
    .pf-masthead-issue { font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #999; font-family: 'JetBrains Mono', monospace; }
    .pf-masthead-divider { color: #ccc; }
    .pf-masthead-date { font-size: 11px; color: #999; font-family: 'JetBrains Mono', monospace; }

    /* Hero */
    .pf-hero { padding: 64px 40px 48px; border-bottom: 1px solid #e8e5df; }
    .pf-hero-container { max-width: 700px; }
    .pf-hero-name { font-size: 56px; font-weight: 700; letter-spacing: -3px; line-height: 1; margin-bottom: 8px; }
    .pf-hero-role { font-size: 16px; color: #666; font-weight: 400; }

    /* Lead / Pullquote */
    .pf-lead { padding: 40px; background: #f5f3ef; border-bottom: 1px solid #e8e5df; }
    .pf-lead-container { max-width: 700px; }
    .pf-pullquote { position: relative; padding-left: 32px; }
    .pf-pq-mark { position: absolute; left: 0; top: -16px; font-size: 64px; color: ${accent}; opacity: 0.12; line-height: 1; font-family: Georgia, serif; }
    .pf-pq-text { font-size: 17px; font-style: italic; line-height: 1.8; color: #4d4d4d; }

    /* Sections */
    .pf-section { padding: 48px 0; border-bottom: 1px solid #e8e5df; }
    .pf-section-container { max-width: 700px; margin: 0 auto; padding: 0 40px; }
    .pf-col-header { display: flex; align-items: center; gap: 16px; margin-bottom: 32px; }
    .pf-col-num { font-size: 28px; font-weight: 300; color: ${accent}; opacity: 0.2; font-family: Georgia, serif; }
    .pf-col-line { flex: 1; height: 1px; background: #e8e5df; }
    .pf-col-title { font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: #999; font-family: 'JetBrains Mono', monospace; font-weight: 500; }

    /* Skills */
    .pf-skills-columns { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
    .pf-skill-heading { font-size: 13px; font-weight: 600; margin-bottom: 12px; color: #171717; }
    .pf-skill-list { display: flex; flex-wrap: wrap; gap: 6px; }
    .pf-skill-pill { padding: 5px 14px; font-size: 12px; background: ${accent}; color: #fff; border-radius: 100px; font-weight: 500; }
    .pf-skill-pill-light { background: transparent; border: 1px solid #d4cfc8; color: #4d4d4d; }

    /* Experience */
    .pf-exp-block { display: flex; gap: 24px; padding: 28px 0; border-bottom: 1px solid #f0ece6; }
    .pf-exp-block:last-child { border-bottom: none; }
    .pf-exp-meta { display: flex; flex-direction: column; align-items: center; gap: 4px; min-width: 60px; }
    .pf-exp-idx { font-size: 24px; font-weight: 300; color: ${accent}; opacity: 0.15; font-family: Georgia, serif; }
    .pf-exp-dur { font-size: 11px; color: #999; font-family: 'JetBrains Mono', monospace; writing-mode: vertical-lr; text-orientation: mixed; }
    .pf-exp-body { flex: 1; }
    .pf-exp-role { font-size: 17px; font-weight: 600; letter-spacing: -0.3px; margin-bottom: 2px; }
    .pf-exp-company { font-size: 14px; color: #666; margin-bottom: 12px; }
    .pf-exp-list { list-style: none; padding: 0; }
    .pf-exp-list li { position: relative; padding-left: 16px; font-size: 14px; color: #4d4d4d; line-height: 1.7; margin-bottom: 6px; }
    .pf-exp-list li::before { content: ''; position: absolute; left: 0; top: 9px; width: 8px; height: 1px; background: #ccc; }

    /* Projects */
    .pf-projects-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .pf-proj-block { padding: 24px; border: 1px solid #e8e5df; border-radius: 8px; background: #fff; }
    .pf-proj-tags { display: flex; flex-wrap: wrap; gap: 4px; margin-bottom: 10px; }
    .pf-proj-tag { font-size: 10px; font-family: 'JetBrains Mono', monospace; color: #999; background: #f5f3ef; padding: 2px 8px; border-radius: 4px; }
    .pf-proj-name { font-size: 15px; font-weight: 600; letter-spacing: -0.2px; margin-bottom: 6px; }
    .pf-proj-desc { font-size: 13px; color: #666; line-height: 1.6; }

    /* Education */
    .pf-edu-row { display: flex; justify-content: space-between; align-items: center; padding: 16px 0; border-bottom: 1px solid #f0ece6; }
    .pf-edu-degree { font-size: 15px; font-weight: 600; letter-spacing: -0.2px; }
    .pf-edu-inst { font-size: 13px; color: #666; }
    .pf-edu-year { font-size: 12px; color: #999; font-family: 'JetBrains Mono', monospace; }

    /* Footer */
    .pf-footer { padding: 64px 40px; text-align: center; background: #f5f3ef; }
    .pf-footer-container { }
    .pf-footer-brand { font-size: 32px; font-weight: 700; letter-spacing: -1.5px; margin-bottom: 16px; }
    .pf-footer-links { display: flex; justify-content: center; align-items: center; gap: 8px; flex-wrap: wrap; }
    .pf-footer-links a { font-size: 13px; color: #666; text-decoration: none; transition: color 0.15s; }
    .pf-footer-links a:hover { color: ${accent}; }
    .pf-dot { color: #ccc; }
    .pf-footer-loc { font-size: 12px; color: #999; margin-top: 12px; font-family: 'JetBrains Mono', monospace; }

    [contenteditable] { outline: none; border-radius: 4px; transition: background 0.15s; cursor: text; }
    [contenteditable]:hover { background: ${accent}04; }
    [contenteditable]:focus { background: ${accent}08; }
  `;
}

function esc(str) { return str ? String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;') : ''; }
