import { SYSTEM_PROMPT, buildUserMessage, validateResponse } from './prompt.js';

const URL = 'https://api.openai.com/v1/chat/completions';

export const openai = {
  name: 'OpenAI',
  envKey: 'OPENAI_API_KEY',
  models: {
    fast: 'gpt-4o-mini',
    smart: 'gpt-4o',
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
      throw new Error(err.error?.message || `OpenAI error: ${response.status}`);
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content;
    if (!text) throw new Error('Empty response from OpenAI');

    return validateResponse(JSON.parse(text));
  },
};
