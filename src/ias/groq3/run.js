import { IDENTIDAD_BF } from '../../config.js';
export async function run(prompt){
  const full = IDENTIDAD_BF + "\n\n" + prompt;
  try{
    const res = await fetch(`https://text.pollinations.ai/${encodeURIComponent(full)}?model=openai`);
    let t = await res.text(); return t.replace(/---[\s\S]*Support[\s\S]*/g,'').trim().slice(0,800);
  }catch{ return "Vivo - groq3 HACKER - root@termux:~# - "+prompt.slice(0,100); }
}
