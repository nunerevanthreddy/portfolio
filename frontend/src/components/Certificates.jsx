import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Award, Calendar } from 'lucide-react';
import API from '../utils/api.js';

// Pre-defined fallback credentials
const defaultCertificates = [
  {
    _id: 'cert-1',
    title: 'Meta Front-End Developer Specialization',
    issuer: 'Meta / Coursera',
    date: 'March 2024',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=500&q=80',
    verificationUrl: 'https://coursera.org',
  },
  {
    _id: 'cert-2',
    title: 'MongoDB Certified Developer Associate',
    issuer: 'MongoDB Academy',
    date: 'September 2025',
    image: 'https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=500&q=80',
    verificationUrl: 'https://university.mongodb.com',
  },
  {
    _id: 'cert-3',
    title: 'AWS Certified Solutions Architect',
    issuer: 'Amazon Web Services',
    date: 'January 2026',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=500&q=80',
    verificationUrl: 'https://aws.amazon.com',
  },
];

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await API.get('/certificates');
        if (response.data.success && response.data.data.length > 0) {
          setCertificates(response.data.data);
        } else {
          setCertificates(defaultCertificates);
        }
      } catch (error) {
        console.warn('Could not fetch certificates, using defaults.', error);
        setCertificates(defaultCertificates);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  return (
    <section id="certificates" className="relative py-20 overflow-hidden">
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
            Credentials
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-3 text-3xl font-extrabold tracking-tight dark:text-portfolio-text text-slate-900 sm:text-4xl"
          >
            Certificates & Licenses
          </motion.h3>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((cert, idx) => (
            <motion.div
              key={cert._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="group relative rounded-2xl border border-slate-200 dark:border-portfolio-border bg-white dark:bg-white/5 overflow-hidden shadow-lg dark:shadow-none backdrop-blur-md flex flex-col"
            >
              {/* Certificate Image Frame */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900 border-b border-slate-100 dark:border-portfolio-border">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <a
                    href={cert.verificationUrl || '#'}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-full bg-portfolio-primary text-white shadow-lg transition-transform duration-300 hover:scale-105"
                  >
                    Verify Certificate <ExternalLink size={12} />
                  </a>
                </div>
              </div>

              {/* Certificate Information */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="flex items-center gap-1 text-[10px] font-bold tracking-widest font-mono text-portfolio-primary dark:text-portfolio-accent uppercase">
                    <Award size={10} /> {cert.issuer}
                  </span>
                  <h4 className="mt-2 text-base font-bold dark:text-portfolio-text text-slate-800 line-clamp-2 leading-snug">
                    {cert.title}
                  </h4>
                </div>

                <div className="mt-4 flex items-center justify-between text-xs text-slate-500 dark:text-portfolio-muted font-mono">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} /> {cert.date}
                  </span>
                  
                  {cert.verificationUrl && (
                    <a
                      href={cert.verificationUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-portfolio-primary dark:text-portfolio-accent hover:underline flex items-center gap-0.5"
                    >
                      Verify <ExternalLink size={10} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Certificates;
