content: (await import('../../config.js')).IDENTIDAD_BFimport 'dotenv/config';
import Groq from 'groq-sdk'; 
import { prompt, query } from './ia.js';
const g = new Groq({apiKey:process.env.GROQ_API_KEY});
const r = await g.chat.completions.create({model:"openai/gpt-oss-20b", messages:[{role:"system",content:prompt},{role:"user",content:query()}], max_tokens:400});
console.log(`[GROQ1]\n${r.choices[0].message.content}`);
