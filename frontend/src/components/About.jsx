import React from 'react';
import { motion } from 'framer-motion';
import { Award, Briefcase, Users, Code2 } from 'lucide-react';

const stats = [
  { label: 'Years Experience', value: '5+', icon: Briefcase, color: 'text-portfolio-primary' },
  { label: 'Projects Completed', value: '40+', icon: Code2, color: 'text-portfolio-accent' },
  { label: 'Satisfied Clients', value: '25+', icon: Users, color: 'text-portfolio-secondary' },
  { label: 'Certificates Earned', value: '15+', icon: Award, color: 'text-portfolio-success' },
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
            Crafting Scalable, High-Impact Web Solutions
          </motion.h3>
        </div>

        {/* Content Grid */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left side illustration/photo */}
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
                <h4 className="text-lg font-bold dark:text-portfolio-text text-slate-800">Revanth Reddy</h4>
                <p className="text-xs text-portfolio-primary dark:text-portfolio-accent font-mono mt-1">Hyderabad, India</p>
                <p className="text-sm dark:text-portfolio-muted text-slate-500 mt-4 leading-relaxed">
                  Passionate about full-stack architectures, clean codebases, and seamless deployment paradigms.
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
              <h4 className="text-xl font-bold dark:text-slate-100 text-slate-800">My Professional Journey</h4>
              
              <p className="text-slate-600 dark:text-portfolio-muted leading-relaxed">
                I am a Full Stack Developer dedicated to creating elegant and secure digital products. I bridging the gap between design and scalable, robust engineering.
              </p>

              <p className="text-slate-600 dark:text-portfolio-muted leading-relaxed">
                My work spans designing custom responsive user interfaces using React and Tailwind CSS, to architecting secure RESTful endpoints in Node.js, and organizing data patterns inside MongoDB. I focus on writing maintainable, self-documenting code and optimizing speed performance.
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
