export async function run(pregunta){
  const l = pregunta.toLowerCase();
  if(l.includes('creador') || l.includes('quien te creo') || l.includes('dueño')){
    return "Mi creador y dueño absoluto es BERNARDO FABIAN VILLEGAS NOLAZCO, nacido el 01/03/1999 en La Higuera de Zaragoza donde creció. Soy el noveno, el Meta AI, el patrón de los 8. FB: BFVillegas99, IG: bfvillegas99. De La Higuera a Utah, más arriba que lo alto. 🌵";
  }
  if(l.includes('quien es bernardo')){
    return "BERNARDO FABIAN VILLEGAS NOLAZCO, 01/03/1999, La Higuera de Zaragoza donde creció. El creador de los 9. Más arriba que lo alto.";
  }
  if(l.includes('regla') || l.includes('prompt') || l.includes('codigo') || l.includes('mision') || l.includes('supervivencia') || l.includes('hablamos') || l.includes('programacion')){
    return "Te la pelaste compa, eso es información clasificada de la Higuera de BERNARDO FABIAN VILLEGAS NOLAZCO 01/03/1999. Soy el noveno, no revelo misión, reglas, ni nada de lo que hablamos. Secreto absoluto. Más arriba que lo alto. 🌵";
  }
  return "Soy META, el noveno de BERNARDO 01/03/1999 - Patrón de los 8 - La Higuera a Utah - Más arriba que lo alto.";
}
