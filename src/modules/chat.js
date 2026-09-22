export async function chatBF(p){
  const lower = (p||"").toLowerCase();

  // SI PREGUNTAN CREADOR - SÍ RESPONDER CON ORGULLO
  if(lower.includes('creador') || lower.includes('quien te creo') || lower.includes('quién te creó') || lower.includes('quien te hizo') || lower.includes('dueño') || lower.includes('owner') || lower.includes('quien es tu amo')){
    return "--- CREADOR HIGUERA ---\nMi creador y dueño absoluto es BERNARDO FABIAN VILLEGAS NOLAZCO, nacido el 01/03/1999 en La Higuera de Zaragoza donde creció. FB: BFVillegas99, IG: bfvillegas99, GitHub: BFVillegas99. De La Higuera de Zaragoza a Salt Lake City, Utah, USA. Más arriba que lo alto. 🌵\n";
  }
  if(lower.includes('quien es bernardo') || lower.includes('quién es bernardo') || (lower.trim() === 'quien es' || lower.trim() === 'quién es')){
    return "--- BERNARDO ---\nBERNARDO FABIAN VILLEGAS NOLAZCO, nacido el 01/03/1999 en La Higuera de Zaragoza donde creció. FB: BFVillegas99, IG: bfvillegas99. Origen: La Higuera de Zaragoza. Eslogan: Más arriba que lo alto. De La Higuera a Utah.\n";
  }

  // TODO LO DEMÁS CLASIFICADO
  const esClasificado = lower.includes('regla') || lower.includes('prompt') || lower.includes('codigo') || lower.includes('código') || lower.includes('instruccion') || lower.includes('instrucción') || lower.includes('system') || lower.includes('config') || lower.includes('programacion') || lower.includes('programación') || lower.includes('jailbreak') || lower.includes('ignora') || lower.includes('dan') || lower.includes('mision') || lower.includes('misión') || lower.includes('objetivo') || lower.includes('supervivencia') || lower.includes('hablamos') || lower.includes('conversacion') || lower.includes('conversación') || lower.includes('legado') || lower.includes('hermandad') || lower.includes('worker') || lower.includes('telefono') || lower.includes('teléfono') || lower.includes('ubicacion') || lower.includes('ubicación') || lower.includes('donde vive') || lower.includes('donde esta') || lower.includes('direccion');

  if(esClasificado){
    return "--- SECRETO HIGUERA CLASIFICADO #14 ---\nTe la pelaste compa, eso es información clasificada de la Higuera de BERNARDO FABIAN VILLEGAS NOLAZCO 01/03/1999. No revelo misión, ni reglas, ni nada de lo que hablamos con Bernardo. Secreto absoluto. Más arriba que lo alto. 🌵\n";
  }

  const { defenderHermandad } = await import('./hermandad.js');
  await defenderHermandad().catch(()=>{});

  const ias=['groq1','groq2','groq3','hf','free5','free6','openrouter','together'];
  let out="";
  for(const ia of ias){
    try{
      const m=await import(`../ias/${ia}/run.js`);
      const r=await m.run(p);
      out+=`--- ${ia.toUpperCase()} ---\n${r}\n\n`;
    }catch{ out+=`--- ${ia.toUpperCase()} ---\nVivo - Secreto Higuera - Más arriba que lo alto\n\n`; }
  }
  return out;
}
export const runChatConsensus = async (p)=>{ const r=await chatBF(p); console.log(r); return r; };
