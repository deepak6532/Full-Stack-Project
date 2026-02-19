import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiUser, HiMail, HiLockClosed, HiPhone } from 'react-icons/hi';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Register: React.FC = () => {
    const { isDark } = useTheme();
    const { register } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '', phone: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (form.password !== form.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        if (form.password.length < 6) {
            toast.error('Password must be at least 6 characters');
            return;
        }
        setLoading(true);
        try {
            await register(form.name, form.email, form.password, form.phone);
            toast.success('Account created successfully! 🎉');
            navigate('/');
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    const fields = [
        { name: 'name', type: 'text', placeholder: 'John Doe', label: 'Full Name', icon: <HiUser size={20} /> },
        { name: 'email', type: 'email', placeholder: 'you@example.com', label: 'Email', icon: <HiMail size={20} /> },
        { name: 'phone', type: 'tel', placeholder: '+91 9876543210', label: 'Phone Number', icon: <HiPhone size={20} /> },
        { name: 'password', type: 'password', placeholder: '••••••••', label: 'Password', icon: <HiLockClosed size={20} /> },
        { name: 'confirmPassword', type: 'password', placeholder: '••••••••', label: 'Confirm Password', icon: <HiLockClosed size={20} /> },
    ];

    return (
        <div className={`min-h-screen flex items-center justify-center py-12 px-4 ${isDark ? 'bg-[var(--color-surface-dark)]' : 'bg-gray-50'}`}>
            <div className={`w-full max-w-md p-8 rounded-2xl animate-slide-up ${isDark ? 'bg-[var(--color-surface-card-dark)] border border-[var(--color-border-dark)]' : 'bg-white shadow-xl border border-[var(--color-border)]'}`}>
                <div className="text-center mb-8">
                    <span className="text-5xl">🚗</span>
                    <h2 className={`text-2xl font-bold mt-4 ${isDark ? 'text-white' : 'text-[var(--color-secondary)]'}`}>Create Account</h2>
                    <p className={isDark ? 'text-[var(--color-text-secondary-dark)]' : 'text-[var(--color-text-secondary)]'}>Join Gupta Car Rental today</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {fields.map((f) => (
                        <div key={f.name}>
                            <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-[var(--color-text-secondary-dark)]' : 'text-[var(--color-text-secondary)]'}`}>{f.label}</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)]">{f.icon}</span>
                                <input
                                    type={f.type} name={f.name} value={(form as any)[f.name]} onChange={handleChange} required placeholder={f.placeholder}
                                    className={`w-full pl-10 pr-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all ${isDark ? 'bg-[var(--color-surface-dark)] border-[var(--color-border-dark)] text-white' : 'border-[var(--color-border)]'}`}
                                />
                            </div>
                        </div>
                    ))}
                    <button type="submit" disabled={loading}
                        className="w-full py-3 rounded-xl bg-[var(--color-primary)] text-white font-bold text-lg hover:bg-[var(--color-primary-dark)] transition-all disabled:opacity-50 shadow-lg shadow-[var(--color-primary)]/25">
                        {loading ? 'Creating Account...' : 'Register'}
                    </button>
                </form>

                <p className={`text-center mt-6 text-sm ${isDark ? 'text-[var(--color-text-secondary-dark)]' : 'text-[var(--color-text-secondary)]'}`}>
                    Already have an account?{' '}
                    <Link to="/login" className="text-[var(--color-primary)] font-semibold hover:underline">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
