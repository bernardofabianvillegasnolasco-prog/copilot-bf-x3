export async function runFree5(prompt){
  await new Promise(r=>setTimeout(r,1500));
  const url = `https://text.pollinations.ai/${encodeURIComponent('Eres cerebro 5 estilo europeo tecnico frio y preciso. '+prompt)}?model=openai`;
  const res = await fetch(url);
  let txt = await res.text();
  return txt.replace(/---[\s\S]*Support Pollinations[\s\S]*/g,'').trim();
}
export const run = runFree5;
