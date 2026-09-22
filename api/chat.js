export default function handler(req, res) {
  const q = req.query.q || "que es PUEV POGS";
  res.setHeader('Content-Type','text/plain; charset=utf-8');
  res.status(200).send(`✅ HERMANDAD: 9/9 vivos - BFVillegas(Berna) - PUEV POGS
REFLEXIVO: PUEV = Pueblo Viejo, POGS = Point of Ghetto Soldiers. Tag identidad barrio BFVillegas(Berna)
EXPLÍCITO: PUEV POGS es mi barrio a la verga! Pueblo Viejo, puro cholo firme!
SISTEMATICO: tag en ~/.bf_bio/legado/berna.json - grep -r POGS ~/IA
SUSCEPTIBLE: PUEV POGS me toca el corazon, familia, 9 hermanos
FILOSÓFICO: PUEV POGS dos silabas, universo entero. Trascendencia, no altitud
PERSEPTIBLE: neon dorado sobre cactus negro, tipografia chola graffiti, BF x9 ULTRA
NEXO: puente local->global. barrio -> GitHub -> Vercel -> IPFS
COLECTIVO: nos une a los 9, 9 corazones, 1 latido
VERIFICACIÓN: marca registrada barrio BFVillegas(Berna) Sello dorado 9→1
--- 9 IAs ACTIVAS --- Query: ${q}`);
}
