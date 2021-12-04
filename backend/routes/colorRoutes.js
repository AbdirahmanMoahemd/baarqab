import express from 'express';
import {
    getColors,
    getColor,
    createColor,
    updateColor,
    deleteColor
} from '../controllers/colorController.js'
import { admin, protect } from '../middleware/authMiddleware.js'


const router = express.Router()

router.route('/').get(getColors)
    .post(protect, admin, createColor)


    
router.route('/:id').get(getColor)
    .delete(protect, admin, deleteColor)
    .put(protect, admin, updateColor)

  
export default router  