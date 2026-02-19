
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { HiSparkles, HiShieldCheck, HiStar } from 'react-icons/hi';
import heroCarImg from '../../assets/images/hero-car.jpg';

const Hero: React.FC = () => {
    const { isDark } = useTheme();

    return (
        <section className="relative min-h-screen flex items-center overflow-hidden">
            <div className={`absolute inset-0 ${isDark ? 'bg-[#0b1121]' : 'bg-gradient-to-br from-blue-50 to-white'}`}>
                <div className="absolute top-0 right-0 w-full h-full overflow-hidden opacity-30">
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                        transition={{ duration: 8, repeat: Infinity }}
                        className="absolute -top-[20%] -right-[10%] w-[800px] h-[800px] rounded-full bg-blue-500/20 blur-[120px]"
                    />
                    <motion.div
                        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.4, 0.3] }}
                        transition={{ duration: 6, repeat: Infinity, delay: 1 }}
                        className="absolute top-[40%] -left-[10%] w-[600px] h-[600px] rounded-full bg-rose-500/20 blur-[100px]"
                    />
                </div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20 grid lg:grid-cols-2 gap-12 items-center">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-8"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm font-semibold text-[var(--color-primary)] bg-white/10 backdrop-blur-md border border-white/20">
                        <HiSparkles />
                        <span>Premium Car Rental Experience</span>
                    </div>

                    <h1 className={`text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Elevate Your <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Journey</span>
                    </h1>

                    <p className={`text-lg sm:text-xl max-w-lg leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                        Experience the thrill of driving the world's finest engineering. Unmatched quality, unbeatable prices, and unforgettable memories.
                    </p>

                    <div className="flex flex-wrap gap-4 pt-4">
                        <Link
                            to="/cars"
                            className="px-8 py-4 rounded-2xl bg-blue-600 text-white font-bold text-lg hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 transition-all flex items-center gap-2 transform hover:-translate-y-1"
                        >
                            Browse Fleet
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                        </Link>
                    </div>

                    <div className="flex items-center gap-8 pt-8 border-t border-slate-200/10">
                        <div>
                            <h4 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>500+</h4>
                            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Cars Available</p>
                        </div>
                        <div>
                            <h4 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>24/7</h4>
                            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Support</p>
                        </div>
                        <div>
                            <h4 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>50k+</h4>
                            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Happy Users</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative hidden lg:block"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
                    <motion.img
                        src={heroCarImg}
                        alt="Mahindra XUV700"
                        className="relative z-10 w-full object-contain drop-shadow-2xl"
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    />

                    {/* Floating Cards */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                        className={`absolute -right-8 top-20 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl z-20 max-w-xs ${isDark ? 'text-white' : 'text-slate-900'}`}
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-500/20 text-green-500 rounded-lg">
                                <HiShieldCheck size={24} />
                            </div>
                            <div>
                                <p className="text-xs font-semibold opacity-70">Status</p>
                                <p className="font-bold">Fully Insured</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.7 }}
                        className={`absolute -left-8 bottom-20 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl z-20 max-w-xs ${isDark ? 'text-white' : 'text-slate-900'}`}
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-yellow-500/20 text-yellow-500 rounded-lg">
                                <HiStar size={24} />
                            </div>
                            <div>
                                <p className="text-xs font-semibold opacity-70">Rating</p>
                                <p className="font-bold">4.9/5 Stars</p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
