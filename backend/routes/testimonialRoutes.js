import express from 'express';
const router = express.Router()
import { createTestimonials, deleteTestimonial, getTestimonialById, getTestimonials, updatetestimonials} from '../controllers/testimonialController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getTestimonials).post(protect, admin, createTestimonials)
router.route('/:id').delete(protect, admin, deleteTestimonial).get(protect, admin, getTestimonialById).
    put(protect, admin, updatetestimonials)
  

export default router  