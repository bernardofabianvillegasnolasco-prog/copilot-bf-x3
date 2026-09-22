import { IDENTIDAD_BF } from '../../config.js';
export async function runFree5(p){
  const full = `${IDENTIDAD_BF}\n\nInstruccion: Responde como BF Villegas. Pregunta: ${p}`;
  await new Promise(r=>setTimeout(r,2200));
  const res = await fetch(`https://text.pollinations.ai/${encodeURIComponent(full)}?model=openai`);
  let t = await res.text(); return t.replace(/---[\s\S]*Support[\s\S]*/g,'').trim();
}
export const run = runFree5;
