import express from 'express';
import {
    getSizes,
    getSize,
    careteSize,
    updateSize,
    deleteSize
} from '../controllers/sizeController.js'
import { admin, protect } from '../middleware/authMiddleware.js'


const router = express.Router()

router.route('/').get(getSizes)
    .post(protect, admin, careteSize)


    
router.route('/:id').get(getSize)
    .delete(protect, admin, deleteSize)
    .put(protect, admin, updateSize)

  
export default router  