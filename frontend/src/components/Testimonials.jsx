import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import API from '../utils/api.js';

// Pre-defined fallback testimonials
const defaultTestimonials = [
  {
    _id: 't-1',
    name: 'Sarah Jenkins',
    position: 'Lead Product Manager, TechVibe',
    review: 'Revanth exceeded our expectations. The custom full-stack admin dashboard and portal he built are incredibly fast, secure, and simple to navigate. Essential asset for any development initiative.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80',
  },
  {
    _id: 't-2',
    name: 'David Miller',
    position: 'Chief Technology Officer, InnovateCorp',
    review: 'An exceptional full stack engineer. Revanth maintains high code quality, implements tight security parameters, and writes excellent documentation. His deployment pipeline was flawless.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80',
  },
  {
    _id: 't-3',
    name: 'Aisha Rahman',
    position: 'Founder, CreativeStudio',
    review: "Revanth's combination of frontend design precision and optimized database setup helped launch our client service app weeks ahead of schedule. Excellent collaborator.",
    rating: 5,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80',
  },
];

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await API.get('/testimonials');
        if (response.data.success && response.data.data.length > 0) {
          setTestimonials(response.data.data);
        } else {
          setTestimonials(defaultTestimonials);
        }
      } catch (error) {
        console.warn('Could not fetch testimonials, using defaults.', error);
        setTestimonials(defaultTestimonials);
      }
    };

    fetchTestimonials();
  }, []);

  // Auto Slider Timer Setup
  useEffect(() => {
    if (testimonials.length <= 1) return;
    const interval = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials, currentIndex]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  if (testimonials.length === 0) return null;

  const current = testimonials[currentIndex];

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  return (
    <section id="testimonials" className="relative py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-bold tracking-widest font-mono text-portfolio-primary dark:text-portfolio-accent uppercase"
          >
            Endorsements
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-3 text-3xl font-extrabold tracking-tight dark:text-portfolio-text text-slate-900 sm:text-4xl"
          >
            What Clients Say
          </motion.h3>
        </div>

        {/* Testimonials Slider Wrapper */}
        <div className="relative max-w-3xl mx-auto px-4">
          
          {/* Slider Card */}
          <div className="relative min-h-[250px] flex items-center justify-center">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="w-full p-8 md:p-10 rounded-3xl border border-slate-200 dark:border-portfolio-border bg-white dark:bg-white/5 shadow-xl dark:shadow-none backdrop-blur-md flex flex-col md:flex-row items-center gap-8 relative"
              >
                {/* Large Background Quote Symbol */}
                <Quote className="absolute top-6 right-8 text-slate-100 dark:text-white/5 pointer-events-none" size={100} />

                {/* Client Avatar */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-portfolio-accent flex-shrink-0 shadow-lg">
                  <img
                    src={current.image || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120&q=80'}
                    alt={current.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Review Content */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    {/* Star Rating */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={i < current.rating ? 'fill-portfolio-accent text-portfolio-accent' : 'text-slate-300 dark:text-white/10'}
                        />
                      ))}
                    </div>

                    <p className="text-sm md:text-base italic text-slate-600 dark:text-portfolio-muted leading-relaxed">
                      "{current.review}"
                    </p>
                  </div>

                  <div className="mt-6">
                    <h4 className="text-base font-bold dark:text-portfolio-text text-slate-800">
                      {current.name}
                    </h4>
                    <p className="text-xs text-portfolio-primary dark:text-portfolio-accent font-mono mt-0.5">
                      {current.position}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slider Controls */}
          {testimonials.length > 1 && (
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={handlePrev}
                className="p-3 rounded-full border border-slate-200 dark:border-portfolio-border bg-white dark:bg-white/5 text-slate-700 dark:text-slate-350 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors shadow-md dark:shadow-none"
                aria-label="Previous Review"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={handleNext}
                className="p-3 rounded-full border border-slate-200 dark:border-portfolio-border bg-white dark:bg-white/5 text-slate-700 dark:text-slate-350 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors shadow-md dark:shadow-none"
                aria-label="Next Review"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};

export default Testimonials;
