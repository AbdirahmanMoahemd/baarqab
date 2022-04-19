import express from 'express';
import { getProducts,getProductsCount,getNewArravelProducts,getDiscProducts, getProductById,getProducts2, getTopProducts, deleteProduct, createProduct , updateProduct, createProductReview } from '../controllers/productControllers.js'
import { admin, protect } from '../middleware/authMiddleware.js'


const router = express.Router()

router.route('/').get(getProducts).post(protect, admin, createProduct)
router.get('/top', getTopProducts)
router.get('/dis', getDiscProducts)
router.get('/new', getNewArravelProducts) 
router.get('/count', getProductsCount)
router.route('/all').get(getProducts2)
router.route('/:id/reviews').post(protect, createProductReview)
router.route('/:id').get(getProductById).delete(protect, admin, deleteProduct).put(protect, admin, updateProduct)

 
export default router  
 