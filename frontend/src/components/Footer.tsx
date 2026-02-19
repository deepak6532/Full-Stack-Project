import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Footer: React.FC = () => {
    const { isDark } = useTheme();

    return (
        <footer className={`${isDark ? 'bg-[var(--color-secondary-dark)]' : 'bg-[var(--color-secondary)]'} text-white`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center space-x-2 mb-4">
                            <span className="text-3xl">🚗</span>
                            <h3 className="text-2xl font-bold">Gupta Car Rental</h3>
                        </div>
                        <p className="text-slate-300 mb-4 max-w-md">
                            Your trusted partner for premium car rentals. Experience the road with comfort, safety, and style.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--color-primary)] transition-colors">
                                <span>📘</span>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--color-primary)] transition-colors">
                                <span>🐦</span>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--color-primary)] transition-colors">
                                <span>📸</span>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><Link to="/" className="text-slate-300 hover:text-[var(--color-primary)] transition-colors">Home</Link></li>
                            <li><Link to="/cars" className="text-slate-300 hover:text-[var(--color-primary)] transition-colors">Browse Cars</Link></li>
                            <li><Link to="/login" className="text-slate-300 hover:text-[var(--color-primary)] transition-colors">Login</Link></li>
                            <li><Link to="/register" className="text-slate-300 hover:text-[var(--color-primary)] transition-colors">Register</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
                        <ul className="space-y-2 text-slate-300">
                            <li className="flex items-center gap-2">📍 123 Main Street,Mansarovar Jaipur</li>
                            <li className="flex items-center gap-2">📞 +91 8875692821</li>
                            <li className="flex items-center gap-2">✉️ info@Guptacarrental.com</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 mt-8 pt-8 text-center text-slate-400 text-sm">
                    <p>© {new Date().getFullYear()} Gupta Car Rental. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
