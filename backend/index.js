import express from 'express';
import connectDB from './src/Config/Dbconfig.js';
import userRouter from './src/routes/userRoutes.js';
import leaveRouter from './src/routes/leaveRoutes.js';
import feedbackRouter from './src/routes/feedbackRoutes.js';
import cors from 'cors';
import authRoutes from './src/routes/authRouters.js';
const app = express();
const PORT = 7800;

app.use(express.json());
// const cors = require('cors');
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));


connectDB();

app.get('/', (request, responce) => {
    responce.send({ message: 'Welcome to Online Leave Management System' });
});

app.use('/users', userRouter);
app.use('/leaves', leaveRouter);
app.use('/feedback', feedbackRouter);
app.use('/api', authRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
