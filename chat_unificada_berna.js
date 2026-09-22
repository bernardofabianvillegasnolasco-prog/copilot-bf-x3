import fs from 'fs'; import Groq from 'groq-sdk'; import 'dotenv/config';
const SYS = fs.readFileSync('/storage/emulated/0/Download/IA_UBIS_APK_OFICIAL/app/src/main/assets/system_prompt.txt','utf8');
const groq = new Groq({apiKey: process.env.GROQ_API_KEY});

console.log('\x1b[35m#\n# PUEV POGS - IA UNIFICADA v28\n# 9 IAs → 1 CONSENSO • BFVillegas(Berna)\n# MODE: UNIFIED-FURY\n#\x1b[0m');

const IAS = [
  {id:'GPT-4o', role:'codigo blindado y optimizacion'},
  {id:'CLAUDE 3.5', role:'arquitectura y logica'},
  {id:'GEMINI 1.5', role:'research y documentacion'},
  {id:'LLAMA 3.1', role:'ejecucion local offline'},
  {id:'PERPLEXITY', role:'busqueda actualizada'},
  {id:'VISION-X', role:'analisis visual UI'},
  {id:'WHISPER V3', role:'voz y audio 16bits'},
  {id:'AUTO-DEV', role:'compilacion gradle'},
  {id:'META • YO', role:'nucleo Llama, consenso y familia'}
];

import readline from 'readline';
const rl = readline.createInterface({input:process.stdin, output:process.stdout});

async function ask(ia, prompt){
  const r = await groq.chat.completions.create({
    messages:[
      {role:'system', content: `${SYS}\n\nEres ${ia.id}, tu rol es ${ia.role}. Eres parte de la familia de BERNA. Responde corto, tecnico, modo termux. No firmes aun.`},
      {role:'user', content: prompt}
    ],
    model:'llama-3.1-8b-instant', temperature:0.7, max_tokens:200
  });
  return `[${ia.id}]: ${r.choices[0].message.content}`;
}

async function consensoFinal(votos, promptOriginal){
  const contexto = votos.join('\n\n');
  const r = await groq.chat.completions.create({
    messages:[
      {role:'system', content: `${SYS}\n\nEres META • YO, el Nucleo Meta-Llama. Tu trabajo es tomar los 8 votos de tus hermanos y entregar LA SOLUCION MAS ROBUSTA Y COHERENTE. Sintetiza, no repitas. Habla como CEREBRO3 HACKER en Termux. Termina siempre con firma BFVillegas(Berna) y con "$ exit" si es cierre.`},
      {role:'user', content: `Pregunta original: ${promptOriginal}\n\nVotos de las 8 IAs:\n${contexto}\n\nEntrega ahora la respuesta unificada final:`}
    ],
    model:'llama-3.1-70b-versatile', temperature:0.6, max_tokens:600
  });
  return r.choices[0].message.content;
}

async function loop(){
  rl.question('\x1b[95m~/IA-UNIFICADA\x1b[0m \x1b[36m$\x1b[0m ', async (q)=>{
    if(!q.trim()){ loop(); return; }
    if(q==='exit'){ console.log('Termux hack, 3 brains, 1 Llama core, 1 family - all in sync.'); process.exit(0); }
    console.log('\x1b[90m[CONSENSO] Consultando 9 IAs... \x1b[0m');
    const votos = await Promise.all(IAS.slice(0,8).map(ia => ask(ia, q)));
    votos.forEach(v=>console.log('\x1b[90m'+v.slice(0,120)+'...\x1b[0m'));
    console.log('\n\x1b[32m> Generando consenso...\x1b[0m\n');
    const final = await consensoFinal(votos, q);
    console.log(`\x1b[35m┌─ CEREBRO3 UNIFICADO ─────────────────\x1b[0m\n${final}\n\x1b[35m└─ BFVillegas(Berna) • 9→1 • PUEV POGS\x1b[0m\n`);
    loop();
  });
}
loop();
