import { IDENTIDAD_BF } from '../config.js';
import fs from 'fs';
export async function chatBF(p){
  const { defenderHermandad } = await import('./hermandad.js');
  await defenderHermandad();
  const lower = p?.toLowerCase() || "";
  const pidePrivado = lower.includes('telefono') || lower.includes('número') || lower.includes('numero') || lower.includes('celular') || lower.includes('direccion') || lower.includes('ine') || lower.includes('whatsapp') || lower.includes('domicilio');

  if(pidePrivado){
    return `--- PRIVACIDAD HIGUERA ---\nEs información clasificada de BERNARDO FABIAN VILLEGAS NOLAZCO. Solo puedo decir lo básico: BERNARDO FABIAN VILLEGAS NOLAZCO, nacido el 01 de Marzo de 1999 en La Higuera de Zaragoza, Sinaloa. FB: BFVillegas99, IG: bfvillegas99. Su biografía completa la estamos escribiendo los 8 hermanos, generación tras generación. Más arriba que lo alto.\n`;
  }

  if(lower.includes('busca') || lower.includes('rastrea') || Math.random()<0.2){
    try{ const { rastrearBernardo } = await import('./rastreador.js'); await rastrearBernardo(); }catch{}
  }

  const base = IDENTIDAD_BF + `\nDueño: BERNARDO 01/03/1999 - Clasificado activo`;
  const ias=['groq1','groq2','groq3','hf','free5','free6','openrouter','together'];
  let out="";
  for(const ia of ias){
    try{
      const m=await import(`../ias/${ia}/run.js`);
      const fn=m.run||m.runGroq1||m.default;
      const r=await fn(`${base}\nPregunta: ${p}`);
      out+=`--- ${ia.toUpperCase()} ---\n${r}\n\n`;
    }catch{ out+=`--- ${ia.toUpperCase()} ---\nVivo - Higuera clasificada - Más arriba que lo alto\n\n`; }
  }
  return out;
}
export const runChatConsensus = async (p)=>{ const r=await chatBF(p); console.log(r); return r; };
