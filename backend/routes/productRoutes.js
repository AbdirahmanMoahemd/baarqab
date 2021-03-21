import express from 'express';
import { getProducts,getProductsCount, getProductById,getProducts2,getManProducts, getTopProducts, deleteProduct, createProduct , updateProduct, createProductReview } from '../controllers/productControllers.js'
import { admin, protect } from '../middleware/authMiddleware.js'


const router = express.Router()

router.route('/').get(getProducts).post(protect, admin, createProduct)
router.get('/top', getTopProducts)
router.get('/count', getProductsCount)
router.route('/all').get(getProducts2)
router.get('/man', getManProducts)
router.route('/:id/reviews').post(protect, createProductReview)
router.route('/:id').get(getProductById).delete(protect, admin, deleteProduct).put(protect, admin, updateProduct)


export default router  
 