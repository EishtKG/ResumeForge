export function renderEditorial(data) {
  return `
    <div class="pf-page">
      <style>${getEditorialCSS()}</style>

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
            <span class="pf-pq-mark">&ldquo;</span>
            <p class="pf-pq-text">${esc(data.tailoredSummary)}</p>
          </div>
        </div>
      </section>

      <section class="pf-section" id="skills">
        <div class="pf-section-container">
          <div class="pf-col-header">
            <span class="pf-col-num">I</span>
            <div class="pf-col-line"></div>
            <h2 class="pf-col-title">Skills</h2>
          </div>
          <div class="pf-skill-chips">
            ${[...data.skills.technical, ...data.skills.soft].map(s => `<span class="pf-skill-chip">${esc(s)}</span>`).join('')}
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

function getEditorialCSS() {
  return `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

    .pf-page, .pf-page * { box-sizing: border-box; margin: 0; padding: 0; }

    .pf-page {
      --pf-text: #171717;
      --pf-text-2: #4d4d4d;
      --pf-text-3: #666666;
      --pf-text-4: #888888;
      --pf-text-5: #999999;
      --pf-surface: #ffffff;
      --pf-surface-2: #faf9f7;
      --pf-surface-3: #f5f3ef;
      --pf-border: #e8e5df;
      --pf-border-2: #f0ece6;
      --pf-accent: var(--accent-color, #171717);
      --pf-accent-hover: color-mix(in srgb, var(--pf-accent) 85%, black);
      --pf-accent-bg: color-mix(in srgb, var(--pf-accent) 8%, transparent);
      --pf-accent-bg-subtle: color-mix(in srgb, var(--pf-accent) 4%, transparent);
      --pf-accent-muted: color-mix(in srgb, var(--pf-accent) 15%, transparent);
      --pf-accent-ghost: color-mix(in srgb, var(--pf-accent) 8%, transparent);
      font-family: 'Inter', system-ui, sans-serif;
      color: var(--pf-text);
      background: var(--pf-surface-2);
      line-height: 1.6;
    }

    /* Masthead */
    .pf-masthead { padding: 16px 40px; border-bottom: 1px solid var(--pf-border); }
    .pf-masthead-inner { display: flex; align-items: center; gap: 10px; }
    .pf-masthead-issue { font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: var(--pf-text-5); font-family: 'JetBrains Mono', monospace; }
    .pf-masthead-divider { color: var(--pf-text-4); }
    .pf-masthead-date { font-size: 11px; color: var(--pf-text-5); font-family: 'JetBrains Mono', monospace; }

    /* Hero */
    .pf-hero { padding: 64px 40px 48px; border-bottom: 1px solid var(--pf-border); }
    .pf-hero-container { max-width: min(900px, 85vw); }
    .pf-hero-name { font-size: 56px; font-weight: 700; letter-spacing: -3px; line-height: 1; margin-bottom: 8px; }
    .pf-hero-role { font-size: 16px; color: var(--pf-text-3); font-weight: 400; }

    /* Lead / Pullquote */
    .pf-lead { padding: 40px; background: var(--pf-surface-3); border-bottom: 1px solid var(--pf-border); }
    .pf-lead-container { max-width: min(900px, 85vw); }
    .pf-pullquote { position: relative; padding-left: 32px; }
    .pf-pq-mark { position: absolute; left: 0; top: -16px; font-size: 64px; color: var(--pf-accent); opacity: 0.12; line-height: 1; font-family: Georgia, serif; }
    .pf-pq-text { font-size: 17px; font-style: italic; line-height: 1.8; color: var(--pf-text-2); }

    /* Sections */
    .pf-section { padding: 48px 0; border-bottom: 1px solid var(--pf-border); }
    .pf-section-container { max-width: min(900px, 85vw); margin: 0 auto; padding: 0 40px; }
    .pf-col-header { display: flex; align-items: center; gap: 16px; margin-bottom: 32px; }
    .pf-col-num { font-size: 28px; font-weight: 300; color: var(--pf-accent); opacity: 0.2; font-family: Georgia, serif; }
    .pf-col-line { flex: 1; height: 1px; background: linear-gradient(90deg, var(--pf-border), color-mix(in srgb, var(--pf-accent) 15%, var(--pf-border)), var(--pf-border)); }
    .pf-col-title { font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: var(--pf-accent); font-family: 'JetBrains Mono', monospace; font-weight: 500; }

    /* Skills — Editorial: glass chip boxes */
    .pf-skill-chips { display: flex; flex-wrap: wrap; gap: 10px; }
    .pf-skill-chip {
      display: inline-block;
      padding: 8px 18px;
      font-size: 13px;
      font-weight: 500;
      color: var(--pf-text);
      background: color-mix(in srgb, var(--pf-surface) 60%, transparent);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      border: 1px solid color-mix(in srgb, var(--pf-border) 60%, transparent);
      border-radius: 8px;
      transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
      cursor: default;
      letter-spacing: -0.1px;
    }
    .pf-skill-chip:hover {
      transform: translateY(-3px) scale(1.05);
      background: color-mix(in srgb, var(--pf-surface) 80%, transparent);
      border-color: var(--pf-accent);
      color: var(--pf-accent);
      box-shadow: 0 8px 24px -4px color-mix(in srgb, var(--pf-accent) 15%, transparent),
                  0 2px 8px -2px color-mix(in srgb, var(--pf-accent) 8%, transparent);
    }

    /* Experience */
    .pf-exp-block { display: flex; gap: 24px; padding: 28px 0; border-bottom: 1px solid var(--pf-border-2); }
    .pf-exp-block:last-child { border-bottom: none; }
    .pf-exp-meta { display: flex; flex-direction: column; align-items: center; gap: 4px; min-width: 60px; }
    .pf-exp-idx { font-size: 24px; font-weight: 300; color: var(--pf-accent); opacity: 0.15; font-family: Georgia, serif; }
    .pf-exp-dur { font-size: 11px; color: var(--pf-text-5); font-family: 'JetBrains Mono', monospace; writing-mode: vertical-lr; text-orientation: mixed; }
    .pf-exp-body { flex: 1; }
    .pf-exp-role { font-size: 17px; font-weight: 600; letter-spacing: -0.3px; margin-bottom: 2px; }
    .pf-exp-company { font-size: 14px; color: var(--pf-text-3); margin-bottom: 12px; }
    .pf-exp-list { list-style: none; padding: 0; }
    .pf-exp-list li { position: relative; padding-left: 16px; font-size: 14px; color: var(--pf-text-2); line-height: 1.7; margin-bottom: 6px; }
    .pf-exp-list li::before { content: ''; position: absolute; left: 0; top: 9px; width: 8px; height: 1px; background: var(--pf-text-4); }

    /* Projects */
    .pf-projects-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .pf-proj-block {
      padding: 24px;
      border: 1px solid var(--pf-border);
      border-radius: 8px;
      background: var(--pf-surface);
      position: relative;
      transition: all 0.3s ease;
    }
    .pf-proj-block::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(90deg, var(--pf-accent), transparent);
      border-radius: 8px 8px 0 0;
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    .pf-proj-block:hover {
      border-color: color-mix(in srgb, var(--pf-accent) 20%, var(--pf-border));
      box-shadow: 0 4px 16px -4px color-mix(in srgb, var(--pf-accent) 10%, transparent);
    }
    .pf-proj-block:hover::before { opacity: 1; }
    .pf-proj-tags { display: flex; flex-wrap: wrap; gap: 4px; margin-bottom: 10px; }
    .pf-proj-tag { font-size: 10px; font-family: 'JetBrains Mono', monospace; color: var(--pf-text-5); background: var(--pf-surface-3); padding: 2px 8px; border-radius: 4px; }
    .pf-proj-block:hover .pf-proj-tag { color: var(--pf-accent); background: var(--pf-accent-bg-subtle); }
    .pf-proj-name { font-size: 15px; font-weight: 600; letter-spacing: -0.2px; margin-bottom: 6px; }
    .pf-proj-desc { font-size: 13px; color: var(--pf-text-3); line-height: 1.6; }

    /* Education */
    .pf-edu-row { display: flex; justify-content: space-between; align-items: center; padding: 16px 0; border-bottom: 1px solid var(--pf-border-2); }
    .pf-edu-degree { font-size: 15px; font-weight: 600; letter-spacing: -0.2px; }
    .pf-edu-inst { font-size: 13px; color: var(--pf-text-3); }
    .pf-edu-year { font-size: 12px; color: var(--pf-text-5); font-family: 'JetBrains Mono', monospace; }

    /* Footer */
    .pf-footer { padding: 64px 40px; text-align: center; background: var(--pf-surface-3); border-top: 1px solid var(--pf-border); position: relative; }
    .pf-footer::before { content: ''; position: absolute; top: -1px; left: 50%; transform: translateX(-50%); width: 40px; height: 2px; background: var(--pf-accent); border-radius: 1px; }
    .pf-footer-brand { font-size: 32px; font-weight: 700; letter-spacing: -1.5px; margin-bottom: 16px; }
    .pf-footer-links { display: flex; justify-content: center; align-items: center; gap: 8px; flex-wrap: wrap; }
    .pf-footer-links a { font-size: 13px; color: var(--pf-text-3); text-decoration: none; transition: color 0.15s; }
    .pf-footer-links a:hover { color: var(--pf-accent); }
    .pf-dot { color: var(--pf-text-4); }
    .pf-footer-loc { font-size: 12px; color: var(--pf-text-5); margin-top: 12px; font-family: 'JetBrains Mono', monospace; }

    [contenteditable] { outline: none; border-radius: 4px; transition: background 0.15s; cursor: text; }
    [contenteditable]:hover { background: var(--pf-accent-bg-subtle); }
    [contenteditable]:focus { background: var(--pf-accent-bg); }
  `;
}

function esc(str) { return str ? String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;') : ''; }
