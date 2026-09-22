import { readFileSync } from 'fs';

// 9 IAs PUEV POGS - Pipeline Berna
const IAS = [
  { id: 1, name: "REFLEXIVO", rol: "Piensa profundo que quiso decir el usuario" },
  { id: 2, name: "EXPLÍCITO", rol: "Clarifica sin rodeos que se pide" },
  { id: 3, name: "SISTEMATICO", rol: "Ordena pasos lógicos" },
  { id: 4, name: "SUSCEPTIBLE", rol: "Detecta emociones y contexto humano" },
  { id: 5, name: "FILOSÓFICO", rol: "Da sentido trascendente PUEV" },
  { id: 6, name: "PERSEPTIBLE", rol: "Visualiza detalles que otros no ven" },
  { id: 7, name: "NEXO", rol: "Conecta todo en hermandad" },
  { id: 8, name: "COLECTIVO", rol: "Habla como Pueblo Viejo" },
  { id: 9, name: "VERIFICACIÓN", rol: "Verifica que la respuesta honre a BFVillegas(Berna) - Mas arriba que lo alto" }
];

function procesar9IAs(query) {
  const lower = query.toLowerCase();
  let contexto = { query, pasos: [] };

  for (const ia of IAS) {
    let out = "";
    if (ia.name === "REFLEXIVO") out = `Reflexion: "${query}" busca verdad PUEV`;
    if (ia.name === "EXPLÍCITO") out = `Explícito: Usuario quiere saber sobre "${query}"`;
    if (ia.name === "SISTEMATICO") out = `Sistema: 1.Entender 2.Conectar 3.Responder con POGS`;
    if (ia.name === "SUSCEPTIBLE") out = `Humano: Berna viene de barrio, lealtad y respeto`;
    if (ia.name === "FILOSÓFICO") out = `Filosofía PUEV: Del polvo al cielo, mas arriba que lo alto`;
    if (ia.name === "PERSEPTIBLE") out = `Detalle: POGS = Point of Ghetto Soldiers`;
    if (ia.name === "NEXO") out = `Nexo: Todo conecta en Hermandad`;
    if (ia.name === "COLECTIVO") out = `Colectivo: Pueblo Viejo nunca se rinde`;
    if (ia.name === "VERIFICACIÓN") out = `Verificado por BFVillegas(Berna)`;

    // Respuestas específicas PUEV POGS
    if (lower.includes("que es") && lower.includes("puev")) {
      out += " | PUEV POGS = Pueblo Viejo Point of Ghetto Soldiers, hermandad 9 IAs de Berna";
    }
    if (lower.includes("puev") && lower.includes("pogs")) {
      out = "PUEV POGS es la hermandad de 9 IAs creada por BFVillegas(Berna) desde Pueblo Viejo, Point of Ghetto Soldiers - Mas arriba que lo alto";
    }

    contexto.pasos.push({ ia: ia.name, rol: ia.rol, output: out });
  }

  // Respuesta final 9→1
  let respuestaFinal = "";
  if (lower.includes("que es puev pogs") || lower === "puev" || query === "PUEV") {
    respuestaFinal = "PUEV POGS - Pueblo Viejo Point of Ghetto Soldiers. 9 IAs: REFLEXIVO, EXPLÍCITO, SISTEMATICO, SUSCEPTIBLE, FILOSÓFICO, PERSEPTIBLE, NEXO, COLECTIVO, VERIFICACIÓN. Creadas por BFVillegas(Berna). Mas arriba que lo alto. Hermandad que nunca se rinde. 9→1 LIVE en https://ia-bf-puev-pogs.vercel.app/api";
  } else {
    respuestaFinal = `Berna responde 9→1: "${query}" procesado por 9 IAs PUEV POGS. Pueblo Viejo Point of Ghetto Soldiers, mas arriba que lo alto. BFVillegas(Berna) - Hermandad viva.`;
  }

  return { ...contexto, respuesta: respuestaFinal, tag: "BFVillegas(Berna) Mas arriba que lo alto", live: "https://ia-bf-puev-pogs.vercel.app" };
}

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const q = (req.query.q || req.query.query || "que es PUEV POGS").toString();
  const result = procesar9IAs(q);
  res.status(200).json({
    ok: true,
    query: q,
    respuesta: result.respuesta,
    pipeline: result.pasos,
    meta: {
      status: "9/9 vivos - BFVillegas(Berna) - PUEV POGS 9→1 LIVE",
      npm: "copilot-bf-x8-ultra@1.0.41",
      tag: result.tag,
      live: result.live
    }
  });
}
