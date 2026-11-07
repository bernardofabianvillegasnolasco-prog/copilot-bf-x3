#!/usr/bin/env node
import dotenv from 'dotenv';
dotenv.config({ quiet: true });
import Groq from 'groq-sdk';
import fs from 'fs';
import { PROMPT_BF } from './src/config.js';

const q = process.argv.slice(2).join(' ').trim();
if (!q) {
  console.log('Uso: node copilot.js "tu pregunta"');
  console.log('O: bf "tu pregunta"');
  console.log('O: bf olvidar  (borra memoria)');
  process.exit(0);
}

// --- MEMORIA ---
const MEM = './.bf_memoria.json';
let hist = [];
try { hist = JSON.parse(fs.readFileSync(MEM, 'utf8')); } catch {}
if (q.toLowerCase() === 'olvidar' || q.toLowerCase() === 'olvida todo') {
  try { fs.unlinkSync(MEM); } catch {}
  console.log('Memoria borrada, BF.');
  process.exit(0);
}
hist.push({ role: 'user', content: q });
// solo ultimas 10 (5 preguntas + 5 respuestas) para no gastar tokens
hist = hist.slice(-10);

let GOOGLE_CTX = "";
try { GOOGLE_CTX = fs.readFileSync('./.bf_google_context.txt','utf8'); } catch {}
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const model = process.env.GROQ_MODEL || 'openai/gpt-oss-120b';

try {
  const stream = await groq.chat.completions.create({
    model,
    messages: [{ role: 'system', content: PROMPT_BF + '\n\n' + GOOGLE_CTX }, ...hist],
    temperature: 0.7,
    max_tokens: 2500,
    stream: true,
  });
  let full = '';
  for await (const chunk of stream) {
    const t = chunk.choices[0]?.delta?.content || '';
    full += t;
    process.stdout.write(t);
  }
  console.log('');
  hist.push({ role: 'assistant', content: full });
  fs.writeFileSync(MEM, JSON.stringify(hist.slice(-10)));
} catch (e) {
  console.log('GROQ FALLO:', e.message);
}
