import { Request, Response } from 'express';
import Car from '../models/Car';
import Booking from '../models/Booking';
import { AuthRequest } from '../middleware/auth';
import { fetchCarImage } from '../utils/imageDownloader';
import fs from 'fs';
import path from 'path';

// @desc    Get all available cars (excluding cars with active approved bookings)
// @route   GET /api/cars/available
export const getAvailableCars = async (req: Request, res: Response): Promise<void> => {
    try {
        // Find cars that are currently in an active "Approved" booking
        const now = new Date();
        const activeBookings = await Booking.find({
            status: 'Approved',
            endDate: { $gte: now },
        }).select('carId');

        const bookedCarIds = activeBookings.map((b) => b.carId);

        // Return cars that are available and NOT in active bookings
        const cars = await Car.find({
            available: true,
            _id: { $nin: bookedCarIds },
        }).sort({ createdAt: -1 });

        res.status(200).json({ success: true, count: cars.length, data: cars });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get all cars (admin)
// @route   GET /api/cars
export const getAllCars = async (req: Request, res: Response): Promise<void> => {
    try {
        const cars = await Car.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: cars.length, data: cars });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get single car
// @route   GET /api/cars/:id
export const getCar = async (req: Request, res: Response): Promise<void> => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) {
            res.status(404).json({ success: false, message: 'Car not found' });
            return;
        }
        res.status(200).json({ success: true, data: car });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Create car (admin)
// @route   POST /api/cars
export const createCar = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { name, brand, image } = req.body;

        let carImage = image;

        // If no image provided, download strictly from Google/Scraper
        if (!carImage) {
            carImage = await fetchCarImage(`${brand} ${name}`);
        }

        const car = await Car.create({
            ...req.body,
            image: carImage,
        });

        res.status(201).json({ success: true, data: car });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update car (admin)
// @route   PUT /api/cars/:id
export const updateCar = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const car = await Car.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!car) {
            res.status(404).json({ success: false, message: 'Car not found' });
            return;
        }
        res.status(200).json({ success: true, data: car });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Delete car (admin)
// @route   DELETE /api/cars/:id
export const deleteCar = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) {
            res.status(404).json({ success: false, message: 'Car not found' });
            return;
        }

        // Try to delete local image if it exists and is not default
        try {
            if (car.image && car.image.startsWith('/assets/cars/') && !car.image.includes('default.jpg')) {
                const imagePath = path.join(__dirname, '../../../../frontend/public', car.image);
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            }
        } catch (err) {
            console.error('Error deleting image file:', err);
        }

        await car.deleteOne();
        res.status(200).json({ success: true, message: 'Car deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};
