const { Router } = require('express')
const controller = require('../controlllers/user/index')
const passport = require('../../auth/passport');
const router = Router()

const Auth = passport.authenticate("jwt", { session: false })
// User Auth
router.post("/login",controller.loginController)
router.post("/register",controller.registerController)
router.get("/account",Auth,controller.accountController)



module.exports = router