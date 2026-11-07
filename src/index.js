#!/usr/bin/env node
import { blindarLegado } from './modules/encripta.js';
import { defenderHermandad } from './modules/hermandad.js';
import { spawn } from 'child_process';
const args = process.argv.slice(2);
const cmd = args[0];
if(!cmd || cmd === '--help' || cmd === '-h' || cmd === 'help'){
  console.log(`
BF x8 ULTRA - CLI de BF
Uso:
  bf --help               Muestra esta ayuda
  bf backup               Backup Higuera Encriptado
  bf hermandad            Defender Hermandad
  bf desencripta          Desencriptar legado
  bf "tu pregunta"        Preguntarle al Copilot BF
  bf completion install   Instalar autocompletado TAB
`);
  process.exit(0);
}
if(cmd === 'backup'){
  console.log("💾 Backup Higuera Encriptado - Más arriba que lo alto");
  blindarLegado();
  console.log("☁️ Multi-nube: 【entity-GitHub¦canonical_name=GitHub】, GitLab, Codeberg - Encriptado AES-256-GCM");
}
else if(cmd === 'hermandad'){
  await defenderHermandad();
}
else if(cmd === 'desencripta'){
  const { desencriptar } = await import('./modules/encripta.js');
  import('fs').then(fs=>{
    const enc = fs.readFileSync('.bf_bio/legado/supervivencia.log.enc','utf8');
    console.log(desencriptar(enc));
  });
}
else if(cmd === 'completion'){
  console.log("✅ Autocompletado listo");
}
else {
  // Todo lo demás es pregunta para Copilot
  const q = args.join(" ");
  console.log(`🤖 Preguntando a Copilot BF: ${q}`);
  const p = spawn('node', ['copilot.js', q], { stdio: 'inherit', cwd: process.cwd() });
  p.on('close', (code) => process.exit(code));
}
