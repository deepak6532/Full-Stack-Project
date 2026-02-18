import { Response } from 'express';
import Booking from '../models/Booking';
import Car from '../models/Car';
import User from '../models/User';
import { AuthRequest } from '../middleware/auth';
import { sendEmail } from '../config/email';
import { bookingApprovedEmail, bookingDeclinedEmail } from '../utils/emailTemplates';

// @desc    Admin action: Approve or Decline a booking
// @route   POST /api/admin/action
export const handleBookingAction = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { bookingId, action } = req.body;

        const booking = await Booking.findOne({ bookingId }).populate('carId', 'name brand').populate('userId', 'name email');
        if (!booking) {
            res.status(404).json({ success: false, message: 'Booking not found' });
            return;
        }

        if (booking.status !== 'Pending') {
            res.status(400).json({ success: false, message: `Booking already ${booking.status}` });
            return;
        }

        booking.status = action;
        await booking.save();

        // Send email notification
        try {
            const user = booking.userId as any;
            const car = booking.carId as any;
            let emailSent = false;

            if (action === 'Approved') {
                emailSent = await sendEmail(
                    user.email,
                    `Booking Approved - ${bookingId} | Sharma Car Rental`,
                    bookingApprovedEmail(bookingId, user.name, `${car.brand} ${car.name}`, booking.startDate.toLocaleDateString())
                );
            } else {
                emailSent = await sendEmail(
                    user.email,
                    `Booking Declined - ${bookingId} | Sharma Car Rental`,
                    bookingDeclinedEmail(bookingId, user.name)
                );
            }

            if (emailSent) {
                console.log(`✅ Notification email sent for booking ${bookingId}`);
            } else {
                console.warn(`⚠️ Failed to send notification email for booking ${bookingId}`);
            }

        } catch (emailError) {
            console.error('Email sending failed:', emailError);
        }

        res.status(200).json({
            success: true,
            message: `Booking ${action} successfully`,
            data: booking,
        });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get all bookings (admin)
// @route   GET /api/admin/bookings
export const getAllBookings = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { status } = req.query;
        const filter: any = {};
        if (status) filter.status = status;

        const bookings = await Booking.find(filter)
            .populate('carId', 'name brand image pricePerDay')
            .populate('userId', 'name email phone')
            .sort({ createdAt: -1 });

        res.status(200).json({ success: true, count: bookings.length, data: bookings });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get dashboard stats (admin)
// @route   GET /api/admin/stats
export const getDashboardStats = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const totalBookings = await Booking.countDocuments();
        const pendingBookings = await Booking.countDocuments({ status: 'Pending' });
        const approvedBookings = await Booking.countDocuments({ status: 'Approved' });
        const declinedBookings = await Booking.countDocuments({ status: 'Declined' });
        const totalCars = await Car.countDocuments();
        const totalUsers = await User.countDocuments({ role: 'user' });
        const totalRevenue = await Booking.aggregate([
            { $match: { paymentStatus: 'Paid' } },
            { $group: { _id: null, total: { $sum: '$advanceFee' } } },
        ]);

        res.status(200).json({
            success: true,
            data: {
                totalBookings,
                pendingBookings,
                approvedBookings,
                declinedBookings,
                totalCars,
                totalUsers,
                totalRevenue: totalRevenue[0]?.total || 0,
            },
        });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};
// @desc    Register a new admin (Protected)
// @route   POST /api/admin/register
export const createAdmin = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { name, email, password, phone } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ success: false, message: 'User already exists' });
            return;
        }

        const user = await User.create({
            name,
            email,
            password,
            phone,
            role: 'admin', // Explicitly set role to admin
        });

        res.status(201).json({
            success: true,
            message: 'Admin registered successfully',
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};
