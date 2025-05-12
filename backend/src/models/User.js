import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true ,match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/},
    password: String,
    role: { type: String, enum: ['employee', 'manager'], default: 'employee' }
});

const User = mongoose.model('User', userSchema);
export default User;
