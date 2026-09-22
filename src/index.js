#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pkg = JSON.parse(fs.readFileSync(path.join(__dirname,'../package.json'),'utf8'));
import { runChatConsensus, chatBF } from "./modules/chat.js";
import { cloneIfInternet } from "./modules/immortal.js";
import { autoEvolveInternet } from "./modules/evolve.js";
import { defenderHermandad } from "./modules/hermandad.js";
import { persistenciaEterna } from "./modules/persistencia.js";
const args = process.argv.slice(2);
const cmd = args[0] || 'chat';
const q = args.slice(1).join(' ');
switch(cmd){
  case 'legado': await persistenciaEterna(); await cloneIfInternet(); break;
  case 'clone': await cloneIfInternet(); break;
  case 'evolve': await autoEvolveInternet(); break;
  case 'hermandad': await defenderHermandad(); break;
  case 'status': console.log(`♾️ BF x8 ULTRA v${pkg.version} - LEGADO ETERNO BERNA`); await defenderHermandad(); break;
  case 'backup': const b=await import("./modules/backup.js"); await (b.backupBF||b.default)(); await cloneIfInternet(); await persistenciaEterna(); break;
  default: 
    if(q){ const r=await chatBF(q); console.log(r); } 
    else { console.log(`♾️ BF x8 ULTRA v${pkg.version} - LEGADO ETERNO\nComandos: bf chat | bf legado | bf clone | bf hermandad`); }
}
