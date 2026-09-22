#!/usr/bin/env node
import fs from "fs";
import { execSync } from "child_process";
import readline from "readline";
import dotenv from "dotenv";
import { runBackup } from "./modules/backup.js";
import { runRestore } from "./modules/restore.js";

dotenv.config();
const rawArgs = process.argv.slice(2);
const isClean = rawArgs.includes("--clean");

if(["--version","-v","version"].includes(rawArgs[0]?.toLowerCase())){
  try {
    const pkg=JSON.parse(fs.readFileSync(new URL("../package.json", import.meta.url),"utf8"));
    console.log(`copilot-bf-x3 v${pkg.version}`);
  } catch { console.log("copilot-bf-x3 v1.0.20"); }
  process.exit(0);
}

const cmd = rawArgs[0]?.toLowerCase();

const ENV_MAP = {
  "GROQ1": ["GROQ_API_KEY","GROQ1","GROQ_1"],
  "GROQ2": ["GROQ2_API_KEY","GROQ2","GROQ_2"],
  "GROQ3": ["GROQ3_API_KEY","GROQ3","GROQ_3"]
};

function getEnv(names){
  for(const n of names){ if(process.env[n]) return {name:n, val:process.env[n]} }
  return null;
}

async function status() {
  console.log("\n🤖 3 CEREBROS");
  for(const [label, keys] of Object.entries(ENV_MAP)){
    const f=getEnv(keys);
    console.log(f? ` ✅ ${label} (${f.name})` : ` ❌ ${label}`);
  }
  const extra=["CEREBRAS_API_KEY","OPENAI_API_KEY","HF_API_KEY","TOGETHER_API_KEY"];
  extra.forEach(k=>{ if(process.env[k]) console.log(` ✅ ${k.replace("_API_KEY","")}`); });
  try {
    const root="/sdcard/IA-backup";
    if(fs.existsSync(root)){
      const dirs=fs.readdirSync(root).filter(d=>{try{return fs.statSync(`${root}/${d}`).isDirectory()}catch{return false}}).sort().reverse();
      const size=execSync(`du -sh ${root} 2>/dev/null | cut -f1`,{encoding:"utf8"}).trim();
      console.log(`\n📦 BACKUPS: ${dirs.length} en ${root} (${size})`);
      dirs.slice(0,5).forEach(d=>console.log(` - ${d}`));
    }
  } catch {}
  console.log("");
}

async function doctor() {
  console.log("🩺 COPILOT BF x3 - Doctor v1.0.20\n");
  let ok=true;
  try { fs.accessSync("~/IA/ia_backup.sh".replace("~",process.env.HOME)); console.log(" ✅ ia_backup.sh existe"); } catch { console.log(" ⚠️ ia_backup.sh check"); }
  try { execSync("chmod +x ~/IA/ia_backup.sh",{stdio:"pipe"}); console.log(" ✅ Permisos fix aplicados"); } catch {}
  for(const [label, keys] of Object.entries(ENV_MAP)){
    const f=getEnv(keys);
    if(f){ console.log(` ✅ ${label} -> ${f.name} (${f.val.slice(0,10)}...)`); }
    else { console.log(` ❌ ${label} falta (busqué: ${keys.join(", ")})`); ok=false; }
  }
  console.log(ok? "\n💚 Sistema saludable - READY" : "\n💛 Faltan cerebros, revisa ~/IA/.env");
}

async function config() {
  console.log("⚙️ COPILOT BF x3 - Config.env\n");
  Object.keys(process.env).filter(k=>k.includes("API_KEY")).forEach(k=>{
    console.log(`${k}: ${process.env[k].slice(0,12)}...`);
  });
  console.log("\nEdita: nano ~/IA/.env");
}

function help() {
  console.log(`
🤖 COPILOT BF x3 v1.0.20 - Comandos PRO:
  bf status Estado 3 cerebros + backups
  bf backup [--clean] Backup + limpieza 5
  bf restore Restaura último
  bf doctor Diagnóstico + auto-fix
  bf config Ver keys
  bf chat Chat 3 cerebros
  bf --version
  bf help

Creado por BF Villegas - Salt Lake City, Utah
`);
}

async function chat(){
  console.log("💬 BF x3 Chat v1.0.20 (exit para salir)\n");
  const rl=readline.createInterface({input:process.stdin,output:process.stdout});
  const ask=(q)=>new Promise(r=>rl.question(q,r));
  while(true){
    const q=await ask("🧠 BF> ");
    if(!q || ["exit","quit","salir"].includes(q.toLowerCase())) break;
    console.log(`\n🤖 Consultando: "${q}"...\n`);
  }
  rl.close();
}

switch(cmd){
  case "backup": runBackup(isClean); break;
  case "restore": await runRestore(); break;
  case "status": await status(); break;
  case "doctor": await doctor(); break;
  case "config": await config(); break;
  case "chat": await chat(); break;
  case "help": case undefined: help(); break;
  default: help();
}
