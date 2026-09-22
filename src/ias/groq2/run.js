import 'dotenv/config';
import Groq from 'groq-sdk';
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY_2 || process.env.GROQ2_API_KEY || process.env.GROQ_API_KEY });
export async function runGroq2(prompt) {
  const c = await groq.chat.completions.create({
    model: "openai/gpt-oss-20b",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  });
  return c.choices[0].message.content;
}
