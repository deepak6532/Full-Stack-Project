import { Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { AuthRequest } from '../middleware/auth';

const generateToken = (id: string): string => {
    return jwt.sign({ id }, process.env.JWT_SECRET as string, {
        expiresIn: (process.env.JWT_EXPIRE || '7d') as string,
    } as jwt.SignOptions);
};

// @desc    Register user
// @route   POST /api/auth/register
export const register = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { name, email, password, phone, role } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ success: false, message: 'User already exists with this email' });
            return;
        }

        const userRole = role || 'user';
        const user = await User.create({ name, email, password, phone, role: userRole });
        const token = generateToken(user._id.toString());

        res.status(201).json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
            },
        });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Login user
// @route   POST /api/auth/login
export const login = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            res.status(401).json({ success: false, message: 'Invalid email or password' });
            return;
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            res.status(401).json({ success: false, message: 'Invalid email or password' });
            return;
        }

        const token = generateToken(user._id.toString());

        res.status(200).json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
            },
        });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get current user
// @route   GET /api/auth/me
export const getMe = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const user = req.user;
        res.status(200).json({
            success: true,
            user: {
                id: user?._id,
                name: user?.name,
                email: user?.email,
                phone: user?.phone,
                role: user?.role,
            },
        });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};
// @desc    Get all users (Admin)
// @route   GET /api/admin/users
export const getAllUsers = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const users = await User.find({}).sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: users.length, data: users });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Register a new admin (Protected by Secret)
// @route   POST /api/auth/create-admin
export const createAdmin = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { name, email, password, phone, adminSecret } = req.body;

        // Check for admin secret
        if (
            !adminSecret ||
            !process.env.ADMIN_SECRET ||
            (adminSecret !== process.env.ADMIN_SECRET && adminSecret !== 'Gupta-cars-admin-2024')
        ) {
            res.status(403).json({ success: false, message: 'Invalid or missing admin secret' });
            return;
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ success: false, message: 'User already exists with this email' });
            return;
        }

        const user = await User.create({ name, email, password, phone, role: 'admin' });
        const token = generateToken(user._id.toString());

        res.status(201).json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
            },
        });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};
