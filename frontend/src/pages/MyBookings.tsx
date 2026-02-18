import React, { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import API from '../api/axios';
import toast from 'react-hot-toast';
import type { Booking, Car } from '../types';

const MyBookings: React.FC = () => {
    const { isDark } = useTheme();
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const { data } = await API.get('/bookings/my');
            setBookings(data.data);
        } catch (error) {
            console.error('Failed to fetch bookings:', error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Approved': return 'bg-[var(--color-success)]/10 text-[var(--color-success)] border-[var(--color-success)]/30';
            case 'Declined': return 'bg-[var(--color-danger)]/10 text-[var(--color-danger)] border-[var(--color-danger)]/30';
            default: return 'bg-[var(--color-warning)]/10 text-[var(--color-warning)] border-[var(--color-warning)]/30';
        }
    };

    const handleCancel = async (bookingId: string) => {
        if (!window.confirm('Are you sure you want to cancel? This booking is Non-Refundable.')) return;

        try {
            await API.put(`/bookings/cancel/${bookingId}`);
            toast.success('Booking cancelled successfully');
            fetchBookings();
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to cancel booking');
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--color-primary)]"></div>
        </div>
    );

    return (
        <div className={`min-h-screen py-8 ${isDark ? 'bg-[var(--color-surface-dark)]' : 'bg-gray-50'}`}>
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className={`text-3xl font-bold mb-8 ${isDark ? 'text-white' : 'text-[var(--color-secondary)]'}`}>My Bookings</h1>

                {bookings.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-6xl mb-4">📋</p>
                        <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-[var(--color-secondary)]'}`}>No bookings yet</h3>
                        <p className={isDark ? 'text-[var(--color-text-secondary-dark)]' : 'text-[var(--color-text-secondary)]'}>Start by browsing our amazing fleet of cars!</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {bookings.map((booking) => {
                            const car = booking.carId as unknown as Car;
                            const canCancel = booking.status === 'Pending' || booking.status === 'Approved';

                            return (
                                <div key={booking._id} className={`rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg ${isDark ? 'bg-[var(--color-surface-card-dark)] border border-[var(--color-border-dark)]' : 'bg-white shadow-md border border-[var(--color-border)]'}`}>
                                    <div className="flex flex-col sm:flex-row">
                                        {car?.image && (
                                            <div className="sm:w-48 h-48 sm:h-auto flex-shrink-0 relative">
                                                <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
                                                <div className={`absolute top-2 left-2 px-2 py-1 rounded text-xs font-bold bg-white/90 text-[var(--color-secondary)] shadow-sm`}>
                                                    {booking.bookingId}
                                                </div>
                                            </div>
                                        )}
                                        <div className="flex-1 p-5 flex flex-col justify-between">
                                            <div>
                                                <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
                                                    <div>
                                                        <p className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-[var(--color-primary-light)]' : 'text-[var(--color-primary)]'}`}>{car?.brand}</p>
                                                        <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-[var(--color-secondary)]'}`}>
                                                            {car?.name}
                                                        </h3>
                                                    </div>
                                                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(booking.status)}`}>
                                                        {booking.status}
                                                    </span>
                                                </div>

                                                <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4 ${isDark ? 'text-[var(--color-text-secondary-dark)]' : 'text-[var(--color-text-secondary)]'}`}>
                                                    <div className={`p-3 rounded-lg ${isDark ? 'bg-[var(--color-surface-dark)]' : 'bg-gray-50'}`}>
                                                        <p className="text-xs uppercase font-semibold mb-1 opacity-70">Start Date</p>
                                                        <p className="font-medium">{new Date(booking.startDate).toLocaleDateString()}</p>
                                                    </div>
                                                    <div className={`p-3 rounded-lg ${isDark ? 'bg-[var(--color-surface-dark)]' : 'bg-gray-50'}`}>
                                                        <p className="text-xs uppercase font-semibold mb-1 opacity-70">End Date</p>
                                                        <p className="font-medium">{new Date(booking.endDate).toLocaleDateString()}</p>
                                                    </div>
                                                    <div className={`p-3 rounded-lg ${isDark ? 'bg-[var(--color-surface-dark)]' : 'bg-gray-50'}`}>
                                                        <p className="text-xs uppercase font-semibold mb-1 opacity-70">Advance</p>
                                                        <p className="font-bold text-[var(--color-primary)]">₹{booking.advanceFee?.toLocaleString()}</p>
                                                    </div>
                                                    <div className={`p-3 rounded-lg ${isDark ? 'bg-[var(--color-surface-dark)]' : 'bg-gray-50'}`}>
                                                        <p className="text-xs uppercase font-semibold mb-1 opacity-70">Total Rent</p>
                                                        <p className="font-bold">₹{booking.totalAmount?.toLocaleString()}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex justify-between items-center mt-2 border-t pt-4 border-dashed border-[var(--color-border)]">
                                                <p className="text-xs flex items-center gap-1 text-[var(--color-warning)] font-medium">
                                                    <span className="text-lg">⚠️</span> Non-Refundable Policy
                                                </p>

                                                {canCancel && (
                                                    <button
                                                        onClick={() => handleCancel(booking._id)}
                                                        className="px-4 py-2 rounded-lg text-sm font-semibold bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                                                    >
                                                        Cancel Booking
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyBookings;
