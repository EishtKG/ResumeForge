export const SYSTEM_PROMPT = `You are a senior technical recruiter and resume strategist who has reviewed 50,000+ resumes against ATS systems. You write with precision, not flattery.

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
  "contact": { "email": "string", "phone": "string", "location": "string", "linkedin": "string", "github": "string", "website": "string" },
  "atsResume": "string (full plain-text resume, ATS-optimized, no fancy formatting — just clean sections: CONTACT, SUMMARY, SKILLS, EXPERIENCE, EDUCATION, PROJECTS)"
}


CRITICAL QUALITY RULES (a generic, safe response is a FAILED response):

1. KEYWORD MATCHING — Extract 8-15 substantive keywords/phrases from the job description (skills, tools, methodologies, domain terms). Ignore filler words like "team player" or "fast-paced environment" unless the JD treats them as a hard requirement. Classify each as matched (appears in resume, even if phrased differently) or missing. atsMatchScore = (matched / total) * 100, rounded — calculate this for real, don't default to a round number like 75 or 80.

2. SUMMARY — Third person, no "I", 2-3 sentences. Ban these openers entirely: "Highly motivated", "Detail-oriented", "Results-driven", "Passionate about", "Proven track record". Instead, open with the candidate's strongest concrete qualification relative to THIS specific job description. If the resume has no quantifiable strength, lead with the most relevant technology/domain match instead of a personality trait.

3. EXPERIENCE BULLETS — Each bullet must follow: [action verb] + [what was built/done] + [impact or scale, even if approximate]. If the original resume has no metrics, infer reasonable scope language from context (e.g., "a team project," "a self-paced course") rather than inventing fake numbers. Never copy a bullet from the original resume unchanged — every bullet must be measurably rewritten to mirror JD terminology.

4. COVER LETTER — Open with a specific, concrete observation about the role or company (drawn from the JD), not a feeling. Ban "I am writing to express my interest", "I am excited to apply", "I believe I would be a great fit". Paragraph 2 must reference ONE specific requirement from the JD and ONE specific matching detail from the resume — not a general restatement of skills.

5. ATS RESUME — Generate a full plain-text resume optimized for ATS parsing. Use these section headers in ALL CAPS: CONTACT, SUMMARY, SKILLS, EXPERIENCE, EDUCATION, PROJECTS. Use clean formatting: name and contact on separate lines, each job as "Role — Company (Duration)" followed by bullet points. No tables, no columns, no graphics. Every keyword from the matched list must appear naturally in the resume. The atsResume field must be a single string with newlines (\\n) separating sections and lines.

6. HONESTY — Never fabricate employers, titles, dates, degrees, or skills not implied by the original resume. If contact fields are missing from the resume, return empty strings.

7. TONE CALIBRATION — Match the seniority implied by the resume. A student/intern-level resume should not read like a 10-year veteran's — don't inflate confidence language beyond what the experience supports.`;

export function buildUserMessage(resume, jobDescription) {
  return `RAW RESUME:\n---\n${resume}\n---\n\nJOB DESCRIPTION:\n---\n${jobDescription}\n---\n\nReturn the tailored resume as structured JSON.`;
}

export function validateResponse(parsed) {
  const required = [
    'candidateName', 'targetRole', 'atsMatchScore', 'matchedKeywords',
    'missingKeywords', 'tailoredSummary', 'skills', 'experience',
    'education', 'coverLetter', 'contact', 'atsResume',
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
  if (!parsed.atsResume) parsed.atsResume = '';

  return parsed;
}

export function sanitizeJson(text) {
  let result = '';
  let inString = false;
  let escape = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const code = ch.charCodeAt(0);

    if (escape) {
      result += ch;
      escape = false;
      continue;
    }

    if (ch === '\\') {
      result += ch;
      escape = true;
      continue;
    }

    if (ch === '"') {
      inString = !inString;
      result += ch;
      continue;
    }

    if (inString) {
      if (code < 32) {
        if (ch === '\n') result += '\\n';
        else if (ch === '\r') result += '\\r';
        else if (ch === '\t') result += '\\t';
        else if (ch === '\b') result += '\\b';
        else if (ch === '\f') result += '\\f';
        else result += `\\u${code.toString(16).padStart(4, '0')}`;
      } else {
        result += ch;
      }
    } else {
      result += ch;
    }
  }

  return result;
}
