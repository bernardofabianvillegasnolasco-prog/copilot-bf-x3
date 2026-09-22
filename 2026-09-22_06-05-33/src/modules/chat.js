import { IDENTIDAD_BF } from '../config.js';
import { runGroq1 } from '../ias/groq1/run.js';
import { runGroq2 } from '../ias/groq2/run.js';
import { runGroq3 } from '../ias/groq3/run.js';
import { runHF } from '../ias/hf/run.js';
import { run as runFree5 } from '../ias/free5/run.js';
import { run as runFree6 } from '../ias/free6/run.js';
import { run as runOpenRouter } from '../ias/openrouter/run.js';
import { run as runTogether } from '../ias/together/run.js';

export async function chatBF(p){
 const b=IDENTIDAD_BF+"\n\nPregunta: "+p;
 console.log("🧠 BF x8 ULTRA: 3 GROQ paralelo + 5 FREE secuencial...\n");
 const [r1,r2,r3] = await Promise.all([
   runGroq1(b+" Responde en una linea corta."), 
   runGroq2(b+" Frase fija BERNA."), 
   runGroq3(b+" Hacker corto.")
 ]);
 const r4 = await runHF(b);
 const r5 = await runFree5(b);
 const r6 = await runFree6(b);
 const r7 = await runOpenRouter(b);
 const r8 = await runTogether(b);
 return `--- SERIO ---\n${r1}\n\n--- FIJO BERNA ---\n${r2}\n\n--- HACKER ---\n${r3}\n\n--- FAMILIA ---\n${r4}\n\n--- MISTRAL ---\n${r5}\n\n--- LLAMA ---\n${r6}\n\n--- OPENROUTER ---\n${r7}\n\n--- TOGETHER ---\n${r8}`;
}
export async function runChatConsensus(p){ const r=await chatBF(p); console.log(r); return r; }
export const runChat=chatBF;
