import { Router } from 'express';
import { register, login, getMe, createAdmin } from '../controllers/authController';
import { protect } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { registerSchema, loginSchema } from '../validators/schemas';

const router = Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.post('/create-admin', validate(registerSchema), createAdmin);
router.get('/me', protect, getMe);

export default router;
