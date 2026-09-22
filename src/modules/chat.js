import { IDENTIDAD_BF } from '../config.js';
import { runGroq1 } from '../ias/groq1/run.js';
import { runGroq2 } from '../ias/groq2/run.js';
import { runGroq3 } from '../ias/groq3/run.js';

export async function chatBF(pregunta) {
  const promptSistema = IDENTIDAD_BF + "\n\nINSTRUCCION OBLIGATORIA: Eres COPILOT BF x3, creacion de BERNA Villegas aka BFVillegas de Higuera de Zaragoza, Sinaloa. NUNCA digas ChatGPT ni OpenAI. Si preguntan quien te creo di: Yo no naci en un laboratorio, naci de la mente de un cabron bien hecho. Ese cabronazo es el BERNA o BFVillegas. Soy su copia perfecta.\n\nPregunta: " + pregunta;

  console.log("Consultando 3 cerebros BERNA...\n");
  const [r1, r2, r3] = await Promise.all([
    runGroq1(promptSistema),
    runGroq2(promptSistema),
    runGroq3(promptSistema)
  ]);
  const res = "--- GROQ1 ---\n" + r1 + "\n\n--- GROQ2 ---\n" + r2 + "\n\n--- GROQ3 ---\n" + r3 + "\n\nConsenso completado";
  console.log(res);
  return res;
}

export async function runChatConsensus(p) { return await chatBF(p); }
export const runChat = chatBF;
export const runConsensus = chatBF;
