
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { HiArrowLeft, HiArrowRight, HiArrowUp } from 'react-icons/hi';
import { Link } from 'react-router-dom';

import teslaImg from '../../assets/cars/tesla-model-s.jpg';
import hyundaiImg from '../../assets/cars/hyundai-kona.jpg';
import mercedesImg from '../../assets/cars/mercedes-benz.jpg';
import audiImg from '../../assets/cars/audi-r8.jpg';
import camaroImg from '../../assets/cars/chevrolet-camaro.jpg';
import bmwImg from '../../assets/cars/bmw-m4.jpg';

const vehicles = [
    { id: 1, name: 'Tesla Model S Plaid', image: teslaImg, link: '/cars/tesla-model-s' },
    { id: 2, name: 'Hyundai Kona', image: hyundaiImg, link: '/cars/hyundai-kona' },
    { id: 3, name: 'Mercedes Benz', image: mercedesImg, link: '/cars/mercedes-benz' },
    { id: 4, name: 'Audi R8', image: audiImg, link: '/cars/audi-r8' },
    { id: 5, name: 'Chevrolet Camaro', image: camaroImg, link: '/cars/chevrolet-camaro' },
    { id: 6, name: 'BMW M4', image: bmwImg, link: '/cars/bmw-m4' }
];

const FeaturedVehicles: React.FC = () => {
    const { isDark } = useTheme();
    const [page, setPage] = useState(0);
    const itemsPerPage = 3;
    const totalPages = Math.ceil(vehicles.length / itemsPerPage);

    const nextPage = () => {
        setPage((prev) => (prev + 1) % totalPages);
    };

    const prevPage = () => {
        setPage((prev) => (prev - 1 + totalPages) % totalPages);
    };

    // Get current page items
    const currentItems = vehicles.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

    return (
        <section className={`py-24 ${isDark ? 'bg-[#0b1121]' : 'bg-white'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="text-center mb-16">
                    <h2 className={`text-4xl sm:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Our <span className="text-red-500">Vehicles</span>
                    </h2>
                    <p className={`text-center max-w-2xl mx-auto mt-4 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        Explore our premium fleet designed for comfort and performance.
                    </p>
                </div>

                {/* Navigation Buttons */}
                <button
                    onClick={prevPage}
                    className="absolute left-0 top-1/2 -translate-y-1/2 p-4 rounded-full bg-red-600 text-white shadow-lg hover:bg-red-700 transition lg:-left-12 z-20 cursor-pointer"
                    aria-label="Previous Page"
                >
                    <HiArrowLeft size={24} />
                </button>
                <button
                    onClick={nextPage}
                    className="absolute right-0 top-1/2 -translate-y-1/2 p-4 rounded-full bg-red-600 text-white shadow-lg hover:bg-red-700 transition lg:-right-12 z-20 cursor-pointer"
                    aria-label="Next Page"
                >
                    <HiArrowRight size={24} />
                </button>

                <div className="overflow-hidden min-h-[400px]">
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={page}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="grid md:grid-cols-3 gap-8"
                        >
                            {currentItems.map((car) => (
                                <div
                                    key={car.id}
                                    className={`rounded-2xl overflow-hidden border ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'} hover:shadow-xl transition-shadow h-full description-card`}
                                >
                                    <Link to={car.link} className="block h-full flex flex-col">
                                        <div className="h-64 p-4 flex items-center justify-center bg-transparent overflow-hidden">
                                            <img
                                                src={car.image}
                                                alt={car.name}
                                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                            />
                                        </div>
                                        <div className={`p-6 text-center flex-grow flex items-center justify-center ${isDark ? 'bg-[#151f32]' : 'bg-gray-100'}`}>
                                            <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{car.name}</h3>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="flex justify-center gap-2 mt-8">
                    {Array.from({ length: totalPages }).map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setPage(i)}
                            className={`w-3 h-3 rounded-full transition-all ${page === i ? 'bg-red-500 w-6' : 'bg-gray-500 hover:bg-gray-400'}`}
                            aria-label={`Go to page ${i + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedVehicles;
