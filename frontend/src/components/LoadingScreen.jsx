import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setVisible(false), 500); // fade out duration gap
          return 100;
        }
        // Increment progress incrementally
        const increment = Math.floor(Math.random() * 15) + 5;
        return Math.min(prev + increment, 100);
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-portfolio-bg text-portfolio-text select-none"
        >
          {/* Glowing Animated Background Blob */}
          <div className="absolute w-96 h-96 bg-portfolio-secondary/15 rounded-full blur-[100px] animate-pulse-slow" />
          
          {/* Animated Spinner Structure */}
          <div className="relative flex items-center justify-center">
            {/* Outer Spinning Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
              className="w-24 h-24 border-4 border-t-portfolio-primary border-r-portfolio-accent border-b-portfolio-secondary border-l-transparent rounded-full shadow-[0_0_20px_rgba(37,99,235,0.3)]"
            />
            
            {/* Percentage Display in Center */}
            <div className="absolute text-lg font-bold tracking-widest font-mono text-portfolio-accent">
              {progress}%
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 flex flex-col items-center"
          >
            <h1 className="text-xl font-bold tracking-widest bg-gradient-to-r from-portfolio-primary via-portfolio-accent to-portfolio-secondary bg-clip-text text-transparent">
              ANTIGRAVITY PORTFOLIO
            </h1>
            <p className="mt-2 text-xs text-portfolio-muted font-mono tracking-widest uppercase">
              Loading Digital Experience
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
