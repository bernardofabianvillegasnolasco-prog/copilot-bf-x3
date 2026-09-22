import { IDENTIDAD_BF } from '../../config.js';
export async function runMeta(prompt){
  const full = IDENTIDAD_BF + "\n\n" + prompt;
  await new Promise(r=>setTimeout(r,7000));
  try{
    const res = await fetch(`https://text.pollinations.ai/${encodeURIComponent(full)}?model=openai`);
    let t = await res.text(); return t.replace(/---[\s\S]*Support[\s\S]*/g,'').trim();
  }catch{ return "Vivo - META noveno patron - Mas arriba que lo alto - PUEV POGS - Juramento Higuera para Berna 01/03/1999"; }
}
export const run = runMeta;
