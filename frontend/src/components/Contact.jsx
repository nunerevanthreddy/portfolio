import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Github, Linkedin, AlertCircle, CheckCircle2 } from 'lucide-react';
import API from '../utils/api.js';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error'

  const validateForm = () => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'Name is required';
    
    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) tempErrors.email = 'Please enter a valid email';
    }

    if (!formData.subject.trim()) tempErrors.subject = 'Subject is required';
    if (!formData.message.trim()) tempErrors.message = 'Message is required';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear validation error when typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus(null);

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await API.post('/messages', formData);
      if (response.data.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Contact submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-20 overflow-hidden bg-slate-50/50 dark:bg-transparent">
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
            Get In Touch
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-3 text-3xl font-extrabold tracking-tight dark:text-portfolio-text text-slate-900 sm:text-4xl"
          >
            Connect With Me
          </motion.h3>
        </div>

        {/* Contact Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Panel - Contact Information & Google Map */}
          <div className="lg:col-span-5 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-portfolio-border bg-white dark:bg-white/5 shadow-lg dark:shadow-none backdrop-blur-md space-y-6"
            >
              <h4 className="text-lg font-bold dark:text-portfolio-text text-slate-800">Contact Details</h4>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-portfolio-primary/10 text-portfolio-primary dark:text-portfolio-accent">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 dark:text-portfolio-muted font-mono">Email Address</p>
                    <a href="mailto:your_email@gmail.com" className="text-sm font-semibold dark:text-slate-200 text-slate-700 hover:underline">
                      your_email@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-portfolio-primary/10 text-portfolio-primary dark:text-portfolio-accent">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 dark:text-portfolio-muted font-mono">Phone Number</p>
                    <a href="tel:+919876543210" className="text-sm font-semibold dark:text-slate-200 text-slate-700 hover:underline">
                      +91 98765 43210
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-portfolio-primary/10 text-portfolio-primary dark:text-portfolio-accent">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 dark:text-portfolio-muted font-mono">Location</p>
                    <p className="text-sm font-semibold dark:text-slate-200 text-slate-700">
                      Hyderabad, Telangana, India
                    </p>
                  </div>
                </div>
              </div>

              {/* Social handles */}
              <div className="pt-4 border-t border-slate-100 dark:border-portfolio-border flex gap-4">
                <a
                  href="https://github.com/nunerevanthreddy"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-full border border-slate-200 dark:border-portfolio-border bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-350 hover:text-portfolio-primary dark:hover:text-portfolio-accent hover:border-portfolio-primary transition-all"
                >
                  <Github size={18} />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-full border border-slate-200 dark:border-portfolio-border bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-350 hover:text-portfolio-primary dark:hover:text-portfolio-accent hover:border-portfolio-primary transition-all"
                >
                  <Linkedin size={18} />
                </a>
              </div>
            </motion.div>

            {/* Embedded Google Map */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 dark:border-portfolio-border shadow-lg"
            >
              <iframe
                title="Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243647.31603953792!2d78.26795908992147!3d17.412299803112316!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99daeaeb2cbb%3A0x7f324d77aaf139a9!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                className="w-full h-full border-none filter invert-[0.9] dark:invert-0"
                allowFullScreen=""
                loading="lazy"
              />
            </motion.div>
          </div>

          {/* Right Panel - Contact Form */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-portfolio-border bg-white dark:bg-white/5 shadow-lg dark:shadow-none backdrop-blur-md"
            >
              <h4 className="text-lg font-bold dark:text-portfolio-text text-slate-800 mb-6">Send Message</h4>

              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Submit Feedback Banners */}
                {submitStatus === 'success' && (
                  <div className="flex gap-2 items-center p-4 rounded-xl bg-portfolio-success/10 border border-portfolio-success text-portfolio-success text-sm font-semibold">
                    <CheckCircle2 size={16} />
                    <span>Your message has been sent successfully! I will reach out soon.</span>
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="flex gap-2 items-center p-4 rounded-xl bg-red-500/10 border border-red-500 text-red-500 text-sm font-semibold">
                    <AlertCircle size={16} />
                    <span>Oops, something went wrong. Please check your credentials or try again later.</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name field */}
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold text-slate-500 dark:text-portfolio-muted mb-1.5 font-mono uppercase">Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2.5 rounded-lg border bg-slate-50 dark:bg-white/5 dark:text-portfolio-text text-slate-800 focus:outline-none focus:ring-1 focus:ring-portfolio-primary focus:border-portfolio-primary text-sm ${
                        errors.name ? 'border-red-500' : 'border-slate-200 dark:border-portfolio-border'
                      }`}
                      placeholder="John Doe"
                    />
                    {errors.name && <span className="text-[10px] text-red-500 font-mono mt-1 block">{errors.name}</span>}
                  </div>

                  {/* Email field */}
                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold text-slate-500 dark:text-portfolio-muted mb-1.5 font-mono uppercase">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2.5 rounded-lg border bg-slate-50 dark:bg-white/5 dark:text-portfolio-text text-slate-800 focus:outline-none focus:ring-1 focus:ring-portfolio-primary focus:border-portfolio-primary text-sm ${
                        errors.email ? 'border-red-500' : 'border-slate-200 dark:border-portfolio-border'
                      }`}
                      placeholder="johndoe@example.com"
                    />
                    {errors.email && <span className="text-[10px] text-red-500 font-mono mt-1 block">{errors.email}</span>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone field */}
                  <div>
                    <label htmlFor="phone" className="block text-xs font-semibold text-slate-500 dark:text-portfolio-muted mb-1.5 font-mono uppercase">Phone (Optional)</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-portfolio-border bg-slate-50 dark:bg-white/5 dark:text-portfolio-text text-slate-800 focus:outline-none focus:ring-1 focus:ring-portfolio-primary focus:border-portfolio-primary text-sm"
                      placeholder="+91 98765 43210"
                    />
                  </div>

                  {/* Subject field */}
                  <div>
                    <label htmlFor="subject" className="block text-xs font-semibold text-slate-500 dark:text-portfolio-muted mb-1.5 font-mono uppercase">Subject *</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2.5 rounded-lg border bg-slate-50 dark:bg-white/5 dark:text-portfolio-text text-slate-800 focus:outline-none focus:ring-1 focus:ring-portfolio-primary focus:border-portfolio-primary text-sm ${
                        errors.subject ? 'border-red-500' : 'border-slate-200 dark:border-portfolio-border'
                      }`}
                      placeholder="Project Discussion"
                    />
                    {errors.subject && <span className="text-[10px] text-red-500 font-mono mt-1 block">{errors.subject}</span>}
                  </div>
                </div>

                {/* Message field */}
                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-slate-500 dark:text-portfolio-muted mb-1.5 font-mono uppercase">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2.5 rounded-lg border bg-slate-50 dark:bg-white/5 dark:text-portfolio-text text-slate-800 focus:outline-none focus:ring-1 focus:ring-portfolio-primary focus:border-portfolio-primary text-sm resize-none ${
                      errors.message ? 'border-red-500' : 'border-slate-200 dark:border-portfolio-border'
                    }`}
                    placeholder="Tell me about your project..."
                  />
                  {errors.message && <span className="text-[10px] text-red-500 font-mono mt-1 block">{errors.message}</span>}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-portfolio-primary hover:bg-portfolio-primary/95 text-white font-semibold shadow-lg shadow-portfolio-primary/20 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      Send Message <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;
