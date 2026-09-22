import OpenAI from 'openai'; import { prompt, query } from './ia.js';
const o = new OpenAI({apiKey:process.env.OPENROUTER_API_KEY, baseURL:"https://openrouter.ai/api/v1"});
const r = await o.chat.completions.create({model:"openai/gpt-oss-20b:free", messages:[{role:"system",content:prompt},{role:"user",content:query()}], max_tokens:400});
console.log(`[OPENROUTER]\n${r.choices[0].message.content}`);
