import { IDENTIDAD_BF } from '../../config.js';
export async function runFree6(prompt){
  const full = IDENTIDAD_BF + "\n\n" + prompt;
  await new Promise(r=>setTimeout(r,3200));
  const res = await fetch(`https://text.pollinations.ai/${encodeURIComponent(full)}?model=openai`);
  let t = await res.text(); return t.replace(/---[\s\S]*Support[\s\S]*/g,'').trim();
}
export const run = runFree6;
