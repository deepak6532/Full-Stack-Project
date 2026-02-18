import { z } from 'zod';

export const registerSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(50),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    phone: z.string().min(10, 'Phone must be at least 10 digits'),
    role: z.enum(['user', 'admin']).optional(),
});

export const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
});

export const createBookingSchema = z.object({
    carId: z.string().min(1, 'Car ID is required'),
    startDate: z.string().min(1, 'Start date is required'),
    endDate: z.string().min(1, 'End date is required'),
    customerName: z.string().min(2, 'Name is required'),
    customerPhone: z.string().min(10, 'Phone is required'),
    aadharNumber: z.string().min(12, 'Aadhar is required'),
});

export const adminActionSchema = z.object({
    bookingId: z.string().min(1, 'Booking ID is required'),
    action: z.enum(['Approved', 'Declined'], {
        errorMap: () => ({ message: 'Action must be Approved or Declined' }),
    }),
});

export const createCarSchema = z.object({
    name: z.string().min(1, 'Car name is required'),
    brand: z.string().min(1, 'Brand is required'),
    image: z.string().url('Image must be a valid URL'),
    pricePerDay: z.number().positive('Price must be positive'),
    seats: z.number().int().min(1).max(10),
    transmission: z.enum(['Manual', 'Automatic']),
    fuelType: z.enum(['Petrol', 'Diesel', 'Electric', 'Hybrid']),
    description: z.string().optional(),
});

export const createOrderSchema = z.object({
    amount: z.number().positive('Amount must be positive'),
    carId: z.string().min(1, 'Car ID is required'),
});
