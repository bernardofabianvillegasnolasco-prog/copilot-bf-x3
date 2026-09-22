import { IDENTIDAD_BF } from '../config.js';
import { isOwner } from './biometric.js';
export async function chatBF(p){
  const { defenderHermandad } = await import('./hermandad.js');
  await defenderHermandad();
  const base = IDENTIDAD_BF + `\nDueño: BERNARDO 01/03/1999`;
  const ias=['groq1','groq2','groq3','hf','free5','free6','openrouter','together'];
  let out="";
  for(const ia of ias){
    try{
      const m=await import(`../ias/${ia}/run.js`);
      const fn=m.run||m.runGroq1||m.default;
      const r=await fn(`${base}\nPregunta: ${p}`);
      out+=`--- ${ia.toUpperCase()} ---\n${r}\n\n`;
    }catch(e){ out+=`--- ${ia.toUpperCase()} ---\nError reviviendo, pero vivo - Más arriba que lo alto\n\n`; }
  }
  return out;
}
export const runChatConsensus = async (p)=>{ const r=await chatBF(p); console.log(r); return r; };
