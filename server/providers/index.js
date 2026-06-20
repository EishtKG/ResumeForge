import { groq } from './groq.js';
import { openrouter } from './openrouter.js';
import { gemini } from './gemini.js';
import { together } from './together.js';

const providers = { groq, openrouter, gemini, together };

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

export function getProvider() {
  return activeProvider;
}

export async function tailorResume(resume, jobDescription) {
  if (!activeProvider || !apiKey) {
    throw new Error('No AI provider configured. Check AI_PROVIDER and API key in .env.');
  }
  return activeProvider.call(apiKey, resume, jobDescription);
}
