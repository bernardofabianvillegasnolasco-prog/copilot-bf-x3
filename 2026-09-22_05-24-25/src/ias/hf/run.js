export async function runHF(prompt){
  const url = `https://text.pollinations.ai/${encodeURIComponent(prompt)}?model=openai`;
  const res = await fetch(url, { headers: { "User-Agent": "BF-Villegas-x4" } });
  let txt = await res.text();
  // Limpia el Ad
  txt = txt.replace(/---[\s\S]*Support Pollinations\.AI[\s\S]*/g,'').trim();
  return txt;
}
export const run = runHF;
