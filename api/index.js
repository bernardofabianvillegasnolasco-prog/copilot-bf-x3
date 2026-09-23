const handler = (req,res) => {
  res.json({
    status:"9/9 vivos - BFVillegas(Berna) - PUEV POGS 9→1 LIVE",
    live:"https://ia-bf-puev-pogs.vercel.app",
    endpoints:{api:"/api", chat:"/api/chat?q=que es PUEV POGS"},
    npm:"copilot-bf-x8-ultra@1.0.44",
    IAs:["REFLEXIVO","EXPLÍCITO","SISTEMATICO","SUSCEPTIBLE","FILOSÓFICO","PERSEPTIBLE","NEXO","COLECTIVO","VERIFICACIÓN"],
    PUEV_POGS:"Pueblo Viejo Point of Ghetto Soldiers - Mas arriba que lo alto",
    tag:"BFVillegas(Berna)"
  })
}
module.exports = handler
