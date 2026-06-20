export function renderMinimal(data) {
  return `
    <div class="pf-page">
      <style>${getMinimalCSS()}</style>

      <nav class="pf-nav">
        <div class="pf-nav-name">${esc(data.candidateName)}</div>
        <div class="pf-nav-links">
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#contact" class="pf-nav-cta">Contact</a>
        </div>
      </nav>

      <header class="pf-hero" id="about">
        <div class="pf-hero-container">
          <div class="pf-hero-badge">Open to work</div>
          <h1 class="pf-hero-title">
            <span class="pf-hero-line">Hi, I'm</span>
            <span class="pf-hero-name">${esc(data.candidateName)}</span>
          </h1>
          <p class="pf-hero-role">${esc(data.targetRole)}</p>
          <p class="pf-hero-summary">${esc(data.tailoredSummary)}</p>
          <div class="pf-hero-actions">
            <a href="#contact" class="pf-btn pf-btn-primary">Get in touch</a>
            <a href="#experience" class="pf-btn pf-btn-ghost">View work</a>
          </div>
        </div>
      </header>

      <section class="pf-section pf-skills-section" id="skills">
        <div class="pf-container">
          <div class="pf-section-header">
            <span class="pf-section-tag">01</span>
            <h2 class="pf-section-title">Skills & Expertise</h2>
          </div>
          <div class="pf-skills-grid">
            <div class="pf-skill-col">
              <h3 class="pf-skill-heading">Technical Skills</h3>
              <div class="pf-skill-chips">
                ${data.skills.technical.map(s => `<span class="pf-skill-chip">${esc(s)}</span>`).join('')}
              </div>
            </div>
            <div class="pf-skill-col">
              <h3 class="pf-skill-heading">Professional Skills</h3>
              <div class="pf-skill-chips">
                ${data.skills.soft.map(s => `<span class="pf-skill-chip">${esc(s)}</span>`).join('')}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="pf-section pf-exp-section" id="experience">
        <div class="pf-container">
          <div class="pf-section-header">
            <span class="pf-section-tag">02</span>
            <h2 class="pf-section-title">Experience</h2>
          </div>
          <div class="pf-exp-list">
            ${data.experience.map((exp, i) => `
              <article class="pf-exp-card">
                <div class="pf-exp-content">
                  <h3 class="pf-exp-role">${esc(exp.role)}</h3>
                  <div class="pf-exp-meta">
                    <span class="pf-exp-company">${esc(exp.company)}</span>
                    <span class="pf-exp-dot">&middot;</span>
                    <span class="pf-exp-duration">${esc(exp.duration)}</span>
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
        <section class="pf-section pf-projects-section" id="projects">
          <div class="pf-container">
            <div class="pf-section-header">
              <span class="pf-section-tag">03</span>
              <h2 class="pf-section-title">Projects</h2>
            </div>
            <div class="pf-projects-grid">
              ${data.projects.map(p => `
                <article class="pf-project-card">
                  <div class="pf-project-header">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
                    <div class="pf-project-tech">
                      ${p.tech.map(t => `<span class="pf-tech">${esc(t)}</span>`).join('')}
                    </div>
                  </div>
                  <h3 class="pf-project-name">${esc(p.name)}</h3>
                  <p class="pf-project-desc">${esc(p.description)}</p>
                </article>
              `).join('')}
            </div>
          </div>
        </section>
      ` : ''}

      <section class="pf-section pf-edu-section" id="education">
        <div class="pf-container">
          <div class="pf-section-header">
            <span class="pf-section-tag">${data.projects.length > 0 ? '04' : '03'}</span>
            <h2 class="pf-section-title">Education</h2>
          </div>
          <div class="pf-edu-list">
            ${data.education.map(edu => `
              <div class="pf-edu-card">
                <div class="pf-edu-main">
                  <h3 class="pf-edu-degree">${esc(edu.degree)}</h3>
                  <p class="pf-edu-inst">${esc(edu.institution)}</p>
                </div>
                <span class="pf-edu-year">${esc(edu.year)}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <footer class="pf-footer" id="contact">
        <div class="pf-container">
          <p class="pf-footer-cta">Let's work together</p>
          <h2 class="pf-footer-name">${esc(data.candidateName)}</h2>
          <div class="pf-footer-links">
            ${[
      data.contact.email && `<a href="mailto:${esc(data.contact.email)}" class="pf-footer-link">Email</a>`,
      data.contact.linkedin && `<a href="${esc(data.contact.linkedin)}" target="_blank" class="pf-footer-link">LinkedIn</a>`,
      data.contact.github && `<a href="${esc(data.contact.github)}" target="_blank" class="pf-footer-link">GitHub</a>`,
      data.contact.website && `<a href="${esc(data.contact.website)}" target="_blank" class="pf-footer-link">Website</a>`,
    ].filter(Boolean).join('')}
          </div>
          ${data.contact.location ? `<p class="pf-footer-location">${esc(data.contact.location)}</p>` : ''}
        </div>
      </footer>
    </div>
  `;
}

function getMinimalCSS() {
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
      --pf-surface-2: #fafafa;
      --pf-surface-3: #f5f5f5;
      --pf-border: #ebebeb;
      --pf-border-2: #f0f0f0;
      --pf-accent: var(--accent-color, #171717);
      --pf-accent-hover: color-mix(in srgb, var(--pf-accent) 85%, black);
      --pf-accent-bg: color-mix(in srgb, var(--pf-accent) 8%, transparent);
      --pf-accent-bg-subtle: color-mix(in srgb, var(--pf-accent) 4%, transparent);
      --pf-shadow-sm: 0 1px 2px rgba(0,0,0,0.04);
      font-family: 'Inter', system-ui, sans-serif;
      color: var(--pf-text);
      background: var(--pf-surface);
      line-height: 1.6;
    }
    .pf-container { max-width: min(1100px, 90vw); margin: 0 auto; padding: 0 32px; }

    /* Nav */
    .pf-nav { display: flex; justify-content: space-between; align-items: center; padding: 16px 32px; border-bottom: 1px solid var(--pf-border); position: sticky; top: 0; background: color-mix(in srgb, var(--pf-surface) 95%, transparent); backdrop-filter: blur(12px); z-index: 100; }
    .pf-nav-name { font-size: 14px; font-weight: 600; letter-spacing: -0.3px; }
    .pf-nav-links { display: flex; gap: 24px; align-items: center; }
    .pf-nav-links a { font-size: 13px; color: var(--pf-text-3); text-decoration: none; transition: color 0.15s; }
    .pf-nav-links a:hover { color: var(--pf-text); }
    .pf-nav-cta { background: var(--pf-accent); color: var(--pf-surface) !important; padding: 6px 16px; border-radius: 100px; font-weight: 500; }
    .pf-nav-cta:hover { background: var(--pf-accent-hover); }

    /* Hero */
    .pf-hero { padding: 80px 32px 60px; display: flex; justify-content: space-between; align-items: flex-start; gap: 48px; max-width: min(1100px, 90vw); margin: 0 auto; }
    .pf-hero-container { flex: 1; }
    .pf-hero-badge { display: inline-block; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1.5px; color: var(--pf-accent); background: var(--pf-accent-bg); padding: 6px 14px; border-radius: 100px; margin-bottom: 24px; font-family: 'JetBrains Mono', monospace; }
    .pf-hero-title { margin-bottom: 8px; }
    .pf-hero-line { display: block; font-size: 16px; font-weight: 400; color: var(--pf-text-3); }
    .pf-hero-name { display: block; font-size: 48px; font-weight: 700; letter-spacing: -2.5px; line-height: 1.05; }
    .pf-hero-role { font-size: 18px; color: var(--pf-text-2); margin-bottom: 16px; font-weight: 400; }
    .pf-hero-summary { font-size: 15px; color: var(--pf-text-3); line-height: 1.7; max-width: min(600px, 80vw); margin-bottom: 28px; }
    .pf-hero-actions { display: flex; gap: 12px; }
    .pf-btn { display: inline-flex; align-items: center; padding: 10px 24px; border-radius: 100px; font-size: 14px; font-weight: 500; text-decoration: none; transition: all 0.15s; }
    .pf-btn-primary { background: var(--pf-accent); color: var(--pf-surface); }
    .pf-btn-primary:hover { background: var(--pf-accent-hover); }
    .pf-btn-ghost { border: 1px solid var(--pf-border); color: var(--pf-text); background: transparent; }
    .pf-btn-ghost:hover { border-color: var(--pf-text); }

    /* Sections */
    .pf-section { padding: 60px 0; border-top: 1px solid var(--pf-border); }
    .pf-section-header { display: flex; align-items: center; gap: 12px; margin-bottom: 32px; }
    .pf-section-tag { font-family: 'JetBrains Mono', monospace; font-size: 12px; color: var(--pf-accent); background: var(--pf-accent-bg-subtle); padding: 2px 8px; border-radius: 4px; font-weight: 500; }
    .pf-section-title { font-size: 20px; font-weight: 600; letter-spacing: -0.5px; }

    /* Skills — Minimal: clean chip boxes */
    .pf-skills-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
    .pf-skill-heading { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: var(--pf-text-4); margin-bottom: 12px; font-family: 'JetBrains Mono', monospace; }
    .pf-skill-chips { display: flex; flex-wrap: wrap; gap: 8px; }
    .pf-skill-chip {
      display: inline-block;
      padding: 6px 14px;
      font-size: 13px;
      font-weight: 500;
      color: var(--pf-text-2);
      background: var(--pf-surface);
      border: 1px solid var(--pf-border);
      border-radius: 6px;
      transition: all 0.2s ease;
      cursor: default;
    }
    .pf-skill-chip:hover {
      transform: translateY(-2px);
      border-color: var(--pf-accent);
      color: var(--pf-accent);
      background: var(--pf-accent-bg-subtle);
      box-shadow: 0 4px 12px -2px color-mix(in srgb, var(--pf-accent) 10%, transparent);
    }

    /* Experience */
    .pf-exp-list { display: flex; flex-direction: column; gap: 0; }
    .pf-exp-card { padding: 24px 0; border-bottom: 1px solid var(--pf-border-2); }
    .pf-exp-card:last-child { border-bottom: none; }
    .pf-exp-content { }
    .pf-exp-role { font-size: 16px; font-weight: 600; letter-spacing: -0.3px; margin-bottom: 6px; }
    .pf-exp-meta { display: flex; align-items: center; gap: 8px; margin-bottom: 12px; }
    .pf-exp-company { font-size: 14px; color: var(--pf-text-3); }
    .pf-exp-dot { color: var(--pf-text-4); }
    .pf-exp-duration { font-size: 12px; color: var(--pf-text-5); font-family: 'JetBrains Mono', monospace; }
    .pf-exp-bullets { list-style: none; padding: 0; }
    .pf-exp-bullets li { position: relative; padding-left: 16px; font-size: 14px; color: var(--pf-text-2); line-height: 1.7; margin-bottom: 6px; }
    .pf-exp-bullets li::before { content: ''; position: absolute; left: 0; top: 9px; width: 6px; height: 1px; background: var(--pf-accent); }

    /* Projects */
    .pf-projects-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .pf-project-card {
      padding: 24px;
      border: 1px solid var(--pf-border);
      border-radius: 12px;
      transition: all 0.25s ease;
      position: relative;
    }
    .pf-project-card::after {
      content: '';
      position: absolute;
      top: 0;
      left: 24px;
      right: 24px;
      height: 1px;
      background: linear-gradient(90deg, transparent, var(--pf-accent), transparent);
      opacity: 0;
      transition: opacity 0.25s ease;
    }
    .pf-project-card:hover {
      border-color: color-mix(in srgb, var(--pf-accent) 25%, var(--pf-border));
      box-shadow: 0 4px 20px -4px color-mix(in srgb, var(--pf-accent) 8%, transparent);
    }
    .pf-project-card:hover::after { opacity: 0.6; }
    .pf-project-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; }
    .pf-project-header svg { color: var(--pf-accent); opacity: 0.4; flex-shrink: 0; }
    .pf-project-tech { display: flex; flex-wrap: wrap; gap: 4px; }
    .pf-tech { font-size: 10px; font-family: 'JetBrains Mono', monospace; color: var(--pf-text-4); background: var(--pf-surface-3); padding: 2px 8px; border-radius: 4px; transition: color 0.15s, background 0.15s; }
    .pf-project-card:hover .pf-tech { color: var(--pf-accent); background: var(--pf-accent-bg-subtle); }
    .pf-project-name { font-size: 15px; font-weight: 600; margin-bottom: 6px; letter-spacing: -0.2px; }
    .pf-project-desc { font-size: 13px; color: var(--pf-text-3); line-height: 1.6; }

    /* Education */
    .pf-edu-list { display: flex; flex-direction: column; gap: 12px; }
    .pf-edu-card { display: flex; justify-content: space-between; align-items: center; padding: 16px 0; border-bottom: 1px solid var(--pf-border-2); }
    .pf-edu-degree { font-size: 15px; font-weight: 600; letter-spacing: -0.2px; }
    .pf-edu-inst { font-size: 13px; color: var(--pf-text-3); }
    .pf-edu-year { font-size: 12px; color: var(--pf-text-5); font-family: 'JetBrains Mono', monospace; }

    /* Footer */
    .pf-footer { padding: 80px 0; text-align: center; border-top: 1px solid var(--pf-border); position: relative; }
    .pf-footer::before { content: ''; position: absolute; top: -1px; left: 50%; transform: translateX(-50%); width: 40px; height: 1px; background: var(--pf-accent); }
    .pf-footer-cta { font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: var(--pf-accent); margin-bottom: 8px; font-family: 'JetBrains Mono', monospace; }
    .pf-footer-name { font-size: 36px; font-weight: 700; letter-spacing: -1.5px; margin-bottom: 20px; }
    .pf-footer-links { display: flex; justify-content: center; gap: 24px; margin-bottom: 12px; }
    .pf-footer-link { font-size: 14px; color: var(--pf-text-3); text-decoration: none; transition: color 0.15s; }
    .pf-footer-link:hover { color: var(--pf-accent); }
    .pf-footer-location { font-size: 13px; color: var(--pf-text-5); }

    /* Editable */
    [contenteditable] { outline: none; border-radius: 4px; transition: background 0.15s; cursor: text; }
    [contenteditable]:hover { background: var(--pf-accent-bg-subtle); }
    [contenteditable]:focus { background: var(--pf-accent-bg); }
  `;
}

function esc(str) { return str ? String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;') : ''; }
