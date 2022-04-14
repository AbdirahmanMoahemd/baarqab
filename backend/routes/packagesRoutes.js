import express from 'express';
const router = express.Router()
import { deletePackage, getPackageById,createPackage, updatePackage, getPackages} from '../controllers/packageController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getPackages).post(protect, admin, createPackage)
router.route('/:id').delete(protect, admin, deletePackage).
    put(protect, admin, updatePackage).
    get(protect, admin, getPackageById)
 

export default router  