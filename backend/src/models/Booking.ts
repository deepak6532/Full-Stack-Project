import mongoose, { Document, Schema } from 'mongoose';

export interface IBooking extends Document {
    bookingId: string;
    userId: mongoose.Types.ObjectId;
    carId: mongoose.Types.ObjectId;
    startDate: Date;
    endDate: Date;
    advanceFee: number;
    totalAmount: number;
    today: Date;
    customerName: string;
    customerPhone: string;
    aadharNumber: string;
    status: 'Pending' | 'Approved' | 'Declined' | 'Cancelled' | 'Completed';
    paymentStatus: 'Paid' | 'Failed' | 'Pay on Arrival';
    cancellationPolicy: string;
}

const bookingSchema = new Schema<IBooking>(
    {
        // ... (other fields remain same)
        bookingId: {
            type: String,
            required: true,
            unique: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        customerName: {
            type: String,
            required: true,
        },
        customerPhone: {
            type: String,
            required: true,
        },
        aadharNumber: {
            type: String,
            required: true,
        },
        carId: {
            type: Schema.Types.ObjectId,
            ref: 'Car',
            required: true,
        },
        startDate: {
            type: Date,
            required: [true, 'Start date is required'],
        },
        endDate: {
            type: Date,
            required: [true, 'End date is required'],
        },
        advanceFee: {
            type: Number,
            required: true,
            min: 0,
        },
        totalAmount: {
            type: Number,
            required: true,
            min: 0,
        },
        status: {
            type: String,
            enum: ['Pending', 'Approved', 'Declined', 'Cancelled', 'Completed'],
            default: 'Pending',
        },
        paymentStatus: {
            type: String,
            enum: ['Paid', 'Failed', 'Pay on Arrival'],
            default: 'Pay on Arrival',
        },
        cancellationPolicy: {
            type: String,
            default: 'Non-Refundable',
        },
    },
    { timestamps: true }
);

export default mongoose.model<IBooking>('Booking', bookingSchema);
