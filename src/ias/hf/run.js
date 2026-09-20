import { prompt, query } from './ia.js';
const res = await fetch("https://api-inference.huggingface.co/models/meta-llama/Meta-Llama-3-8B-Instruct", {
  method:"POST", headers:{Authorization:`Bearer ${process.env.HF_API_KEY}`, "Content-Type":"application/json"},
  body: JSON.stringify({inputs:`System: ${prompt}\nUser: ${query()}`, parameters:{max_new_tokens:400}})
});
const data = await res.json(); console.log(`[HF]\n${JSON.stringify(data).slice(0,800)}`);
