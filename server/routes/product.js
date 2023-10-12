const router = require('express').Router()
const RouteProduct = require('../controllers/product')
const { auth } = require('../middleware/auth')
const { upload } = require('../middleware/upload')
router.get('/',auth,RouteProduct.getallProduct)
router.get('/:id',auth,RouteProduct.getProduct)
router.post('/',auth,upload,RouteProduct.createProduct)
router.put('/:id',auth,RouteProduct.updateProduct)
router.delete('/:id',auth,RouteProduct.deleteProduct)

module.exports = router