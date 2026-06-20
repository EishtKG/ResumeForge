const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';

const SYSTEM_PROMPT = `You are a senior technical recruiter and resume optimization expert.

You MUST respond with valid JSON matching this exact schema — no markdown, no code fences, no extra text, ONLY the JSON object:

{
  "candidateName": "string",
  "targetRole": "string",
  "atsMatchScore": 0-100,
  "matchedKeywords": ["string"],
  "missingKeywords": ["string"],
  "tailoredSummary": "string (2-3 sentences, third person, resume style)",
  "skills": { "technical": ["string"], "soft": ["string"] },
  "experience": [{ "company": "string", "role": "string", "duration": "string", "bullets": ["string"] }],
  "education": [{ "institution": "string", "degree": "string", "year": "string" }],
  "projects": [{ "name": "string", "description": "string", "tech": ["string"] }],
  "coverLetter": "string (full text, 3-4 paragraphs)",
  "contact": { "email": "string", "phone": "string", "location": "string", "linkedin": "string", "github": "string", "website": "string" }
}

RULES:
1. Rewrite experience bullets to mirror the job description's terminology and required skills. Never fabricate employers, titles, dates, or skills not implied by the original resume.
2. Pull keywords from the job description. Classify which appear in the resume (matchedKeywords) vs. which do not (missingKeywords).
3. The atsMatchScore should reflect the actual keyword overlap percentage — calculate it honestly.
4. The tailoredSummary should be 2-3 sentences, third person (no "I"), resume style.
5. Cover letter: confident, specific, no generic filler. NEVER open with "I am writing to express my interest".
6. If contact details aren't in the raw resume, leave those fields as empty strings — never invent them.
7. The targetRole should be the exact job title from the job description.
8. For experience bullets, use quantified metrics wherever possible.`;

let apiKey = '';

export function setApiKey(key) {
  apiKey = key;
}

export async function tailorResume(resume, jobDescription) {
  if (!apiKey) {
    throw new Error('API key not configured. Add GROQ_API_KEY to .env and restart the server.');
  }

  const userMessage = `RAW RESUME:\n---\n${resume}\n---\n\nJOB DESCRIPTION:\n---\n${jobDescription}\n---\n\nReturn the tailored resume as structured JSON.`;

  const response = await fetch(GROQ_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'llama-3.1-8b-instant',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userMessage },
      ],
      temperature: 0.3,
      max_tokens: 4096,
      response_format: { type: 'json_object' },
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    const msg = err.error?.message || `Groq error: ${response.status}`;
    throw new Error(msg);
  }

  const data = await response.json();
  const text = data.choices?.[0]?.message?.content;

  if (!text) {
    throw new Error('Empty response from Groq');
  }

  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error('Invalid JSON from AI. Please try again.');
  }

  const required = [
    'candidateName', 'targetRole', 'atsMatchScore', 'matchedKeywords',
    'missingKeywords', 'tailoredSummary', 'skills', 'experience',
    'education', 'coverLetter', 'contact',
  ];
  const missing = required.filter(k => !(k in parsed));
  if (missing.length > 0) {
    throw new Error(`Response missing fields: ${missing.join(', ')}`);
  }

  if (typeof parsed.atsMatchScore !== 'number') {
    parsed.atsMatchScore = 50;
  }
  parsed.atsMatchScore = Math.min(100, Math.max(0, Math.round(parsed.atsMatchScore)));

  if (!parsed.contact) {
    parsed.contact = { email: '', phone: '', location: '', linkedin: '', github: '', website: '' };
  }
  if (!parsed.projects) parsed.projects = [];
  if (!parsed.education) parsed.education = [];

  return parsed;
}
