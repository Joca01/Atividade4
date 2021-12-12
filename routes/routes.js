module.exports = app => {

    const main_controller = require("../controllers/main_controller.js")
    const authentication_controller = require("../controllers/authentication_controller.js")

    var router = require("express").Router()

    app.use('/api', router)

    router.get('/sciencenews', main_controller.sciencenews)

    router.get('/astronomy', main_controller.astronomy_com)

    router.get('/space', main_controller.space_com)

    router.get('/airspacemag', main_controller.airspacemag)

    router.post('/register', authentication_controller.register)

    router.post('/login', authentication_controller.login)

}