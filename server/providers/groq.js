import { SYSTEM_PROMPT, buildUserMessage, validateResponse } from './prompt.js';

const URL = 'https://api.groq.com/openai/v1/chat/completions';

export const groq = {
  name: 'Groq',
  envKey: 'GROQ_API_KEY',
  models: {
    fast: 'llama-3.1-8b-instant',
    smart: 'llama-3.3-70b-versatile',
  },

  async call(apiKey, resume, jobDescription, model = 'fast') {
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: this.models[model] || this.models.fast,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: buildUserMessage(resume, jobDescription) },
        ],
        temperature: 0.3,
        max_tokens: 4096,
        response_format: { type: 'json_object' },
      }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error?.message || `Groq error: ${response.status}`);
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content;
    if (!text) throw new Error('Empty response from Groq');

    return validateResponse(JSON.parse(text));
  },
};
