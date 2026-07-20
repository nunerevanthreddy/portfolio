import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, MapPin } from 'lucide-react';

const educationData = [
  {
    degree: 'Bachelor of Technology (Computer Science Engineering)',
    college: 'Vasireddy Venkatadri Institute of Technology',
    location: 'Namburu, Guntur',
    year: 'Expected June 2027',
    details: 'Focusing on Software Engineering, Data Structures, OOPs, Database Management Systems, Python, and Android Development.',
  },
  {
    degree: 'Board of Intermediate',
    college: 'Sri Chaithanya Junior College',
    location: 'Guntur, AP',
    year: 'Aug 2021 - May 2023',
    details: 'Completed Intermediate education with major focus on Mathematics, Physics, and Chemistry.',
  },
  {
    degree: 'Board of Secondary Education',
    college: 'FIITJEE International School',
    location: 'Vijayawada, AP',
    year: 'Jun 2020 - May 2021',
    details: 'Secondary Education with strong foundations in science, analytical thinking, and mathematics.',
  },
];

const Education = () => {
  return (
    <section id="education" className="relative py-20 overflow-hidden bg-slate-50/50 dark:bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-bold tracking-widest font-mono text-portfolio-primary dark:text-portfolio-accent uppercase"
          >
            Academic
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-3 text-3xl font-extrabold tracking-tight dark:text-portfolio-text text-slate-900 sm:text-4xl"
          >
            Education & Academic Background
          </motion.h3>
        </div>

        {/* Education Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical central path line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-slate-200 dark:bg-portfolio-border -translate-x-1/2" />

          <div className="space-y-12">
            {educationData.map((edu, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={idx}
                  className={`relative flex flex-col md:flex-row ${
                    isEven ? 'md:flex-row-reverse' : ''
                  } items-stretch`}
                >
                  {/* Pin Node marker */}
                  <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-portfolio-bg border-4 border-portfolio-primary dark:border-portfolio-accent -translate-x-1/2 flex items-center justify-center z-10 shadow-lg">
                    <BookOpen size={10} className="text-portfolio-primary dark:text-portfolio-accent" />
                  </div>

                  {/* Spacer element */}
                  <div className="hidden md:block w-1/2" />

                  {/* Card panel */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="w-full md:w-1/2 pl-12 md:pl-0 md:px-8"
                  >
                    <div className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-portfolio-border shadow-lg dark:shadow-none backdrop-blur-md">
                      {/* Date span */}
                      <span className="flex items-center gap-1.5 text-xs font-semibold font-mono text-portfolio-primary dark:text-portfolio-accent">
                        <Calendar size={12} /> {edu.year}
                      </span>

                      {/* Header details */}
                      <h4 className="mt-2 text-base sm:text-lg font-bold dark:text-portfolio-text text-slate-805">
                        {edu.degree}
                      </h4>
                      <h5 className="text-xs font-semibold text-slate-500 dark:text-portfolio-muted mt-1">
                        {edu.college}
                      </h5>

                      <div className="mt-2 flex items-center gap-1 text-xs text-portfolio-accent font-mono">
                        <MapPin size={12} /> {edu.location}
                      </div>

                      {/* Summary */}
                      <p className="mt-3 text-xs text-slate-650 dark:text-portfolio-muted leading-relaxed">
                        {edu.details}
                      </p>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Education;
