import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiMenu, HiX, HiMoon, HiSun, HiLogout, HiViewGrid } from 'react-icons/hi';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, isAuthenticated, isAdmin, logout } = useAuth();
    const { isDark, toggleTheme } = useTheme();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
        setIsOpen(false);
    };

    return (
        <nav className={`sticky top-0 z-50 ${isDark ? 'glass-dark' : 'glass'} shadow-lg`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2 group" onClick={() => setIsOpen(false)}>
                        <span className="text-3xl">🚗</span>
                        <div>
                            <h1 className="text-xl font-bold bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] bg-clip-text text-transparent">
                                Sharma Car Rental
                            </h1>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-1">
                        <Link to="/" className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:bg-[var(--color-primary)]/10 ${isDark ? 'text-[var(--color-text-primary-dark)]' : 'text-[var(--color-text-primary)]'}`}>Home</Link>
                        <Link to="/about" className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:bg-[var(--color-primary)]/10 ${isDark ? 'text-[var(--color-text-primary-dark)]' : 'text-[var(--color-text-primary)]'}`}>About</Link>
                        <Link to="/cars" className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:bg-[var(--color-primary)]/10 ${isDark ? 'text-[var(--color-text-primary-dark)]' : 'text-[var(--color-text-primary)]'}`}>Cars</Link>

                        {isAuthenticated && !isAdmin && (
                            <Link to="/my-bookings" className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:bg-[var(--color-primary)]/10 ${isDark ? 'text-[var(--color-text-primary-dark)]' : 'text-[var(--color-text-primary)]'}`}>My Bookings</Link>
                        )}

                        {isAdmin && (
                            <Link to="/admin" className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:bg-[var(--color-accent)]/10 text-[var(--color-accent)]`}>
                                <span className="flex items-center gap-1"><HiViewGrid /> Dashboard</span>
                            </Link>
                        )}

                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className={`p-2 rounded-lg transition-all duration-200 hover:bg-[var(--color-primary)]/10 ${isDark ? 'text-yellow-400' : 'text-[var(--color-secondary)]'}`}
                        >
                            {isDark ? <HiSun size={20} /> : <HiMoon size={20} />}
                        </button>

                        {/* Auth Buttons */}
                        {isAuthenticated ? (
                            <div className="flex items-center space-x-2 ml-2">
                                <span className={`text-sm font-medium ${isDark ? 'text-[var(--color-text-secondary-dark)]' : 'text-[var(--color-text-secondary)]'}`}>
                                    Hi, {user?.name?.split(' ')[0]}
                                </span>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-1 px-4 py-2 rounded-lg bg-[var(--color-danger)]/10 text-[var(--color-danger)] font-medium transition-all duration-200 hover:bg-[var(--color-danger)]/20"
                                >
                                    <HiLogout /> Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-2 ml-2">
                                <Link to="/login" className="px-4 py-2 rounded-lg font-medium transition-all duration-200 border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white">
                                    Login
                                </Link>
                                <Link to="/register" className="px-4 py-2 rounded-lg font-medium transition-all duration-200 bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)]">
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center space-x-2">
                        <button onClick={toggleTheme} className={`p-2 rounded-lg ${isDark ? 'text-yellow-400' : 'text-[var(--color-secondary)]'}`}>
                            {isDark ? <HiSun size={20} /> : <HiMoon size={20} />}
                        </button>
                        <button onClick={() => setIsOpen(!isOpen)} className={`p-2 rounded-lg ${isDark ? 'text-white' : 'text-[var(--color-secondary)]'}`}>
                            {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className={`md:hidden absolute top-16 left-0 w-full border-t ${isDark ? 'border-white/10 glass-dark' : 'border-gray-200 glass'} animate-slide-up shadow-xl`}>
                    <div className="px-4 py-4 space-y-3">
                        <Link to="/" onClick={() => setIsOpen(false)} className={`block px-4 py-3 rounded-xl font-medium transition-all ${isDark ? 'text-white hover:bg-white/10' : 'text-gray-800 hover:bg-gray-100'}`}>Home</Link>
                        <Link to="/about" onClick={() => setIsOpen(false)} className={`block px-4 py-3 rounded-xl font-medium transition-all ${isDark ? 'text-white hover:bg-white/10' : 'text-gray-800 hover:bg-gray-100'}`}>About</Link>
                        <Link to="/cars" onClick={() => setIsOpen(false)} className={`block px-4 py-3 rounded-xl font-medium transition-all ${isDark ? 'text-white hover:bg-white/10' : 'text-gray-800 hover:bg-gray-100'}`}>Cars</Link>
                        {isAuthenticated && !isAdmin && (
                            <Link to="/my-bookings" onClick={() => setIsOpen(false)} className={`block px-4 py-3 rounded-xl font-medium transition-all ${isDark ? 'text-white hover:bg-white/10' : 'text-gray-800 hover:bg-gray-100'}`}>My Bookings</Link>
                        )}
                        {isAdmin && (
                            <Link to="/admin" onClick={() => setIsOpen(false)} className="block px-4 py-3 rounded-xl font-medium text-[var(--color-accent)] hover:bg-[var(--color-accent)]/10">Dashboard</Link>
                        )}
                        <hr className={isDark ? 'border-white/10' : 'border-gray-200'} />
                        {isAuthenticated ? (
                            <button onClick={handleLogout} className="w-full text-left px-4 py-3 rounded-xl font-medium text-[var(--color-danger)] hover:bg-[var(--color-danger)]/10">Logout</button>
                        ) : (
                            <div className="flex flex-col gap-2 pt-2">
                                <Link to="/login" onClick={() => setIsOpen(false)} className="block px-4 py-3 rounded-xl font-medium text-center border border-[var(--color-primary)] text-[var(--color-primary)]">Login</Link>
                                <Link to="/register" onClick={() => setIsOpen(false)} className="block px-4 py-3 rounded-xl font-medium text-center bg-[var(--color-primary)] text-white shadow-lg shadow-blue-500/30">Register</Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
