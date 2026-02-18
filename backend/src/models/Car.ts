import mongoose, { Document, Schema } from 'mongoose';

export interface ICar extends Document {
    name: string;
    brand: string;
    image: string;
    pricePerDay: number;
    seats: number;
    transmission: 'Manual' | 'Automatic';
    fuelType: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid';
    description: string;
    available: boolean;
    createdAt: Date;
}

const carSchema = new Schema<ICar>(
    {
        name: {
            type: String,
            required: [true, 'Car name is required'],
            trim: true,
        },
        brand: {
            type: String,
            required: [true, 'Brand is required'],
            trim: true,
        },
        image: {
            type: String,
            required: [true, 'Image URL is required'],
        },
        pricePerDay: {
            type: Number,
            required: [true, 'Price per day is required'],
            min: 0,
        },
        seats: {
            type: Number,
            required: [true, 'Number of seats is required'],
            min: 1,
            max: 10,
        },
        transmission: {
            type: String,
            enum: ['Manual', 'Automatic'],
            required: true,
        },
        fuelType: {
            type: String,
            enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid'],
            required: true,
        },
        description: {
            type: String,
            default: '',
        },
        available: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model<ICar>('Car', carSchema);
