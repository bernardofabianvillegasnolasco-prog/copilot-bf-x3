const Groq = require('groq-sdk');
module.exports = async (req,res) => {
  const q = req.query.q || "9-1 PUEV POGS";
  try {
    const groq = new Groq({apiKey: process.env.GROQ_API_KEY});
    const chat = await groq.chat.completions.create({
      model:"openai/gpt-oss-120b",
      messages:[{role:"system", content:"Eres BF PUEV POGS 9→1 Mas arriba que lo alto - BFVillegas(Berna)"},{role:"user", content:q}]
    });
    res.json({ok:true, query:q, respuesta: chat.choices[0].message.content, meta:{status:"9/9 vivos GROQ LIVE", model:"openai/gpt-oss-120b", tag:"BFVillegas(Berna) Mas arriba que lo alto"}})
  } catch(e){ res.status(500).json({ok:false, error:e.message}) }
}
