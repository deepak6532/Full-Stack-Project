
import React from 'react';
import { motion } from 'framer-motion';
import { BsWhatsapp } from 'react-icons/bs';
import { HiArrowRight } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const ContactCTA: React.FC = () => {
    return (
        <section className="relative py-32 overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0">
                <img
                    src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2000&auto=format&fit=crop"
                    alt="Dark Garage Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/70"></div>
                {/* Radial Gradient for focus */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80"></div>
            </div>

            <div className="relative max-w-4xl mx-auto px-4 text-center z-10">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-orange-400 font-bold tracking-[0.2em] text-sm uppercase mb-4"
                >
                    Rent Your Car
                </motion.p>

                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    viewport={{ once: true }}
                    className="text-white text-5xl sm:text-6xl font-black mb-6"
                >
                    Interested in Renting?
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    viewport={{ once: true }}
                    className="text-gray-300 text-lg mb-12"
                >
                    Don't hesitate and send us a message.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 }}
                    viewport={{ once: true }}
                    className="flex flex-col sm:flex-row justify-center gap-6"
                >
                    <a
                        href="https://wa.me/1234567890"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-4 rounded-full bg-orange-400 text-black font-bold text-lg flex items-center justify-center gap-3 hover:bg-orange-500 transition-colors shadow-lg shadow-orange-500/20"
                    >
                        <BsWhatsapp size={24} />
                        WhatsApp
                    </a>

                    <Link
                        to="/cars"
                        className="px-8 py-4 rounded-full border-2 border-white text-white font-bold text-lg flex items-center justify-center gap-3 hover:bg-white hover:text-black transition-all group"
                    >
                        Rent Now
                        <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>
            </div>

            <div className="absolute bottom-8 right-8 w-12 h-12 rounded-full border border-orange-500/50 flex items-center justify-center text-orange-500/50">
                <div className="w-1 h-1 bg-orange-500 rounded-full"></div>
            </div>
        </section>
    );
};

export default ContactCTA;
