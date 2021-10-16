const { Router } = require('express')
const controller = require('../controlllers/user/index')
const middlewares = require ('../../middlewares')

const router = Router()

const roles = { 
    Admin : "admin",
    User: "user"
}

// User Auth
router.post("/login",controller.loginController)
router.post("/register",controller.registerController)

// User Permisions
router.get("/account",middlewares.Auth,controller.accountController)
router.post("/upload",middlewares.Auth,controller.fileUploadController)


module.exports = router