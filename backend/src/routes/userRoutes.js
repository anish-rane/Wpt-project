import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../Config/config.js';
import User from '../models/User.js';

const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
        console.log(req.body);
        const { name, email, password, role } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password before saving the user
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // Set default role if not provided
        const userRole = role && ['employee', 'manager'].includes(role) ? role : 'employee';

        // Create new user
        const user = new User({ name, email, password: hashedPassword, role: userRole });
        await user.save();

        // Create and sign JWT token
        const payload = { userId: user.id };
        const token = jwt.sign(payload, config.jwtSecret, { expiresIn: config.jwtExpire });

        // Respond with the token
        res.json({ message: 'User signed up successfully', token });

    } catch (err) {
        console.log(err);
        res.status(400).json({ error: err.message });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: 'Invalid credentials' });

        // Compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        // Create and sign JWT token
        const payload = { userId: user._id };
        const token = jwt.sign(payload, config.jwtSecret, { expiresIn: config.jwtExpire });

        // Respond with the token
        res.json({ message: 'Login successful', token });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server error' });
    }
});


router.get('/', async (req, res) => {
    const users = await User.find();
    res.json(users);
});

export default router;
