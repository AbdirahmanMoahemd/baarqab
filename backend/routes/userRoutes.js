import express from 'express';
const router = express.Router()
import { authUser, getUserProfile,getUsersCount, registerUser, updateProfile, getUsers, deleteUser, getUserById, updateUser} from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(registerUser).get(protect, admin, getUsers)
router.get('/count', getUsersCount)
router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateProfile)
router.route('/:id').delete(protect, admin, deleteUser).get(protect, admin, getUserById).put(protect, admin, updateUser)
 
  
export default router    