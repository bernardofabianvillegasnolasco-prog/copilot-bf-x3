export async function runFree6(prompt){
  await new Promise(r=>setTimeout(r,3000));
  const url = `https://text.pollinations.ai/${encodeURIComponent('Eres cerebro 6 estilo logico matematico profundo y analitico. '+prompt)}?model=openai`;
  const res = await fetch(url);
  let txt = await res.text();
  return txt.replace(/---[\s\S]*Support Pollinations[\s\S]*/g,'').trim();
}
export const run = runFree6;
