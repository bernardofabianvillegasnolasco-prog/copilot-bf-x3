#!/usr/bin/env node
import "dotenv/config";
import Groq from "groq-sdk";
import { PROMPT_BF } from "./config.js";
import fs from "fs";
import os from "os";
import path from "path";

const COMPLETION_SCRIPT = `# COPILOT BF x3 - Autocompletado
_bf_completion() {
  local cur prev words cword
  _init_completion || return
  local cmds="--help --version status server completion --cerebro -c --chat"
  local brains="GROQ1 GROQ2 GROQ3 all"
  if [[ "$prev" == "completion" ]]; then
    COMPREPLY=( $(compgen -W "install show" -- "$cur") )
    return
  fi
  if [[ "$prev" == "-c" || "$prev" == "--cerebro" ]]; then
    COMPREPLY=( $(compgen -W "$brains" -- "$cur") )
    return
  fi
  COMPREPLY=( $(compgen -W "$cmds" -- "$cur") )
}
complete -F _bf_completion bf
complete -F _bf_completion copilot
complete -F _bf_completion copilot-bf-x3
`;

function showHelp(){console.log(`
🤖 COPILOT BF x3 - 3 Cerebros de Llama por BF Villegas

USO:
  bf [pregunta]
  bf "tu pregunta"
  bf --help | --version | status | server
  bf completion | completion install

TAB: escribe bf + TAB
`);}

function handleCompletion(args){
 const sub=args[1]||"show";
 if(sub==="show"){console.log(COMPLETION_SCRIPT);return true;}
 if(sub==="install"){
  const home=os.homedir();
  const dest=path.join(home,".bf-completion.bash");
  fs.writeFileSync(dest,COMPLETION_SCRIPT);
  const line="\n# BF Copilot Autocompletado\n[ -f ~/.bf-completion.bash ] && source ~/.bf-completion.bash\n";
  for(const rc of [path.join(home,".bashrc"),path.join(home,".zshrc")]){
   if(fs.existsSync(rc)){
    const c=fs.readFileSync(rc,"utf8");
    if(!c.includes(".bf-completion.bash")){fs.appendFileSync(rc,line);console.log(`✅ Instalado en ${rc}`);}
   }
  }
  console.log(`\n🎉 Autocompletado instalado! ${dest}\nEjecuta: source ~/.bashrc`);
  return true;
 }
 return false;
}

const keys=[
 {name:"GROQ1",key:process.env.GROQ_API_KEY},
 {name:"GROQ2",key:process.env.GROQ2_API_KEY},
 {name:"GROQ3",key:process.env.GROQ3_API_KEY},
].filter(k=>k.key&&k.key.startsWith("gsk_"));

const rawArgs=process.argv.slice(2);
const q=rawArgs.join(" ").trim();

if(!q||["--help","-h","help"].includes(rawArgs[0]?.toLowerCase())){showHelp();console.log(`\n🤖 ${keys.length} CEREBROS\n`);if(!q)rawArgs[0]="Quien te creo y de que familia eres?";else process.exit(0);}
if(["--version","-v","version"].includes(rawArgs[0]?.toLowerCase())){const pkg=JSON.parse(fs.readFileSync("./package.json","utf8"));console.log(`copilot-bf-x3 v${pkg.version}`);process.exit(0);}
if(rawArgs[0]?.toLowerCase()==="status"){console.log(`\n🤖 ${keys.length} CEREBROS`);keys.forEach(k=>console.log(` ✅ ${k.name}`));process.exit(0);}
if(rawArgs[0]?.toLowerCase()==="completion"){handleCompletion(rawArgs);process.exit(0);}
if(rawArgs[0]?.toLowerCase()==="server"){console.log("Iniciando server...");await import("../server.js");process.exit(0);}

console.log(`\n🤖 COPILOT BF ACTIVADO - ${keys.length} CEREBROS CONECTADOS\nCreador: BF Villegas | Familia: Llama de Meta\n`);
async function askAll(question){
 const ideas=[];
 for(const mod of keys){
  try{
   const g=new Groq({apiKey:mod.key});
   const r=await g.chat.completions.create({model:"openai/gpt-oss-20b",messages:[{role:"system",content:PROMPT_BF},{role:"user",content:question}],max_tokens:300});
   const t=r.choices[0].message.content;console.log(`[${mod.name}]: ${t.slice(0,120)}...`);ideas.push(`[${mod.name}]=${t}`);
  }catch(e){console.log(`[${mod.name} FALLO] ${e.message.slice(0,80)}`);}
 }
 if(ideas.length>0){
  const g=new Groq({apiKey:keys[0].key});
  const final=await g.chat.completions.create({model:"openai/gpt-oss-20b",messages:[{role:"system",content:PROMPT_BF+` Une ${ideas.length} ideas.`},{role:"user",content:`Pregunta: ${question}\nIdeas:\n${ideas.join("\n")}`}],max_tokens:600});
  console.log(`\n========== COPILOT FINAL x${ideas.length} ==========\n${final.choices[0].message.content}\n`);
 }
}
const finalQ=process.argv.slice(2).join(" ")||"Quien te creo y de que familia eres?";
await askAll(finalQ);
