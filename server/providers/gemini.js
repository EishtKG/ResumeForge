import { SYSTEM_PROMPT, buildUserMessage, validateResponse, sanitizeJson } from './prompt.js';

const URL = 'https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={key}';

export const gemini = {
  name: 'Gemini',
  envKey: 'GEMINI_API_KEY',
  models: {
    fast: 'gemini-2.0-flash',
    smart: 'gemini-2.0-flash',
  },

  async call(apiKey, resume, jobDescription, model = 'fast') {
    const modelName = this.models[model] || this.models.fast;
    const url = URL.replace('{model}', modelName).replace('{key}', apiKey);

    const body = {
      contents: [{ parts: [{ text: SYSTEM_PROMPT + '\n\n' + buildUserMessage(resume, jobDescription) }] }],
      generationConfig: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: 'object',
          properties: {
            candidateName: { type: 'string' },
            targetRole: { type: 'string' },
            atsMatchScore: { type: 'number' },
            matchedKeywords: { type: 'array', items: { type: 'string' } },
            missingKeywords: { type: 'array', items: { type: 'string' } },
            tailoredSummary: { type: 'string' },
            skills: { type: 'object', properties: { technical: { type: 'array', items: { type: 'string' } }, soft: { type: 'array', items: { type: 'string' } } } },
            experience: { type: 'array', items: { type: 'object', properties: { company: { type: 'string' }, role: { type: 'string' }, duration: { type: 'string' }, bullets: { type: 'array', items: { type: 'string' } } } } },
            education: { type: 'array', items: { type: 'object', properties: { institution: { type: 'string' }, degree: { type: 'string' }, year: { type: 'string' } } } },
            projects: { type: 'array', items: { type: 'object', properties: { name: { type: 'string' }, description: { type: 'string' }, tech: { type: 'array', items: { type: 'string' } } } } },
            coverLetter: { type: 'string' },
            atsResume: { type: 'string' },
            contact: { type: 'object', properties: { email: { type: 'string' }, phone: { type: 'string' }, location: { type: 'string' }, linkedin: { type: 'string' }, github: { type: 'string' }, website: { type: 'string' } } },
          },
          required: ['candidateName', 'targetRole', 'atsMatchScore', 'matchedKeywords', 'missingKeywords', 'tailoredSummary', 'skills', 'experience', 'education', 'coverLetter', 'contact', 'atsResume'],
        },
      },
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error?.message || `Gemini error: ${response.status}`);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) throw new Error('Empty response from Gemini');

    return validateResponse(JSON.parse(sanitizeJson(text)));
  },
};
