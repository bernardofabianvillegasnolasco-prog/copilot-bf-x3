#!/usr/bin/env node
import dotenv from 'dotenv';
dotenv.config({ quiet: true });
import Groq from 'groq-sdk';
import { PROMPT_BF } from './src/config.js';

const q = process.argv.slice(2).join(' ').trim();
if (!q) {
  console.log('Uso: node copilot.js "tu pregunta"');
  console.log('O: bf "tu pregunta"');
  process.exit(0);
}

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const model = process.env.GROQ_MODEL || 'openai/gpt-oss-120b';

try {
  const stream = await groq.chat.completions.create({
    model,
    messages: [
      { role: 'system', content: PROMPT_BF },
      { role: 'user', content: q }
    ],
    temperature: 0.7,
    max_tokens: 2500,
    stream: true,
  });
  for await (const chunk of stream) {
    const t = chunk.choices[0]?.delta?.content || '';
    process.stdout.write(t);
  }
  console.log('');
} catch (e) {
  console.log('GROQ FALLO:', e.message);
}
