import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, FileText, ArrowRight, Code, Cpu, Database, Layout } from 'lucide-react';

const titles = ['Full Stack Developer', 'Web Developer', 'Software Engineer'];

const Hero = () => {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const currentTitle = titles[titleIndex];
    const typingSpeed = isDeleting ? 40 : 100;

    if (!isDeleting && displayText === currentTitle) {
      // Wait before starting to delete
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setTitleIndex((prev) => (prev + 1) % titles.length);
    } else {
      timer = setTimeout(() => {
        setDisplayText((prev) =>
          isDeleting
            ? currentTitle.substring(0, prev.length - 1)
            : currentTitle.substring(0, prev.length + 1)
        );
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, titleIndex]);

  const handleScrollToContact = (e) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      window.scrollTo({
        top: contactSection.offsetTop - 75,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background blobs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-portfolio-primary/20 dark:bg-portfolio-primary/10 rounded-full blur-[80px] animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-portfolio-secondary/20 dark:bg-portfolio-secondary/10 rounded-full blur-[100px] animate-pulse-slow pointer-events-none" />
      <div className="absolute top-1/2 right-1/3 w-60 h-60 bg-portfolio-accent/10 rounded-full blur-[60px] pointer-events-none" />

      {/* Floating abstract widgets */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/3 left-10 lg:left-24 hidden md:flex items-center gap-2 p-3 bg-white/5 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-portfolio-border rounded-xl shadow-lg pointer-events-none"
      >
        <Layout className="text-portfolio-accent" size={20} />
        <span className="text-xs font-mono font-semibold dark:text-slate-200 text-slate-700">UI/UX Designer</span>
      </motion.div>

      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-1/3 right-10 lg:right-24 hidden md:flex items-center gap-2 p-3 bg-white/5 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-portfolio-border rounded-xl shadow-lg pointer-events-none"
      >
        <Database className="text-portfolio-secondary" size={20} />
        <span className="text-xs font-mono font-semibold dark:text-slate-200 text-slate-700">MongoDB / SQL</span>
      </motion.div>

      <motion.div
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 right-16 lg:right-48 hidden md:flex items-center gap-2 p-3 bg-white/5 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-portfolio-border rounded-xl shadow-lg pointer-events-none"
      >
        <Code className="text-portfolio-primary" size={20} />
        <span className="text-xs font-mono font-semibold dark:text-slate-200 text-slate-700">React + Express</span>
      </motion.div>

      {/* Main Grid Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side Info */}
        <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs sm:text-sm font-bold tracking-widest font-mono text-portfolio-primary dark:text-portfolio-accent uppercase"
          >
            Welcome to my professional space
          </motion.p>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-4xl sm:text-6xl font-extrabold tracking-tight dark:text-portfolio-text text-slate-900"
          >
            Hi, I'm <span className="bg-gradient-to-r from-portfolio-primary via-portfolio-accent to-portfolio-secondary bg-clip-text text-transparent">Revanth Reddy</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 h-12 flex items-center justify-center lg:justify-start"
          >
            <span className="text-lg sm:text-2xl font-bold font-mono dark:text-slate-200 text-slate-700">
              I am a{' '}
            </span>
            <span className="ml-2 text-lg sm:text-2xl font-bold font-mono text-portfolio-primary dark:text-portfolio-accent border-r-2 border-portfolio-primary dark:border-portfolio-accent pr-1 animate-pulse">
              {displayText}
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-4 text-base sm:text-lg dark:text-portfolio-muted text-slate-600 max-w-xl leading-relaxed mx-auto lg:mx-0"
          >
            I architect and implement secure, high-performance, full-stack digital products. Specializing in highly visual frontend interfaces, performant APIs, and structured database systems.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 flex flex-wrap gap-4 items-center justify-center lg:justify-start"
          >
            <a
              href="#contact"
              onClick={handleScrollToContact}
              className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white bg-portfolio-primary hover:bg-portfolio-primary/95 shadow-[0_4px_15px_rgba(37,99,235,0.4)] transition-all"
            >
              Hire Me <ArrowRight size={16} />
            </a>

            <a
              href="#contact"
              onClick={handleScrollToContact} // For now links to contact, mock resume download
              className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-slate-750 dark:text-white bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-portfolio-border hover:bg-slate-200 dark:hover:bg-white/10 transition-all"
            >
              Download CV <FileText size={16} />
            </a>
          </motion.div>

          {/* Social Icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-8 flex gap-4 justify-center lg:justify-start"
          >
            <a
              href="https://github.com/nunerevanthreddy"
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-full border border-slate-200 dark:border-portfolio-border bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:text-portfolio-primary dark:hover:text-portfolio-accent hover:border-portfolio-primary transition-all"
            >
              <Github size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-full border border-slate-200 dark:border-portfolio-border bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:text-portfolio-primary dark:hover:text-portfolio-accent hover:border-portfolio-primary transition-all"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="mailto:your_email@gmail.com"
              className="p-3 rounded-full border border-slate-200 dark:border-portfolio-border bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:text-portfolio-primary dark:hover:text-portfolio-accent hover:border-portfolio-primary transition-all"
            >
              <Mail size={20} />
            </a>
          </motion.div>
        </div>

        {/* Right Side - Animated Profile / Art */}
        <div className="lg:col-span-5 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative w-72 h-72 sm:w-96 sm:h-96"
          >
            {/* Outer Rotating Gradients */}
            <div className="absolute inset-0 bg-gradient-to-tr from-portfolio-primary via-portfolio-accent to-portfolio-secondary rounded-[40%_60%_70%_30%/40%_50%_60%_50%] opacity-40 animate-spin-slow blur-xl" />
            <div className="absolute inset-2 bg-gradient-to-bl from-portfolio-accent via-portfolio-secondary to-portfolio-primary rounded-[60%_40%_30%_70%/50%_60%_40%_60%] opacity-55 animate-spin-slow duration-10000 blur-lg" />

            {/* Simulated Profile Image Container */}
            <div className="absolute inset-4 rounded-[50%_50%_45%_55%/45%_45%_55%_55%] bg-slate-900 border-2 border-portfolio-primary/40 overflow-hidden flex items-center justify-center shadow-2xl">
              {/* Fallback elegant developer icon representation */}
              <div className="flex flex-col items-center">
                <Cpu className="text-portfolio-accent animate-pulse" size={80} />
                <span className="mt-4 font-mono text-sm tracking-wider font-semibold bg-gradient-to-r from-portfolio-primary to-portfolio-accent bg-clip-text text-transparent">
                  &lt; DEVELOPER &gt;
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
