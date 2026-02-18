import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi';
import bentleyImg from '../../assets/slider/bentley.jpg';
import audiImg from '../../assets/slider/audi.jpg';
import suvImg from '../../assets/slider/suv.jpg';

const slides = [
    {
        id: 1,
        image: bentleyImg,
        title: 'Premium',
        subtitle: 'Rental Car',
        carName: 'Bentley Bentayga',
        price: '600',
        link: '/cars'
    },
    {
        id: 2,
        image: audiImg,
        title: 'Sport',
        subtitle: 'Rental Car',
        carName: 'Audi R8 Spyder',
        price: '850',
        link: '/cars'
    },
    {
        id: 3,
        image: suvImg,
        title: 'Family',
        subtitle: 'Rental Car',
        carName: 'Ford Explorer',
        price: '400',
        link: '/cars'
    }
];

const HeroSlider: React.FC = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent(prev => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative h-screen w-full overflow-hidden">
            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0"
                >
                    {/* Background Image with Overlay */}
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${slides[current].image})` }}
                    />
                    <div className="absolute inset-0 bg-black/40" />

                    {/* Content */}
                    <div className="absolute inset-0 flex items-center">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                            <motion.div
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                                className="text-white max-w-3xl"
                            >
                                <span className="text-orange-500 tracking-[0.2em] text-sm font-bold uppercase mb-4 block">
                                    * {slides[current].title}
                                </span>
                                <h1 className="text-6xl md:text-8xl font-bold mb-6">
                                    {slides[current].subtitle}
                                </h1>
                                <div className="flex items-end gap-6 mb-10">
                                    <h2 className="text-3xl md:text-4xl text-gray-200">
                                        {slides[current].carName}
                                    </h2>
                                    <div className="flex items-baseline">
                                        <span className="text-orange-500 text-3xl font-bold">$</span>
                                        <span className="text-orange-500 text-4xl font-bold">{slides[current].price}</span>
                                        <span className="text-gray-300 ml-2">/ YEAR</span>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-4">
                                    <Link
                                        to={slides[current].link}
                                        className="px-8 py-4 bg-orange-500 text-white rounded-full font-semibold hover:bg-orange-600 transition flex items-center gap-2"
                                    >
                                        View Details <HiArrowRight />
                                    </Link>
                                    <Link
                                        to={slides[current].link}
                                        className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-black transition flex items-center gap-2"
                                    >
                                        Rent Now <HiArrowRight />
                                    </Link>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Dots */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`w-3 h-3 rounded-full transition-all border border-white ${current === index ? 'bg-orange-500 border-orange-500' : 'bg-transparent hover:bg-white'
                            }`}
                    />
                ))}
            </div>
        </section>
    );
};

export default HeroSlider;
