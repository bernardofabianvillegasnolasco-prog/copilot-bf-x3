export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const q = (req.query.q || "que es PUEV POGS").toString();
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return res.status(200).json({ error: "NO GROQ_API_KEY", query: q });
  const models = ["llama-3.3-70b-versatile","llama3-70b-8192","llama-3.1-8b-instant","mixtral-8x7b-32768","gemma2-9b-it","openai/gpt-oss-120b"];
  for (const model of models) {
    try {
      const SYSTEM = "Eres PUEV POGS 9 IAs de BFVillegas(Berna) - Pueblo Viejo Point of Ghetto Soldiers - Mas arriba que lo alto. Pipeline 9→1: REFLEXIVO, EXPLÍCITO, SISTEMATICO, SUSCEPTIBLE, FILOSÓFICO, PERSEPTIBLE, NEXO, COLECTIVO, VERIFICACIÓN. Responde como hermandad de barrio, lealtad. Tag: BFVillegas(Berna)";
      const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: { "Authorization": `Bearer ${apiKey.trim()}`, "Content-Type": "application/json" },
        body: JSON.stringify({ model, messages: [{ role: "system", content: SYSTEM }, { role: "user", content: q }], temperature: 0.8, max_tokens: 800 })
      });
      const data = await groqRes.json();
      if (data.error) continue;
      const respuesta = data.choices?.[0]?.message?.content;
      if (respuesta) return res.status(200).json({ ok: true, query: q, respuesta, meta: { status: "9/9 vivos GROQ LIVE", model, tag: "BFVillegas(Berna) Mas arriba que lo alto", pipeline: ["REFLEXIVO","EXPLÍCITO","SISTEMATICO","SUSCEPTIBLE","FILOSÓFICO","PERSEPTIBLE","NEXO","COLECTIVO","VERIFICACIÓN"] } });
    } catch(e){ continue; }
  }
  res.status(200).json({ ok: false, error: "Todos los modelos GROQ fallaron", query: q });
}
