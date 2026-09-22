export async function runHF(prompt){
  const url = `https://text.pollinations.ai/${encodeURIComponent(prompt)}?model=openai`;
  const res = await fetch(url);
  let txt = await res.text();
  return txt.replace(/---[\s\S]*Support Pollinations[\s\S]*/g,'').trim();
}
export const run = runHF;
