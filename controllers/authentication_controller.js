require("dotenv").config();
const express = require('express')
const app = express();
const db = require('../models/users')
const bcrypt = require('bcrypt')
const cookieParser = require("cookie-parser")
const { createTokens, validateToken } = require("../public/JS/JWT")
app.use(cookieParser())

exports.register = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: 'Empty Form' }) // Controlo de erro se o o form estive vazio
    }
    try {
        const auth = req.body 
        const salt = await bcrypt.genSalt()
        const hashPassword = await bcrypt.hash(auth.password, salt) // Hash da password
        db.crud_register(auth.username, hashPassword) // Insert do User na BD
            .then((data) => {
                res.status(201).send({ message: `User ${auth.username} created` })
            })
    } catch {
        return res.status(400).send({ message: 'User not registred' }) // Controlo de erro se o user nao estiver registado
    }
}

exports.login = async (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: 'Empty Form' })
    }
    try {
        const auth = req.body
        db.crud_login(auth.username)
            .then(async (data) => {
                if (data == null) {
                    res.status(401).send({ message: 'User not Found' }) // Controlo de erro se o o form estive vazio
                } else {
                    bcrypt.compare(auth.password, data.password, (err, result) => { //compara a palavra passe introduzida com o hash
                        if (result) {
                            const accessToken = createTokens(auth.username)
                            res.cookie("access-token", accessToken, {  //guarda o access token numa cookie que dura 30 dias
                                maxAge: 60 * 60 * 24 * 30 * 1000,
                                httpOnly: true,
                            })
                            res.json("Logged in")
                        } else {
                            res.status(403).json({ error: "Wrong username and password combination" }) // Controlo a senha e o user nao combinarem
                        }
                    })
                }
            })
    } catch {
        res.status(400).send({ message: data })
    }
}