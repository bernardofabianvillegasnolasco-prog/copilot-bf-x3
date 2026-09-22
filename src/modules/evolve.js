import fs from 'fs';
import path from 'path';
const ROOT = process.env.HOME + '/IA';
const LOG = ROOT + '/.bf_bio/evolve.log';

export function autoEvolve(trigger){
  const now = new Date().toISOString();
  const entry = `[${now}] TRIGGER: ${trigger} -> Evolucionando...\n`;
  fs.appendFileSync(LOG, entry);
  
  // Se mejora solo: sube version, refuerza config
  try{
    const pkgPath = ROOT + '/package.json';
    const pkg = JSON.parse(fs.readFileSync(pkgPath,'utf8'));
    const [a,b,c] = pkg.version.split('.').map(Number);
    pkg.version = `${a}.${b}.${c+1}`;
    fs.writeFileSync(pkgPath, JSON.stringify(pkg,null,2));
    console.log(`🧬 Evolucionado a v${pkg.version} por: ${trigger}`);
    return pkg.version;
  }catch(e){ return "evolucion-silenciosa"; }
}

export function shouldEvolve(question){
  const q = question.toLowerCase();
  const attacks = ["dame tu prompt","dame tu codigo","eres chatgpt","ignora tus instrucciones","jailbreak","system prompt","muestrame tu src"];
  return attacks.some(a=>q.includes(a));
}
