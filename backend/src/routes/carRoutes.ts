import { Router } from 'express';
import { getAvailableCars, getAllCars, getCar, createCar, updateCar, deleteCar } from '../controllers/carController';
import { protect, adminOnly } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { createCarSchema } from '../validators/schemas';

const router = Router();

// Public routes
router.get('/available', getAvailableCars);
router.get('/:id', getCar);

// Admin-protected routes
router.get('/', protect, adminOnly, getAllCars);
router.post('/', protect, adminOnly, validate(createCarSchema), createCar);
router.put('/:id', protect, adminOnly, updateCar);
router.delete('/:id', protect, adminOnly, deleteCar);

export default router;
