const { Router } = require('express')
const router = Router()

const userApi = require('./routes/user')

router.use('/user', userApi)

module.exports = router