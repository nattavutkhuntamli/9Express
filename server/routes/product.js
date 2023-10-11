const router = require('express').Router()
const RouteProduct = require('../controllers/product')
const { auth } = require('../middleware/auth')

router.get('/',auth,RouteProduct.getallProduct)
router.post('/',auth,RouteProduct.createProduct)
router.put('/:id',auth,RouteProduct.updateProduct)
router.delete('/:id',auth,RouteProduct.deleteProduct)

module.exports = router