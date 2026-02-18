import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    HiClipboardList, HiTruck, HiUsers, HiCurrencyRupee,
    HiCheck, HiX, HiClock, HiSearch
} from 'react-icons/hi';
import toast from 'react-hot-toast';
import { useTheme } from '../../context/ThemeContext';
import API from '../../api/axios';
import type { Booking, Car, User, DashboardStats } from '../../types';

const Dashboard: React.FC = () => {
    const { isDark } = useTheme();
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [actioning, setActioning] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'users'>('overview');
    const [filterStatus, setFilterStatus] = useState<string>('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [showAdminForm, setShowAdminForm] = useState(false);
    const [adminForm, setAdminForm] = useState({ name: '', email: '', password: '', phone: '' });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [statsRes, bookingsRes, usersRes] = await Promise.all([
                API.get('/admin/stats'),
                API.get('/admin/bookings'),
                API.get('/admin/users'),
            ]);
            setStats(statsRes.data.data);
            setBookings(bookingsRes.data.data);
            setUsers(usersRes.data.data);
        } catch (error: any) {
            console.error('Dashboard Data Fetch Error:', error.response?.data || error.message);
            toast.error(error.response?.data?.message || 'Failed to load dashboard data');
        } finally {
            setLoading(false);
        }
    };

    const handleAction = async (bookingId: string, action: 'Approved' | 'Declined') => {
        setActioning(bookingId);
        try {
            await API.post('/admin/action', { bookingId, action });
            toast.success(`Booking ${action}!`);
            fetchData();
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Action failed');
        } finally {
            setActioning(null);
        }
    };

    const handleCreateAdmin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await API.post('/admin/register', adminForm);
            toast.success('New Admin Registered!');
            setShowAdminForm(false);
            setAdminForm({ name: '', email: '', password: '', phone: '' });
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to register admin');
        }
    };

    // Derived state
    const pendingBookings = bookings.filter(b => b.status === 'Pending');
    const recentBookings = bookings.slice(0, 5);

    const filteredBookings = bookings.filter(b => {
        const matchesStatus = filterStatus === 'All' || b.status === filterStatus;
        const matchesSearch =
            (b.bookingId.toLowerCase().includes(searchTerm.toLowerCase())) ||
            ((b.userId as User)?.name?.toLowerCase().includes(searchTerm.toLowerCase())) ||
            ((b.carId as Car)?.name?.toLowerCase().includes(searchTerm.toLowerCase()));
        return matchesStatus && matchesSearch;
    });

    const statCards = stats ? [
        { label: 'Total Revenue', value: `₹${stats.totalRevenue.toLocaleString()}`, icon: <HiCurrencyRupee size={24} />, color: 'from-emerald-500 to-teal-500', trend: '+12.5%' },
        { label: 'Total Bookings', value: stats.totalBookings, icon: <HiClipboardList size={24} />, color: 'from-blue-500 to-indigo-500', trend: '+5.2%' },
        { label: 'Pending Requests', value: stats.pendingBookings, icon: <HiClock size={24} />, color: 'from-amber-500 to-orange-500', trend: 'Needs Action' },
        { label: 'Active Fleet', value: stats.totalCars, icon: <HiTruck size={24} />, color: 'from-purple-500 to-pink-500', trend: 'Ready' },
    ] : [];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Approved': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
            case 'Pending': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
            case 'Declined': return 'bg-red-500/10 text-red-500 border-red-500/20';
            case 'Cancelled': return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
            default: return 'bg-blue-500/10 text-blue-500';
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--color-primary)]"></div>
        </div>
    );

    return (
        <div className={`min-h-screen pb-12 ${isDark ? 'bg-[var(--color-surface-dark)]' : 'bg-gray-50'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4 animate-fade-in">
                    <div>
                        <h1 className={`text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]`}>
                            Admin Dashboard
                        </h1>
                        <p className={isDark ? 'text-slate-400' : 'text-slate-500'}>Welcome back, Admin</p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => setShowAdminForm(true)}
                            className={`px-5 py-2.5 rounded-xl font-medium transition-all hover:scale-105 flex items-center gap-2 ${isDark ? 'bg-purple-500/10 text-purple-400 hover:bg-purple-500/20' : 'bg-purple-50 text-purple-600 hover:bg-purple-100'}`}
                        >
                            <HiUsers /> Add Admin
                        </button>
                        <Link
                            to="/admin/cars"
                            className={`px-5 py-2.5 rounded-xl font-medium transition-all hover:scale-105 flex items-center gap-2 ${isDark ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-white text-slate-700 shadow-sm hover:bg-gray-50'}`}
                        >
                            <HiTruck /> Manage Cars
                        </Link>
                    </div>
                </div>

                {/* Admin Registration Modal */}
                {showAdminForm && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
                        <div className={`w-full max-w-md p-6 rounded-2xl shadow-2xl animate-scale-up ${isDark ? 'bg-[#1a1b23] border border-gray-800' : 'bg-white'}`}>
                            <div className="flex justify-between items-center mb-6">
                                <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Register New Admin</h3>
                                <button onClick={() => setShowAdminForm(false)} className="text-gray-500 hover:text-red-500">
                                    <HiX size={24} />
                                </button>
                            </div>
                            <form onSubmit={handleCreateAdmin} className="space-y-4">
                                <div>
                                    <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={adminForm.name}
                                        onChange={e => setAdminForm({ ...adminForm, name: e.target.value })}
                                        className={`w-full px-4 py-2 rounded-xl outline-none border focus:ring-2 focus:ring-[var(--color-primary)] ${isDark ? 'bg-black/20 border-gray-700 text-white' : 'bg-gray-50 border-gray-200'}`}
                                        placeholder="Admin Name"
                                    />
                                </div>
                                <div>
                                    <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>Email</label>
                                    <input
                                        type="email"
                                        required
                                        value={adminForm.email}
                                        onChange={e => setAdminForm({ ...adminForm, email: e.target.value })}
                                        className={`w-full px-4 py-2 rounded-xl outline-none border focus:ring-2 focus:ring-[var(--color-primary)] ${isDark ? 'bg-black/20 border-gray-700 text-white' : 'bg-gray-50 border-gray-200'}`}
                                        placeholder="admin@example.com"
                                    />
                                </div>
                                <div>
                                    <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>Phone</label>
                                    <input
                                        type="tel"
                                        required
                                        value={adminForm.phone}
                                        onChange={e => setAdminForm({ ...adminForm, phone: e.target.value })}
                                        className={`w-full px-4 py-2 rounded-xl outline-none border focus:ring-2 focus:ring-[var(--color-primary)] ${isDark ? 'bg-black/20 border-gray-700 text-white' : 'bg-gray-50 border-gray-200'}`}
                                        placeholder="+91..."
                                    />
                                </div>
                                <div>
                                    <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>Password</label>
                                    <input
                                        type="password"
                                        required
                                        value={adminForm.password}
                                        onChange={e => setAdminForm({ ...adminForm, password: e.target.value })}
                                        className={`w-full px-4 py-2 rounded-xl outline-none border focus:ring-2 focus:ring-[var(--color-primary)] ${isDark ? 'bg-black/20 border-gray-700 text-white' : 'bg-gray-50 border-gray-200'}`}
                                        placeholder="••••••••"
                                    />
                                </div>
                                <button type="submit" className="w-full py-3 mt-2 rounded-xl bg-[var(--color-primary)] text-white font-bold hover:bg-[var(--color-primary-dark)] transition-all">
                                    Create Admin
                                </button>
                            </form>
                        </div>
                    </div>
                )} {/* End of Modal */}

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 animate-slide-up">
                    {statCards.map((card, i) => (
                        <div key={i} className={`relative overflow-hidden p-6 rounded-3xl ${isDark ? 'glass-card-dark' : 'bg-white shadow-lg shadow-blue-500/5'}`}>
                            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${card.color} opacity-10 rounded-bl-full`}></div>
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-3 rounded-2xl bg-gradient-to-br ${card.color} text-white shadow-lg`}>
                                    {card.icon}
                                </div>
                                <span className={`text-xs font-bold px-2 py-1 rounded-lg ${isDark ? 'bg-white/10 text-white' : 'bg-green-100 text-green-700'}`}>
                                    {card.trend}
                                </span>
                            </div>
                            <h3 className={`text-3xl font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-800'}`}>{card.value}</h3>
                            <p className={`text-sm font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{card.label}</p>
                        </div>
                    ))}
                </div>

                {/* Tabs */}
                <div className="flex gap-6 mb-8 border-b border-gray-200 dark:border-gray-800">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`pb-4 px-2 text-sm font-bold transition-all relative ${activeTab === 'overview' ? 'text-[var(--color-primary)]' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Overview
                        {activeTab === 'overview' && <div className="absolute bottom-0 left-0 w-full h-1 bg-[var(--color-primary)] rounded-t-full"></div>}
                    </button>
                    <button
                        onClick={() => setActiveTab('bookings')}
                        className={`pb-4 px-2 text-sm font-bold transition-all relative ${activeTab === 'bookings' ? 'text-[var(--color-primary)]' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        All Bookings
                        {activeTab === 'bookings' && <div className="absolute bottom-0 left-0 w-full h-1 bg-[var(--color-primary)] rounded-t-full"></div>}
                    </button>
                    <button
                        onClick={() => setActiveTab('users')}
                        className={`pb-4 px-2 text-sm font-bold transition-all relative ${activeTab === 'users' ? 'text-[var(--color-primary)]' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Users
                        {activeTab === 'users' && <div className="absolute bottom-0 left-0 w-full h-1 bg-[var(--color-primary)] rounded-t-full"></div>}
                    </button>
                </div>

                {/* Content Area */}
                <div className="animate-fade-in">
                    {activeTab === 'overview' && (
                        <div className="grid lg:grid-cols-3 gap-8">
                            {/* Pending Requests Column */}
                            <div className="lg:col-span-2 space-y-6">
                                <div className="flex justify-between items-center">
                                    <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>Pending Approvals</h2>
                                    {pendingBookings.length > 0 && (
                                        <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-xs font-bold border border-amber-500/20">
                                            {pendingBookings.length} Pending
                                        </span>
                                    )}
                                </div>

                                {pendingBookings.length === 0 ? (
                                    <div className={`p-8 rounded-3xl text-center ${isDark ? 'glass-card-dark' : 'bg-white border border-gray-100'}`}>
                                        <div className="w-16 h-16 mx-auto bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-4">
                                            <HiCheck size={32} />
                                        </div>
                                        <p className="font-medium text-lg">All caught up!</p>
                                        <p className="text-gray-500">No pending booking requests.</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {pendingBookings.map(booking => (
                                            <div key={booking._id} className={`p-5 rounded-2xl border transition-all hover:scale-[1.01] ${isDark ? 'glass-card-dark border-gray-800' : 'bg-white border-gray-200 shadow-sm'}`}>
                                                <div className="flex flex-wrap justify-between gap-4">
                                                    <div className="flex gap-4">
                                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg">
                                                            {(booking.userId as User)?.name?.[0]}
                                                        </div>
                                                        <div>
                                                            <h4 className={`font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>{(booking.userId as User)?.name}</h4>
                                                            <p className="text-sm text-gray-500">{(booking.carId as Car)?.brand} {(booking.carId as Car)?.name} • {(booking.carId as Car)?.transmission}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <button
                                                            onClick={() => handleAction(booking.bookingId, 'Declined')}
                                                            disabled={actioning === booking.bookingId}
                                                            className="px-4 py-2 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-500/10 transition-colors"
                                                        >
                                                            Decline
                                                        </button>
                                                        <button
                                                            onClick={() => handleAction(booking.bookingId, 'Approved')}
                                                            disabled={actioning === booking.bookingId}
                                                            className="px-6 py-2 rounded-xl text-sm font-semibold bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] shadow-lg shadow-blue-500/20 transition-all"
                                                        >
                                                            {actioning === booking.bookingId ? 'Processing...' : 'Approve'}
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className={`mt-4 pt-4 border-t flex gap-6 text-sm ${isDark ? 'border-gray-800 text-gray-400' : 'border-gray-100 text-gray-500'}`}>
                                                    <span className="flex items-center gap-1"><HiClock /> {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}</span>
                                                    <span className="flex items-center gap-1 font-bold text-[var(--color-accent)]">₹{booking.advanceFee} Paid</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Recent Activity Column */}
                            <div>
                                <h2 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-800'}`}>Recent Activity</h2>
                                <div className={`rounded-3xl p-6 ${isDark ? 'glass-card-dark' : 'bg-white shadow-lg shadow-blue-500/5'}`}>
                                    <div className="space-y-6">
                                        {recentBookings.map((booking, i) => (
                                            <div key={i} className="flex gap-4 items-start">
                                                <div className={`mt-1 w-2 h-2 rounded-full ${getStatusColor(booking.status).replace('bg-', 'bg-').replace('/10', '')}`}></div>
                                                <div>
                                                    <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-slate-800'}`}>
                                                        New booking for <span className="text-[var(--color-primary)]">{(booking.carId as Car)?.name}</span>
                                                    </p>
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        by {(booking.userId as User)?.name} • {new Date(booking.createdAt).toLocaleDateString()}
                                                    </p>
                                                    <span className={`inline-block mt-2 text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${getStatusColor(booking.status)}`}>
                                                        {booking.status}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <button
                                        onClick={() => setActiveTab('bookings')}
                                        className="w-full mt-6 py-3 rounded-xl border border-dashed border-[var(--color-primary)] text-[var(--color-primary)] text-sm font-bold hover:bg-[var(--color-primary)]/5 transition-colors"
                                    >
                                        View All Activity
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'bookings' && (
                        <div className={`rounded-3xl overflow-hidden ${isDark ? 'glass-card-dark' : 'bg-white shadow-lg shadow-blue-500/5'}`}>
                            {/* Toolbar */}
                            <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex flex-wrap gap-4 justify-between">
                                <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border ${isDark ? 'bg-black/20 border-gray-700' : 'bg-gray-50 border-gray-200'} w-full md:w-auto`}>
                                    <HiSearch className="text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search bookings..."
                                        className="bg-transparent outline-none text-sm w-full md:w-64"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                                    {['All', 'Pending', 'Approved', 'Declined', 'Cancelled'].map(status => (
                                        <button
                                            key={status}
                                            onClick={() => setFilterStatus(status)}
                                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${filterStatus === status
                                                ? 'bg-[var(--color-primary)] text-white shadow-lg shadow-blue-500/25'
                                                : isDark ? 'bg-white/5 text-gray-400 hover:bg-white/10' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                }`}
                                        >
                                            {status}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Table */}
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className={`text-left text-xs uppercase font-bold tracking-wider ${isDark ? 'bg-black/20 text-gray-400' : 'bg-gray-50 text-gray-500'}`}>
                                            <th className="px-6 py-4">Booking ID</th>
                                            <th className="px-6 py-4">Customer</th>
                                            <th className="px-6 py-4">Car Details</th>
                                            <th className="px-6 py-4">Status</th>
                                            <th className="px-6 py-4">Amount</th>
                                            <th className="px-6 py-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                                        {filteredBookings.map(booking => (
                                            <tr key={booking._id} className={`transition-colors ${isDark ? 'hover:bg-white/5' : 'hover:bg-gray-50'}`}>
                                                <td className="px-6 py-4 font-mono text-sm opacity-70">{booking.bookingId}</td>
                                                <td className="px-6 py-4">
                                                    <p className={`font-bold text-sm ${isDark ? 'text-white' : 'text-slate-800'}`}>{(booking.userId as User)?.name}</p>
                                                    <p className="text-xs text-gray-500">{(booking.userId as User)?.email}</p>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-slate-800'}`}>{(booking.carId as Car)?.brand} {(booking.carId as Car)?.name}</p>
                                                    <p className="text-xs text-gray-500">{new Date(booking.startDate).toLocaleDateString()} → {new Date(booking.endDate).toLocaleDateString()}</p>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(booking.status)}`}>
                                                        {booking.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 font-medium">₹{booking.advanceFee}</td>
                                                <td className="px-6 py-4 text-right">
                                                    {booking.status === 'Pending' && (
                                                        <div className="flex justify-end gap-2">
                                                            <button
                                                                onClick={() => handleAction(booking.bookingId, 'Approved')}
                                                                className="p-2 rounded-lg text-emerald-500 hover:bg-emerald-500/10"
                                                                title="Approve"
                                                            >
                                                                <HiCheck size={20} />
                                                            </button>
                                                            <button
                                                                onClick={() => handleAction(booking.bookingId, 'Declined')}
                                                                className="p-2 rounded-lg text-red-500 hover:bg-red-500/10"
                                                                title="Decline"
                                                            >
                                                                <HiX size={20} />
                                                            </button>
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            {filteredBookings.length === 0 && (
                                <div className="p-10 text-center text-gray-500">
                                    No bookings found matching your filters.
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'users' && (
                        <div className={`rounded-3xl overflow-hidden ${isDark ? 'glass-card-dark' : 'bg-white shadow-lg shadow-blue-500/5'}`}>
                            <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                                <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>Registered Users</h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className={`text-left text-xs uppercase font-bold tracking-wider ${isDark ? 'bg-black/20 text-gray-400' : 'bg-gray-50 text-gray-500'}`}>
                                            <th className="px-6 py-4">Name</th>
                                            <th className="px-6 py-4">Email</th>
                                            <th className="px-6 py-4">Phone</th>
                                            <th className="px-6 py-4">Role</th>
                                            <th className="px-6 py-4">Joined</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                                        {users.map(user => (
                                            <tr key={user._id} className={`transition-colors ${isDark ? 'hover:bg-white/5' : 'hover:bg-gray-50'}`}>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xs">
                                                            {user.name?.[0]}
                                                        </div>
                                                        <span className={`font-bold text-sm ${isDark ? 'text-white' : 'text-slate-800'}`}>{user.name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-500">{user.email}</td>
                                                <td className="px-6 py-4 text-sm text-gray-500">{user.phone}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2 py-1 rounded text-xs font-bold ${user.role === 'admin' ? 'bg-purple-500/10 text-purple-500' : 'bg-blue-500/10 text-blue-500'}`}>
                                                        {user.role}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-500">{new Date(user.createdAt || '').toLocaleDateString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
