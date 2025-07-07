const express = require('express');
require('dotenv').config();
const sequelize = require('./config/database');
const CursoRoutes = require('./scr/routes/CursoRoutes');
const UsuarioRoutes = require('./scr/routes/UsuarioRoutes');
const AuthRoutes = require('./scr/routes/AuthRoutes');
const RootRoutes = require('./scr/routes/RootRoutes');
const cookieParser = require('cookie-parser')
const cors = require('cors');

const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));app.use(express.json());
app.use(cookieParser())

app.use('/cursos', CursoRoutes);
app.use('/usuarios', UsuarioRoutes);
app.use('/login', AuthRoutes);
app.use('/', RootRoutes);

sequelize.sync().then(() => {
    console.log("Bando de dados sincronizado com sucesso!");
    app.listen(process.env.PORT, () => console.log(`Servidor rodando na porta ${process.env.PORT}`));
}).catch(err => console.error("Erro ao conectar com banco de dados", err));