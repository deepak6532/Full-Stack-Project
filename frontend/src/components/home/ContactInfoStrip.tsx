import React from 'react';
import { HiPhone, HiMail, HiLocationMarker } from 'react-icons/hi';
import { useTheme } from '../../context/ThemeContext';

const ContactInfoStrip: React.FC = () => {
    const { isDark } = useTheme();

    const items = [
        {
            icon: <HiPhone size={32} />,
            title: 'Call us',
            content: '+91 8875692821'
        },
        {
            icon: <HiMail size={32} />,
            title: 'Write to us',
            content: 'info@Guptacars.com'
        },
        {
            icon: <HiLocationMarker size={32} />,
            title: 'Address',
            content: 'Mansarovar, Jaipur, India'
        }
    ];

    return (
        <section className={`py-12 ${isDark ? 'bg-[#1e293b]' : 'bg-slate-900'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-3 gap-8">
                    {items.map((item, index) => (
                        <div key={index} className="flex items-center gap-6">
                            <div className="w-20 h-20 rounded-full bg-[#e8a245] flex items-center justify-center text-slate-900 shrink-0">
                                {item.icon}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                                <p className="text-gray-400">{item.content}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ContactInfoStrip;
