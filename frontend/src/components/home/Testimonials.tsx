import React from 'react';
import { HiStar, HiUserCircle } from 'react-icons/hi';
import { useTheme } from '../../context/ThemeContext';

const reviews = [
    {
        id: 1,
        name: 'Rahul Sharma',
        location: 'Delhi',
        rating: 5,
        text: 'Excellent service! I rented a Mahindra Thar for a weekend trip to erratic terrain, and the car was in top condition. Very smooth booking process.',
        date: '2 days ago'
    },
    {
        id: 2,
        name: 'Priya Patel',
        location: 'Mumbai',
        rating: 5,
        text: 'The XUV700 is a beast! Loved the experience. The staff was very helpful and the car was clean and sanitized. Highly recommend Sharma Car Rental.',
        date: '1 week ago'
    },
    {
        id: 3,
        name: 'Amit Kumar',
        location: 'Bangalore',
        rating: 4,
        text: 'Great collection of cars. I booked a Maruti Brezza for city driving. It was fuel efficient and comfortable. Good pricing too.',
        date: '2 weeks ago'
    }
];

const Testimonials: React.FC = () => {
    const { isDark } = useTheme();

    return (
        <section className={`py-20 ${isDark ? 'bg-[#0b1121]' : 'bg-white'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="text-orange-500 font-bold tracking-wider uppercase text-sm">Testimonials</span>
                    <h2 className={`text-3xl md:text-5xl font-bold mt-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        What Our Customers Say
                    </h2>
                    <div className="w-24 h-1 bg-orange-500 mx-auto mt-6 rounded-full"></div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {reviews.map((review) => (
                        <div
                            key={review.id}
                            className={`p-8 rounded-2xl relative transition-all duration-300 hover:-translate-y-2 ${isDark
                                    ? 'bg-white/5 border border-white/10 hover:shadow-orange-500/10 hover:shadow-2xl'
                                    : 'bg-gray-50 border border-gray-100 hover:shadow-xl'
                                }`}
                        >
                            <div className="flex items-center gap-1 mb-6 text-orange-500">
                                {[...Array(5)].map((_, i) => (
                                    <HiStar key={i} className={i < review.rating ? 'fill-current' : 'text-gray-300'} />
                                ))}
                            </div>

                            <p className={`mb-8 italic leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                "{review.text}"
                            </p>

                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${isDark ? 'bg-orange-500/20 text-orange-500' : 'bg-orange-100 text-orange-600'
                                    }`}>
                                    <HiUserCircle />
                                </div>
                                <div>
                                    <h4 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{review.name}</h4>
                                    <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{review.location}</p>
                                </div>
                                <span className={`ml-auto text-xs ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                                    {review.date}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
