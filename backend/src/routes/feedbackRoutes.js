import express from 'express';
const router = express.Router();
import auth from '../middleware/authMiddleware.js';
import {createFeedback,getFeedbacks,updateFeedback,deleteFeedback,} from '../Controllers/feedbackController.js';

router.post('/', auth, createFeedback);
router.get('/', auth, getFeedbacks);
router.put('/:id', auth, updateFeedback);
router.delete('/:id', auth, deleteFeedback);

export default router;
