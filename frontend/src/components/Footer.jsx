import React from 'react';
import { ArrowUp, Github, Linkedin, Mail, ShieldAlert } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="relative bg-white dark:bg-[#080d19] border-t border-slate-200 dark:border-portfolio-border py-12 text-slate-500 dark:text-portfolio-muted z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Logo and Copyright details */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <span className="text-lg font-bold tracking-widest bg-gradient-to-r from-portfolio-primary via-portfolio-accent to-portfolio-secondary bg-clip-text text-transparent">
            REVANTH REDDY
          </span>
          <p className="mt-2 text-xs font-mono">
            &copy; {new Date().getFullYear()} Revanth Reddy. All rights reserved.
          </p>
        </div>

        {/* Footer Navigation Shortcuts */}
        <div className="flex flex-wrap gap-4 md:gap-6 justify-center text-xs font-semibold uppercase tracking-wider">
          <a href="#about" className="hover:text-portfolio-primary dark:hover:text-portfolio-accent transition-colors">About</a>
          <a href="#projects" className="hover:text-portfolio-primary dark:hover:text-portfolio-accent transition-colors">Projects</a>
          <a href="#experience" className="hover:text-portfolio-primary dark:hover:text-portfolio-accent transition-colors">Experience</a>
          <a href="#certificates" className="hover:text-portfolio-primary dark:hover:text-portfolio-accent transition-colors">Certificates</a>
          <a href="/login" className="flex items-center gap-1 hover:text-portfolio-primary dark:hover:text-portfolio-accent transition-colors">
            <ShieldAlert size={12} /> Admin Login
          </a>
        </div>

        {/* Back To Top & Social icons */}
        <div className="flex items-center gap-4">
          {/* Socials */}
          <div className="flex gap-2">
            <a
              href="https://github.com/nunerevanthreddy"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-portfolio-border hover:text-portfolio-primary dark:hover:text-portfolio-accent transition-colors"
              aria-label="GitHub"
            >
              <Github size={16} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-portfolio-border hover:text-portfolio-primary dark:hover:text-portfolio-accent transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={16} />
            </a>
          </div>

          {/* Scroll Pin Button */}
          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-portfolio-primary text-white hover:bg-portfolio-primary/95 transition-all shadow-md shadow-portfolio-primary/20"
            aria-label="Back to top"
          >
            <ArrowUp size={16} />
          </button>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
