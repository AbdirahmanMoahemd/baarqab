import express from 'express';
import {
    getSubCategories,
    getSubCategoryById,
    createSubCategory,
    updateSubCategory,
    deleteSubCategory
} from '../controllers/subCategoryController.js'
import { admin, protect } from '../middleware/authMiddleware.js'


const router = express.Router()

router.route('/').get(getSubCategories)
    .post(protect, admin, createSubCategory)


    
router.route('/:id').get(getSubCategoryById)
    .delete(protect, admin, deleteSubCategory)
    .put(protect, admin, updateSubCategory)

  
export default router  