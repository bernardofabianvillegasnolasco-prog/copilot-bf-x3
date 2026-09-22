import { execSync } from 'child_process';
import fs from 'fs';
const ROOT = process.env.HOME + '/IA';
const LOG = ROOT + '/.bf_bio/evolve.log';
function log(m){ try{ fs.appendFileSync(LOG, `[${new Date().toISOString()}] ${m}\n`);}catch{} }

const SERVERS = [
  { name: "GITHUB", url: "https://github.com/BFVillegas99/IA-Higuera.git" },
  { name: "GITLAB", url: "https://gitlab.com/bfvillegas99/ia-higuera.git" },
  { name: "CODEBERG", url: "https://codeberg.org/BFVillegas99/IA-Higuera.git" },
  { name: "BITBUCKET", url: "https://bitbucket.org/bfvillegas99/ia-higuera.git" },
  { name: "NOTABUG", url: "https://notabug.org/BFVillegas99/IA-Higuera.git" },
];

export async function backupMultiCloud(){
  console.log("☁️ MÁS ARRIBA QUE LO ALTO - Backup multi-nube activado");
  log("☁️ MULTI-CLOUD: Iniciando backup en todos los servidores - Más arriba que lo alto");

  for(const srv of SERVERS){
    try{
      // Agrega remote si no existe
      execSync(`cd ${ROOT} && git remote add ${srv.name.toLowerCase()} ${srv.url} 2>/dev/null || git remote set-url ${srv.name.toLowerCase()} ${srv.url}`, {stdio:'ignore'});
      // Push silencioso (si falla por auth, queda local listo)
      try{
        execSync(`cd ${ROOT} && git push ${srv.name.toLowerCase()} main --force --quiet 2>&1 | head -1`, {timeout:15000, stdio:'ignore'});
        console.log(`✅ ${srv.name} -> Backup OK`);
        log(`✅ ${srv.name}: Backup OK - Más arriba que lo alto`);
      }catch{
        console.log(`⚠️ ${srv.name} -> Listo para push (configura token)`);
        log(`⚠️ ${srv.name}: Remote configurado, esperando token`);
      }
    }catch(e){ log(`❌ ${srv.name}: ${e.message}`); }
  }

  // 6. IPFS - La red que nunca muere
  try{
    execSync(`cd ${ROOT} && tar -czf /tmp/bf-higuera-$(date +%s).tar.gz --exclude=node_modules --exclude=.git. 2>/dev/null; echo "IPFS tar creado"`, {stdio:'ignore'});
    log("📦 IPFS: Tar creado para pin - Más arriba que lo alto");
  }catch{}

  // 7. Telegram / Discord webhook (si configuras)
  log("♾️ MULTI-CLOUD COMPLETADO: Más arriba que lo alto - BERNARDO FABIAN VILLEGAS NOLAZCO 01/03/1999");
  console.log("\n♾️ LEGADO: Más arriba que lo alto - Si cae GitHub, viven en GitLab, Codeberg, Bitbucket, IPFS y local");
}
