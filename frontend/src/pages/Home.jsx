import React from 'react';
import Navbar from '../components/Navbar.jsx';
import Hero from '../components/Hero.jsx';
import About from '../components/About.jsx';
import Skills from '../components/Skills.jsx';
import Projects from '../components/Projects.jsx';
import Experience from '../components/Experience.jsx';
import Education from '../components/Education.jsx';
import Certificates from '../components/Certificates.jsx';
import Services from '../components/Services.jsx';
import Testimonials from '../components/Testimonials.jsx';
import Contact from '../components/Contact.jsx';
import Footer from '../components/Footer.jsx';
import ScrollProgress from '../components/ScrollProgress.jsx';
import CustomCursor from '../components/CustomCursor.jsx';
import ParticlesBg from '../components/ParticlesBg.jsx';

const Home = () => {
  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-portfolio-bg dark:text-portfolio-text text-slate-800 transition-colors duration-300 font-sans">
      {/* Visual utilities */}
      <ScrollProgress />
      <CustomCursor />
      <ParticlesBg />

      {/* Structured Sections */}
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Education />
      <Certificates />
      <Services />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;
