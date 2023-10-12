const router = require('express').Router()
const AuthControoler = require('../controllers/auth')
const { auth } = require('../middleware/auth')


router.post('/register',auth, AuthControoler.register)

router.post('/login',AuthControoler.login)



module.exports = router;