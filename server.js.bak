import 'dotenv/config';
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'BF_Villegas_Llama_Secreto_2026';
const users = []; // memoria local - tus usuarios

// Tu firma BF
app.get('/api/status', (req, res) => {
  res.json({
    creador: 'BF Villegas',
    familia: 'Llama',
    estado: 'Copilot Activo x3',
    cerebros: ['GROQ1','GROQ2','GROQ3'],
    endpoints: ['/api/bf','/register','/login','/api/protected'],
    timestamp: new Date().toISOString()
  });
});

app.get('/api/bf', (req, res) => {
  res.json({ creador: 'BF Villegas', familia: 'Llama' });
});

// REGISTER
app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  if(users.find(u=>u.email===email)) return res.status(400).json({error:'Usuario ya existe'});
  const hash = await bcrypt.hash(password, 10);
  users.push({ email, password: hash });
  res.json({ msg: `Usuario ${email} creado por Copilot BF` });
});

// LOGIN -> JWT
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u=>u.email===email);
  if(!user) return res.status(401).json({error:'No existe'});
  const ok = await bcrypt.compare(password, user.password);
  if(!ok) return res.status(401).json({error:'Pass incorrecto'});
  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ creador: 'BF Villegas', token });
});

// Middleware JWT
function auth(req, res, next){
  const h = req.headers.authorization;
  if(!h) return res.status(401).json({error:'Sin token'});
  try{
    const data = jwt.verify(h.split(' ')[1], JWT_SECRET);
    req.user = data;
    next();
  }catch{ res.status(403).json({error:'Token invalido'}); }
}

// RUTA PROTEGIDA
app.get('/api/protected', auth, (req, res) => {
  res.json({ msg: `Bienvenido ${req.user.email}`, familia: 'Llama', creador: 'BF Villegas' });
});

app.listen(PORT, () => console.log(`✅ API BF JWT en http://localhost:${PORT}/api/status`));
