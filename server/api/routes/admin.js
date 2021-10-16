const { Router } = require('express')
const controller = require('../controlllers/user/index')
const middlewares = require ('../../middlewares')

const router = Router()




router.get("/users",middlewares.Auth,middlewares.hasAdmin,controller.getAllUsers)


module.exports = router