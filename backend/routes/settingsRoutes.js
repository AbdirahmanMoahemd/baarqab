import express from 'express';
const router = express.Router()
import { getSettings, getSettingsById, updateSettings } from '../controllers/settingsController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getSettings)
router.route('/:id').get(protect, admin, getSettingsById).
    put(protect, admin, updateSettings)
 

export default router  