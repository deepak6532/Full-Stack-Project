import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HiUsers, HiCog, HiLightningBolt, HiCalendar, HiCurrencyRupee, HiShieldCheck } from 'react-icons/hi';
import toast from 'react-hot-toast';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';
import type { Car } from '../types';



const CarDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { isDark } = useTheme();
    const { isAuthenticated, user } = useAuth();
    const navigate = useNavigate();
    const [car, setCar] = useState<Car | null>(null);
    const [loading, setLoading] = useState(true);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [aadharNumber, setAadharNumber] = useState('');
    const [booking, setBooking] = useState(false);

    useEffect(() => {
        fetchCar();
    }, [id]);

    const fetchCar = async () => {
        try {
            const { data } = await API.get(`/cars/${id}`);
            setCar(data.data);
            if (user) {
                setCustomerName(user.name);
                setCustomerPhone(user.phone);
            }
        } catch (error) {
            toast.error('Failed to load car details');
        } finally {
            setLoading(false);
        }
    };

    const calculateDays = () => {
        if (!startDate || !endDate) return 0;
        const diff = new Date(endDate).getTime() - new Date(startDate).getTime();
        return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
    };

    const totalAmount = car ? calculateDays() * car.pricePerDay : 0;
    // const advanceFee = Math.round(totalAmount * 0.2); // Removed advance fee

    const handleBooking = async () => {
        if (!isAuthenticated) {
            toast.error('Please login to book a car');
            navigate('/login');
            return;
        }
        if (!startDate || !endDate) {
            toast.error('Please select trip dates');
            return;
        }
        if (new Date(endDate) <= new Date(startDate)) {
            toast.error('End date must be after start date');
            return;
        }
        if (!customerName || !customerPhone || !aadharNumber) {
            toast.error('Please fill in all customer details');
            return;
        }

        setBooking(true);
        try {
            // Direct Booking Creation (No Payment)
            await API.post('/bookings/create', {
                carId: id,
                startDate,
                endDate,
                customerName,
                customerPhone,
                aadharNumber
            });
            toast.success('Booking request sent successfully! 🚗');
            navigate('/my-bookings');
        } catch (error) {
            toast.error('Booking creation failed');
        } finally {
            setBooking(false);
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--color-primary)]"></div>
        </div>
    );

    if (!car) return (
        <div className="min-h-screen flex items-center justify-center">
            <p className={`text-xl ${isDark ? 'text-white' : 'text-[var(--color-secondary)]'}`}>Car not found</p>
        </div>
    );

    return (
        <div className={`min-h-screen py-8 ${isDark ? 'bg-[var(--color-surface-dark)]' : 'bg-gray-50'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Car Info - Left Side */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Image */}
                        <div className="relative rounded-2xl overflow-hidden shadow-xl">
                            <img src={car.image} alt={car.name} className="w-full h-64 sm:h-96 object-cover" />
                            <div className="absolute top-4 right-4 px-4 py-2 rounded-full bg-[var(--color-primary)] text-white font-bold shadow-lg">
                                {car.fuelType}
                            </div>
                        </div>

                        {/* Details */}
                        <div className={`p-6 rounded-2xl ${isDark ? 'bg-[var(--color-surface-card-dark)] border border-[var(--color-border-dark)]' : 'bg-white shadow-md border border-[var(--color-border)]'}`}>
                            <p className={`text-sm font-semibold mb-1 ${isDark ? 'text-[var(--color-primary-light)]' : 'text-[var(--color-primary)]'}`}>{car.brand}</p>
                            <h1 className={`text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-[var(--color-secondary)]'}`}>{car.name}</h1>
                            <p className={`mb-6 leading-relaxed ${isDark ? 'text-[var(--color-text-secondary-dark)]' : 'text-[var(--color-text-secondary)]'}`}>{car.description}</p>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                {[
                                    { icon: <HiUsers size={24} />, label: 'Seats', value: `${car.seats} Seats` },
                                    { icon: <HiCog size={24} />, label: 'Transmission', value: car.transmission },
                                    { icon: <HiLightningBolt size={24} />, label: 'Fuel', value: car.fuelType },
                                    { icon: <HiCurrencyRupee size={24} />, label: 'Price', value: `₹${car.pricePerDay}/day` },
                                ].map((spec, i) => (
                                    <div key={i} className={`p-4 rounded-xl text-center ${isDark ? 'bg-[var(--color-surface-dark)]' : 'bg-gray-50'}`}>
                                        <div className="text-[var(--color-primary)] flex justify-center mb-2">{spec.icon}</div>
                                        <p className={`text-xs mb-1 ${isDark ? 'text-[var(--color-text-secondary-dark)]' : 'text-[var(--color-text-secondary)]'}`}>{spec.label}</p>
                                        <p className={`font-bold text-sm ${isDark ? 'text-white' : 'text-[var(--color-secondary)]'}`}>{spec.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Booking Form - Right Side */}
                    <div className="lg:col-span-1">
                        <div className={`sticky top-24 p-6 rounded-2xl ${isDark ? 'bg-[var(--color-surface-card-dark)] border border-[var(--color-border-dark)]' : 'bg-white shadow-lg border border-[var(--color-border)]'}`}>
                            <h2 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-[var(--color-secondary)]'}`}>Book This Car</h2>

                            <div className="space-y-4">
                                <div>
                                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-[var(--color-text-secondary-dark)]' : 'text-[var(--color-text-secondary)]'}`}>
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        value={customerName}
                                        onChange={(e) => setCustomerName(e.target.value)}
                                        placeholder="Enter full name"
                                        className={`w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-[var(--color-primary)] ${isDark ? 'bg-[var(--color-surface-dark)] border-[var(--color-border-dark)] text-white' : 'border-[var(--color-border)]'}`}
                                    />
                                </div>
                                <div>
                                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-[var(--color-text-secondary-dark)]' : 'text-[var(--color-text-secondary)]'}`}>
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        value={customerPhone}
                                        onChange={(e) => setCustomerPhone(e.target.value)}
                                        placeholder="+91..."
                                        className={`w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-[var(--color-primary)] ${isDark ? 'bg-[var(--color-surface-dark)] border-[var(--color-border-dark)] text-white' : 'border-[var(--color-border)]'}`}
                                    />
                                </div>
                                <div>
                                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-[var(--color-text-secondary-dark)]' : 'text-[var(--color-text-secondary)]'}`}>
                                        Aadhar Number
                                    </label>
                                    <input
                                        type="text"
                                        value={aadharNumber}
                                        onChange={(e) => setAadharNumber(e.target.value)}
                                        placeholder="XXXX-XXXX-XXXX"
                                        className={`w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-[var(--color-primary)] ${isDark ? 'bg-[var(--color-surface-dark)] border-[var(--color-border-dark)] text-white' : 'border-[var(--color-border)]'}`}
                                    />
                                </div>
                                <div>
                                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-[var(--color-text-secondary-dark)]' : 'text-[var(--color-text-secondary)]'}`}>
                                        <HiCalendar className="inline mr-1" /> Start Date
                                    </label>
                                    <input
                                        type="date"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        min={new Date().toISOString().split('T')[0]}
                                        className={`w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-[var(--color-primary)] ${isDark ? 'bg-[var(--color-surface-dark)] border-[var(--color-border-dark)] text-white' : 'border-[var(--color-border)]'}`}
                                    />
                                </div>
                                <div>
                                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-[var(--color-text-secondary-dark)]' : 'text-[var(--color-text-secondary)]'}`}>
                                        <HiCalendar className="inline mr-1" /> End Date
                                    </label>
                                    <input
                                        type="date"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        min={startDate || new Date().toISOString().split('T')[0]}
                                        className={`w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-[var(--color-primary)] ${isDark ? 'bg-[var(--color-surface-dark)] border-[var(--color-border-dark)] text-white' : 'border-[var(--color-border)]'}`}
                                    />
                                </div>
                            </div>

                            {/* Price Breakdown */}
                            {startDate && endDate && calculateDays() > 0 && (
                                <div className={`mt-6 p-4 rounded-xl ${isDark ? 'bg-[var(--color-surface-dark)]' : 'bg-gray-50'}`}>
                                    <h3 className={`font-semibold mb-3 ${isDark ? 'text-white' : 'text-[var(--color-secondary)]'}`}>Price Breakdown</h3>
                                    <div className={`space-y-2 text-sm ${isDark ? 'text-[var(--color-text-secondary-dark)]' : 'text-[var(--color-text-secondary)]'}`}>
                                        <div className="flex justify-between">
                                            <span>₹{car.pricePerDay} × {calculateDays()} days</span>
                                            <span>₹{totalAmount.toLocaleString()}</span>
                                        </div>
                                        <hr className={isDark ? 'border-[var(--color-border-dark)]' : 'border-[var(--color-border)]'} />
                                        <div className={`flex justify-between font-bold text-base ${isDark ? 'text-white' : 'text-[var(--color-secondary)]'}`}>
                                            <span>Total Est.</span>
                                            <span>₹{totalAmount.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <button
                                onClick={handleBooking}
                                disabled={booking || !startDate || !endDate}
                                className="w-full mt-6 py-4 rounded-xl bg-[var(--color-primary)] text-white font-bold text-lg hover:bg-[var(--color-primary-dark)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[var(--color-primary)]/25"
                            >
                                {booking ? 'Processing...' : `Confirm Booking`}
                            </button>

                            <div className="mt-4 flex items-center gap-2 text-sm text-[var(--color-text-secondary)] justify-center">
                                <HiShieldCheck size={16} />
                                <span>Pay on Arrival</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarDetail;
