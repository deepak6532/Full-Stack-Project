import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { Link } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi';

import hatchbackImg from '../../assets/types/hatchback.jpg';
import sedanImg from '../../assets/types/sedan.jpg';
import suvImg from '../../assets/types/suv.jpg';

const carTypes = [
    {
        id: 1,
        title: 'Hatchback',
        image: hatchbackImg,
        link: '/cars?type=Hatchback'
    },
    {
        id: 2,
        title: 'Sedan',
        image: sedanImg,
        link: '/cars?type=Sedan'
    },
    {
        id: 3,
        title: 'SUV',
        image: suvImg,
        link: '/cars?type=SUV'
    }
];

const CarTypes: React.FC = () => {
    const { isDark } = useTheme();

    return (
        <section className={`py-24 ${isDark ? 'bg-[#0f172a]' : 'bg-gray-100'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className={`text-4xl sm:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Rental <span className="text-orange-500">Car Types</span>
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {carTypes.map((type, index) => (
                        <motion.div
                            key={type.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className={`rounded-2xl overflow-hidden border ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'} hover:shadow-xl transition-all hover:-translate-y-2 h-full`}
                        >
                            <Link to={type.link} className="block h-full flex flex-col">
                                <div className="h-64 p-4 flex items-center justify-center bg-transparent overflow-hidden relative group">
                                    <img
                                        src={type.image}
                                        alt={type.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 rounded-xl"
                                    />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300 rounded-xl" />
                                </div>
                                <div className={`p-6 text-center flex-grow flex items-center justify-center ${isDark ? 'bg-[#151f32]' : 'bg-gray-100'}`}>
                                    <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{type.title}</h3>
                                    <HiArrowRight className={`ml-3 ${isDark ? 'text-white' : 'text-slate-900'}`} size={20} />
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Navigation Dots (Visual Only for now) */}
                <div className="flex justify-center gap-2 mt-12">
                    <span className="w-3 h-3 rounded-full bg-orange-500"></span>
                    <span className="w-3 h-3 rounded-full bg-gray-600"></span>
                </div>
            </div>
        </section>
    );
};

export default CarTypes;
