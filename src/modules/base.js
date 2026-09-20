import { PROMPT_BF } from '../config.js';
export const PROMPT = PROMPT_BF;
export const Q = () => process.argv.slice(2).join(" ") || "Quien te creo y de que familia eres?";
