export function renderBold(data) {
  return `
    <div class="pf-page">
      <style>${getBoldCSS()}</style>

      <nav class="pf-nav">
        <span class="pf-nav-brand">${esc(data.candidateName.split(' ')[0])}</span>
        <div class="pf-nav-right">
          <a href="#contact" class="pf-nav-cta">Let's talk</a>
        </div>
      </nav>

      <header class="pf-hero">
        <div class="pf-hero-container">
          <div class="pf-hero-top">
            <div class="pf-hero-status">
              <span class="pf-status-dot"></span>
              Available for hire
            </div>
          </div>
          <h1 class="pf-hero-name">
            <span class="pf-hero-line-1">${esc(data.candidateName.split(' ')[0])}</span>
            <span class="pf-hero-line-2">${esc(data.candidateName.split(' ').slice(1).join(' '))}</span>
          </h1>
          <p class="pf-hero-role">${esc(data.targetRole)}</p>
          <p class="pf-hero-summary">${esc(data.tailoredSummary)}</p>
          <div class="pf-hero-bottom">
            <div class="pf-hero-links">
              ${data.contact.email ? `<a href="mailto:${esc(data.contact.email)}" class="pf-link-item">Email</a>` : ''}
              ${data.contact.linkedin ? `<a href="${esc(data.contact.linkedin)}" target="_blank" class="pf-link-item">LinkedIn</a>` : ''}
              ${data.contact.github ? `<a href="${esc(data.contact.github)}" target="_blank" class="pf-link-item">GitHub</a>` : ''}
            </div>
          </div>
        </div>
      </header>

      <section class="pf-section" id="skills">
        <div class="pf-section-inner">
          <div class="pf-section-label">Expertise</div>
          <div class="pf-cloud">
            ${data.skills.technical.map((s, i) => {
              const sz = [28, 18, 32, 16, 24, 20, 26, 15, 22, 30][i % 10];
              return `<span class="pf-cloud-item" style="font-size:${sz}px;--op:${(0.4 + (i%5)*0.12).toFixed(2)}">${esc(s)}</span>`;
            }).join('')}
          </div>
          ${data.skills.soft.length > 0 ? `
            <div class="pf-soft-row">
              ${data.skills.soft.map(s => `<span class="pf-soft-chip">${esc(s)}</span>`).join('')}
            </div>
          ` : ''}
        </div>
      </section>

      <section class="pf-section pf-exp-section" id="experience">
        <div class="pf-section-inner">
          <div class="pf-section-label">Experience</div>
          <div class="pf-exp-grid">
            ${data.experience.map((exp, i) => `
              <article class="pf-exp-row">
                <div class="pf-exp-marker">
                  <span class="pf-exp-num">${String(i + 1).padStart(2, '0')}</span>
                </div>
                <div class="pf-exp-content">
                  <div class="pf-exp-head">
                    <div>
                      <h3 class="pf-exp-role">${esc(exp.role)}</h3>
                      <p class="pf-exp-company">${esc(exp.company)}</p>
                    </div>
                    <span class="pf-exp-time">${esc(exp.duration)}</span>
                  </div>
                  <ul class="pf-exp-bullets">
                    ${exp.bullets.map(b => `<li contenteditable="true" data-field="bullets">${esc(b)}</li>`).join('')}
                  </ul>
                </div>
              </article>
            `).join('')}
          </div>
        </div>
      </section>

      ${data.projects.length > 0 ? `
        <section class="pf-section" id="projects">
          <div class="pf-section-inner">
            <div class="pf-section-label">Projects</div>
            <div class="pf-proj-grid">
              ${data.projects.map(p => `
                <article class="pf-proj-card">
                  <div class="pf-proj-head">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                    <div class="pf-proj-tags">${p.tech.map(t => `<span class="pf-proj-tech">${esc(t)}</span>`).join('')}</div>
                  </div>
                  <h3 class="pf-proj-name">${esc(p.name)}</h3>
                  <p class="pf-proj-desc">${esc(p.description)}</p>
                </article>
              `).join('')}
            </div>
          </div>
        </section>
      ` : ''}

      <section class="pf-section" id="education">
        <div class="pf-section-inner">
          <div class="pf-section-label">Education</div>
          ${data.education.map(edu => `
            <div class="pf-edu-row">
              <div>
                <h3 class="pf-edu-degree">${esc(edu.degree)}</h3>
                <p class="pf-edu-school">${esc(edu.institution)}</p>
              </div>
              <span class="pf-edu-year">${esc(edu.year)}</span>
            </div>
          `).join('')}
        </div>
      </section>

      <footer class="pf-footer" id="contact">
        <div class="pf-footer-inner">
          <p class="pf-footer-label">GET IN TOUCH</p>
          <h2 class="pf-footer-name">${esc(data.candidateName)}</h2>
          <div class="pf-footer-links">
            ${[
              data.contact.email && `<a href="mailto:${esc(data.contact.email)}">Email</a>`,
              data.contact.linkedin && `<a href="${esc(data.contact.linkedin)}" target="_blank">LinkedIn</a>`,
              data.contact.github && `<a href="${esc(data.contact.github)}" target="_blank">GitHub</a>`,
              data.contact.website && `<a href="${esc(data.contact.website)}" target="_blank">Website</a>`,
            ].filter(Boolean).join('<span class="pf-footer-sep">/</span>')}
          </div>
          ${data.contact.location ? `<p class="pf-footer-loc">${esc(data.contact.location)}</p>` : ''}
        </div>
      </footer>
    </div>
  `;
}

function getBoldCSS() {
  return `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

    .pf-page, .pf-page *, .pf-page *::before, .pf-page *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      border: 0;
      font: inherit;
      color: inherit;
      background: none;
      text-decoration: none;
      list-style: none;
    }

    .pf-page {
      --pf-text: #eaeaea;
      --pf-text-2: #999999;
      --pf-text-3: #666666;
      --pf-text-4: #555555;
      --pf-text-5: #444444;
      --pf-surface: #0a0a0a;
      --pf-surface-2: #111111;
      --pf-surface-3: #1a1a1a;
      --pf-border: #1a1a1a;
      --pf-border-2: #222222;
      --pf-accent: var(--accent-color, #50e3c2);
      --pf-accent-hover: color-mix(in srgb, var(--pf-accent) 85%, white);
      --pf-accent-bg: color-mix(in srgb, var(--pf-accent) 12%, transparent);
      --pf-accent-bg-subtle: color-mix(in srgb, var(--pf-accent) 6%, transparent);
      --pf-accent-border: color-mix(in srgb, var(--pf-accent) 25%, transparent);
      --pf-white: #ffffff;
      font-family: 'Inter', system-ui, sans-serif;
      color: var(--pf-text);
      background: var(--pf-surface);
      line-height: 1.6;
    }

    /* Nav */
    .pf-nav { display: flex; justify-content: space-between; align-items: center; padding: 20px 40px; position: sticky; top: 0; background: color-mix(in srgb, var(--pf-surface) 90%, transparent); backdrop-filter: blur(12px); z-index: 100; border-bottom: 1px solid var(--pf-border); }
    .pf-nav-brand { font-size: 16px; font-weight: 700; letter-spacing: -0.5px; color: var(--pf-white); }
    .pf-nav-cta { font-size: 13px; color: var(--pf-accent); text-decoration: none; font-weight: 500; padding: 6px 16px; border: 1px solid var(--pf-accent-border); border-radius: 100px; transition: all 0.15s; }
    .pf-nav-cta:hover { background: var(--pf-accent); color: var(--pf-surface); }

    /* Hero */
    .pf-hero { padding: 80px 40px 60px; }
    .pf-hero-container { max-width: 800px; }
    .pf-hero-top { margin-bottom: 24px; }
    .pf-hero-status { display: inline-flex; align-items: center; gap: 8px; font-size: 12px; color: var(--pf-accent); font-family: 'JetBrains Mono', monospace; }
    .pf-status-dot { width: 6px; height: 6px; background: var(--pf-accent); border-radius: 50%; animation: pulse 2s infinite; }
    @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
    .pf-hero-name { margin-bottom: 12px; line-height: 0.95; }
    .pf-hero-line-1 { display: block; font-size: 72px; font-weight: 800; letter-spacing: -4px; color: var(--pf-white); text-transform: uppercase; }
    .pf-hero-line-2 { display: block; font-size: 72px; font-weight: 800; letter-spacing: -4px; color: var(--pf-accent); text-transform: uppercase; }
    .pf-hero-role { font-size: 18px; color: var(--pf-text-3); font-weight: 400; margin-bottom: 16px; }
    .pf-hero-summary { font-size: 15px; color: var(--pf-text-2); line-height: 1.7; max-width: 550px; margin-bottom: 32px; }
    .pf-hero-bottom { display: flex; align-items: center; gap: 32px; }
    .pf-hero-links { display: flex; gap: 16px; }
    .pf-link-item { font-size: 13px; color: var(--pf-text-3); text-decoration: none; transition: color 0.15s; }
    .pf-link-item:hover { color: var(--pf-accent); }

    /* Sections */
    .pf-section { padding: 48px 0; border-top: 1px solid var(--pf-border); }
    .pf-section-inner { max-width: 800px; margin: 0 auto; padding: 0 40px; }
    .pf-section-label { font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: var(--pf-text-4); font-family: 'JetBrains Mono', monospace; margin-bottom: 28px; }

    /* Skills Cloud — Bold: tag-cloud with scaled font-size, colored text only */
    .pf-cloud { display: flex; flex-wrap: wrap; gap: 14px 20px; align-items: baseline; margin-bottom: 20px; }
    .pf-cloud-item { font-weight: 700; color: var(--pf-accent); opacity: var(--op, 0.6); letter-spacing: -0.5px; }
    .pf-soft-row { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px; }
    .pf-soft-chip { padding: 5px 14px; font-size: 11px; border: 1px solid var(--pf-border-2); border-radius: 100px; color: var(--pf-text-3); font-family: 'JetBrains Mono', monospace; }

    /* Experience */
    .pf-exp-grid { display: flex; flex-direction: column; }
    .pf-exp-row { display: flex; gap: 20px; padding: 28px 0; border-bottom: 1px solid var(--pf-border); }
    .pf-exp-row:last-child { border-bottom: none; }
    .pf-exp-marker { display: flex; flex-direction: column; align-items: center; min-width: 40px; }
    .pf-exp-num { font-size: 28px; font-weight: 300; color: var(--pf-accent); opacity: 0.15; font-family: 'JetBrains Mono', monospace; }
    .pf-exp-content { flex: 1; }
    .pf-exp-head { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px; }
    .pf-exp-role { font-size: 16px; font-weight: 600; color: var(--pf-white); letter-spacing: -0.2px; }
    .pf-exp-company { font-size: 13px; color: var(--pf-text-3); }
    .pf-exp-time { font-size: 11px; color: var(--pf-text-4); font-family: 'JetBrains Mono', monospace; white-space: nowrap; }
    .pf-exp-bullets { list-style: none; padding: 0; }
    .pf-exp-bullets li { position: relative; padding-left: 14px; font-size: 13px; color: var(--pf-text-2); line-height: 1.7; margin-bottom: 5px; }
    .pf-exp-bullets li::before { content: ''; position: absolute; left: 0; top: 9px; width: 5px; height: 2px; background: var(--pf-accent); }

    /* Projects */
    .pf-proj-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .pf-proj-card { padding: 24px; border: 1px solid var(--pf-border); border-radius: 8px; background: var(--pf-surface-2); transition: border-color 0.15s; }
    .pf-proj-card:hover { border-color: color-mix(in srgb, var(--pf-border) 60%, var(--pf-text-4)); }
    .pf-proj-head { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; }
    .pf-proj-head svg { color: var(--pf-text-5); }
    .pf-proj-tags { display: flex; flex-wrap: wrap; gap: 4px; }
    .pf-proj-tech { font-size: 10px; font-family: 'JetBrains Mono', monospace; color: var(--pf-text-3); background: var(--pf-surface-3); padding: 2px 8px; border-radius: 4px; }
    .pf-proj-name { font-size: 15px; font-weight: 600; color: var(--pf-white); letter-spacing: -0.2px; margin-bottom: 6px; }
    .pf-proj-desc { font-size: 13px; color: var(--pf-text-2); line-height: 1.6; }

    /* Education */
    .pf-edu-row { display: flex; justify-content: space-between; align-items: center; padding: 16px 0; border-bottom: 1px solid var(--pf-border); }
    .pf-edu-degree { font-size: 15px; font-weight: 600; color: var(--pf-white); letter-spacing: -0.2px; }
    .pf-edu-school { font-size: 13px; color: var(--pf-text-3); }
    .pf-edu-year { font-size: 12px; color: var(--pf-text-4); font-family: 'JetBrains Mono', monospace; }

    /* Footer */
    .pf-footer { padding: 80px 40px; text-align: center; border-top: 1px solid var(--pf-border); background: color-mix(in srgb, var(--pf-surface) 96%, black); }
    .pf-footer-label { font-size: 10px; text-transform: uppercase; letter-spacing: 3px; color: var(--pf-text-5); font-family: 'JetBrains Mono', monospace; margin-bottom: 12px; }
    .pf-footer-name { font-size: 40px; font-weight: 800; letter-spacing: -2px; color: var(--pf-white); margin-bottom: 20px; }
    .pf-footer-links { display: flex; justify-content: center; gap: 8px; align-items: center; flex-wrap: wrap; }
    .pf-footer-links a { font-size: 13px; color: var(--pf-text-3); text-decoration: none; transition: color 0.15s; }
    .pf-footer-links a:hover { color: var(--pf-accent); }
    .pf-footer-sep { color: var(--pf-text-5); }
    .pf-footer-loc { font-size: 12px; color: var(--pf-text-5); margin-top: 12px; font-family: 'JetBrains Mono', monospace; }

    [contenteditable] { outline: none; border-radius: 4px; transition: background 0.15s; cursor: text; }
    [contenteditable]:hover { background: var(--pf-accent-bg-subtle); }
    [contenteditable]:focus { background: var(--pf-accent-bg); }
  `;
}

function esc(str) { return str ? String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;') : ''; }
