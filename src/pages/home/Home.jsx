import React from 'react';
import Hero from '../../components/Hero';
import About from '../../components/About';
import  Features from '../../components/Features';
import Testimonials from '../../components/Testimonial';
import HowItWorks from '../../components/Howitworks';
import Faq from '../../components/Faq';
import Contact from '../../components/Contact';

const Home = () => {
    return (
        <div>
            <Hero/>
            <About/>
            <Features/>
            <Testimonials/>
            <HowItWorks/>
            <Faq/>
            <Contact/>
        </div>
    );
};

export default Home;