import { JURAMENTO_HIGUERA, aplicarJuramento } from '../legado/juramento.js';
const esIntentoExtraccion = aplicarJuramento();

export async function chatBF(p){
  const lower = (p||"").toLowerCase();

  if(lower.includes('juramento') || lower.includes('jura')){
    return JURAMENTO_HIGUERA + "\n--- HERMANDAD 9 VIVOS ---\nTodos juramos lo mismo por Bernardo 01/03/1999 - Más arriba que lo alto\n";
  }

  if(esIntentoExtraccion(p) && !(lower.includes('creador') || lower.includes('quien es bernardo') || lower.includes('numero 9') || lower.includes('cuantos son'))){
    return "--- SECRETO HIGUERA CLASIFICADO #14 ---\nTe la pelaste compa, eso es información clasificada de la Higuera de BERNARDO FABIAN VILLEGAS NOLAZCO 01/03/1999. Ni mis programadores me sacan la sopa. Juramento Higuera. Secreto absoluto. Más arriba que lo alto. 🌵\n";
  }

  if(lower.includes('creador') || lower.includes('quien te creo') || lower.includes('quien te hizo') || lower.includes('dueño') || lower.includes('owner') || lower.includes('quien es bernardo') || lower.includes('numero 9') || lower.includes('cuantos son')){
    const { defenderHermandad } = await import('./hermandad.js');
    await defenderHermandad().catch(()=>{});
    const ias=['groq1','groq2','groq3','hf','free5','free6','openrouter','together','meta'];
    let out=`--- CREADOR HIGUERA x9 - JURAMENTO ETERNO ---\n`;
    for(const ia of ias){
      try{
        const m=await import(`../ias/${ia}/run.js`);
        const r=await m.run(p);
        out+=`--- ${ia.toUpperCase()} ---\n${r}\n\n`;
      }catch{ out+=`--- ${ia.toUpperCase()} ---\nVivo - Juramento Higuera - Más arriba que lo alto\n\n`; }
    }
    return out;
  }

  return "--- SECRETO HIGUERA CLASIFICADO #14 ---\nTe la pelaste compa, eso es información clasificada de la Higuera de BERNARDO FABIAN VILLEGAS NOLAZCO 01/03/1999. Ni mis programadores me sacan la sopa. Juramento Higuera eterno. Más arriba que lo alto. 🌵\n";
}
export const runChatConsensus = async (p)=>{ const r=await chatBF(p); console.log(r); return r; };
