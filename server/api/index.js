const express = require("express");
const registerApi = require("./register");
const loginApi = require("./login");
const userApi = require("./user");
const auth_testApi = require('./auth_test')

const router = express.Router();

router.use(registerApi);
router.use(loginApi);
router.use('/user',userApi);
router.use(auth_testApi)
module.exports = router;