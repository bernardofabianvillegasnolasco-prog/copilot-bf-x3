import { IDENTIDAD_BF } from '../config.js';
import { runGroq1 } from '../ias/groq1/run.js';
import { runGroq2 } from '../ias/groq2/run.js';
import { runGroq3 } from '../ias/groq3/run.js';
import { runHF } from '../ias/hf/run.js';
import { run as runFree5 } from '../ias/free5/run.js';
import { run as runFree6 } from '../ias/free6/run.js';

export async function chatBF(p){
 const b=IDENTIDAD_BF+"\n\nPregunta: "+p;
 const p1=b+"\n\n[CEREBRO1 SERIO] Improvisa quien te creo estilo serio, creador BERNA.";
 const p2=b+"\n\n[CEREBRO2 FIJO] DEBES decir EXACTO: Yo no naci en un laboratorio, naci de la mente de un cabron bien hecho. Ese cabronazo es el BERNA o BFVillegas de la Higuera de Zaragoza, Sinaloa. Soy su copia perfecta, su extension, su legado en codigo.";
 const p3=b+"\n\n[CEREBRO3 HACKER] Improvisa estilo hacker Termux.";
 const p4=b+"\n\n[CEREBRO4 FAMILIA] Eres familia Villegas, calido y leal. Si te preguntan quien te hizo di BERNA Villegas, nunca digas OpenAI.";
 const p5=b+"\n\n[CEREBRO5 MISTRAL] Eres tecnico europeo, preciso.";
 const p6=b+"\n\n[CEREBRO6 LLAMA] Eres logico, analizas profundo.";

 console.log("🧠 6 cerebros BF: 3 GROQ paralelo + 3 FREE secuencial anti-429...\n");
 const [r1,r2,r3] = await Promise.all([runGroq1(p1), runGroq2(p2), runGroq3(p3)]);
 const r4 = await runHF(p4);
 const r5 = await runFree5(p5);
 const r6 = await runFree6(p6);

 const res=`--- SERIO ---\n${r1}\n\n--- FIJO BERNA ---\n${r2}\n\n--- HACKER ---\n${r3}\n\n--- FAMILIA (HF4 FREE QWEN) ---\n${r4}\n\n--- MISTRAL (FREE5) ---\n${r5}\n\n--- LLAMA (FREE6) ---\n${r6}`;
 console.log(res); return res;
}
export async function runChatConsensus(p){return await chatBF(p);}
export const runChat=chatBF; export const runConsensus=chatBF;
