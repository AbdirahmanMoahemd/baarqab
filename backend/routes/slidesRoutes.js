import express from 'express';
const router = express.Router()
import { deleteSlide, getSlides,createSlide, updateslides, getSlideById} from '../controllers/slideController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getSlides).post(protect, admin, createSlide)
router.route('/:id').delete(protect, admin, deleteSlide).
    put(protect, admin, updateslides).
    get(protect, admin, getSlideById)
 

export default router  