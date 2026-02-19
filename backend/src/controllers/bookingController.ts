import { Response } from 'express';
import crypto from 'crypto';
import Booking from '../models/Booking';
import Car from '../models/Car';
import User from '../models/User';
import { AuthRequest } from '../middleware/auth';
import generateBookingId from '../utils/generateBookingId';
import { sendEmail } from '../config/email';
import { bookingReceivedEmail } from '../utils/emailTemplates';

// @desc    Create a booking (after payment verification)
// @route   POST /api/bookings/create
export const createBooking = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const {
            carId, startDate, endDate,
            customerName, customerPhone, aadharNumber
        } = req.body;

        // Check car exists
        const car = await Car.findById(carId);
        if (!car) {
            res.status(404).json({ success: false, message: 'Car not found' });
            return;
        }

        // Calculate days and fee
        const start = new Date(startDate);
        const end = new Date(endDate);
        const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
        const totalAmount = days * car.pricePerDay;
        const advanceFee = 0; // No advance payment required

        const bookingId = generateBookingId();

        const booking = await Booking.create({
            bookingId,
            userId: req.user?._id,
            carId,
            startDate: start,
            endDate: end,
            customerName,
            customerPhone,
            aadharNumber,
            advanceFee,
            totalAmount,
            status: 'Pending',
            paymentStatus: 'Pay on Arrival',
            cancellationPolicy: 'Standard',
        });

        // Send confirmation email
        try {
            const user = req.user!;
            await sendEmail(
                user.email,
                `Booking Confirmed - ${bookingId} | Gupta Car Rental`,
                bookingReceivedEmail(bookingId, user.name)
            );
        } catch (emailError) {
            console.error('Email sending failed:', emailError);
        }

        res.status(201).json({ success: true, data: booking });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get user's bookings
// @route   GET /api/bookings/my
export const getMyBookings = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const bookings = await Booking.find({ userId: req.user?._id })
            .populate('carId', 'name brand image pricePerDay')
            .sort({ createdAt: -1 });

        res.status(200).json({ success: true, count: bookings.length, data: bookings });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Cancel booking (Strict Non-Refundable)
// @route   PUT /api/bookings/cancel/:id
export const cancelBooking = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            res.status(404).json({ success: false, message: 'Booking not found' });
            return;
        }

        // Ensure user owns the booking
        if (booking.userId.toString() !== req.user?._id.toString()) {
            res.status(401).json({ success: false, message: 'Not authorized to cancel this booking' });
            return;
        }

        if (booking.status === 'Cancelled') {
            res.status(400).json({ success: false, message: 'Booking already cancelled' });
            return;
        }

        if (booking.status === 'Completed' || booking.status === 'Declined') {
            res.status(400).json({ success: false, message: 'Cannot cancel completed or declined booking' });
            return;
        }

        // Apply strict non-refundable logic
        booking.status = 'Cancelled';
        // We do NOT refund any amount. 
        // We could log this or update a field 'refundAmount': 0 if schema supported it.

        await booking.save();

        res.status(200).json({
            success: true,
            message: 'Booking cancelled. Note: Advance fee is non-refundable.',
            data: booking,
        });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};
