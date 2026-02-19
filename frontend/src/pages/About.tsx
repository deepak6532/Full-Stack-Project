import React from 'react';
import { HiPhone, HiMail, HiLocationMarker, HiStar, HiUser } from 'react-icons/hi';
import { useTheme } from '../context/ThemeContext';

const About: React.FC = () => {
    const { isDark } = useTheme();

    const reviews = [
        { name: 'Rahul S.', text: 'Best service in the city. Deepak ji was very helpful.', rating: 5 },
        { name: 'Priya M.', text: 'Cars are brand new and clean. Highly recommended!', rating: 5 },
        { name: 'Amit K.', text: 'Transparent pricing, no hidden charges. Will book again.', rating: 4 },
    ];

    return (
        <div className={`min-h-screen pt-20 pb-12 ${isDark ? 'bg-[var(--color-surface-dark)]' : 'bg-gray-50'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Hero Section */}
                <div className="text-center mb-16 animate-fade-in">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        <span className={`bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]`}>
                            About Gupta Car Rental
                        </span>
                    </h1>
                    <p className={`text-xl max-w-3xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Your trusted partner for premium and reliable car rentals. We believe in quality, transparency, and customer satisfaction.
                    </p>
                </div>

                {/* Owner & Contact Info */}
                <div className="grid md:grid-cols-2 gap-12 mb-20">
                    <div className={`p-8 rounded-3xl ${isDark ? 'glass-card-dark' : 'bg-white shadow-xl'}`}>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center">
                                <HiUser size={32} />
                            </div>
                            <div>
                                <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Meet the Owner</h2>
                                <p className="text-[var(--color-primary)] font-medium">Deepak Gupta</p>
                            </div>
                        </div>
                        <p className={`mb-6 leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            "I started Gupta Car Rental with a simple vision: to provide a hassle-free, premium car rental experience.
                            Whether you need a car for a weekend getaway or a business trip, we ensure every vehicle is maintained to the highest standards."
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <HiPhone className="text-[var(--color-primary)]" size={20} />
                                <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>+91 8875692821</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <HiMail className="text-[var(--color-primary)]" size={20} />
                                <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>contact@Guptacarrental.com</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <HiLocationMarker className="text-[var(--color-primary)]" size={20} />
                                <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>Sector 45, Gurgaon, India</span>
                            </div>
                        </div>
                    </div>

                    {/* Mission/Service */}
                    <div className="space-y-6">
                        <div className={`p-6 rounded-2xl ${isDark ? 'bg-white/5 border border-white/10' : 'bg-white shadow-md'}`}>
                            <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Premium Fleet</h3>
                            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>We host a wide range of cars from Hatchbacks to Luxury Sedans and SUVs.</p>
                        </div>
                        <div className={`p-6 rounded-2xl ${isDark ? 'bg-white/5 border border-white/10' : 'bg-white shadow-md'}`}>
                            <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>24/7 Support</h3>
                            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>Our team is always available to assist you with your booking and on-road queries.</p>
                        </div>
                        <div className={`p-6 rounded-2xl ${isDark ? 'bg-white/5 border border-white/10' : 'bg-white shadow-md'}`}>
                            <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Best Price Guarantee</h3>
                            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>Competitive pricing with zero hidden charges. What you see is what you pay.</p>
                        </div>
                    </div>
                </div>

                {/* Reviews */}
                <h2 className={`text-3xl font-bold mb-10 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>What Our Customers Say</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {reviews.map((r, i) => (
                        <div key={i} className={`p-6 rounded-2xl ${isDark ? 'glass-card-dark' : 'bg-white shadow-lg'}`}>
                            <div className="flex text-yellow-400 mb-4">
                                {Array.from({ length: 5 }).map((_, j) => (
                                    <HiStar key={j} className={j < r.rating ? 'fill-current' : 'text-gray-300'} />
                                ))}
                            </div>
                            <p className={`mb-4 italic ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>"{r.text}"</p>
                            <p className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{r.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default About;
