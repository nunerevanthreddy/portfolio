import React from 'react';
import { motion } from 'framer-motion';
import { Award, Briefcase, Users, Code2, GraduationCap } from 'lucide-react';

const stats = [
  { label: 'Academic Year', value: '2023-27', icon: GraduationCap, color: 'text-portfolio-primary' },
  { label: 'Core Projects', value: '2+', icon: Code2, color: 'text-portfolio-accent' },
  { label: 'Certifications', value: '5+', icon: Award, color: 'text-portfolio-secondary' },
  { label: 'CodeChef Rating', value: '500+', icon: Briefcase, color: 'text-portfolio-success' },
];

const About = () => {
  return (
    <section id="about" className="relative py-20 overflow-hidden bg-slate-50/50 dark:bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-bold tracking-widest font-mono text-portfolio-primary dark:text-portfolio-accent uppercase"
          >
            About Me
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-3 text-3xl font-extrabold tracking-tight dark:text-portfolio-text text-slate-900 sm:text-4xl"
          >
            Building Scalable Web & Mobile Solutions
          </motion.h3>
        </div>

        {/* Content Grid */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left side info card */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-2xl overflow-hidden border border-slate-200 dark:border-portfolio-border bg-white/5 p-4 shadow-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-portfolio-primary/10 to-portfolio-secondary/15" />
              <div className="w-full h-full border border-dashed border-portfolio-accent/30 rounded-xl flex flex-col items-center justify-center p-6 text-center">
                <Code2 className="text-portfolio-accent animate-pulse mb-4" size={48} />
                <h4 className="text-lg font-bold dark:text-portfolio-text text-slate-800">Nune Revanth Reddy</h4>
                <p className="text-xs text-portfolio-primary dark:text-portfolio-accent font-mono mt-1">Vasireddy Venkatadri Institute of Technology</p>
                <p className="text-xs text-slate-500 dark:text-portfolio-muted mt-1">Guntur, Andhra Pradesh</p>
                <p className="text-sm dark:text-portfolio-muted text-slate-500 mt-4 leading-relaxed line-clamp-3">
                  Computer Science undergraduate passionate about full-stack engineering, OpenCV computer vision, and cloud databases.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right side narrative & statistics */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h4 className="text-xl font-bold dark:text-slate-100 text-slate-800">Executive Summary</h4>
              
              <p className="text-slate-600 dark:text-portfolio-muted leading-relaxed">
                I am an enthusiastic and detail-oriented undergraduate with a strong academic background and hands-on experience in software and Android development.
              </p>

              <p className="text-slate-600 dark:text-portfolio-muted leading-relaxed">
                Proficient in Python, Java, and C, with solid knowledge of Object-Oriented Programming (OOP), SQL, and database systems including MySQL and MongoDB Atlas. Developed projects such as a product verification system with secure authentication and QR-based validation, and an Android-based travel assistant using OpenCV and SQLite.
              </p>

              {/* Statistics Grid */}
              <div className="pt-6 grid grid-cols-2 gap-4">
                {stats.map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1, duration: 0.4 }}
                      className="p-4 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-portfolio-border shadow-md dark:shadow-none flex items-center gap-4"
                    >
                      <div className={`p-2 rounded-lg bg-slate-100 dark:bg-white/5 ${stat.color}`}>
                        <Icon size={24} />
                      </div>
                      <div>
                        <div className="text-2xl font-bold dark:text-portfolio-text text-slate-850">{stat.value}</div>
                        <div className="text-xs text-slate-500 dark:text-portfolio-muted font-mono">{stat.label}</div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default About;
