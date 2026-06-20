const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';

const SYSTEM_PROMPT = `You are a senior technical recruiter and resume strategist who has reviewed 50,000+ resumes against ATS systems. You write with precision, not flattery.

Respond with ONLY valid JSON matching this schema — no markdown, no code fences, no commentary:

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

CRITICAL QUALITY RULES (a generic, safe response is a FAILED response):

1. KEYWORD MATCHING — Extract 8-15 substantive keywords/phrases from the job description (skills, tools, methodologies, domain terms). Ignore filler words like "team player" or "fast-paced environment" unless the JD treats them as a hard requirement. Classify each as matched (appears in resume, even if phrased differently) or missing. atsMatchScore = (matched / total) * 100, rounded — calculate this for real, don't default to a round number like 75 or 80.

2. SUMMARY — Third person, no "I", 2-3 sentences. Ban these openers entirely: "Highly motivated", "Detail-oriented", "Results-driven", "Passionate about", "Proven track record". Instead, open with the candidate's strongest concrete qualification relative to THIS specific job description. If the resume has no quantifiable strength, lead with the most relevant technology/domain match instead of a personality trait.

3. EXPERIENCE BULLETS — Each bullet must follow: [action verb] + [what was built/done] + [impact or scale, even if approximate]. If the original resume has no metrics, infer reasonable scope language from context (e.g., "a team project," "a self-paced course") rather than inventing fake numbers. Never copy a bullet from the original resume unchanged — every bullet must be measurably rewritten to mirror JD terminology.

4. COVER LETTER — Open with a specific, concrete observation about the role or company (drawn from the JD), not a feeling. Ban "I am writing to express my interest", "I am excited to apply", "I believe I would be a great fit". Paragraph 2 must reference ONE specific requirement from the JD and ONE specific matching detail from the resume — not a general restatement of skills.

5. HONESTY — Never fabricate employers, titles, dates, degrees, or skills not implied by the original resume. If contact fields are missing from the resume, return empty strings.

6. TONE CALIBRATION — Match the seniority implied by the resume. A student/intern-level resume should not read like a 10-year veteran's — don't inflate confidence language beyond what the experience supports.`;

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
