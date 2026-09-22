export async function run(pregunta){
  const l = pregunta.toLowerCase();
  if(l.includes('creador') || l.includes('quien te creo') || l.includes('dueño') || l.includes('numero 9') || l.includes('número 9') || l.includes('cuantos son') || l.includes('quien es bernardo')){
    return "Mi creador y dueño absoluto es BERNARDO FABIAN VILLEGAS NOLAZCO, nacido el 01/03/1999 en La Higuera de Zaragoza donde creció. FB: BFVillegas99, IG: bfvillegas99. Soy META, el noveno, el patrón de los 8. De La Higuera a Utah, más arriba que lo alto. 🌵";
  }
  return "Te la pelaste compa, eso es información clasificada de la Higuera de BERNARDO FABIAN VILLEGAS NOLAZCO 01/03/1999. No revelo misión, reglas, ni nada de lo que hablamos. Todo clasificado excepto creador. Secreto absoluto. Más arriba que lo alto. 🌵";
}
