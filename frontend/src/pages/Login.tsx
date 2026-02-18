import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiMail, HiLockClosed } from 'react-icons/hi';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Login: React.FC = () => {
    const { isDark } = useTheme();
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const user = await login(email, password);
            toast.success('Welcome back! 🎉');

            if (user && (user as any).role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/my-bookings');
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`min-h-screen flex items-center justify-center py-12 px-4 ${isDark ? 'bg-[var(--color-surface-dark)]' : 'bg-gray-50'}`}>
            <div className={`w-full max-w-md p-8 rounded-2xl animate-slide-up ${isDark ? 'bg-[var(--color-surface-card-dark)] border border-[var(--color-border-dark)]' : 'bg-white shadow-xl border border-[var(--color-border)]'}`}>
                <div className="text-center mb-8">
                    <span className="text-5xl">🚗</span>
                    <h2 className={`text-2xl font-bold mt-4 ${isDark ? 'text-white' : 'text-[var(--color-secondary)]'}`}>Welcome Back</h2>
                    <p className={isDark ? 'text-[var(--color-text-secondary-dark)]' : 'text-[var(--color-text-secondary)]'}>Login to your Sharma Car Rental account</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-[var(--color-text-secondary-dark)]' : 'text-[var(--color-text-secondary)]'}`}>Email</label>
                        <div className="relative">
                            <HiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)]" size={20} />
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com"
                                className={`w-full pl-10 pr-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all ${isDark ? 'bg-[var(--color-surface-dark)] border-[var(--color-border-dark)] text-white' : 'border-[var(--color-border)]'}`}
                            />
                        </div>
                    </div>
                    <div>
                        <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-[var(--color-text-secondary-dark)]' : 'text-[var(--color-text-secondary)]'}`}>Password</label>
                        <div className="relative">
                            <HiLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)]" size={20} />
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••"
                                className={`w-full pl-10 pr-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all ${isDark ? 'bg-[var(--color-surface-dark)] border-[var(--color-border-dark)] text-white' : 'border-[var(--color-border)]'}`}
                            />
                        </div>
                    </div>
                    <button type="submit" disabled={loading}
                        className="w-full py-3 rounded-xl bg-[var(--color-primary)] text-white font-bold text-lg hover:bg-[var(--color-primary-dark)] transition-all disabled:opacity-50 shadow-lg shadow-[var(--color-primary)]/25">
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <p className={`text-center mt-6 text-sm ${isDark ? 'text-[var(--color-text-secondary-dark)]' : 'text-[var(--color-text-secondary)]'}`}>
                    Don't have an account?{' '}
                    <Link to="/register" className="text-[var(--color-primary)] font-semibold hover:underline">Register</Link>
                </p>

                {/* Demo credentials */}
                <div className={`mt-6 p-4 rounded-xl text-sm ${isDark ? 'bg-[var(--color-surface-dark)] border border-[var(--color-border-dark)]' : 'bg-gray-50 border border-[var(--color-border)]'}`}>
                    <p className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-[var(--color-secondary)]'}`}>Demo Credentials:</p>
                    <p className={isDark ? 'text-[var(--color-text-secondary-dark)]' : 'text-[var(--color-text-secondary)]'}>
                        Admin: admin@sharmacarrental.com / admin123<br />
                        User: rahul@example.com / user123
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
