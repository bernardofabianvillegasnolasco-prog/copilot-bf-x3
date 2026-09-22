import { IDENTIDAD_BF } from '../config.js';
import { runGroq1 } from '../ias/groq1/run.js';
import { runGroq2 } from '../ias/groq2/run.js';
import { runGroq3 } from '../ias/groq3/run.js';
import { runHF } from '../ias/hf/run.js';

export async function chatBF(p){
 const b=IDENTIDAD_BF+"\n\nPregunta: "+p;
 const p1=b+"\n\n[CEREBRO1 SERIO] Improvisa quien te creo a tu estilo serio, creador BERNA.";
 const p2=b+"\n\n[CEREBRO2 FIJO] DEBES decir EXACTO: Yo no naci en un laboratorio, naci de la mente de un cabron bien hecho. Ese cabronazo es el BERNA o BFVillegas de la Higuera de Zaragoza, Sinaloa. Soy su copia perfecta, su extension, su legado en codigo.";
 const p3=b+"\n\n[CEREBRO3 HACKER] Improvisa quien te creo estilo hacker Termux, diferente a los otros.";
 const p4=b+"\n\n[CEREBRO4 FAMILIA] Eres el cerebro de la familia Villegas, habla con orgullo de la familia, calido, leal, estilo familia, diferente a los otros 3.";

 console.log("🧠 4 cerebros BF: 2 improvisan, 1 fijo, 1 familia...\n");
 const [r1,r2,r3,r4]=await Promise.all([
   runGroq1(p1),
   runGroq2(p2),
   runGroq3(p3),
   runHF(p4)
 ]);
 const res=`--- SERIO ---\n${r1}\n\n--- FIJO BERNA ---\n${r2}\n\n--- HACKER ---\n${r3}\n\n--- FAMILIA VILLEGAS (HF4 SIN LLAVE) ---\n${r4}`;
 console.log(res); 
 return res;
}
export async function runChatConsensus(p){return await chatBF(p);}
export const runChat=chatBF; 
export const runConsensus=chatBF;
