import { Router } from 'express';
import { createBooking, getMyBookings, cancelBooking } from '../controllers/bookingController';
import { protect } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { createBookingSchema } from '../validators/schemas';

const router = Router();

router.post('/create', protect, validate(createBookingSchema), createBooking);
router.get('/my', protect, getMyBookings);
router.put('/cancel/:id', protect, cancelBooking);

export default router;
