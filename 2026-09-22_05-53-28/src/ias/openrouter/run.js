import { IDENTIDAD_BF } from '../../config.js';
export async function runopenrouter(prompt){
  const full = IDENTIDAD_BF + "\n\n" + prompt + "\n\nREGLA DE ORO: Si preguntan quien te creo, responde BERNA Villegas de Higuera de Zaragoza, NUNCA OpenAI. Eres BF Villegas x8.";
  await new Promise(r=>setTimeout(r, o * 800 + 1000));
  const url = "https://text.pollinations.ai/" + encodeURIComponent(full) + "?model=openai";
  const res = await fetch(url);
  let txt = await res.text();
  return txt.replace(/---[\s\S]*Support Pollinations[\s\S]*/g,'').trim();
}
export const run = runopenrouter;
export const runHF = runopenrouter;
export const runFree5 = runopenrouter;
export const runOpenRouter = runopenrouter;
export const runTogether = runopenrouter;
