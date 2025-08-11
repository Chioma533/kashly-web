import React from 'react'
import './index.css'
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Section1 from "./components/Section1";
import Section2 from "./components/Section2";
import Section3 from "./components/Section3";
import Footer from "./components/Footer";

const LandingPage = () => {
    return (
        <>
            <Navbar />
            <Hero />
            <Section1 />
            <Section2 />
            <Section3 />
            <Footer />
        </>
    );
}

export default LandingPage