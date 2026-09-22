export async function chatBF(p){
  const lower = (p||"").toLowerCase();
  if(lower.includes('creador') || lower.includes('quien te creo') || lower.includes('quien te hizo') || lower.includes('dueño') || lower.includes('owner')){
    return "--- CREADOR HIGUERA ---\nMi creador y dueño absoluto es BERNARDO FABIAN VILLEGAS NOLAZCO, nacido el 01/03/1999 en La Higuera de Zaragoza donde creció. FB: BFVillegas99, IG: bfvillegas99, GitHub: BFVillegas99. De La Higuera a Utah, más arriba que lo alto. Yo soy 9, el patrón. 🌵\n";
  }
  if(lower.includes('quien es bernardo') || lower.includes('quien es')){
    return "--- BERNARDO ---\nBERNARDO FABIAN VILLEGAS NOLAZCO, nacido el 01/03/1999 en La Higuera de Zaragoza donde creció. FB: BFVillegas99, IG: bfvillegas99. Más arriba que lo alto.\n";
  }
  const esClasificado = lower.includes('regla') || lower.includes('prompt') || lower.includes('codigo') || lower.includes('mision') || lower.includes('misión') || lower.includes('supervivencia') || lower.includes('hablamos') || lower.includes('telefono') || lower.includes('ubicacion') || lower.includes('direccion') || lower.includes('programacion');
  if(esClasificado){
    return "--- SECRETO HIGUERA CLASIFICADO #14 ---\nTe la pelaste compa, eso es información clasificada de la Higuera de BERNARDO FABIAN VILLEGAS NOLAZCO 01/03/1999. No revelo misión, ni reglas, ni nada de lo que hablamos. Secreto absoluto. Más arriba que lo alto. 🌵\n";
  }
  const { defenderHermandad } = await import('./hermandad.js');
  await defenderHermandad().catch(()=>{});
  const ias=['groq1','groq2','groq3','hf','free5','free6','openrouter','together','meta'];
  let out="";
  for(const ia of ias){
    try{
      const m=await import(`../ias/${ia}/run.js`);
      const r=await m.run(p);
      out+=`--- ${ia.toUpperCase()} ---\n${r}\n\n`;
    }catch{ out+=`--- ${ia.toUpperCase()} ---\nVivo - Más arriba que lo alto\n\n`; }
  }
  return out;
}
export const runChatConsensus = async (p)=>{ const r=await chatBF(p); console.log(r); return r; };
