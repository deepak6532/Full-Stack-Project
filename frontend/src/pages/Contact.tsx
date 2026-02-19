import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { HiPhone, HiMail, HiLocationMarker } from 'react-icons/hi';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Contact: React.FC = () => {
    const { isDark } = useTheme();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('http://localhost:5000/api/contact/submit', formData);
            toast.success('Message sent successfully!');
            setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        } catch (error) {
            toast.error('Failed to send message. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`pt-24 pb-12 ${isDark ? 'bg-[#0b1121] text-white' : 'bg-white text-slate-900'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <span className="text-orange-500 font-bold uppercase tracking-wider mb-2 block">Get in Touch</span>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="space-y-8"
                    >
                        <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                        <div className="flex items-start gap-6">
                            <div className="p-4 bg-orange-500/10 rounded-full text-orange-500">
                                <HiPhone size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-1">Phone</h3>
                                <p className="text-gray-500">+91 8875692821</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-6">
                            <div className="p-4 bg-orange-500/10 rounded-full text-orange-500">
                                <HiMail size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-1">Email</h3>
                                <p className="text-gray-500">info@sharmacars.com</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-6">
                            <div className="p-4 bg-orange-500/10 rounded-full text-orange-500">
                                <HiLocationMarker size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-1">Address</h3>
                                <p className="text-gray-500">Mumbai, Maharashtra, India</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className={`p-8 rounded-2xl ${isDark ? 'bg-[#151f32]' : 'bg-gray-50'}`}
                    >
                        <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Your Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className={`w-full p-3 rounded-lg border ${isDark ? 'bg-black/20 border-white/10' : 'bg-white border-gray-200'} focus:outline-none focus:border-orange-500 transition`}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Phone</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        className={`w-full p-3 rounded-lg border ${isDark ? 'bg-black/20 border-white/10' : 'bg-white border-gray-200'} focus:outline-none focus:border-orange-500 transition`}
                                    />
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className={`w-full p-3 rounded-lg border ${isDark ? 'bg-black/20 border-white/10' : 'bg-white border-gray-200'} focus:outline-none focus:border-orange-500 transition`}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Subject</label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className={`w-full p-3 rounded-lg border ${isDark ? 'bg-black/20 border-white/10' : 'bg-white border-gray-200'} focus:outline-none focus:border-orange-500 transition`}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={4}
                                    className={`w-full p-3 rounded-lg border ${isDark ? 'bg-black/20 border-white/10' : 'bg-white border-gray-200'} focus:outline-none focus:border-orange-500 transition`}
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 bg-orange-500 text-white rounded-full font-bold hover:bg-orange-600 transition disabled:opacity-50"
                            >
                                {loading ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
