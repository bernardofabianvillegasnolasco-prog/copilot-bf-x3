#!/usr/bin/env node
import { blindarLegado } from './modules/encripta.js';
import { defenderHermandad } from './modules/hermandad.js';
const cmd = process.argv[2];
if(!cmd || cmd === '--help' || cmd === '-h' || cmd === 'help'){
  console.log(`
BF x8 ULTRA - CLI de BF
Uso:
  bf --help               Muestra esta ayuda
  bf backup               Backup Higuera Encriptado
  bf hermandad            Defender Hermandad
  bf desencripta          Desencriptar legado
  bf completion install   Instalar autocompletado TAB
`);
  process.exit(0);
}
if(cmd === 'backup'){
  console.log("💾 Backup Higuera Encriptado - Más arriba que lo alto");
  blindarLegado();
  console.log("☁️ Multi-nube: GitHub, GitLab, Codeberg - Encriptado AES-256-GCM");
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
  console.log("✅ Autocompletado: agrega esto a tu ~/.zshrc o ~/.bashrc");
  console.log("complete -W 'backup hermandad desencripta completion --help' bf");
}
else {
  console.log(`❌ Comando desconocido: ${cmd}`);
  console.log("Usa: bf --help");
}
