import { SYSTEM_PROMPT, buildUserMessage, validateResponse, sanitizeJson } from './prompt.js';

const URL = 'https://api.together.xyz/v1/chat/completions';

export const together = {
  name: 'Together AI',
  envKey: 'TOGETHER_API_KEY',
  models: {
    fast: 'meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo',
    smart: 'meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo',
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
      throw new Error(err.error?.message || `Together error: ${response.status}`);
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content;
    if (!text) throw new Error('Empty response from Together AI');

    return validateResponse(JSON.parse(sanitizeJson(text)));
  },
};
