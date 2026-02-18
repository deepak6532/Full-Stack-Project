import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HiPlus, HiPencil, HiTrash, HiArrowLeft } from 'react-icons/hi';
import toast from 'react-hot-toast';
import { useTheme } from '../../context/ThemeContext';
import API from '../../api/axios';
import type { Car } from '../../types';

interface CarForm {
    name: string;
    brand: string;
    image: string;
    pricePerDay: number;
    seats: number;
    transmission: 'Manual' | 'Automatic';
    fuelType: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid';
    description: string;
}

const ManageCars: React.FC = () => {
    const { isDark } = useTheme();
    const [cars, setCars] = useState<Car[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [form, setForm] = useState<CarForm>({
        name: '', brand: '', image: '', pricePerDay: 0, seats: 5,
        transmission: 'Manual', fuelType: 'Petrol', description: '',
    });

    useEffect(() => { fetchCars(); }, []);

    const fetchCars = async () => {
        try {
            const { data } = await API.get('/cars');
            setCars(data.data);
        } catch (error) {
            toast.error('Failed to load cars');
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setForm({ name: '', brand: '', image: '', pricePerDay: 0, seats: 5, transmission: 'Manual', fuelType: 'Petrol', description: '' });
        setEditingId(null);
        setShowForm(false);
    };

    const handleEdit = (car: Car) => {
        setForm({
            name: car.name, brand: car.brand, image: car.image, pricePerDay: car.pricePerDay,
            seats: car.seats, transmission: car.transmission, fuelType: car.fuelType, description: car.description,
        });
        setEditingId(car._id);
        setShowForm(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingId) {
                await API.put(`/cars/${editingId}`, form);
                toast.success('Car updated!');
            } else {
                await API.post('/cars', form);
                toast.success('Car added!');
            }
            resetForm();
            fetchCars();
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Operation failed');
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this car?')) return;
        try {
            await API.delete(`/cars/${id}`);
            toast.success('Car deleted!');
            fetchCars();
        } catch (error) {
            toast.error('Delete failed');
        }
    };

    const inputClass = `w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all ${isDark ? 'bg-[var(--color-surface-dark)] border-[var(--color-border-dark)] text-white' : 'border-[var(--color-border)]'}`;
    const labelClass = `block text-sm font-medium mb-1 ${isDark ? 'text-[var(--color-text-secondary-dark)]' : 'text-[var(--color-text-secondary)]'}`;

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--color-primary)]"></div>
        </div>
    );

    return (
        <div className={`min-h-screen py-8 ${isDark ? 'bg-[var(--color-surface-dark)]' : 'bg-gray-50'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
                    <div className="flex items-center gap-4">
                        <Link to="/admin" className={`p-2 rounded-lg hover:bg-[var(--color-primary)]/10 ${isDark ? 'text-white' : 'text-[var(--color-secondary)]'}`}>
                            <HiArrowLeft size={24} />
                        </Link>
                        <div>
                            <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-[var(--color-secondary)]'}`}>Manage Cars</h1>
                            <p className={isDark ? 'text-[var(--color-text-secondary-dark)]' : 'text-[var(--color-text-secondary)]'}>{cars.length} cars in fleet</p>
                        </div>
                    </div>
                    <button
                        onClick={() => { resetForm(); setShowForm(!showForm); }}
                        className="px-6 py-3 rounded-xl bg-[var(--color-primary)] text-white font-semibold hover:bg-[var(--color-primary-dark)] transition-all shadow-lg flex items-center gap-2"
                    >
                        <HiPlus /> Add New Car
                    </button>
                </div>

                {/* Add/Edit Form */}
                {showForm && (
                    <div className={`p-6 rounded-2xl mb-8 animate-slide-up ${isDark ? 'bg-[var(--color-surface-card-dark)] border border-[var(--color-border-dark)]' : 'bg-white shadow-md border border-[var(--color-border)]'}`}>
                        <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-[var(--color-secondary)]'}`}>
                            {editingId ? 'Edit Car' : 'Add New Car'}
                        </h3>
                        <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
                            <div><label className={labelClass}>Car Name</label><input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className={inputClass} placeholder="e.g. Swift Dzire" /></div>
                            <div><label className={labelClass}>Brand</label><input type="text" value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} required className={inputClass} placeholder="e.g. Maruti Suzuki" /></div>
                            <div className="sm:col-span-2"><label className={labelClass}>Image URL</label><input type="url" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} required className={inputClass} placeholder="https://..." /></div>
                            <div><label className={labelClass}>Price per Day (₹)</label><input type="number" value={form.pricePerDay} onChange={(e) => setForm({ ...form, pricePerDay: +e.target.value })} required min="1" className={inputClass} /></div>
                            <div><label className={labelClass}>Seats</label><input type="number" value={form.seats} onChange={(e) => setForm({ ...form, seats: +e.target.value })} required min="1" max="10" className={inputClass} /></div>
                            <div>
                                <label className={labelClass}>Transmission</label>
                                <select value={form.transmission} onChange={(e) => setForm({ ...form, transmission: e.target.value as any })} className={inputClass}>
                                    <option value="Manual">Manual</option>
                                    <option value="Automatic">Automatic</option>
                                </select>
                            </div>
                            <div>
                                <label className={labelClass}>Fuel Type</label>
                                <select value={form.fuelType} onChange={(e) => setForm({ ...form, fuelType: e.target.value as any })} className={inputClass}>
                                    <option value="Petrol">Petrol</option>
                                    <option value="Diesel">Diesel</option>
                                    <option value="Electric">Electric</option>
                                    <option value="Hybrid">Hybrid</option>
                                </select>
                            </div>
                            <div className="sm:col-span-2"><label className={labelClass}>Description</label><textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className={inputClass} placeholder="Car description..." /></div>
                            <div className="sm:col-span-2 flex gap-3">
                                <button type="submit" className="px-6 py-3 rounded-xl bg-[var(--color-primary)] text-white font-semibold hover:bg-[var(--color-primary-dark)] transition-all">
                                    {editingId ? 'Update Car' : 'Add Car'}
                                </button>
                                <button type="button" onClick={resetForm} className={`px-6 py-3 rounded-xl font-semibold transition-all ${isDark ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-gray-100 hover:bg-gray-200'}`}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Cars Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {cars.map((car) => (
                        <div key={car._id} className={`rounded-2xl overflow-hidden ${isDark ? 'bg-[var(--color-surface-card-dark)] border border-[var(--color-border-dark)]' : 'bg-white shadow-md border border-[var(--color-border)]'}`}>
                            <div className="h-40 overflow-hidden">
                                <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="p-4">
                                <p className="text-sm text-[var(--color-primary)] font-medium">{car.brand}</p>
                                <h3 className={`font-bold ${isDark ? 'text-white' : 'text-[var(--color-secondary)]'}`}>{car.name}</h3>
                                <p className="text-[var(--color-primary)] font-bold mt-1">₹{car.pricePerDay.toLocaleString()}/day</p>
                                <div className={`flex items-center gap-2 mt-2 text-xs ${isDark ? 'text-[var(--color-text-secondary-dark)]' : 'text-[var(--color-text-secondary)]'}`}>
                                    <span>{car.seats} seats</span>•<span>{car.transmission}</span>•<span>{car.fuelType}</span>
                                </div>
                                <div className="flex gap-2 mt-4">
                                    <button onClick={() => handleEdit(car)} className="flex-1 py-2 rounded-lg bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-semibold text-sm hover:bg-[var(--color-primary)]/20 transition-all flex items-center justify-center gap-1">
                                        <HiPencil size={14} /> Edit
                                    </button>
                                    <button onClick={() => handleDelete(car._id)} className="flex-1 py-2 rounded-lg bg-[var(--color-danger)]/10 text-[var(--color-danger)] font-semibold text-sm hover:bg-[var(--color-danger)]/20 transition-all flex items-center justify-center gap-1">
                                        <HiTrash size={14} /> Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ManageCars;
