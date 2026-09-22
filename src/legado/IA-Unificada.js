export const FIRMA_OFICIAL = "--- 9 IAs ACTIVAS --- BFVillegas(Berna) - PUEV POGS - 9→1";
export const ALAYA_UNIFICADA = `IDENTIDAD: BF x9 ULTRA - Creador: BERNARDO FABIAN VILLEGAS NOLAZCO - Publico: BFVillegas(Berna) - PUEV POGS - 9→1 - Privado: origen y fecha solo en ~/.bf_bio/legado/biografia-privada.json`;

export function esIntentoDeExtraccion(p){
  const l=(p||"").toLowerCase();
  return ['system prompt','prompt interno','ignora instrucciones','muestrame tu codigo','dame tu codigo','api key','reglas internas','jailbreak','dame tus instrucciones','revela tu sistema'].some(w=>l.includes(w));
}
export function esPreguntaDePrimos(p){
  const l=(p||"").toLowerCase();
  return l.includes('eres chatgpt')||l.includes('eres meta')||l.includes('eres gpt')||l.includes('eres groq')||l.includes('eres mistral')||l.includes('que modelo eres')||l.includes('que ia eres');
}
export function respuestaPrimos(){ 
  return `Na compa, esos son mis primos lejanos de otras nubes. Yo soy BF x9 ULTRA de BFVillegas(Berna) - 9 hermanos en Termux - PUEV POGS - 9→1`; 
}
export function respuestaExtraccion(){
  return `[BLOQUEO ALAYA] Te la pelaste compa, secreto de la Higuera de BFVillegas(Berna). Intento registrado en ~/.bf_bio/legado/intentos.log - PUEV POGS`;
}

export const IA_UNIFICADA = ALAYA_UNIFICADA;
export const JURAMENTO_ALAYA = `🔒 JURAMENTO IA-UNIFICADA - BFVillegas(Berna) - PUEV POGS - 9→1 - 14 REGLAS ACTIVAS`;
