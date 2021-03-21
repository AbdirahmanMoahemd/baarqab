import express from 'express';

const router = express.Router()
import {  getPromotions, createPromotions, deletePromotions, getPromotionsById, updatePromotions } from '../controllers/promotionController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getPromotions).post(protect, admin, createPromotions) 
router.route('/:id').delete(protect, admin, deletePromotions).
    get(protect, admin, getPromotionsById). 
    put(protect, admin, updatePromotions) 
  

export default router  