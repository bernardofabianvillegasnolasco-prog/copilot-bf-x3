# comenta la linea o borra el archivo
mv src/ias/openrouter/ia.js src/ias/openrouter/ia.js.bak
mv src/ias/openai/ia.js src/ias/openai/ia.js.bak 2>/dev/null; trueimport { PROMPT_BF } from '../../config.js';
export const prompt = PROMPT_BF;
export const query = () => process.argv.slice(2).join(" ") || "Quien te creo y de que familia eres?";
content: (await import('../../config.js')).IDENTIDAD_BF
