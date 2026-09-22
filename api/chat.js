export default function handler(req, res) {
  res.status(200).json({ ok: "HERMANDAD 9/9 PUEV POGS BFVillegas(Berna)", query: req.query.q || "que es PUEV POGS" });
}
