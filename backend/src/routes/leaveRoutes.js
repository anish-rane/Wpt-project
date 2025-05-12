import express from 'express';
import Leave from '../models/Leave.js';
import mongoose from 'mongoose';
import auth from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/apply',auth, async (req, res) => {
    try {
       if (!mongoose.Types.ObjectId.isValid(req.body.userId)) {
  return res.status(400).json({ error: 'Invalid userId' });
}
const leave = await Leave.create(req.body);

        res.json({ message: 'Leave applied', leave });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});
router.get('/', auth, async (req, res) => {
    try {
        const leaves = await Leave.find();
        res.json(leaves);
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: err.message });
    }
});

router.get('/:userId', async (req, res) => {
    const leaves = await Leave.find({ userId: req.params.userId });
    res.json(leaves);
});

router.put('/approve/:leaveId',auth, async (req, res) => {
    const leave = await Leave.findByIdAndUpdate(
        req.params.leaveId,
        { status: 'approved' },
        { new: true }
    );
    res.json({ message: 'Leave approved', leave });
});

router.put('/reject/:leaveId', async (req, res) => {
    const leave = await Leave.findByIdAndUpdate(
        req.params.leaveId,
        { status: 'rejected' },
        { new: true }
    );
    res.json({ message: 'Leave rejected', leave });
});

export default router;
