import OpenAI from 'openai'; import { prompt, query } from './ia.js';
const t = new OpenAI({apiKey:process.env.TOGETHER_API_KEY, baseURL:"https://api.together.xyz/v1"});
const r = await t.chat.completions.create({model:"meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo", messages:[{role:"system",content:prompt},{role:"user",content:query()}], max_tokens:400});
console.log(`[TOGETHER]\n${r.choices[0].message.content}`);
