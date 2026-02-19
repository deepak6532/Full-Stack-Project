import dotenv from 'dotenv';
dotenv.config();

/// <reference types="node" />
import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import connectDB from './config/db';
import { errorHandler } from './middleware/errorHandler';

// Route imports
import authRoutes from './routes/authRoutes';
import carRoutes from './routes/carRoutes';
import bookingRoutes from './routes/bookingRoutes';
import adminRoutes from './routes/adminRoutes';
import userQueryRoutes from './routes/userQueryRoutes';
// import paymentRoutes from './routes/paymentRoutes';

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Middleware
app.use(helmet());
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/contact', userQueryRoutes);
// app.use('/api/payment', paymentRoutes);

// Health check
app.get('/api/health', (req: Request, res: Response) => {
    res.status(200).json({ status: 'OK', message: 'Gupta Car Rental API is running 🚗' });
});

// Error handler
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`🚗 Gupta Car Rental Server running on port ${PORT}`);
    console.log(`📡 API: http://localhost:${PORT}/api/health`);
});

export default app;
