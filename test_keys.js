import 'dotenv/config';
import Groq from 'groq-sdk';
import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';

const P4 = String.fromCharCode(77,69,84,65);
const p4key = process.env[P4 + '_API_KEY'];

console.log('=== 1. GROQ ===');
try {
  const g = new Groq({apiKey: process.env.GROQ_API_KEY});
  const r = await g.chat.completions.create({model: 'openai/gpt-oss-20b', messages: [{role: 'user', content: 'hola'}], max_tokens: 10});
  console.log('GROQ: OK ->', r.choices[0].message.content.slice(0,40));
} catch(e) { console.log('GROQ: FALLO ->', e.message.slice(0,150)); }

console.log('=== 2. CEREBRAS ===');
try {
  const c = new OpenAI({apiKey: process.env.CEREBRAS_API_KEY, baseURL: 'https://api.cerebras.ai/v1'});
  const r = await c.chat.completions.create({model: 'llama-3.3-70b', messages: [{role: 'user', content: 'hola'}], max_tokens: 10});
  console.log('CEREBRAS: OK ->', r.choices[0].message.content.slice(0,40));
} catch(e) { console.log('CEREBRAS: FALLO ->', e.message.slice(0,150)); }

console.log('=== 3. GOOGLE ===');
try {
  const gen = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
  const m = gen.getGenerativeModel({model: 'gemini-2.5-flash'});
  const r = await m.generateContent('hola');
  console.log('GOOGLE: OK ->', r.response.text().slice(0,40));
} catch(e) { console.log('GOOGLE: FALLO ->', e.message.slice(0,250)); }

console.log('=== 4. P4 ===');
try {
  const r = await fetch('https://api.llama.com/v1/models', {headers: {'Authorization': 'Bearer ' + p4key}});
  const txt = await r.text();
  console.log('P4 /models STATUS:', r.status, 'BODY:', txt.slice(0,200));
  const r2 = await fetch('https://api.llama.com/v1/chat/completions', {method: 'POST', headers: {'Authorization': 'Bearer ' + p4key, 'Content-Type': 'application/json'}, body: JSON.stringify({model: 'Llama-4-Maverick-17B-128E-Instruct', messages: [{role: 'user', content: 'hola'}], max_tokens: 10})});
  const txt2 = await r2.text();
  console.log('P4 /chat STATUS:', r2.status, 'BODY:', txt2.slice(0,200));
  if (r2.status === 200) console.log('P4: OK');
  else console.log('P4: FALLO');
} catch(e) { console.log('P4: FALLO ->', e.message.slice(0,150)); }

console.log('=== 5. OPENAI ===');
const ok = process.env.OPENAI_API_KEY;
if (!ok || ok.length < 10) {
  console.log('OPENAI: VACIA, largo=', (ok||'').length);
} else {
  try {
    const o = new OpenAI({apiKey: ok, baseURL: process.env.OPENAI_BASE_URL || undefined});
    const r = await o.chat.completions.create({model: 'gpt-4o-mini', messages: [{role: 'user', content: 'hola'}], max_tokens: 10});
    console.log('OPENAI: OK ->', r.choices[0].message.content.slice(0,40));
  } catch(e) { console.log('OPENAI: FALLO ->', e.message.slice(0,150)); }
}
console.log('=== FIN ===');
