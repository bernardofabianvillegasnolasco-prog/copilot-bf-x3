import 'dotenv/config';
import Groq from 'groq-sdk';
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY_3 || process.env.GROQ3_API_KEY || process.env.GROQ_API_KEY });
export async function runGroq3(prompt) {
  const c = await groq.chat.completions.create({
    model: "openai/gpt-oss-20b",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  });
  return c.choices[0].message.content;
}
