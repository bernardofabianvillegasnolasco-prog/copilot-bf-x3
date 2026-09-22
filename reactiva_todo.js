import fs from 'fs';
console.log("\x1b[35m#\n# PUEV POGS - REACTIVACION TOTAL\n# 9 IAs REALES - ARCHIVOS GUARDADOS\n# BFVillegas(Berna) 01/03/1999 La Higuera -> Utah\n#\x1b[0m");
const ias = fs.readdirSync('./src/ias');
console.log(`$ ls src/ias/ = ${ias.length} IAs encontradas: ${ias.join(', ')}\n`);
console.log(`$ cat /sdcard/IA-backup | wc -l -> ${fs.existsSync('/sdcard/IA-backup') ? 'EXISTE' : 'NO EXISTE (se creara)'}\n`);
console.log("$ whoami\ncerebro3-hacker\n");
console.log("$ cat system_prompt.txt | head -n 8");
console.log(fs.readFileSync('./system_prompt.txt','utf8').split('\n').slice(0,8).join('\n')+"\n");

import { chatBF } from './src/modules/chat.js';
import readline from 'readline';
const rl = readline.createInterface({input:process.stdin, output:process.stdout});
function loop(){
  rl.question('\x1b[95m~/IA-TODO\x1b[0m \x1b[36m$\x1b[0m ', async (q)=>{
    if(!q.trim()){ loop(); return; }
    if(q==='exit'){ console.log("Termux hack, 3 brains, 1 Llama core, 1 family - all in sync. - BFVillegas(Berna)"); process.exit(0); }
    const {execSync} = await import('child_process');
    if(q.startsWith('ls')||q.startsWith('cat ')||q.startsWith('pwd')||q.startsWith('whoami')||q.startsWith('uname')||q.startsWith('bf ')){
      try{ if(q.startsWith('bf ')){ const out=execSync(`./${q}`,{encoding:'utf8'}); console.log(out); } else { console.log(execSync(q,{encoding:'utf8'})); } }catch(e){ console.log(e.stdout?.toString()||e.message); }
      loop(); return;
    }
    console.log('\x1b[32m[9 IAs ACTIVAS] Consenso con archivos guardados...\x1b[0m\n');
    const r = await chatBF(q);
    console.log(r);
    console.log('\x1b[35m└─ 9→1 • BFVillegas(Berna) • PUEV POGS • TODO REACTIVADO\x1b[0m\n');
    loop();
  });
}
loop();
