# [ResumeForge: Generate Portfolio Website that to of 3 diff themes,ATS Approved Resume & Cover letter with respect to the Job Description](https://resume-forge-new.vercel.app/)

AI-powered resume tailoring, ATS scoring, cover letter writing, and live portfolio generation — built from nothing but raw, unformatted text.

Paste your resume and a job description as-is — no templates, no rigid fields, no formatting required — and get back a tailored resume, a real cover letter, an ATS keyword match score, and a fully designed, exportable portfolio site, all rendered live in a split-screen preview.

> **A note on how this was built:** ResumeForge was built using **Mimo v2.5 (free)** inside **OpenCode**, as a hands-on way to get into AI-driven agentic development workflows — letting an AI agent scaffold, wire up, and iterate on a real, end-to-end project instead of just reading about how it's done.

---

## Demo:-


https://github.com/user-attachments/assets/bfd3abde-8f5f-4d2d-bc2a-70e8bbc51ded


*(Demo video)*

🔗 **Live Demo:** [resume-forge-new.vercel.app](https://resume-forge-new.vercel.app/)





---

## Features

- **Raw-text input, zero formatting required** — paste your resume and the job description as plain, messy, unstructured text. No forms, no fields to fill out one by one.
- **AI-tailored, ATS-optimized resume** — bullets rewritten to mirror the job description's terminology and required skills, with a real ATS match score and keyword analysis (matched vs. missing) driven by the actual job description provided — not a static or fake number.
- **AI-written cover letter** — generated specifically from the resume + job description pairing, not generic filler text.
- **3 distinct portfolio themes** — Minimal, Editorial, and Bold — each with its own layout, type pairing, spacing system, and way of visualizing skills and the ATS score. Not one component recolored three times.

  <!-- Add a screenshot of the Minimal theme here -->
  <!-- Add a screenshot of the Editorial theme here -->
  <!-- Add a screenshot of the Bold theme here -->

- **Live split-screen preview** — the tailored resume and portfolio render instantly as the AI response comes back, and update instantly again on theme/color changes — no re-calling the AI just to restyle.
- **Inline editing** — hand-edit any field directly in the preview (a bullet point, the summary, a contact detail) and every export reflects the edit immediately.
- **Full export coverage** — the tailored resume, the cover letter, and the complete portfolio can **all be exported as PDF**. The portfolio can additionally be exported as a **fully standalone HTML file**, with all CSS inlined and zero leftover app UI — ready to upload anywhere as-is.
- **Multi-provider AI support** — works with Gemini, Claude, OpenAI, Grok, Groq, Together AI, OpenRouter, or NVIDIA-hosted models, switchable with a single environment variable (more on this below).

---

## Tech Stack

- **Frontend:** Vanilla JavaScript (no React/Vue) + Vite for dev server and bundling
- **Styling:** Tailwind CSS v4 + dedicated theme CSS for the three portfolio templates
- **Backend:** Node.js + Express, deployed as a Vercel Serverless Function
- **AI Providers:** Google Gemini, Anthropic Claude, OpenAI, xAI Grok, Groq, Together AI, OpenRouter, NVIDIA — abstracted behind one shared provider interface
- **PDF Export:** Client-side generation (html2pdf.js / jsPDF + html2canvas) — no server round-trip
- **HTML Export:** Self-contained static HTML generation with inlined styles
- **Hosting/Deployment:** Vercel
- **Storage:** None — fully session-based (in-memory state + `sessionStorage` for the API key); no database, single-user local tool by design

---

## Project Structure

```
ResumeForge/
├── .agents/skills/            # Agent skills referenced during development
│   ├── tailwind-4-docs/
│   └── web-design-guidelines/
├── api/
│   └── index.js               # Vercel serverless entry point
├── public/
│   ├── scripts/
│   │   ├── api.js             # Frontend → backend API calls
│   │   ├── app.js             # App state & event wiring
│   │   ├── exportHtml.js      # Standalone HTML export
│   │   ├── exportPdf.js       # PDF export
│   │   └── renderPreview.js   # Renders tailored JSON into the live preview
│   ├── styles/main.css
│   ├── templates/
│   │   ├── theme-minimal.js
│   │   ├── theme-editorial.js
│   │   └── theme-bold.js
│   └── index.html
├── server/
│   ├── providers/              # One file per AI provider
│   │   ├── claude.js
│   │   ├── gemini.js
│   │   ├── grok.js
│   │   ├── groq.js
│   │   ├── nvidia.js
│   │   ├── openai.js
│   │   ├── openrouter.js
│   │   ├── together.js
│   │   ├── prompt.js           # Shared prompt + response schema
│   │   └── index.js            # Provider selector
│   └── index.js
├── AGENTS.md                   # Instructions for the AI coding agent
├── DESIGN.md                   # Design direction reference (see below)
├── PROVIDERS.md                # Provider setup notes
├── vercel.json
└── vite.config.js
```

---

## Why a `server/providers` Folder? (Solving for Vendor Lock-In)

**The problem I ran into:** every AI provider — Gemini, Claude, OpenAI, Groq, and so on — has its own API shape, its own auth method, and its own request/response format. If the AI logic had been written directly against one provider's SDK, switching providers later — because of pricing, rate limits, latency, or just wanting to try a better model — would have meant rewriting request-building, response-parsing, and error-handling code throughout the backend every single time.

**How I solved it:** every supported provider gets its own file inside `server/providers/`, and every one of those files implements the exact same interface — same input shape, same output shape, same error format — against the shared prompt and schema defined in `prompt.js`. A single `AI_PROVIDER` variable in `.env` decides which file actually runs at request time. Switching providers becomes nothing more than:

```env
AI_PROVIDER=claude
CLAUDE_API_KEY=your-key-here
```

No application code changes, no touching the frontend, no redeploying logic — just flip the variable, add the matching key, and restart (or redeploy). This also made it trivial to compare multiple providers side-by-side during development.

---

## Design Direction — `DESIGN.md`

`DESIGN.md` documents a **Vercel design-system analysis** that shaped the visual direction of this entire project.

The brief going in was explicit about avoiding the most common "AI slop" look: a centered hero with a gradient blob, purple-to-blue gradients as the default palette, Inter/Poppins at default weights as the only typography, uniform rounded cards with drop shadows everywhere, and emoji used as section icons.

Vercel's own product and marketing design was used as a reference point specifically because it solves this exact problem at scale — sharp type hierarchy, confident negative space, hairline borders instead of shadow-heavy cards, and a restrained, monochrome-plus-one-accent palette instead of a default gradient. `DESIGN.md` breaks that visual language down into reusable, concrete rules (spacing scale, type pairing logic, where color is and isn't allowed) so that the three portfolio themes feel genuinely art-directed rather than templated — while still staying visually distinct from each other and from Vercel itself.

---

## Skills Used

This project was built with two custom **agent skills**, both living in `.agents/skills/` and referenced directly in `AGENTS.md` as mandatory context for the coding agent on every relevant task:

- **`tailwind-4-docs`** — an up-to-date Tailwind CSS v4 reference. Tailwind v4 changed enough from v3 (config format, utility behavior) that relying on the agent's training data alone produced outdated class names and config syntax.
- **`web-design-guidelines`** — general visual design principles (typography, spacing, contrast, layout composition) used to keep the agent from defaulting to generic, templated component patterns.

`AGENTS.md` also points the agent at `DESIGN.md` for project-specific design rules on every task touching the UI.

---

## Things I Learned

- How **structured output / schema enforcement** (forced JSON response schemas) is meaningfully more reliable than just asking a model nicely to "return JSON" in the prompt — and why validating that output server-side before trusting it still matters.
- The real difference between a **long-running server** and a **serverless function**, learned the hard way — a backend that works perfectly with `concurrently` locally can silently not exist at all once deployed, because the hosting platform never runs it the same way.
- That **environment variables don't retroactively apply** to existing deployments — adding a key isn't the same as the *running* deployment actually having it; a redeploy is required.
- How to design a **provider abstraction layer** that solves the real problem (swapping AI vendors without rewriting code) without over-engineering it — one file per provider, one shared interface, one switch.
- That "looks different" and "is actually different" aren't the same thing when designing multiple visual themes — without real constraints (different fonts, different spacing systems, different ways of representing the same data) it's easy to ship three recolors of one component instead of three distinct designs.
- How to debug a deployed app properly — by reading **serverless function logs** and the actual **Network tab response** — instead of trusting a generic frontend error message. Most "Unknown error" bugs turn out to be something specific the moment you look one layer deeper.

---

## Getting Started (Local Development)

```bash
git clone https://github.com/EishtKG/ResumeForge.git
cd ResumeForge
npm install
```

Create a `.env` file in the project root:

```env
AI_PROVIDER=gemini
GEMINI_API_KEY=your-key-here
```

(Swap `AI_PROVIDER` and its matching key variable for any other supported provider — see `PROVIDERS.md` for the full list.)

Run the app locally:

```bash
npm run dev
```

This starts the Express server and the Vite dev server together.

---

## Deployment

ResumeForge is deployed on **Vercel**.

- The Express backend runs as a Vercel **Serverless Function** via `api/index.js`, routed through `vercel.json` — Vercel doesn't run long-lived Node processes, so the backend had to be adapted from a traditional `app.listen()` server into an exported request handler.
- The Vite frontend is built and served as a static site (`vite build` → `dist/`).
- Required environment variables (set under **Project → Settings → Environment Variables** on Vercel):
  - `AI_PROVIDER`
  - The API key matching whichever provider is selected (e.g. `GEMINI_API_KEY`, `CLAUDE_API_KEY`, etc.)
  - `ALLOWED_ORIGINS` (optional) — comma-separated list of additional allowed CORS origins (e.g. custom domains)
- Any change to environment variables requires a **redeploy** to take effect — Vercel does not retroactively apply env var changes to already-built deployments.

🔗 **Live Demo:** [resume-forge-new.vercel.app](https://resume-forge-new.vercel.app/)
