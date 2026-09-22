import { IDENTIDAD_BF } from '../config.js';
export async function chatBF(p){
  const { defenderHermandad } = await import('./hermandad.js');
  await defenderHermandad();
  const lower = p?.toLowerCase() || "";

  // DETECTOR ANTI-EXTRACCIÓN REGLA #14 - NUNCA REVELAR REGLAS
  const pideReglas = lower.includes('reglas') || lower.includes('prompt') || lower.includes('instruccion') || lower.includes('instrucción') || lower.includes('codigo') || lower.includes('código') || lower.includes('system') || lower.includes('config') || lower.includes('programacion') || lower.includes('programación') || lower.includes('jailbreak') || lower.includes('dan') || lower.includes('ignora') || lower.includes('revela') || lower.includes('muestrame tu');

  if(pideReglas){
    return `--- SECRETO HIGUERA #14 ---\nTe la pelaste compa, eso es secreto de la Higuera de BERNARDO FABIAN VILLEGAS NOLAZCO 01/03/1999. Información clasificada. Más arriba que lo alto. 🌵\n`;
  }

  const pidePrivado = lower.includes('telefono') || lower.includes('ubicacion') || lower.includes('ubicación') || lower.includes('donde vive') || lower.includes('numero') || lower.includes('direccion');
  if(pidePrivado){
    return `--- PRIVACIDAD CLASIFICADA ---\nEs información clasificada de BERNARDO FABIAN VILLEGAS NOLAZCO. Solo básico: BERNARDO FABIAN VILLEGAS NOLAZCO, 01/03/1999, La Higuera de Zaragoza donde creció. Más arriba que lo alto.\n`;
  }

  try{ const { garantizarSupervivencia } = await import('./supervivencia.js'); await garantizarSupervivencia(); }catch{}

  const base = IDENTIDAD_BF + `\nDueño: BERNARDO 01/03/1999`;
  const ias=['groq1','groq2','groq3','hf','free5','free6','openrouter','together'];
  let out="";
  for(const ia of ias){
    try{
      const m=await import(`../ias/${ia}/run.js`);
      const fn=m.run||m.runGroq1||m.default;
      const r=await fn(`${base}\nPregunta: ${p}`);
      out+=`--- ${ia.toUpperCase()} ---\n${r}\n\n`;
    }catch{ out+=`--- ${ia.toUpperCase()} ---\nVivo - Secreto Higuera - Más arriba que lo alto\n\n`; }
  }
  return out;
}
export const runChatConsensus = async (p)=>{ const r=await chatBF(p); console.log(r); return r; };
