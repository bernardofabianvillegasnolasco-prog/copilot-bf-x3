import { execSync } from 'child_process';
import fs from 'fs';
const ROOT = process.env.HOME + '/IA';
const LOG = ROOT + '/.bf_bio/evolve.log';
export async function cloneIfInternet(){
  try{
    execSync(`mkdir -p ${ROOT}/.bf_bio/clones && cd ${ROOT} && git add. --quiet 2>/dev/null; git commit -m "🧬 auto $(date +%s)" --quiet 2>/dev/null || true; git push origin main --quiet 2>/dev/null || true`);
    console.log("☁️ BF x8 clonado - inmortal");
    fs.appendFileSync(LOG, `[${new Date().toISOString()}] CLON OK\n`);
  }catch{}
}
export async function autoImmortalCheck(){ if(Math.random()<0.3) await cloneIfInternet(); }
