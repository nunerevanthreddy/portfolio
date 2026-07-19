import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ExternalLink, Github, X, Eye, Code } from 'lucide-react';
import API from '../utils/api.js';

// Pre-defined fallback projects in case API is empty / offline
const defaultProjects = [
  {
    _id: 'default-1',
    title: 'Collaborative Kanban Tool',
    description: 'A premium real-time Kanban management board featuring Drag-and-Drop, subtask checklists, and collaborative workspaces. Designed to help teams coordinate workflow stages efficiently.',
    image: 'https://images.unsplash.com/photo-1611224885990-ab7363d1f2a9?auto=format&fit=crop&w=600&q=80',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'Framer Motion'],
    githubUrl: 'https://github.com/nunerevanthreddy',
    liveUrl: 'https://github.com/nunerevanthreddy',
    category: 'Full Stack',
  },
  {
    _id: 'default-2',
    title: 'Holographic Crypto Tracker',
    description: 'Interactive dashboard visualising cryptocurrency market trends. Integrates real-time price feeds, historical candlestick charts, and customized price alerts.',
    image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&w=600&q=80',
    technologies: ['React', 'Tailwind CSS', 'ChartJS', 'CoinGecko API'],
    githubUrl: 'https://github.com/nunerevanthreddy',
    liveUrl: 'https://github.com/nunerevanthreddy',
    category: 'Frontend',
  },
  {
    _id: 'default-3',
    title: 'Secure Chat Server',
    description: 'High-performance WebSockets chat engine with secure user authentications, channel divisions, system logs, and image attachment configurations.',
    image: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?auto=format&fit=crop&w=600&q=80',
    technologies: ['Node.js', 'Express', 'WebSockets', 'MongoDB', 'Helmet'],
    githubUrl: 'https://github.com/nunerevanthreddy',
    liveUrl: 'https://github.com/nunerevanthreddy',
    category: 'Backend',
  },
  {
    _id: 'default-4',
    title: 'Personal Finance Planner',
    description: 'An AI-powered personal financial tracking application. Categorizes expenses automatically, tracks saving targets, and generates downloadable monthly budget breakdowns.',
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=600&q=80',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
    githubUrl: 'https://github.com/nunerevanthreddy',
    liveUrl: 'https://github.com/nunerevanthreddy',
    category: 'Full Stack',
  },
];

const categories = ['All', 'Full Stack', 'Frontend', 'Backend'];

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await API.get('/projects');
        if (response.data.success && response.data.data.length > 0) {
          setProjects(response.data.data);
        } else {
          setProjects(defaultProjects);
        }
      } catch (error) {
        console.warn('Could not fetch projects. Using default placeholders.', error);
        setProjects(defaultProjects);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      activeCategory === 'All' ||
      project.category.toLowerCase() === activeCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  return (
    <section id="projects" className="relative py-20 overflow-hidden bg-slate-50/50 dark:bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-bold tracking-widest font-mono text-portfolio-primary dark:text-portfolio-accent uppercase"
          >
            My Works
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-3 text-3xl font-extrabold tracking-tight dark:text-portfolio-text text-slate-900 sm:text-4xl"
          >
            Featured Projects
          </motion.h3>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-12">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-portfolio-primary text-white shadow-md'
                    : 'bg-white dark:bg-white/5 border border-slate-200 dark:border-portfolio-border text-slate-600 dark:text-slate-350 hover:bg-slate-100 dark:hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search project or technology..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm rounded-full border border-slate-200 dark:border-portfolio-border bg-white dark:bg-white/5 text-slate-800 dark:text-portfolio-text focus:outline-none focus:ring-2 focus:ring-portfolio-primary dark:focus:ring-portfolio-accent transition-all"
            />
          </div>
        </div>

        {/* Project Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -6 }}
                className="group relative rounded-2xl border border-slate-200 dark:border-portfolio-border bg-white dark:bg-white/5 overflow-hidden shadow-lg hover:shadow-xl dark:shadow-none backdrop-blur-md flex flex-col justify-between"
              >
                {/* Project Image */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="p-3 rounded-full bg-portfolio-accent text-white shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:scale-110"
                      title="View Details"
                    >
                      <Eye size={18} />
                    </button>
                    <a
                      href={project.githubUrl || '#'}
                      target="_blank"
                      rel="noreferrer"
                      className="p-3 rounded-full bg-slate-800 text-white shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75 hover:scale-110"
                      title="GitHub Repository"
                    >
                      <Github size={18} />
                    </a>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold tracking-widest font-mono text-portfolio-primary dark:text-portfolio-accent uppercase">
                      {project.category}
                    </span>
                    <h4 className="mt-2 text-lg font-bold dark:text-portfolio-text text-slate-800 line-clamp-1">
                      {project.title}
                    </h4>
                    <p className="mt-2 text-xs text-slate-500 dark:text-portfolio-muted line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Tags */}
                  <div className="mt-6 flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-[10px] font-mono font-semibold rounded bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-portfolio-border text-slate-600 dark:text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-0.5 text-[10px] font-mono font-semibold rounded bg-slate-100 dark:bg-white/5 text-slate-500">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty Search Result State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500 dark:text-portfolio-muted font-mono text-sm">
              No projects match your search criteria.
            </p>
          </div>
        )}

      </div>

      {/* Details Popup Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl rounded-2xl border border-slate-200 dark:border-portfolio-border bg-white dark:bg-slate-900 shadow-2xl overflow-hidden text-slate-800 dark:text-portfolio-text"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-900/60 dark:bg-white/10 text-white hover:bg-slate-800 dark:hover:bg-white/20 transition-colors"
              >
                <X size={16} />
              </button>

              {/* Modal Image */}
              <div className="aspect-video w-full relative">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-900 to-transparent" />
              </div>

              {/* Modal Details */}
              <div className="p-6 md:p-8">
                <span className="text-xs font-bold tracking-widest font-mono text-portfolio-primary dark:text-portfolio-accent uppercase">
                  {selectedProject.category}
                </span>
                <h3 className="mt-2 text-2xl font-bold">{selectedProject.title}</h3>
                
                <p className="mt-4 text-sm text-slate-600 dark:text-portfolio-muted leading-relaxed">
                  {selectedProject.description}
                </p>

                {/* Tech Stack */}
                <div className="mt-6">
                  <h4 className="text-xs font-mono tracking-widest uppercase font-bold text-slate-500">
                    Technology Stack
                  </h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 text-xs font-mono font-medium rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-portfolio-border text-slate-700 dark:text-slate-250"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action CTA Links */}
                <div className="mt-8 flex gap-4">
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-full bg-portfolio-primary text-white hover:bg-portfolio-primary/90 shadow-lg shadow-portfolio-primary/20 transition-all"
                    >
                      <ExternalLink size={16} /> Live Preview
                    </a>
                  )}
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-portfolio-border hover:bg-slate-200 dark:hover:bg-white/10 transition-all"
                    >
                      <Github size={16} /> Code Repository
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
