const database = require("nedb")

let db = {}
db.users = new database("users.db")
db.users.loadDatabase()

// Registo de um utilizador na base de dados
exports.crud_register = (username, password) => {
    return new Promise((resolve, reject) => {
        data = {
            username: username,
            password: password,
        };
        db.users.insert(data, (err, dados) => {
            if (err) {
                reject(null)
            }
            else {
                resolve(dados)
            }
        })
    })
}

exports.crud_login = (username) => {
    return new Promise((resolve, reject) => {
        db.users.findOne({username: username}, (err, dados) => {
            if(err){
                reject(null)
            }
            else{
                resolve(dados)
            }
        })
    })
}