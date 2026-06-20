import { SYSTEM_PROMPT, buildUserMessage, validateResponse, sanitizeJson } from './prompt.js';

const URL = 'https://openrouter.ai/api/v1/chat/completions';

export const openrouter = {
  name: 'OpenRouter',
  envKey: 'OPENROUTER_API_KEY',
  models: {
    fast: 'meta-llama/llama-3.1-8b-instruct:free',
    smart: 'meta-llama/llama-3.1-70b-instruct:free',
  },

  async call(apiKey, resume, jobDescription, model = 'fast') {
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': 'http://localhost:5173',
        'X-Title': 'ResumeForge',
      },
      body: JSON.stringify({
        model: this.models[model] || this.models.fast,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: buildUserMessage(resume, jobDescription) },
        ],
        temperature: 0.3,
        max_tokens: 4096,
      }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error?.message || `OpenRouter error: ${response.status}`);
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content;
    if (!text) throw new Error('Empty response from OpenRouter');

    const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    return validateResponse(JSON.parse(sanitizeJson(cleaned)));
  },
};
