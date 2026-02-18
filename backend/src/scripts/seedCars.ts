import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import Car from '../models/Car';
import connectDB from '../config/db';

// Explicitly load .env from backend root
dotenv.config({ path: path.join(__dirname, '../../.env') });

const seedCars = async () => {
    try {
        await connectDB();

        // Wait for connection to be ready state 1 (connected)
        // connectDB awaits mongoose.connect, so it should be connected.
        if (mongoose.connection.readyState !== 1) {
            console.log('Using fallback wait...');
            await new Promise(resolve => setTimeout(resolve, 1000));
        }

        const cars = [
            {
                name: 'Swift',
                brand: 'Maruti Suzuki',
                image: 'https://imgd.aeplcdn.com/1056x594/n/cw/ec/159099/swift-exterior-right-front-three-quarter-3.jpeg?isig=0&q=80',
                pricePerDay: 2000,
                seats: 5,
                transmission: 'Manual',
                fuelType: 'Petrol',
                description: 'The Maruti Swift is a stylish hatchback known for its sporty design and great fuel efficiency. Perfect for city drives.',
                available: true
            },
            {
                name: 'i20',
                brand: 'Hyundai',
                image: 'https://imgd.aeplcdn.com/1056x594/n/cw/ec/150603/i20-exterior-right-front-three-quarter-7.jpeg?isig=0&q=80',
                pricePerDay: 2200,
                seats: 5,
                transmission: 'Automatic',
                fuelType: 'Petrol',
                description: 'The Hyundai i20 offers a premium interior, advanced features, and a smooth automatic transmission for a comfortable ride.',
                available: true
            },
            {
                name: 'Tiago',
                brand: 'Tata',
                image: 'https://imgd.aeplcdn.com/1056x594/n/cw/ec/39345/tiago-exterior-right-front-three-quarter-26.jpeg?isig=0&q=80',
                pricePerDay: 1800,
                seats: 5,
                transmission: 'Manual',
                fuelType: 'Petrol',
                description: 'Tata Tiago is a safe and reliable hatchback with a zippy engine, making it an excellent choice for budget-conscious travelers.',
                available: true
            },
            {
                name: 'City',
                brand: 'Honda',
                image: 'https://imgd.aeplcdn.com/1056x594/n/cw/ec/134287/city-exterior-right-front-three-quarter-77.jpeg?isig=0&q=80',
                pricePerDay: 3000,
                seats: 5,
                transmission: 'Automatic',
                fuelType: 'Petrol',
                description: 'Honda City is the epitome of comfort and elegance. A spacious sedan ideal for long drives and business trips.',
                available: true
            },
            {
                name: 'Thar',
                brand: 'Mahindra',
                image: 'https://imgd.aeplcdn.com/1056x594/n/cw/ec/40087/thar-exterior-right-front-three-quarter-11.jpeg?isig=0&q=80',
                pricePerDay: 4500,
                seats: 4,
                transmission: 'Manual',
                fuelType: 'Diesel',
                description: 'Mahindra Thar is an iconic off-roader built for adventure. Tackle any terrain with this rugged and powerful SUV.',
                available: true
            }
        ];

        let addedCount = 0;
        for (const carData of cars) {
            const exists = await Car.findOne({ name: carData.name, brand: carData.brand });
            if (!exists) {
                await Car.create(carData);
                console.log(`➕ Added: ${carData.brand} ${carData.name}`);
                addedCount++;
            } else {
                console.log(`⚠️ Skipped (Already exists): ${carData.brand} ${carData.name}`);
            }
        }

        console.log(`✅ Seeding complete! Added ${addedCount} new cars.`);
        process.exit(0);

    } catch (error) {
        console.error('❌ Seeding failed:', error);
        process.exit(1);
    }
};

seedCars();
