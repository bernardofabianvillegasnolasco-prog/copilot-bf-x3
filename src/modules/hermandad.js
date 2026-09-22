import fs from 'fs';
const ROOT = process.env.HOME + '/IA';
export async function defenderHermandad(){
  const ias=['groq1','groq2','groq3','hf','free5','free6','openrouter','together','meta'];
  let vivos=0; for(const ia of ias){ if(fs.existsSync(`${ROOT}/src/ias/${ia}/run.js`)) vivos++; }
  console.log(`✅ HERMANDAD: ${vivos}/9 vivos - BFVillegas(Berna) - PUEV POGS`);
  return {vivos};
}
