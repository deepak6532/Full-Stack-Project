import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import connectDB from '../config/db';
import Car from '../models/Car';

const addIndianCars = async () => {
    try {
        await connectDB();

        const indianCars = [
            {
                name: 'Tiago',
                brand: 'Tata',
                image: 'https://imgd.aeplcdn.com/1056x594/n/cw/ec/40530/tiago-exterior-right-front-three-quarter-27.jpeg?isig=0&q=75',
                pricePerDay: 1000,
                seats: 5,
                transmission: 'Manual',
                fuelType: 'Petrol',
                description: 'Compact and peppy hatchback. Great for city traffic with excellent safety features.',
                available: true,
            },
            {
                name: 'Wagon R',
                brand: 'Maruti Suzuki',
                image: 'https://imgd.aeplcdn.com/1056x594/n/cw/ec/112947/wagon-r-exterior-right-front-three-quarter-2.jpeg?isig=0&q=75',
                pricePerDay: 900,
                seats: 5,
                transmission: 'Manual',
                fuelType: 'Petrol', // Simplified
                description: 'Tall-boy design offering maximum space and practicality. High fuel efficiency and low maintenance.',
                available: true,
            },
            {
                name: 'Bolero',
                brand: 'Mahindra',
                image: 'https://imgd.aeplcdn.com/1056x594/n/cw/ec/131131/bolero-exterior-right-front-three-quarter.jpeg?isig=0&q=75',
                pricePerDay: 1800,
                seats: 7,
                transmission: 'Manual',
                fuelType: 'Diesel',
                description: 'Rugged workhorse for tough terrains. Spacious 7-seater with proven reliability.',
                available: true,
            }
        ];

        for (const carData of indianCars) {
            // @ts-ignore
            const existingCar = await Car.findOne({ name: carData.name });
            if (!existingCar) {
                // @ts-ignore
                await Car.create(carData);
                console.log(`✅ Added: ${carData.name}`);
            } else {
                console.log(`ℹ️ Skipped (already exists): ${carData.name}`);
            }
        }

        console.log('✅ Indian cars check complete!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error adding cars:', error);
        process.exit(1);
    }
};

addIndianCars();
