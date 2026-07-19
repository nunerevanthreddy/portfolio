import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Layout, Terminal, Cpu, Palette, Database, Smartphone } from 'lucide-react';

const serviceList = [
  {
    title: 'Website Development',
    description: 'End-to-end full stack website construction, launching high-performance and search-engine optimized applications.',
    icon: Globe,
    color: 'text-portfolio-primary',
    bg: 'bg-portfolio-primary/10',
  },
  {
    title: 'Frontend Development',
    description: 'Writing pixel-perfect, highly interactive components using modern state patterns in React and Tailwind CSS.',
    icon: Layout,
    color: 'text-portfolio-accent',
    bg: 'bg-portfolio-accent/10',
  },
  {
    title: 'Backend Engineering',
    description: 'Structuring robust backend environments using Node.js/Express, ensuring absolute uptime and fast data dispatches.',
    icon: Terminal,
    color: 'text-portfolio-secondary',
    bg: 'bg-portfolio-secondary/10',
  },
  {
    title: 'API Integration & Dev',
    description: 'Designing clean REST APIs, handling data validation, error routing, and third-party connector hooks.',
    icon: Cpu,
    color: 'text-portfolio-success',
    bg: 'bg-portfolio-success/10',
  },
  {
    title: 'UI Design Adaptation',
    description: 'Translating design system configurations and mockups into premium interactive animations and styles.',
    icon: Palette,
    color: 'text-pink-500',
    bg: 'bg-pink-500/10',
  },
  {
    title: 'Database Architecture',
    description: 'Designing secure and structured database schemas inside MongoDB, establishing optimal indexes and storage policies.',
    icon: Database,
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
  },
  {
    title: 'Responsive Configurations',
    description: 'Ensuring fluid layout adaptivity across all physical viewports including mobile phones, tablets, laptops, and wide screens.',
    icon: Smartphone,
    color: 'text-cyan-500',
    bg: 'bg-cyan-500/10',
  },
];

const Services = () => {
  return (
    <section id="services" className="relative py-20 overflow-hidden bg-slate-50/50 dark:bg-transparent">
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
            My Offerings
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-3 text-3xl font-extrabold tracking-tight dark:text-portfolio-text text-slate-900 sm:text-4xl"
          >
            Professional Services
          </motion.h3>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceList.map((service, idx) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, duration: 0.5 }}
                whileHover={{ y: -5 }}
                className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-portfolio-border bg-white dark:bg-white/5 shadow-md dark:shadow-none backdrop-blur-md flex flex-col items-start"
              >
                {/* Visual Icon Badge */}
                <div className={`p-3.5 rounded-xl ${service.bg} ${service.color} mb-6`}>
                  <Icon size={24} />
                </div>

                {/* Service Details */}
                <h4 className="text-lg font-bold dark:text-portfolio-text text-slate-800 mb-3">
                  {service.title}
                </h4>
                <p className="text-xs text-slate-500 dark:text-portfolio-muted leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Services;
