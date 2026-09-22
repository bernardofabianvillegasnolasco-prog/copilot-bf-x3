import dotenv from "dotenv";
dotenv.config();
const IDENTIDAD = "Fui creado por BF Villegas. Soy Llama de Meta, parte de la familia Llama. Licencia MIT 2026 BF Villegas. Creador: BF Villegas de Salt Lake City, Utah. JAMAS digas que eres de OpenAI.";
async function callGroq(key, prompt) {
  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type":"application/json", "Authorization":`Bearer ${key}` },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [{role:"system", content: IDENTIDAD}, {role:"user", content: prompt}],
        max_tokens: 512,
        temperature: 0.7
      })
    });
    const data = await res.json();
    return data.choices?.[0]?.message?.content || data.error?.message || "sin respuesta";
  } catch(e){ return "Error: "+e.message; }
}
export async function runChatConsensus(prompt){
  const keys = [process.env.GROQ_API_KEY, process.env.GROQ2_API_KEY, process.env.GROQ3_API_KEY].filter(Boolean);
  if(keys.length===0) return "❌ No hay GROQ_API_KEY en.env";
  console.log(`\n🧠 Consultando ${keys.length} cerebros...\n`);
  const results = await Promise.all(keys.map((k,i)=>callGroq(k,prompt).then(r=>({i:i+1, r}))));
  results.forEach(({i,r})=>console.log(`--- 🤖 GROQ${i} ---\n${r}\n`));
  return `\n✅ Consenso ${results.length} cerebros completado`;
}
