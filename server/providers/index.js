import { groq } from './groq.js';
import { openrouter } from './openrouter.js';
import { gemini } from './gemini.js';
import { together } from './together.js';
import { claude } from './claude.js';
import { openai } from './openai.js';
import { grok } from './grok.js';
import { nvidia } from './nvidia.js';

// ──────────────────────────────────────────────
//  To add a new provider:
//  1. Create server/providers/yourprovider.js
//     - Export an object with: name, envKey, models, call()
//     - Import SYSTEM_PROMPT, buildUserMessage, validateResponse from ./prompt.js
//  2. Import it below and add to the providers object
//  3. Add the env key to .env
// ──────────────────────────────────────────────

const providers = { groq, openrouter, gemini, together, claude, openai, grok, nvidia };

let activeProvider = null;
let apiKey = '';

export function initProvider() {
  const providerName = process.env.AI_PROVIDER || 'groq';
  const provider = providers[providerName];

  if (!provider) {
    console.error(`Unknown AI_PROVIDER "${providerName}". Available: ${Object.keys(providers).join(', ')}`);
    return null;
  }

  const key = process.env[provider.envKey] || '';
  if (!key) {
    console.error(`No ${provider.envKey} found in .env for ${provider.name}.`);
    return null;
  }

  activeProvider = provider;
  apiKey = key;
  console.log(`Using ${provider.name} (${provider.models.fast})`);
  return provider;
}

export async function tailorResume(resume, jobDescription) {
  if (!activeProvider || !apiKey) {
    throw new Error('No AI provider configured. Check AI_PROVIDER and API key in .env.');
  }
  return activeProvider.call(apiKey, resume, jobDescription);
}
