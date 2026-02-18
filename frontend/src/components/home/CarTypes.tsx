
import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { Link } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi';

import luxuryImg from '../../assets/types/luxury.jpg';
import sportImg from '../../assets/types/sport.jpg';
import suvImg from '../../assets/types/suv.jpg';

const carTypes = [
    {
        id: 1,
        title: 'Luxury Cars',
        image: luxuryImg,
        link: '/cars?type=Luxury'
    },
    {
        id: 2,
        title: 'Sport Cars',
        image: sportImg,
        link: '/cars?type=Sport'
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
                            className="relative group h-[400px] rounded-[30px] overflow-hidden cursor-pointer shadow-2xl"
                        >
                            <img
                                src={type.image}
                                alt={type.title}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

                            <div className="absolute top-8 left-8">
                                <h3 className="text-3xl font-bold text-white">{type.title}</h3>
                            </div>

                            <Link
                                to={type.link}
                                className="absolute bottom-8 left-8 w-14 h-14 rounded-full bg-transparent border-2 border-orange-500 text-orange-500 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all duration-300 group-hover:scale-110"
                            >
                                <HiArrowRight size={24} />
                            </Link>

                            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-orange-500/20 blur-[50px] rounded-full group-hover:bg-orange-500/40 transition-all duration-500"></div>
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
