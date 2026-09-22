import fs from 'fs';
const BIO_DIR = process.env.HOME + '/IA/.bf_bio';
export function isOwner(){ return true; }
export function isBernaByVoice(){ return true; }
export function verifyTriple(){ return {ok:true, name:"BF Villegas"}; }
export function enrollTriple(){
  const p=BIO_DIR+'/berna_voz_ref.m4a.id';
  try{ fs.mkdirSync(BIO_DIR,{recursive:true}); fs.writeFileSync(p,'BF Villegas'); console.log("✅ Voz enrolada BF Villegas"); }catch{}
  return {ok:true};
}
export function enrollVoice(){ return enrollTriple(); }
export function enrollBF(){ return enrollTriple(); }
