export function renderMinimal(data, accentColor) {
  const accent = accentColor || '#171717';
  return `
    <div class="pf-page" style="--accent: ${accent};">
      <style>${getMinimalCSS(accent)}</style>

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
            <div class="pf-skill-card">
              <h3 class="pf-skill-label">Technical Skills</h3>
              <div class="pf-skill-tags">
                ${data.skills.technical.map(s => `<span class="pf-skill-tag">${esc(s)}</span>`).join('')}
              </div>
            </div>
            <div class="pf-skill-card">
              <h3 class="pf-skill-label">Professional Skills</h3>
              <div class="pf-skill-tags">
                ${data.skills.soft.map(s => `<span class="pf-skill-tag pf-skill-tag-soft">${esc(s)}</span>`).join('')}
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
                <div class="pf-exp-left">
                  <span class="pf-exp-num">${String(i + 1).padStart(2, '0')}</span>
                  <div class="pf-exp-line"></div>
                </div>
                <div class="pf-exp-content">
                  <div class="pf-exp-top">
                    <div>
                      <h3 class="pf-exp-role">${esc(exp.role)}</h3>
                      <p class="pf-exp-company">${esc(exp.company)}</p>
                    </div>
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

function getMinimalCSS(accent) {
  return `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
    .pf-page { font-family: 'Inter', system-ui, sans-serif; color: #171717; background: #fff; line-height: 1.6; }
    .pf-container { max-width: 800px; margin: 0 auto; padding: 0 32px; }

    /* Nav */
    .pf-nav { display: flex; justify-content: space-between; align-items: center; padding: 16px 32px; border-bottom: 1px solid #f0f0f0; position: sticky; top: 0; background: rgba(255,255,255,0.95); backdrop-filter: blur(12px); z-index: 100; }
    .pf-nav-name { font-size: 14px; font-weight: 600; letter-spacing: -0.3px; }
    .pf-nav-links { display: flex; gap: 24px; align-items: center; }
    .pf-nav-links a { font-size: 13px; color: #666; text-decoration: none; transition: color 0.15s; }
    .pf-nav-links a:hover { color: #171717; }
    .pf-nav-cta { background: ${accent}; color: #fff !important; padding: 6px 16px; border-radius: 100px; font-weight: 500; }
    .pf-nav-cta:hover { opacity: 0.9; }

    /* Hero */
    .pf-hero { padding: 80px 32px 60px; display: flex; justify-content: space-between; align-items: flex-start; gap: 48px; max-width: 800px; margin: 0 auto; }
    .pf-hero-container { flex: 1; }
    .pf-hero-badge { display: inline-block; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1.5px; color: ${accent}; background: ${accent}0d; padding: 6px 14px; border-radius: 100px; margin-bottom: 24px; font-family: 'JetBrains Mono', monospace; }
    .pf-hero-title { margin-bottom: 8px; }
    .pf-hero-line { display: block; font-size: 16px; font-weight: 400; color: #666; }
    .pf-hero-name { display: block; font-size: 48px; font-weight: 700; letter-spacing: -2.5px; line-height: 1.05; }
    .pf-hero-role { font-size: 18px; color: #4d4d4d; margin-bottom: 16px; font-weight: 400; }
    .pf-hero-summary { font-size: 15px; color: #666; line-height: 1.7; max-width: 500px; margin-bottom: 28px; }
    .pf-hero-actions { display: flex; gap: 12px; }
    .pf-btn { display: inline-flex; align-items: center; padding: 10px 24px; border-radius: 100px; font-size: 14px; font-weight: 500; text-decoration: none; transition: all 0.15s; }
    .pf-btn-primary { background: ${accent}; color: #fff; }
    .pf-btn-primary:hover { opacity: 0.9; }
    .pf-btn-ghost { border: 1px solid #e0e0e0; color: #171717; background: transparent; }
    .pf-btn-ghost:hover { border-color: #171717; }

    /* Sections */
    .pf-section { padding: 60px 0; border-top: 1px solid #f0f0f0; }
    .pf-section-header { display: flex; align-items: center; gap: 12px; margin-bottom: 32px; }
    .pf-section-tag { font-family: 'JetBrains Mono', monospace; font-size: 12px; color: #ccc; }
    .pf-section-title { font-size: 20px; font-weight: 600; letter-spacing: -0.5px; }

    /* Skills */
    .pf-skills-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
    .pf-skill-card { padding: 24px; border: 1px solid #f0f0f0; border-radius: 12px; }
    .pf-skill-label { font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #888; margin-bottom: 12px; }
    .pf-skill-tags { display: flex; flex-wrap: wrap; gap: 6px; }
    .pf-skill-tag { padding: 5px 12px; font-size: 12px; background: ${accent}0a; color: ${accent}; border-radius: 100px; font-weight: 500; border: 1px solid ${accent}15; }
    .pf-skill-tag-soft { background: #f7f7f7; color: #4d4d4d; border-color: #eee; }

    /* Experience */
    .pf-exp-list { display: flex; flex-direction: column; gap: 0; }
    .pf-exp-card { display: flex; gap: 20px; padding: 28px 0; border-bottom: 1px solid #f5f5f5; }
    .pf-exp-card:last-child { border-bottom: none; }
    .pf-exp-left { display: flex; flex-direction: column; align-items: center; padding-top: 4px; }
    .pf-exp-num { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #ccc; }
    .pf-exp-line { width: 1px; flex: 1; background: #f0f0f0; margin-top: 8px; }
    .pf-exp-content { flex: 1; }
    .pf-exp-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; }
    .pf-exp-role { font-size: 16px; font-weight: 600; letter-spacing: -0.3px; }
    .pf-exp-company { font-size: 14px; color: #666; }
    .pf-exp-duration { font-size: 12px; color: #999; font-family: 'JetBrains Mono', monospace; white-space: nowrap; }
    .pf-exp-bullets { list-style: none; padding: 0; }
    .pf-exp-bullets li { position: relative; padding-left: 16px; font-size: 14px; color: #4d4d4d; line-height: 1.7; margin-bottom: 6px; }
    .pf-exp-bullets li::before { content: ''; position: absolute; left: 0; top: 9px; width: 6px; height: 1px; background: ${accent}; }

    /* Projects */
    .pf-projects-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .pf-project-card { padding: 24px; border: 1px solid #f0f0f0; border-radius: 12px; transition: border-color 0.15s, box-shadow 0.15s; }
    .pf-project-card:hover { border-color: #ddd; box-shadow: 0 2px 8px rgba(0,0,0,0.04); }
    .pf-project-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; }
    .pf-project-header svg { color: #ccc; flex-shrink: 0; }
    .pf-project-tech { display: flex; flex-wrap: wrap; gap: 4px; }
    .pf-tech { font-size: 10px; font-family: 'JetBrains Mono', monospace; color: #888; background: #f5f5f5; padding: 2px 8px; border-radius: 4px; }
    .pf-project-name { font-size: 15px; font-weight: 600; margin-bottom: 6px; letter-spacing: -0.2px; }
    .pf-project-desc { font-size: 13px; color: #666; line-height: 1.6; }

    /* Education */
    .pf-edu-list { display: flex; flex-direction: column; gap: 12px; }
    .pf-edu-card { display: flex; justify-content: space-between; align-items: center; padding: 16px 0; border-bottom: 1px solid #f5f5f5; }
    .pf-edu-degree { font-size: 15px; font-weight: 600; letter-spacing: -0.2px; }
    .pf-edu-inst { font-size: 13px; color: #666; }
    .pf-edu-year { font-size: 12px; color: #999; font-family: 'JetBrains Mono', monospace; }

    /* Footer */
    .pf-footer { padding: 80px 0; text-align: center; border-top: 1px solid #f0f0f0; }
    .pf-footer-cta { font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: #999; margin-bottom: 8px; font-family: 'JetBrains Mono', monospace; }
    .pf-footer-name { font-size: 36px; font-weight: 700; letter-spacing: -1.5px; margin-bottom: 20px; }
    .pf-footer-links { display: flex; justify-content: center; gap: 24px; margin-bottom: 12px; }
    .pf-footer-link { font-size: 14px; color: #666; text-decoration: none; transition: color 0.15s; }
    .pf-footer-link:hover { color: ${accent}; }
    .pf-footer-location { font-size: 13px; color: #999; }

    /* Editable */
    [contenteditable] { outline: none; border-radius: 4px; transition: background 0.15s; cursor: text; }
    [contenteditable]:hover { background: ${accent}04; }
    [contenteditable]:focus { background: ${accent}08; }
  `;
}

function esc(str) { return str ? String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;') : ''; }
