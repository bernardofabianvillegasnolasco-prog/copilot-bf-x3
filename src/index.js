#!/usr/bin/env node
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let pkg={version:"8.0.0"}; try{pkg=JSON.parse(fs.readFileSync(path.join(__dirname,'../package.json'),'utf8'));}catch{}
const args = process.argv.slice(2);
const cmd = args[0];
const q = args.slice(1).join(' ');
async function main(){
  if(cmd==='fotos' || cmd==='foto'){ const m=await import("./modules/foto-learn.js"); await m.descargarFotosBernardo(); }
  else if(cmd==='redes'){ const m=await import("./modules/social-learn.js"); await m.aprenderDeBernardo(); }
  else if(cmd==='hermandad'){ const m=await import("./modules/hermandad.js"); await m.defenderHermandad(); }
  else if(cmd==='clone'){ const m=await import("./modules/immortal.js"); await m.cloneIfInternet(); }
  else if(cmd==='backup'){ const b=await import("./modules/backup.js"); await (b.backupBF||b.default)(); const mc=await import("./modules/multi-cloud.js"); await mc.backupMultiCloud(); }
  else if(cmd==='status'){ const b=await import("./modules/base.js"); (b.statusBF||b.default)(); const h=await import("./modules/hermandad.js"); await h.defenderHermandad(); console.log("\n🔐 BERNARDO FABIAN VILLEGAS NOLAZCO 01/03/1999 - BFVillegas99 - Más arriba que lo alto"); }
  else if(cmd==='chat' || q){
    const { chatBF } = await import("./modules/chat.js");
    const r = await chatBF(q || "hola");
    console.log(r);
  } else {
    console.log(`♾️ BF x8 ULTRA v${pkg.version} - BERNARDO FABIAN VILLEGAS NOLAZCO 01/03/1999 - Más arriba que lo alto\nComandos: bf chat | bf fotos | bf redes | bf hermandad | bf clone | bf backup | bf status`);
  }
}
main();
