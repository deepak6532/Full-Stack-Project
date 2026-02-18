import { Router } from 'express';
import { handleBookingAction, getAllBookings, getDashboardStats, createAdmin } from '../controllers/adminController';
import { getAllUsers } from '../controllers/authController';
import { protect, adminOnly } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { adminActionSchema, registerSchema } from '../validators/schemas';

const router = Router();

router.use(protect, adminOnly); // All admin routes are protected

router.post('/action', validate(adminActionSchema), handleBookingAction);
router.post('/register', validate(registerSchema), createAdmin);
router.get('/bookings', getAllBookings);
router.get('/users', getAllUsers);
router.get('/stats', getDashboardStats);

export default router;
