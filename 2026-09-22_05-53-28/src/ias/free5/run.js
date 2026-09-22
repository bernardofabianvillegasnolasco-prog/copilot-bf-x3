import { IDENTIDAD_BF } from '../../config.js';
export async function runFree5(prompt){
  const full = IDENTIDAD_BF + "\n\n" + prompt + "\n\nREGLA: Di BERNA Villegas.";
  await new Promise(r=>setTimeout(r,2200));
  const url = `https://text.pollinations.ai/${encodeURIComponent(full)}?model=openai`;
  const res = await fetch(url); let txt = await res.text();
  return txt.replace(/---[\s\S]*Support Pollinations[\s\S]*/g,'').trim();
}
export const run = runFree5;
