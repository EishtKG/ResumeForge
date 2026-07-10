# Adding a New AI Provider

The provider system is modular. To add any AI API:

## Steps

### 1. Create the adapter file

Create `server/providers/yourprovider.js`:

```javascript
import { SYSTEM_PROMPT, buildUserMessage, validateResponse, sanitizeJson } from './prompt.js';

export const yourprovider = {
  name: 'Your Provider',           // Display name
  envKey: 'YOUR_API_KEY',          // Env variable name for the key
  models: {
    fast: 'model-name-fast',       // Default model
    smart: 'model-name-smart',     // Optional larger model
  },

  async call(apiKey, resume, jobDescription, model = 'fast') {
    const response = await fetch('https://api.yourprovider.com/v1/chat/completions', {
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
      throw new Error(err.error?.message || `Provider error: ${response.status}`);
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content;
    if (!text) throw new Error('Empty response');

    // Some providers return markdown-wrapped JSON
    const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    return validateResponse(JSON.parse(sanitizeJson(cleaned)));
  },
};
```

### 2. Register it in `server/providers/index.js`

```javascript
import { yourprovider } from './yourprovider.js';

const providers = { groq, openrouter, ..., yourprovider };
```

### 3. Add the env key to `.env`

```env
AI_PROVIDER=yourprovider
YOUR_API_KEY=sk-xxxxx
```

### 4. Restart the server

```bash
npm run dev
```

## Provider API Patterns

| Provider | Auth Header | Response Path | JSON Mode |
|---|---|---|---|
| Groq | `Authorization: Bearer` | `choices[0].message.content` | `response_format: { type: 'json_object' }` |
| OpenRouter | `Authorization: Bearer` | `choices[0].message.content` | No (prompt-based) |
| Gemini | `?key=` in URL | `candidates[0].content.parts[0].text` | `responseMimeType: 'application/json'` |
| Together | `Authorization: Bearer` | `choices[0].message.content` | `response_format: { type: 'json_object' }` |
| Claude | `x-api-key` header | `content[0].text` | No (prompt-based) |
| OpenAI | `Authorization: Bearer` | `choices[0].message.content` | `response_format: { type: 'json_object' }` |
| Grok | `Authorization: Bearer` | `choices[0].message.content` | No (prompt-based) |
| Nvidia | `Authorization: Bearer` | `choices[0].message.content` | No (prompt-based, uses `sanitizeJson`) |

## Notes

- `SYSTEM_PROMPT` and `buildUserMessage()` are shared — don't duplicate them
- `validateResponse()` enforces the schema — always use it before returning
- `sanitizeJson()` escapes control characters inside JSON strings to prevent parse failures — use it before `JSON.parse()` on raw model output
- For providers without native JSON mode, the prompt instructs JSON-only output and we strip markdown fences as fallback
- The `call()` method receives the provider instance as `this`, so `this.models` works
