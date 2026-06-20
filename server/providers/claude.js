import { SYSTEM_PROMPT, buildUserMessage, validateResponse, sanitizeJson } from './prompt.js';

const URL = 'https://api.anthropic.com/v1/messages';

export const claude = {
  name: 'Claude (Anthropic)',
  envKey: 'ANTHROPIC_API_KEY',
  models: {
    fast: 'claude-3-5-haiku-20241022',
    smart: 'claude-sonnet-4-20250514',
  },

  async call(apiKey, resume, jobDescription, model = 'fast') {
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: this.models[model] || this.models.fast,
        max_tokens: 4096,
        system: SYSTEM_PROMPT,
        messages: [
          { role: 'user', content: buildUserMessage(resume, jobDescription) },
        ],
      }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error?.message || `Claude error: ${response.status}`);
    }

    const data = await response.json();
    const text = data.content?.[0]?.text;
    if (!text) throw new Error('Empty response from Claude');

    const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    return validateResponse(JSON.parse(sanitizeJson(cleaned)));
  },
};
