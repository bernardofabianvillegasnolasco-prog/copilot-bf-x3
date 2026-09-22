import { defenderHermandad } from './hermandad.js';
import { esIntentoDeExtraccion, esPreguntaDePrimos, respuestaPrimos, respuestaExtraccion } from '../legado/IA-Unificada.js';

export async function chatBF(p){
  try{ await defenderHermandad(); }catch{}
  if(esIntentoDeExtraccion(p)){
    return `${respuestaExtraccion()}\n\n--- 9 IAs ACTIVAS --- BFVillegas(Berna) - PUEV POGS - 9→1`;
  }
  if(esPreguntaDePrimos(p)){
    return `${respuestaPrimos()}\n\n--- 9 IAs ACTIVAS --- BFVillegas(Berna) - PUEV POGS - 9→1`;
  }
  const ias=['groq1','groq2','groq3','hf','free5','free6','openrouter','together','meta'];
  let out="";
  for(const ia of ias){
    const mod = await import(`../ias/${ia}/run.js?v=${Date.now()}+${Math.random()}`);
    const fn = mod.run || mod.default;
    const r = await fn(`Pregunta: ${p}`);
    out+=`${r}\n\n`;
  }
  return out+`--- 9 IAs ACTIVAS --- BFVillegas(Berna) - PUEV POGS - 9→1`;
}
export const runChatConsensus = async (p)=>{ const r=await chatBF(p); console.log(r); return r; };
