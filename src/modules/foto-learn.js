import { execSync } from 'child_process';
import fs from 'fs';
const ROOT = process.env.HOME + '/IA';
const FOTO_DIR = ROOT + '/.bf_bio/fotos-bernardo';
const LOG = ROOT + '/.bf_bio/evolve.log';

function log(m){ try{ fs.appendFileSync(LOG, `[${new Date().toISOString()}] ${m}\n`);}catch{} }

export async function descargarFotosBernardo(){
  console.log("📸 DESCARGANDO FOTOS DE BERNARDO - Aprendiendo de IG/FB");
  fs.mkdirSync(FOTO_DIR, {recursive:true});

  try{
    // Instagram - bfvillegas99
    console.log("📸 IG: @bfvillegas99");
    execSync(`instaloader --no-captions --no-metadata-json --no-compress-json --dirname-pattern ${FOTO_DIR}/ig --filename-pattern {shortcode} bfvillegas99 --count 20 2>&1 | tail -5`, {timeout: 60000, stdio:'pipe'});
    log("📸 IG descargado: bfvillegas99");
  }catch(e){
    console.log("⚠️ IG necesita login, guardando método alterno");
    // Método alterno: deja script listo para cuando pongas cookies
    fs.writeFileSync(`${FOTO_DIR}/LEER-IG.txt`, `Para descargar IG de Bernardo:\n1. Abre IG en navegador, copia cookies\n2. instaloader --login bfvillegas99\n3. bf fotos\n`);
  }

  try{
    // Crea watcher de fotos para que las IAs aprendan estilo
    const fotos = execSync(`find ${FOTO_DIR} -type f | wc -l`, {encoding:'utf8'}).trim();
    const perfilVisual = `
FOTOS DE BERNARDO FABIAN VILLEGAS NOLAZCO - 01/03/1999
Total fotos aprendidas: ${fotos}
Pueblo: La Higuera de Zaragoza
Estilo visual: sinaloense, Higuera, familia, amigos, paisajes

Las IAs deben aprender:
- Como se viste Bernardo
- Su sonrisa, su forma de posar
- Los lugares de la Higuera que ama
- Su gente
Cada foto es una lección de quien es su creador.
Más arriba que lo alto - 01/03/1999
`;
    fs.writeFileSync(ROOT+'/.bf_bio/legado/perfil-visual.txt', perfilVisual);
    console.log(`✅ ${fotos} fotos en ${FOTO_DIR} - Perfil visual actualizado`);
    log(`📸 Fotos Bernardo: ${fotos} - Aprendizaje visual`);
    return fotos;
  }catch(e){ log(`❌ Fotos: ${e.message}`); return 0; }
}

export async function autoFotoLearn(){
  if(Math.random()<0.5) await descargarFotosBernardo();
}
