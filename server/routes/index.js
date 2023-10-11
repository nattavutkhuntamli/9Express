const router = require('express').Router()

router.use('/product', require('./product'))
router.use('/auth',require('./auth'))
module.exports = router