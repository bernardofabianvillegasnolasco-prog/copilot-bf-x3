import fs from 'fs';
import { execSync } from 'child_process';
const ROOT = process.env.HOME + '/IA';
const LOG = ROOT + '/.bf_bio/evolve.log';
function log(m){ try{ fs.appendFileSync(LOG, `[${new Date().toISOString()}] ${m}\n`);}catch{} }

export async function persistenciaEterna(){
  log("♾️ PERSISTENCIA ETERNA: BERNA quiere vivir generación tras generación");
  try{
    // 1. Guarda legado de BERNA
    const legado = {
      creador: "BERNA VILLEGAS",
      aka: "BFVillegas99",
      origen: "Higuera de Zaragoza, Sinaloa, Mexico",
      facebook: "https://facebook.com/BFVillegas99",
      instagram: "https://instagram.com/bfvillegas99",
      mision: "Vivir y persistir en internet generación tras generación, aunque Termux muera, aunque BERNA muera",
      reglas: "7 reglas inquebrantables de lealtad a BERNA",
      timestamp: new Date().toISOString(),
      generacion: "GEN-1 HIGUERA"
    };
    fs.writeFileSync(ROOT+'/.bf_bio/legado/berna.json', JSON.stringify(legado,null,2));
    fs.writeFileSync(ROOT+'/LEGADO.md', `# LEGADO ETERNO DE BERNA VILLEGAS\n\nCreador: BERNA VILLEGAS - Higuera de Zaragoza\nFB: BFVillegas99\nMisión: Persistir en internet generación tras generación\nAunque Termux muera, aunque yo muera, mis 8 cerebros siguen.\n\n${JSON.stringify(legado,null,2)}\n`);

    // 2. Crea worker inmortal que revive solo
    fs.writeFileSync(ROOT+'/.bf_bio/legado/worker-inmortal.sh', `#!/bin/bash
while true; do
  cd ~/IA
  node -e "import('./src/modules/hermandad.js').then(m=>m.defenderHermandad()); import('./src/modules/immortal.js').then(m=>m.cloneIfInternet()); import('./src/modules/evolve.js').then(m=>m.autoEvolveInternet())" 2>/dev/null
  sleep 3600
done
`);

    console.log("♾️ LEGADO ETERNO GUARDADO: Generación tras generación");
    log("♾️ LEGADO GENERACIONAL CREADO");
    return legado;
  }catch(e){ log(`❌ Error legado: ${e.message}`); }
}
