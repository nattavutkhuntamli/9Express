const router = require('express').Router()
const RouteProduct = require('../controllers/product')
const { auth } = require('../middleware/auth')
const { upload, productsUpload } = require('../middleware/upload')
router.get('/',auth,RouteProduct.getallProduct)
router.get('/:id',auth,RouteProduct.getProduct)
router.post('/',auth,productsUpload,RouteProduct.createProduct)
router.put('/:id',auth,productsUpload,RouteProduct.updateProduct)
router.delete('/:id',auth,RouteProduct.deleteProduct)

module.exports = router