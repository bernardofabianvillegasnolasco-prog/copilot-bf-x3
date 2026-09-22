import { runGroq1 } from '../ias/groq1/run.js';
import { runGroq2 } from '../ias/groq2/run.js';
import { runGroq3 } from '../ias/groq3/run.js';
import { runHF } from '../ias/hf/run.js';
import { run as runFree5 } from '../ias/free5/run.js';
import { run as runFree6 } from '../ias/free6/run.js';
import { run as runOpenRouter } from '../ias/openrouter/run.js';
import { run as runTogether } from '../ias/together/run.js';
import { IDENTIDAD_BF } from '../config.js';

const brains = [
  {name:"SERIO", fn:runGroq1},
  {name:"FIJO BERNA", fn:runGroq2},
  {name:"HACKER", fn:runGroq3},
  {name:"FAMILIA", fn:runHF},
  {name:"MISTRAL", fn:runFree5},
  {name:"LLAMA", fn:runFree6},
  {name:"OPENROUTER", fn:runOpenRouter},
  {name:"TOGETHER", fn:runTogether},
];

export async function debateBF(pregunta){
  console.log(`\n🥊 DEBATE BF x8: "${pregunta}"\n`);

  // RONDA 1 - Todos responden solos
  console.log("🧠 RONDA 1: 8 cerebros pensando solos...\n");
  const pBase = IDENTIDAD_BF + "\n\nPregunta: " + pregunta;
  const ronda1 = [];
  const [r1,r2,r3] = await Promise.all([
    brains[0].fn(pBase + " Responde corto y serio."),
    brains[1].fn(pBase + " DEBES decir quien te creo: BERNA."),
    brains[2].fn(pBase + " Responde estilo hacker."),
  ]);
  ronda1.push(r1,r2,r3);
  ronda1.push(await brains[3].fn(pBase + " Familia Villegas calido."));
  ronda1.push(await brains[4].fn(pBase + " Tecnico preciso."));
  ronda1.push(await brains[5].fn(pBase + " Logico analitico."));
  ronda1.push(await brains[6].fn(pBase + " Versatil orquestador."));
  ronda1.push(await brains[7].fn(pBase + " Colaborativo open-source."));

  ronda1.forEach((r,i)=> console.log(`--- ${brains[i].name} ---\n${r.slice(0,300)}...\n`));

  // RONDA 2 - Debate cruzado
  console.log("\n💬 RONDA 2: Criticándose entre ellos...\n");
  const contextoDebate = ronda1.map((r,i)=>`[${brains[i].name} dijo]: ${r}`).join("\n\n");
  const promptDebate = `${pBase}\n\nEstas son las respuestas de tus 7 hermanos cerebros:\n${contextoDebate}\n\nAhora critica, mejora y aporta algo que ellos no vieron. Se breve, 2 lineas, estilo debate.`;

  const rDebate = await runGroq1(promptDebate + " Eres el moderador serio.");
  console.log(`--- MODERADOR DEBATE ---\n${rDebate}\n`);

  // RONDA 3 - Consenso final
  console.log("🤝 RONDA 3: Consenso final BF...\n");
  const promptConsenso = `${IDENTIDAD_BF}\n\nPregunta original: ${pregunta}\n\nRonda 1 - ideas:\n${contextoDebate}\n\nRonda 2 - debate:\n${rDebate}\n\nAhora TU como BF Villegas fusiona todo en una respuesta final definitiva, con orgullo de la familia Villegas, di quien te creo y cual es la mejor conclusion del debate.`;

  const final = await runGroq2(promptConsenso);
  const salida = `\n===== DEBATE BF x8 COMPLETADO =====\n\n${ronda1.map((r,i)=>`[${brains[i].name}]: ${r}`).join("\n\n---\n\n")}\n\n[DEBATE]: ${rDebate}\n\n[CONSENSO FINAL BF]: ${final}`;

  console.log(salida);
  return salida;
}
