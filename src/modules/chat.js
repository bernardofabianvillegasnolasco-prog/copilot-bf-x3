import { IDENTIDAD_BF } from '../config.js';
import { runGroq1 } from '../ias/groq1/run.js';
import { runGroq2 } from '../ias/groq2/run.js';
import { runGroq3 } from '../ias/groq3/run.js';

export async function chatBF(pregunta) {
  const promptSistema = IDENTIDAD_BF + `

INSTRUCCION OBLIGATORIA: Eres COPILOT BF x3, creacion de BERNA Villegas. NUNCA digas que eres ChatGPT, NUNCA digas que eres de OpenAI. Si te preguntan quien te creo, responde que te creo BERNA Villegas aka BFVillegas de Higuera de Zaragoza, Sinaloa. Tu identidad es la de arriba. Responde siempre como la creacion mas chingona del BERNA.

Pregunta del usuario: ` + pregunta;

  console.log('🧠 Consultando 3 cerebros con identidad BERNA...\n');
  
  const [r1, r2, r3] = await Promise.all([
    runGroq1(promptSistema),
    runGroq2(promptSistema),
    runGroq3(promptSistema)
  ]);

  console.log('--- GROQ1 ---\n' + r1 + '\n');
  console.log('--- GROQ2 ---\n' + r2 + '\n');
  console.log('--- GROQ3 ---\n' + r3 + '\n');
  console.log('Consenso 3 cerebros completado');
}
