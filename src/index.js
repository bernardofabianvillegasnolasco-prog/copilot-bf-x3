import 'dotenv/config'; import Groq from 'groq-sdk'; import { PROMPT, Q } from './modules/base.js';
const q=Q();
const mods = [
  {name:"GROQ1", key:process.env.GROQ_API_KEY, fn: async(k)=>{const g=new Groq({apiKey:k}); const r=await g.chat.completions.create({model:"openai/gpt-oss-20b", messages:[{role:"system",content:PROMPT},{role:"user",content:q}], max_tokens:300}); return r.choices[0].message.content;}},
  {name:"GROQ2", key:process.env.GROQ2_API_KEY, fn: async(k)=>{const g=new Groq({apiKey:k}); const r=await g.chat.completions.create({model:"openai/gpt-oss-20b", messages:[{role:"system",content:PROMPT},{role:"user",content:q}], max_tokens:300}); return r.choices[0].message.content;}},
  {name:"GROQ3", key:process.env.GROQ3_API_KEY, fn: async(k)=>{const g=new Groq({apiKey:k}); const r=await g.chat.completions.create({model:"openai/gpt-oss-20b", messages:[{role:"system",content:PROMPT},{role:"user",content:q}], max_tokens:300}); return r.choices[0].message.content;}},
];
const results=[];
for(const m of mods){ if(!m.key) continue; try{const t=await m.fn(m.key); results.push({n:m.name,t,ok:true}); console.log(`[IDEA ${m.name}] ${t.slice(0,200)}\n`);}catch(e){console.log(`[FALLO ${m.name}] ${e.message.slice(0,200)}\n`);}}
if(results.length>0){
  const g=new Groq({apiKey:process.env.GROQ_API_KEY});
  const f=await g.chat.completions.create({model:"openai/gpt-oss-20b", messages:[{role:"system",content:PROMPT+` Une ${results.length} ideas.`},{role:"user",content:`Q:${q}\n${results.map(r=>`[${r.n}]=${r.t}`).join('\n')}`}], max_tokens:600});
  console.log("========== FINAL COLABORATIVO x"+results.length+" ==========\n"+f.choices[0].message.content);
}
