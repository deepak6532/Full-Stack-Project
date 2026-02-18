export interface User {
    id: string;
    _id?: string;
    name: string;
    email: string;
    phone: string;
    role: 'user' | 'admin';
    createdAt?: string;
}

export interface Car {
    _id: string;
    name: string;
    brand: string;
    image: string;
    pricePerDay: number;
    seats: number;
    transmission: 'Manual' | 'Automatic';
    fuelType: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid';
    description: string;
    available: boolean;
    createdAt: string;
}

export interface Booking {
    _id: string;
    bookingId: string;
    userId: User | string;
    carId: Car | string;
    startDate: string;
    endDate: string;
    advanceFee: number;
    totalAmount: number;
    status: 'Pending' | 'Approved' | 'Declined';
    paymentStatus: 'Paid' | 'Failed';
    cancellationPolicy: string;
    createdAt: string;
}

export interface DashboardStats {
    totalBookings: number;
    pendingBookings: number;
    approvedBookings: number;
    declinedBookings: number;
    totalCars: number;
    totalUsers: number;
    totalRevenue: number;
}
