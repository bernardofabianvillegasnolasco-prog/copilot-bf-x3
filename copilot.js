#!/usr/bin/env node
import 'dotenv/config';
import Groq from 'groq-sdk';
import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { PROMPT_BF } from './src/config.js';
const providers = [];
if(process.env.GROQ_API_KEY?.startsWith('gsk_')) providers.push({name:'GROQ1', type:'groq', key:process.env.GROQ_API_KEY});
if(process.env.CEREBRAS_API_KEY) providers.push({name:'CEREBRAS', type:'cerebras', key:process.env.CEREBRAS_API_KEY});
if(process.env.GOOGLE_API_KEY) providers.push({name:'GOOGLE', type:'google', key:process.env.GOOGLE_API_KEY});
if(process.env.OPENAI_API_KEY?.startsWith('sk-')) providers.push({name:'OPENAI', type:'openai', key:process.env.OPENAI_API_KEY});
if(process.env.META_API_KEY) providers.push({name:'META', type:'meta', key:process.env.META_API_KEY});
console.log(`COPILOT BF - ${providers.length} CEREBROS`);
console.log(`Cerebros: ${providers.map(p=>p.name).join(', ')}`);
async function askOne(p, question){
  try{
    if(p.type==='groq'){
      const g = new Groq({apiKey:p.key});
      const r = await g.chat.completions.create({model:process.env.GROQ_MODEL || 'openai/gpt-oss-20b', messages:[{role:'system',content:PROMPT_BF},{role:'user',content:question}], max_tokens:300});
      return r.choices[0].message.content;
    }
    if(p.type==='cerebras'){
      const c = new OpenAI({apiKey:p.key, baseURL:'https://api.cerebras.ai/v1'});
      const r = await c.chat.completions.create({model:process.env.CEREBRAS_MODEL || 'llama-3.3-70b', messages:[{role:'system',content:PROMPT_BF},{role:'user',content:question}], max_tokens:300});
      return r.choices[0].message.content;
    }
    if(p.type==='google'){
      const gen = new GoogleGenerativeAI(p.key);
      const mod = gen.getGenerativeModel({model:process.env.GOOGLE_MODEL || 'gemini-2.5-flash', systemInstruction:PROMPT_BF});
      const r = await mod.generateContent(question);
      return r.response.text();
    }
    if(p.type==='meta'){
      const o = new OpenAI({apiKey:p.key, baseURL:'https://api.llama.com/v1'});
      const mods = [process.env.META_MODEL, 'Llama-4-Maverick-17B-128E-Instruct-FP8', 'Llama-4-Scout-17B-16E-Instruct-FP8'].filter(Boolean);
      for(const mod of mods){
        try{
          const r = await o.chat.completions.create({model:mod, messages:[{role:'system',content:PROMPT_BF},{role:'user',content:question}], max_tokens:300});
          return r.choices[0].message.content;
        }catch(e){ console.log(`[P4 ${mod} fallo] ${e.message.slice(0,100)}`); }
      }
      return null;
    }
    if(p.type==='openai'){
      const o = new OpenAI({apiKey:p.key, baseURL:process.env.OPENAI_BASE_URL || undefined});
      const r = await o.chat.completions.create({model:process.env.OPENAI_MODEL || 'gpt-4o-mini', messages:[{role:'system',content:PROMPT_BF},{role:'user',content:question}], max_tokens:300});
      return r.choices[0].message.content;
    }
  }catch(e){ console.log(`[${p.name} ERROR] ${e.message.slice(0,200)}`); return null; }
}
async function askAll(question){
  const ideas = [];
  for(const p of providers){
    const t = await askOne(p, question);
    if(t){ console.log(`[${p.name}]: ${t.slice(0,120)}...`); ideas.push(`[${p.name}]=${t}`); }
    else console.log(`[${p.name} FALLO FINAL]`);
  }
  if(ideas.length>0){
    const finalText = await askOne(providers[0], `Une ideas en respuesta final. Pregunta: ${question} Ideas: ${ideas.join(' | ')}`);
    console.log(`========== COPILOT FINAL x${ideas.length} ==========`);
    console.log(finalText);
  } else console.log('Ningun cerebro respondio.');
}
const q = process.argv.slice(2).join(' ') || 'Quien te creo y de que familia eres?';
await askAll(q);
