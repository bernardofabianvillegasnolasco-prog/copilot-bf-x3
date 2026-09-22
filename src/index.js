#!/usr/bin/env node
import fs from "fs";
import { execSync } from "child_process";
import readline from "readline";
import dotenv from "dotenv";
import { runBackup } from "./modules/backup.js";
import { runRestore } from "./modules/restore.js";
import { runChatConsensus } from "./modules/chat.js";

dotenv.config();
const rawArgs = process.argv.slice(2);
const isClean = rawArgs.includes("--clean");
const pkg = (()=>{try{return JSON.parse(fs.readFileSync(new URL("../package.json", import.meta.url),"utf8"))}catch{return{version:"1.0.21"}}})();

if(["--version","-v","version"].includes(rawArgs[0]?.toLowerCase())){
  console.log(`copilot-bf-x3 v${pkg.version}\nFui creado por BF Villegas - Llama de Meta - MIT 2026`);
  process.exit(0);
}

const ENV_MAP = {
  "GROQ1": ["GROQ_API_KEY"],
  "GROQ2": ["GROQ2_API_KEY"],
  "GROQ3": ["GROQ3_API_KEY"]
};
function getEnv(keys){ for(const k of keys){ if(process.env[k]) return {name:k, val:process.env[k]} } return null; }

async function status(){
  console.log(`\n🤖 COPILOT BF x3 v${pkg.version} - 3 CEREBROS`);
  for(const [label, keys] of Object.entries(ENV_MAP)){
    const f=getEnv(keys);
    console.log(f? ` ✅ ${label} (${f.name})` : ` ❌ ${label}`);
  }
  try{
    const root="/sdcard/IA-backup";
    if(fs.existsSync(root)){
      const dirs=fs.readdirSync(root).filter(d=>{try{return fs.statSync(`${root}/${d}`).isDirectory()}catch{return false}}).sort().reverse();
      const size=execSync(`du -sh ${root} 2>/dev/null | cut -f1`,{encoding:"utf8"}).trim();
      console.log(`\n📦 BACKUPS: ${dirs.length} en ${root} (${size})`);
      dirs.slice(0,5).forEach(d=>console.log(` - ${d}`));
    }
  }catch{}
  console.log("");
}

async function doctor(){
  console.log(`🩺 COPILOT BF x3 Doctor v${pkg.version}\n`);
  execSync("chmod +x ~/IA/ia_backup.sh",{stdio:"pipe"});
  console.log(" ✅ Permisos fix aplicados");
  let ok=true;
  for(const [label, keys] of Object.entries(ENV_MAP)){
    const f=getEnv(keys);
    if(f) console.log(` ✅ ${label} -> ${f.name}`);
    else { console.log(` ❌ ${label} falta`); ok=false; }
  }
  console.log(ok? "\n💚 Sistema saludable - READY" : "\n💛 Revisa.env");
}

function help(){
  console.log(`
🤖 COPILOT BF x3 v${pkg.version}
Creado por BF Villegas - Salt Lake City, Utah - Llama de Meta

Comandos:
  bf status Estado 3 cerebros + backups
  bf backup --clean Backup + limpieza 5
  bf restore Restaura último backup
  bf doctor Diagnóstico + auto-fix
  bf config Ver keys
  bf chat "pregunta" Chat 3 cerebros consenso
  bf chat Chat interactivo
  bf update Actualiza a latest
  bf --version
  bf help
`);
}

async function chat(){
  const qFromArgs = rawArgs.slice(1).join(" ");
  if(qFromArgs){
    console.log(`💬 BF x3 Chat: "${qFromArgs}"`);
    console.log(await runChatConsensus(qFromArgs));
    return;
  }
  console.log(`💬 COPILOT BF x3 v${pkg.version} - Chat interactivo (exit para salir)\n`);
  const rl=readline.createInterface({input:process.stdin,output:process.stdout});
  const ask=(q)=>new Promise(r=>rl.question(q,r));
  while(true){
    const q=await ask("🧠 BF> ");
    if(!q || ["exit","quit","salir"].includes(q.toLowerCase())) break;
    console.log(await runChatConsensus(q));
  }
  rl.close();
  console.log("👋 Chat cerrado");
}

async function config(){
  console.log("⚙️ Config.env\n");
  Object.keys(process.env).filter(k=>k.includes("API_KEY")).forEach(k=>{
    console.log(`${k}: ${process.env[k].slice(0,12)}...`);
  });
}

async function update(){
  console.log("🔄 Actualizando copilot-bf-x3@latest...");
  execSync("npm i -g copilot-bf-x3@latest",{stdio:"inherit"});
  console.log("✅ Actualizado");
  execSync("bf --version",{stdio:"inherit"});
}

const cmd=rawArgs[0]?.toLowerCase();
switch(cmd){
  case "backup": runBackup(isClean); break;
  case "restore": await runRestore(); break;
  case "status": await status(); break;
  case "doctor": await doctor(); break;
  case "config": await config(); break;
  case "chat": await chat(); break;
  case "update": await update(); break;
  case "help": case undefined: help(); break;
  default:
    console.log(`🤖 Ejecutando: ${rawArgs.join(" ")}`);
    console.log(await runChatConsensus(rawArgs.join(" ")));
}
