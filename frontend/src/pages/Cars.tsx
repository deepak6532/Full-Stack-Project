import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiUsers, HiCog, HiLightningBolt, HiSearch, HiSparkles } from 'react-icons/hi';
import { useTheme } from '../context/ThemeContext';
import API from '../api/axios';
import type { Car } from '../types';

const Cars: React.FC = () => {
    const { isDark } = useTheme();
    const [cars, setCars] = useState<Car[]>([]);
    const [filtered, setFiltered] = useState<Car[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [brandFilter, setBrandFilter] = useState('');
    const [fuelFilter, setFuelFilter] = useState('');
    const [transFilter, setTransFilter] = useState('');

    useEffect(() => {
        fetchCars();
    }, []);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const typeFilter = queryParams.get('type');

    useEffect(() => {
        let result = cars;
        if (search) result = result.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.brand.toLowerCase().includes(search.toLowerCase()));
        if (brandFilter) result = result.filter(c => c.brand === brandFilter);
        if (fuelFilter) result = result.filter(c => c.fuelType === fuelFilter);
        if (transFilter) result = result.filter(c => c.transmission === transFilter);

        if (typeFilter === 'Indian') {
            result = result.filter(c => ['Tata', 'Mahindra', 'Maruti', 'Hyundai', 'Kia'].includes(c.brand));
        } else if (typeFilter === 'Luxury') {
            result = result.filter(c => c.pricePerDay > 5000 || ['BMW', 'Audi', 'Mercedes', 'Jaguar'].includes(c.brand));
        } else if (typeFilter === 'Sport') {
            result = result.filter(c => c.name.toLowerCase().includes('sport') || c.description.toLowerCase().includes('sport') || ['Ferrari', 'Lamborghini', 'Porsche'].includes(c.brand));
        } else if (typeFilter === 'SUV') {
            result = result.filter(c => c.name.toLowerCase().includes('suv') || c.description.toLowerCase().includes('suv') || ['XUV', 'Thar', 'Scorpio', 'Fortuner', 'Creta', 'Nexon'].some(model => c.name.includes(model)));
        }

        setFiltered(result);
    }, [search, brandFilter, fuelFilter, transFilter, cars, typeFilter]);

    const fetchCars = async () => {
        try {
            const { data } = await API.get('/cars/available');
            setCars(data.data);
            setFiltered(data.data);
        } catch (error) {
            console.error('Failed to fetch cars:', error);
        } finally {
            setLoading(false);
        }
    };

    const brands = [...new Set(cars.map(c => c.brand))];

    // Animation classes
    const cardClass = `group relative rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${isDark
        ? 'bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-white/10 hover:border-[var(--color-primary)]/50 backdrop-blur-md'
        : 'bg-white border border-gray-100 shadow-lg hover:shadow-blue-500/20'}`;

    return (
        <div className={`min-h-screen pt-24 pb-12 ${isDark ? 'bg-[var(--color-surface-dark)]' : 'bg-gray-50'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Hero Section */}
                <div className="text-center mb-16 animate-fade-in relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[var(--color-primary)] opacity-10 blur-[100px] rounded-full pointer-events-none"></div>
                    <span className="px-4 py-1.5 rounded-full border border-[var(--color-primary)] text-[var(--color-primary)] text-sm font-bold uppercase tracking-wider bg-[var(--color-primary)]/5 inline-flex items-center gap-2 mb-4 animate-slide-up">
                        <HiSparkles /> Premium Fleet
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                        <span className={`bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]`}>
                            Choose Your Drive
                        </span>
                    </h1>
                    <p className={`text-lg md:text-xl max-w-2xl mx-auto animate-slide-up ${isDark ? 'text-gray-400' : 'text-gray-600'}`} style={{ animationDelay: '0.2s' }}>
                        Experience the thrill of the open road with our meticulously maintained collection of premium vehicles.
                    </p>
                </div>

                {/* Filters Bar */}
                <div className={`sticky top-20 z-30 p-4 rounded-2xl mb-12 animate-slide-up backdrop-blur-xl transition-all duration-300 ${isDark ? 'bg-black/60 border border-white/10' : 'bg-white/80 border border-gray-200 shadow-lg'}`} style={{ animationDelay: '0.3s' }}>
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        {/* Search */}
                        <div className={`relative w-full md:w-96 group ${isDark ? 'text-white' : 'text-gray-800'}`}>
                            <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[var(--color-primary)] transition-colors" size={20} />
                            <input
                                type="text"
                                placeholder="Search by name or brand..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className={`w-full pl-12 pr-4 py-3 rounded-xl border outline-none transition-all ${isDark
                                    ? 'bg-white/5 border-white/10 focus:bg-white/10 focus:border-[var(--color-primary)]'
                                    : 'bg-gray-50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-[var(--color-primary)]'}`}
                            />
                        </div>

                        {/* Dropdowns */}
                        <div className="flex flex-wrap gap-2 w-full md:w-auto">
                            <select
                                value={brandFilter}
                                onChange={(e) => setBrandFilter(e.target.value)}
                                className={`px-4 py-3 rounded-xl border outline-none cursor-pointer transition-all ${isDark
                                    ? 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                                    : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'}`}
                            >
                                <option value="">All Brands</option>
                                {brands.map(b => <option key={b} value={b}>{b}</option>)}
                            </select>
                            <select
                                value={fuelFilter}
                                onChange={(e) => setFuelFilter(e.target.value)}
                                className={`px-4 py-3 rounded-xl border outline-none cursor-pointer transition-all ${isDark
                                    ? 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                                    : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'}`}
                            >
                                <option value="">Any Fuel</option>
                                <option value="Petrol">Petrol</option>
                                <option value="Diesel">Diesel</option>
                                <option value="Electric">Electric</option>
                                <option value="Hybrid">Hybrid</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex justify-center py-20">
                        <div className="relative">
                            <div className="w-16 h-16 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-2xl">🚗</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {!loading && filtered.length === 0 && (
                    <div className="text-center py-20 animate-fade-in">
                        <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
                            🔍
                        </div>
                        <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>No cars found</h3>
                        <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>Try adjusting your filters to find your perfect ride.</p>
                        <button
                            onClick={() => { setSearch(''); setBrandFilter(''); setFuelFilter(''); setTransFilter('') }}
                            className="mt-6 px-6 py-2 rounded-full bg-[var(--color-primary)] text-white font-bold hover:shadow-lg hover:shadow-blue-500/30 transition-all"
                        >
                            Clear All Filters
                        </button>
                    </div>
                )}

                {/* Car Grid */}
                {!loading && filtered.length > 0 && (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filtered.map((car, index) => (
                            <Link
                                key={car._id}
                                to={`/cars/${car._id}`}
                                className={cardClass}
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                {/* Image Container */}
                                <div className="relative h-56 overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity"></div>
                                    <img
                                        src={
                                            // Image Override Map for Indian Cars
                                            {
                                                'Bolero': '/cars/bolero.jpg',
                                                'Wagon R': '/cars/wagonr.jpg',
                                                'Tiago': '/cars/tiago.jpg',
                                                'Maruti Brezza': '/cars/maruti-brezza.jpg', // Assuming public copy exists or pointing to assets if handled
                                                // Add others if needed
                                            }[car.name] || car.image
                                        }
                                        alt={car.name}
                                        onError={(e) => {
                                            // Fallback if local image fails
                                            e.currentTarget.src = 'https://placehold.co/600x400?text=' + car.name;
                                        }}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                    />
                                    {/* Badges */}
                                    <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
                                        <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold border border-white/20 shadow-lg">
                                            {car.brand}
                                        </span>
                                        {car.fuelType === 'Electric' && (
                                            <span className="px-3 py-1 rounded-full bg-green-500/80 backdrop-blur-md text-white text-xs font-bold shadow-lg flex items-center justify-center gap-1">
                                                <HiLightningBolt /> EV
                                            </span>
                                        )}
                                    </div>
                                    {/* Price Tag */}
                                    <div className="absolute bottom-4 left-4 z-20">
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-xl font-bold text-white shadow-lg">₹{car.pricePerDay.toLocaleString()}</span>
                                            <span className="text-xs text-white/80 font-medium">/ 24 hrs</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <h3 className={`text-xl font-bold mb-1 group-hover:text-[var(--color-primary)] transition-colors ${isDark ? 'text-white' : 'text-gray-900'}`}>{car.name}</h3>
                                    <p className={`text-sm mb-4 line-clamp-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{car.description}</p>

                                    {/* Specs */}
                                    <div className={`grid grid-cols-3 gap-2 py-4 border-t border-b ${isDark ? 'border-white/5' : 'border-gray-100'}`}>
                                        <div className="flex flex-col items-center gap-1 text-center">
                                            <HiCog className={`text-lg ${isDark ? 'text-[var(--color-primary)]' : 'text-blue-500'}`} />
                                            <span className={`text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{car.transmission}</span>
                                        </div>
                                        <div className="flex flex-col items-center gap-1 text-center border-l border-r border-gray-200 dark:border-gray-800">
                                            <HiLightningBolt className={`text-lg ${isDark ? 'text-[var(--color-primary)]' : 'text-blue-500'}`} />
                                            <span className={`text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{car.fuelType}</span>
                                        </div>
                                        <div className="flex flex-col items-center gap-1 text-center">
                                            <HiUsers className={`text-lg ${isDark ? 'text-[var(--color-primary)]' : 'text-blue-500'}`} />
                                            <span className={`text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{car.seats} Seats</span>
                                        </div>
                                    </div>

                                    {/* Action */}
                                    <div className="mt-5">
                                        <button className="w-full py-3 rounded-xl bg-[var(--color-primary)] text-white font-bold text-sm tracking-wide hover:bg-[var(--color-primary-dark)] transition-all shadow-lg hover:shadow-blue-500/25 flex items-center justify-center gap-2 group-hover:translate-y-0 translate-y-0">
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cars;
