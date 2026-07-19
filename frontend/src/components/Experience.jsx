import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Briefcase, Award } from 'lucide-react';

const experiences = [
  {
    role: 'Senior Full Stack Engineer',
    company: 'NextGen Tech Solutions',
    period: '2024 - Present',
    description: 'Architecting scalable server logic, configuring structured databases, and creating highly responsive frontend client panels.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Docker', 'AWS'],
    achievements: [
      'Increased system loading performance by 35% through custom code splitting.',
      'Automated integration pipelines, decreasing manual testing times by 40%.',
    ],
  },
  {
    role: 'Software Developer',
    company: 'CloudScale Innovations',
    period: '2022 - 2024',
    description: 'Engineered web features, optimized complex API structures, and built interactive dashboards for enterprise clients.',
    technologies: ['React', 'Express.js', 'PostgreSQL', 'Tailwind CSS'],
    achievements: [
      'Designed and released 8 custom client portals with full mobile responsiveness.',
      'Built a custom authentication system using secure JWT structures.',
    ],
  },
];

const Experience = () => {
  return (
    <section id="experience" className="relative py-20 overflow-hidden">
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
            My Path
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-3 text-3xl font-extrabold tracking-tight dark:text-portfolio-text text-slate-900 sm:text-4xl"
          >
            Work Experience
          </motion.h3>
        </div>

        {/* Timeline Layout */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Timeline Divider Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-slate-200 dark:bg-portfolio-border -translate-x-1/2" />

          <div className="space-y-12">
            {experiences.map((exp, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={idx}
                  className={`relative flex flex-col md:flex-row ${
                    isEven ? 'md:flex-row-reverse' : ''
                  } items-stretch`}
                >
                  {/* Timeline Node Icon Pin */}
                  <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-portfolio-bg border-4 border-portfolio-primary dark:border-portfolio-accent -translate-x-1/2 flex items-center justify-center z-10 shadow-lg">
                    <Briefcase size={10} className="text-portfolio-primary dark:text-portfolio-accent" />
                  </div>

                  {/* Empty spacer for alignment */}
                  <div className="hidden md:block w-1/2" />

                  {/* Card wrapper */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="w-full md:w-1/2 pl-12 md:pl-0 md:px-8"
                  >
                    <div className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-portfolio-border shadow-lg dark:shadow-none backdrop-blur-md">
                      {/* Date details */}
                      <span className="flex items-center gap-1.5 text-xs font-semibold font-mono text-portfolio-primary dark:text-portfolio-accent">
                        <Calendar size={12} /> {exp.period}
                      </span>

                      {/* Header details */}
                      <h4 className="mt-2 text-lg font-bold dark:text-portfolio-text text-slate-805">
                        {exp.role}
                      </h4>
                      <h5 className="text-xs font-semibold text-slate-500 dark:text-portfolio-muted">
                        {exp.company}
                      </h5>

                      {/* Description */}
                      <p className="mt-3 text-xs text-slate-650 dark:text-portfolio-muted leading-relaxed">
                        {exp.description}
                      </p>

                      {/* Achievements */}
                      <ul className="mt-4 space-y-1.5 text-xs text-slate-650 dark:text-portfolio-muted">
                        {exp.achievements.map((ach, aIdx) => (
                          <li key={aIdx} className="flex gap-2 items-start">
                            <Award size={12} className="mt-0.5 text-portfolio-success flex-shrink-0" />
                            <span>{ach}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Technologies badge deck */}
                      <div className="mt-5 flex flex-wrap gap-1.5">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 text-[10px] font-mono font-medium rounded bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-portfolio-border text-slate-600 dark:text-slate-350"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
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

export default Experience;
