require("dotenv").config();
const express = require('express')
const app = express();
const db = require('../models/users')
const bcrypt = require('bcrypt')
const cookieParser = require("cookie-parser")
const { createTokens, validateToken } = require("../public/JS/JWT")
app.use(cookieParser())


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

exports.login = async (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: 'Empty Form' })
    }
    try {
        const auth = req.body
        db.crud_login(auth.username)
            .then(async (dados) => {
                if (dados == null) {
                    res.status(401).send({ message: 'User not Found' })
                } else {
                    bcrypt.compare(auth.password, dados.password, (err, result) => {
                        if (result) {
                            const accessToken = createTokens(auth.username)
                            res.cookie("access-token", accessToken, {
                                maxAge: 60 * 60 * 24 * 30 * 1000,
                                httpOnly: true,
                            })
                            res.json("Logged in")
                        } else {
                            res.status(403).json({ error: "Wrong username and password combination" })
                        }
                    })
                }
            })
    } catch {
        res.status(400).send({ message: dados })
    }
}