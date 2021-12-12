module.exports = app => {

    const main_controller = require("../controllers/main_controller.js")
    const authentication_controller = require("../controllers/authentication_controller.js")

    var router = require("express").Router()

    app.use('/api', router)

    router.get('/sciencenews', main_controller.sciencenews)

    router.get('/astronomy-com', main_controller.astronomy_com)

    router.post('/register', authentication_controller.register)

}