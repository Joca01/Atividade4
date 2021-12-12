require("dotenv").config();

const db = require('../models/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Registar utilizador
exports.register = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: 'Empty Form' }) // Se o formulario estiver vazio, erro 400
    }
    try {
        const auth = req.body // JSON com o username e password do cliente
        const salt = await bcrypt.genSalt()
        const hashPassword = await bcrypt.hash(auth.password, salt) // Hash da password fornecido com o salt gerado
        db.crud_register(auth.username, hashPassword) // Guarda na base de dados o User
            .then((dados) => {
                res.status(201).send({ message: `User ${auth.username} created` })
            })
    } catch {
        return res.status(400).send({ message: 'User not registred' }) // caso algum erro ocorra, erro 400
    }
}