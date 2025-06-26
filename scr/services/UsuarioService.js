const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/Usuario");

const UsuarioService = {
  async cadastrar({ nome, email, senha, nascimento }) {
    
    const existe = await Usuario.findOne({
      where: { email },
    });
    if (existe) {
        throw new Error('Email já cadastrado.');
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const usuario = await Usuario.create({
        nome, 
        email,
        senha: senhaHash,
        nascimento
    });
    return usuario;

  },

  async listar() {
    const usuarios = await Usuario.findAll();
    return usuarios;

  },

  async login({ email, senha }) {
    const usuario = await Usuario.findOne({
        where: {email}
    })

    if(!usuario) {
        throw new Error('Usuario não encontrado');
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if(!senhaValida) {
        throw new Error('Senha inválida.');
    }

    const token = jwt.sign(
        { id: usuario.id, email: usuario.email }, 
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    return token;
  }
}

module.exports = UsuarioService;