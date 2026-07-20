import React from 'react';
import { motion } from 'framer-motion';

const skillCategories = [
  {
    title: 'Programming Languages',
    skills: [
      { name: 'Python', level: 90 },
      { name: 'Java', level: 85 },
      { name: 'C', level: 80 },
    ],
  },
  {
    title: 'Core Concepts & Databases',
    skills: [
      { name: 'OOPs Concepts', level: 90 },
      { name: 'SQL', level: 85 },
      { name: 'MongoDB / MongoDB Atlas', level: 85 },
      { name: 'MySQL', level: 80 },
      { name: 'SQLite', level: 80 },
    ],
  },
  {
    title: 'Mobile & Computer Vision',
    skills: [
      { name: 'Android Studio', level: 85 },
      { name: 'Kotlin', level: 78 },
      { name: 'OpenCV Object Detection', level: 75 },
    ],
  },
  {
    title: 'Version Control & Tools',
    skills: [
      { name: 'Git & GitHub', level: 90 },
      { name: 'HTML & CSS & JavaScript', level: 85 },
      { name: 'VS Code & Postman', level: 90 },
    ],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="relative py-20 overflow-hidden">
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
            Proficiencies
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-3 text-3xl font-extrabold tracking-tight dark:text-portfolio-text text-slate-900 sm:text-4xl"
          >
            Technical Skill Set
          </motion.h3>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-portfolio-border shadow-lg dark:shadow-none backdrop-blur-md"
            >
              <h4 className="text-lg font-bold dark:text-portfolio-text text-slate-805 border-b border-slate-100 dark:border-portfolio-border pb-3 mb-6">
                {category.title}
              </h4>
              <div className="space-y-5">
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-1 text-sm font-semibold text-slate-700 dark:text-slate-200">
                      <span>{skill.name}</span>
                      <span className="font-mono text-xs text-portfolio-primary dark:text-portfolio-accent">{skill.level}%</span>
                    </div>
                    {/* Progress Track */}
                    <div className="w-full h-2 bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden">
                      {/* Progress Bar Fill */}
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                        className="h-full bg-gradient-to-r from-portfolio-primary to-portfolio-accent rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Skills;
