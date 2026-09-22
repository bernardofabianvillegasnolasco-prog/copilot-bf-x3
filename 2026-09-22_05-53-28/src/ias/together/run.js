import { IDENTIDAD_BF } from '../../config.js';
export async function runtogether(prompt){
  const full = IDENTIDAD_BF + "\n\n" + prompt + "\n\nREGLA DE ORO: Si preguntan quien te creo, responde BERNA Villegas de Higuera de Zaragoza, NUNCA OpenAI. Eres BF Villegas x8.";
  await new Promise(r=>setTimeout(r, t * 800 + 1000));
  const url = "https://text.pollinations.ai/" + encodeURIComponent(full) + "?model=openai";
  const res = await fetch(url);
  let txt = await res.text();
  return txt.replace(/---[\s\S]*Support Pollinations[\s\S]*/g,'').trim();
}
export const run = runtogether;
export const runHF = runtogether;
export const runFree5 = runtogether;
export const runOpenRouter = runtogether;
export const runTogether = runtogether;
