import { run as runGroq1 } from '../ias/groq1/run.js';
import { run as runGroq2 } from '../ias/groq2/run.js';
import { run as runGroq3 } from '../ias/groq3/run.js';
export async function debateBF(q){
  const [r1,r2,r3] = await Promise.all([runGroq1(q), runGroq2(q), runGroq3(q)]);
  return `DEBATE: ${r1} | ${r2} | ${r3}`;
}
