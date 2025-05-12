import mongoose from 'mongoose';

const leaveSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    type: { type: String, enum: ['paid', 'medical', 'unpaid'] },
    days: Number,
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }
});

const Leave = mongoose.model('Leave', leaveSchema);
export default Leave;
