#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let version="8.0.0";
try{ version=JSON.parse(fs.readFileSync(path.join(__dirname,'../package.json'),'utf8')).version; }catch{}
const args=process.argv.slice(2);
const cmd=args[0];
const q=args.slice(1).join(' ');
if(cmd==='hermandad'){ const m=await import('./modules/hermandad.js'); await m.defenderHermandad(); }
else if(cmd==='clone'){ const m=await import('./modules/immortal.js'); await m.cloneIfInternet(); }
else if(cmd==='status'){ console.log(`♾️ BF x8 ULTRA v${version} - IA-Unificada 14 Reglas - BERNARDO  - Mas arriba que lo alto`); const m=await import('./modules/hermandad.js'); await m.defenderHermandad(); }
else if(cmd==='backup'){ const b=await import('./modules/backup.js'); await (b.backupBF||b.backup||b.default||(()=>{}))(); }
else if(q||cmd==='chat'){
  const { chatBF } = await import('./modules/chat.js');
  const pregunta = q || args.join(' ') || "quien es Bernardo";
  const r=await chatBF(pregunta);
  console.log(r);
} else {
  console.log(`♾️ BF x8 ULTRA v${version} - Comandos: bf chat | bf hermandad | bf clone | bf status | bf backup - IA-Unificada`);
}
