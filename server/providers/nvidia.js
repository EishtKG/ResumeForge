import { SYSTEM_PROMPT, buildUserMessage, validateResponse } from './prompt.js';

const URL = 'https://integrate.api.nvidia.com/v1/chat/completions';

export const nvidia = {
  name: 'Nvidia NIM',
  envKey: 'NVIDIA_API_KEY',
  models: {
    fast: 'meta/llama-3.1-8b-instruct',
    smart: 'meta/llama-3.1-70b-instruct',
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
      }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error?.message || `Nvidia error: ${response.status}`);
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content;
    if (!text) throw new Error('Empty response from Nvidia');

    const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    return validateResponse(JSON.parse(cleaned));
  },
};
