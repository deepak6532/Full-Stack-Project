import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import connectDB from './config/db';
import User from './models/User';
import Car from './models/Car';

const seedData = async () => {
    try {
        await connectDB();

        // Clear existing data
        await User.deleteMany({});
        await Car.deleteMany({});

        // Create admin user
        await User.create({
            name: 'Admin Gupta',
            email: 'admin@Guptacarrental.com',
            password: 'admin123',
            phone: '9876543210',
            role: 'admin',
        });

        // Create demo user
        await User.create({
            name: 'Rahul Kumar',
            email: 'rahul@example.com',
            password: 'user123',
            phone: '9876543211',
            role: 'user',
        });

        // Create sample cars
        const cars = [
            {
                name: 'Swift Dzire',
                brand: 'Maruti Suzuki',
                image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0afa?w=800',
                pricePerDay: 1500,
                seats: 5,
                transmission: 'Manual',
                fuelType: 'Petrol',
                description: 'Perfect sedan for city and highway drives. Fuel-efficient, comfortable, and reliable for all your travel needs.',
                available: true,
            },
            {
                name: 'Creta',
                brand: 'Hyundai',
                image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800',
                pricePerDay: 2500,
                seats: 5,
                transmission: 'Automatic',
                fuelType: 'Diesel',
                description: 'Premium SUV with advanced features, sunroof, and powerful engine. Ideal for long drives and family trips.',
                available: true,
            },
            {
                name: 'Innova Crysta',
                brand: 'Toyota',
                image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800',
                pricePerDay: 3500,
                seats: 7,
                transmission: 'Automatic',
                fuelType: 'Diesel',
                description: 'The king of MPVs. Spacious 7-seater with premium comfort, perfect for group travel and long-distance journeys.',
                available: true,
            },
            {
                name: 'Fortuner',
                brand: 'Toyota',
                image: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800',
                pricePerDay: 5000,
                seats: 7,
                transmission: 'Automatic',
                fuelType: 'Diesel',
                description: 'Dominate any terrain with this powerful SUV. 4x4 capability, luxurious interiors, and commanding road presence.',
                available: true,
            },
            {
                name: 'City',
                brand: 'Honda',
                image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800',
                pricePerDay: 2000,
                seats: 5,
                transmission: 'Automatic',
                fuelType: 'Petrol',
                description: 'Elegant sedan with a refined engine and premium features. Smooth ride quality and excellent mileage.',
                available: true,
            },
            {
                name: 'Nexon EV',
                brand: 'Tata',
                image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800',
                pricePerDay: 2200,
                seats: 5,
                transmission: 'Automatic',
                fuelType: 'Electric',
                description: 'Go green with this fully electric SUV. Zero emissions, connected car technology, and a range of 312 km.',
                available: true,
            },
            {
                name: 'Thar',
                brand: 'Mahindra',
                image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800',
                pricePerDay: 3000,
                seats: 4,
                transmission: 'Manual',
                fuelType: 'Diesel',
                description: 'Born for adventure. Convertible roof, 4x4 drivetrain, and rugged design for the ultimate off-road experience.',
                available: true,
            },
            {
                name: 'Baleno',
                brand: 'Maruti Suzuki',
                image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800',
                pricePerDay: 1200,
                seats: 5,
                transmission: 'Manual',
                fuelType: 'Petrol',
                description: 'Premium hatchback with a spacious cabin, SmartPlay infotainment, and class-leading boot space.',
                available: true,
            },
        ];

        await Car.insertMany(cars);

        console.log('✅ Database seeded successfully!');
        console.log('👤 Admin: admin@Guptacarrental.com / admin123');
        console.log('👤 User:  rahul@example.com / user123');
        console.log(`🚗 ${cars.length} cars added`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Seed Error:', error);
        process.exit(1);
    }
};

seedData();
