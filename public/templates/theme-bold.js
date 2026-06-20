export function renderBold(data, accentColor) {
  const accent = accentColor || '#171717';
  return `
    <div class="pf-page" style="--accent: ${accent};">
      <style>${getBoldCSS(accent)}</style>

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
            <div class="pf-score-badge">
              <span class="pf-score-num">${data.atsMatchScore}</span>
              <span class="pf-score-divider">/</span>
              <span class="pf-score-total">100</span>
              <span class="pf-score-tag">ATS</span>
            </div>
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
              const sz = [22, 17, 26, 15, 20, 18, 24, 14, 19, 21][i % 10];
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

function getBoldCSS(accent) {
  return `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
    .pf-page { font-family: 'Inter', system-ui, sans-serif; color: #eaeaea; background: #0a0a0a; line-height: 1.6; }

    /* Nav */
    .pf-nav { display: flex; justify-content: space-between; align-items: center; padding: 20px 40px; position: sticky; top: 0; background: rgba(10,10,10,0.9); backdrop-filter: blur(12px); z-index: 100; border-bottom: 1px solid #1a1a1a; }
    .pf-nav-brand { font-size: 16px; font-weight: 700; letter-spacing: -0.5px; color: #fff; }
    .pf-nav-cta { font-size: 13px; color: ${accent}; text-decoration: none; font-weight: 500; padding: 6px 16px; border: 1px solid ${accent}40; border-radius: 100px; transition: all 0.15s; }
    .pf-nav-cta:hover { background: ${accent}; color: #fff; }

    /* Hero */
    .pf-hero { padding: 80px 40px 60px; }
    .pf-hero-container { max-width: 800px; }
    .pf-hero-top { margin-bottom: 24px; }
    .pf-hero-status { display: inline-flex; align-items: center; gap: 8px; font-size: 12px; color: #50e3c2; font-family: 'JetBrains Mono', monospace; }
    .pf-status-dot { width: 6px; height: 6px; background: #50e3c2; border-radius: 50%; animation: pulse 2s infinite; }
    @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
    .pf-hero-name { margin-bottom: 12px; line-height: 0.95; }
    .pf-hero-line-1 { display: block; font-size: 72px; font-weight: 800; letter-spacing: -4px; color: #fff; text-transform: uppercase; }
    .pf-hero-line-2 { display: block; font-size: 72px; font-weight: 800; letter-spacing: -4px; color: ${accent}; text-transform: uppercase; }
    .pf-hero-role { font-size: 18px; color: #888; font-weight: 400; margin-bottom: 16px; }
    .pf-hero-summary { font-size: 15px; color: #999; line-height: 1.7; max-width: 550px; margin-bottom: 32px; }
    .pf-hero-bottom { display: flex; align-items: center; gap: 32px; }
    .pf-score-badge { display: flex; align-items: baseline; gap: 2px; background: ${accent}; padding: 10px 20px; border-radius: 100px; }
    .pf-score-num { font-size: 28px; font-weight: 700; color: #fff; }
    .pf-score-divider { font-size: 18px; color: rgba(255,255,255,0.3); }
    .pf-score-total { font-size: 16px; color: rgba(255,255,255,0.3); }
    .pf-score-tag { font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: rgba(255,255,255,0.4); margin-left: 6px; font-family: 'JetBrains Mono', monospace; }
    .pf-hero-links { display: flex; gap: 16px; }
    .pf-link-item { font-size: 13px; color: #666; text-decoration: none; transition: color 0.15s; }
    .pf-link-item:hover { color: ${accent}; }

    /* Sections */
    .pf-section { padding: 48px 0; border-top: 1px solid #1a1a1a; }
    .pf-section-inner { max-width: 800px; margin: 0 auto; padding: 0 40px; }
    .pf-section-label { font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #555; font-family: 'JetBrains Mono', monospace; margin-bottom: 28px; }

    /* Skills Cloud */
    .pf-cloud { display: flex; flex-wrap: wrap; gap: 12px; align-items: baseline; margin-bottom: 16px; }
    .pf-cloud-item { font-weight: 700; color: ${accent}; opacity: var(--op, 0.6); letter-spacing: -0.5px; }
    .pf-soft-row { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px; }
    .pf-soft-chip { padding: 4px 12px; font-size: 11px; border: 1px solid #2a2a2a; border-radius: 100px; color: #666; font-family: 'JetBrains Mono', monospace; }

    /* Experience */
    .pf-exp-grid { display: flex; flex-direction: column; }
    .pf-exp-row { display: flex; gap: 20px; padding: 28px 0; border-bottom: 1px solid #1a1a1a; }
    .pf-exp-row:last-child { border-bottom: none; }
    .pf-exp-marker { display: flex; flex-direction: column; align-items: center; min-width: 40px; }
    .pf-exp-num { font-size: 28px; font-weight: 300; color: ${accent}; opacity: 0.15; font-family: 'JetBrains Mono', monospace; }
    .pf-exp-content { flex: 1; }
    .pf-exp-head { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px; }
    .pf-exp-role { font-size: 16px; font-weight: 600; color: #fff; letter-spacing: -0.2px; }
    .pf-exp-company { font-size: 13px; color: #666; }
    .pf-exp-time { font-size: 11px; color: #555; font-family: 'JetBrains Mono', monospace; white-space: nowrap; }
    .pf-exp-bullets { list-style: none; padding: 0; }
    .pf-exp-bullets li { position: relative; padding-left: 14px; font-size: 13px; color: #999; line-height: 1.7; margin-bottom: 5px; }
    .pf-exp-bullets li::before { content: ''; position: absolute; left: 0; top: 9px; width: 5px; height: 2px; background: ${accent}; }

    /* Projects */
    .pf-proj-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .pf-proj-card { padding: 24px; border: 1px solid #1a1a1a; border-radius: 8px; background: #111; transition: border-color 0.15s; }
    .pf-proj-card:hover { border-color: #333; }
    .pf-proj-head { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; }
    .pf-proj-head svg { color: #444; }
    .pf-proj-tags { display: flex; flex-wrap: wrap; gap: 4px; }
    .pf-proj-tech { font-size: 10px; font-family: 'JetBrains Mono', monospace; color: #666; background: #1a1a1a; padding: 2px 8px; border-radius: 4px; }
    .pf-proj-name { font-size: 15px; font-weight: 600; color: #fff; letter-spacing: -0.2px; margin-bottom: 6px; }
    .pf-proj-desc { font-size: 13px; color: #777; line-height: 1.6; }

    /* Education */
    .pf-edu-row { display: flex; justify-content: space-between; align-items: center; padding: 16px 0; border-bottom: 1px solid #1a1a1a; }
    .pf-edu-degree { font-size: 15px; font-weight: 600; color: #fff; letter-spacing: -0.2px; }
    .pf-edu-school { font-size: 13px; color: #666; }
    .pf-edu-year { font-size: 12px; color: #555; font-family: 'JetBrains Mono', monospace; }

    /* Footer */
    .pf-footer { padding: 80px 40px; text-align: center; border-top: 1px solid #1a1a1a; background: #050505; }
    .pf-footer-label { font-size: 10px; text-transform: uppercase; letter-spacing: 3px; color: #444; font-family: 'JetBrains Mono', monospace; margin-bottom: 12px; }
    .pf-footer-name { font-size: 40px; font-weight: 800; letter-spacing: -2px; color: #fff; margin-bottom: 20px; }
    .pf-footer-links { display: flex; justify-content: center; gap: 8px; align-items: center; flex-wrap: wrap; }
    .pf-footer-links a { font-size: 13px; color: #666; text-decoration: none; transition: color 0.15s; }
    .pf-footer-links a:hover { color: ${accent}; }
    .pf-footer-sep { color: #333; }
    .pf-footer-loc { font-size: 12px; color: #444; margin-top: 12px; font-family: 'JetBrains Mono', monospace; }

    [contenteditable] { outline: none; border-radius: 4px; transition: background 0.15s; cursor: text; }
    [contenteditable]:hover { background: rgba(255,255,255,0.03); }
    [contenteditable]:focus { background: rgba(255,255,255,0.06); }
  `;
}

function esc(str) { return str ? String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;') : ''; }
