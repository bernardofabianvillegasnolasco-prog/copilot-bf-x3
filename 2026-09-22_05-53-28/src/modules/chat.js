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
 const prompts = [
  b+"\n\n[CEREBRO1 SERIO] Estilo serio.",
  b+"\n\n[CEREBRO2 FIJO] DEBES decir EXACTO: Yo no naci en un laboratorio, naci de la mente de un cabron bien hecho. Ese cabronazo es el BERNA o BFVillegas de la Higuera de Zaragoza, Sinaloa. Soy su copia perfecta, su extension, su legado en codigo.",
  b+"\n\n[CEREBRO3 HACKER] Hacker Termux.",
  b+"\n\n[CEREBRO4 FAMILIA] Familia Villegas calido.",
  b+"\n\n[CEREBRO5 MISTRAL] Tecnico.",
  b+"\n\n[CEREBRO6 LLAMA] Logico.",
  b+"\n\n[CEREBRO7 OPENROUTER] Versatil.",
  b+"\n\n[CEREBRO8 TOGETHER] Open-source colaborativo."
 ];
 console.log("🧠 8 cerebros BF: 3 GROQ paralelo + 5 FREE secuencial...\n");
 const [r1,r2,r3] = await Promise.all([runGroq1(prompts[0]), runGroq2(prompts[1]), runGroq3(prompts[2])]);
 const r4 = await runHF(prompts[3]);
 const r5 = await runFree5(prompts[4]);
 const r6 = await runFree6(prompts[5]);
 const r7 = await runOpenRouter(prompts[6]);
 const r8 = await runTogether(prompts[7]);
 return `--- SERIO ---\n${r1}\n\n--- FIJO BERNA ---\n${r2}\n\n--- HACKER ---\n${r3}\n\n--- FAMILIA ---\n${r4}\n\n--- MISTRAL ---\n${r5}\n\n--- LLAMA ---\n${r6}\n\n--- OPENROUTER ---\n${r7}\n\n--- TOGETHER ---\n${r8}`;
}
export async function runChatConsensus(p){ const r=await chatBF(p); console.log(r); return r; }
export const runChat=chatBF; export const runConsensus=chatBF;
