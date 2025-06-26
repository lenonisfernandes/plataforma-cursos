const express = require('express');
const sequelize = require('./config/database');
const CursoRoutes = require('./scr/routes/CursoRoutes')

const app = express();
app.use(express.json());

app.use('/cursos', CursoRoutes);

sequelize.sync().then(() => {
    console.log("Bando de dados sincronizado com sucesso!");
    app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
}).catch(err => console.error("Erro ao conectar com banco de dados", err));