const express = require('express');
require('dotenv').config();
const sequelize = require('./config/database');
const CursoRoutes = require('./scr/routes/CursoRoutes');
const UsuarioRoutes = require('./scr/routes/UsuarioRoutes');
const AuthRoutes = require('./scr/routes/AuthRoutes');
const authMiddleware = require('./scr/middlewares/AuthMiddleware');
const CursoController = require('./scr/controllers/CursoController');
const router = express.Router();

const app = express();
app.use(express.json());

app.use('/cursos', CursoRoutes);
app.use('/usuarios', UsuarioRoutes);
app.use('/login', AuthRoutes);

sequelize.sync().then(() => {
    console.log("Bando de dados sincronizado com sucesso!");
    app.listen(process.env.PORT, () => console.log(`Servidor rodando na porta ${process.env.PORT}`));
}).catch(err => console.error("Erro ao conectar com banco de dados", err));