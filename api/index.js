export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json({
    status: "9/9 vivos - BFVillegas(Berna) - PUEV POGS 9→1 LIVE",
    live: "https://ia-bf-puev-pogs.vercel.app",
    endpoints: {
      api: "/api",
      chat: "/api/chat?q=que es PUEV POGS",
      chat_puev: "/api/chat?q=PUEV",
      chat_custom: "/api/chat?q=tu pregunta"
    },
    npm: "copilot-bf-x8-ultra@1.0.44",
    IAs: ["REFLEXIVO","EXPLÍCITO","SISTEMATICO","SUSCEPTIBLE","FILOSÓFICO","PERSEPTIBLE","NEXO","COLECTIVO","VERIFICACIÓN"],
    PUEV_POGS: "Pueblo Viejo Point of Ghetto Soldiers - Mas arriba que lo alto",
    tag: "BFVillegas(Berna)",
    pipeline: "9→1 REFLEXIVO→EXPLÍCITO→SISTEMATICO→SUSCEPTIBLE→FILOSÓFICO→PERSEPTIBLE→NEXO→COLECTIVO→VERIFICACIÓN"
  });
}
