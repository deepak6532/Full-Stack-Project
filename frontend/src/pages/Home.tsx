import React from 'react';
import { useTheme } from '../context/ThemeContext';
import HeroSlider from '../components/home/HeroSlider';
import ContactInfoStrip from '../components/home/ContactInfoStrip';
import CarTypes from '../components/home/CarTypes';
import FeaturedVehicles from '../components/home/FeaturedVehicles';
import ContactCTA from '../components/home/ContactCTA';
import Hero from '../components/home/Hero'; // Using old hero as second section

const Home: React.FC = () => {
    const { isDark } = useTheme();

    return (
        <div className={`min-h-screen ${isDark ? 'bg-[#0b1121]' : 'bg-white'}`}>
            {/* 1. New Top Slider */}
            <HeroSlider />

            {/* 2. Contact Info Strip */}
            <ContactInfoStrip />

            {/* 3. Old Hero (About/Intro Section) */}
            <div className="relative">
                <Hero />
            </div>

            {/* 4. Car Types */}
            <CarTypes />

            {/* 5. Featured Vehicles (Slider) */}
            <FeaturedVehicles />

            {/* 6. Contact CTA */}
            <ContactCTA />
        </div>
    );
};

export default Home;
