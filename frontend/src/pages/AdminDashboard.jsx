import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import {
  LogOut,
  Mail,
  FolderKanban,
  Award,
  MessageSquareQuote,
  Trash2,
  Plus,
  Compass,
  CheckCircle,
  AlertCircle,
  Database,
  BarChart,
  Link,
  Tag,
  Clock,
  User,
  Shield,
} from 'lucide-react';
import API from '../utils/api.js';

const AdminDashboard = () => {
  const { user, loading, logout, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('messages');
  const [analytics, setAnalytics] = useState(null);
  
  // Data lists
  const [messages, setMessages] = useState([]);
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  // Form states
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    image: '',
    technologies: '',
    githubUrl: '',
    liveUrl: '',
    category: 'Full Stack',
  });

  const [certForm, setCertForm] = useState({
    title: '',
    issuer: '',
    date: '',
    image: '',
    verificationUrl: '',
  });

  const [testiForm, setTestiForm] = useState({
    name: '',
    position: '',
    review: '',
    rating: 5,
    image: '',
  });

  // Action status messages
  const [alert, setAlert] = useState({ type: '', text: '' });
  const [submitting, setSubmitting] = useState(false);

  // Authentication check
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      window.history.pushState({}, '', '/login');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  }, [isAuthenticated, loading]);

  // Fetch dashboard data
  const fetchData = async () => {
    try {
      const analyticsRes = await API.get('/analytics');
      if (analyticsRes.data.success) {
        setAnalytics(analyticsRes.data.data);
      }

      const msgRes = await API.get('/messages');
      if (msgRes.data.success) setMessages(msgRes.data.data);

      const projRes = await API.get('/projects');
      if (projRes.data.success) setProjects(projRes.data.data);

      const certRes = await API.get('/certificates');
      if (certRes.data.success) setCertificates(certRes.data.data);

      const testRes = await API.get('/testimonials');
      if (testRes.data.success) setTestimonials(testRes.data.data);
    } catch (err) {
      console.error('Error loading dashboard data:', err);
      showAlert('error', 'Failed to retrieve database contents. Is the backend offline?');
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const showAlert = (type, text) => {
    setAlert({ type, text });
    setTimeout(() => setAlert({ type: '', text: '' }), 5000);
  };

  const handleLogout = () => {
    logout();
    window.history.pushState({}, '', '/login');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  // CRUD Operations

  // Delete message
  const handleDeleteMessage = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      const res = await API.delete(`/messages/${id}`);
      if (res.data.success) {
        setMessages((prev) => prev.filter((m) => m._id !== id));
        fetchData();
        showAlert('success', 'Message deleted successfully');
      }
    } catch (err) {
      showAlert('error', 'Failed to delete message');
    }
  };

  // Create project
  const handleCreateProject = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await API.post('/projects', projectForm);
      if (res.data.success) {
        showAlert('success', 'Project created successfully');
        setProjectForm({
          title: '',
          description: '',
          image: '',
          technologies: '',
          githubUrl: '',
          liveUrl: '',
          category: 'Full Stack',
        });
        fetchData();
      }
    } catch (err) {
      showAlert('error', err.response?.data?.message || 'Failed to create project');
    } finally {
      setSubmitting(false);
    }
  };

  // Delete project
  const handleDeleteProject = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    try {
      const res = await API.delete(`/projects/${id}`);
      if (res.data.success) {
        setProjects((prev) => prev.filter((p) => p._id !== id));
        fetchData();
        showAlert('success', 'Project removed successfully');
      }
    } catch (err) {
      showAlert('error', 'Failed to delete project');
    }
  };

  // Create certificate
  const handleCreateCert = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await API.post('/certificates', certForm);
      if (res.data.success) {
        showAlert('success', 'Certificate added successfully');
        setCertForm({ title: '', issuer: '', date: '', image: '', verificationUrl: '' });
        fetchData();
      }
    } catch (err) {
      showAlert('error', err.response?.data?.message || 'Failed to add certificate');
    } finally {
      setSubmitting(false);
    }
  };

  // Delete certificate
  const handleDeleteCert = async (id) => {
    if (!window.confirm('Remove this certificate?')) return;
    try {
      const res = await API.delete(`/certificates/${id}`);
      if (res.data.success) {
        setCertificates((prev) => prev.filter((c) => c._id !== id));
        fetchData();
        showAlert('success', 'Certificate removed successfully');
      }
    } catch (err) {
      showAlert('error', 'Failed to delete certificate');
    }
  };

  // Create testimonial
  const handleCreateTestimonial = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await API.post('/testimonials', testiForm);
      if (res.data.success) {
        showAlert('success', 'Testimonial added successfully');
        setTestiForm({ name: '', position: '', review: '', rating: 5, image: '' });
        fetchData();
      }
    } catch (err) {
      showAlert('error', err.response?.data?.message || 'Failed to add testimonial');
    } finally {
      setSubmitting(false);
    }
  };

  // Delete testimonial
  const handleDeleteTestimonial = async (id) => {
    if (!window.confirm('Delete this testimonial?')) return;
    try {
      const res = await API.delete(`/testimonials/${id}`);
      if (res.data.success) {
        setTestimonials((prev) => prev.filter((t) => t._id !== id));
        fetchData();
        showAlert('success', 'Testimonial deleted successfully');
      }
    } catch (err) {
      showAlert('error', 'Failed to delete testimonial');
    }
  };

  if (loading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
        <div className="w-8 h-8 border-4 border-t-portfolio-accent border-r-portfolio-accent border-b-portfolio-primary border-l-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090E1A] text-slate-200 flex flex-col lg:flex-row">
      
      {/* SIDEBAR */}
      <aside className="w-full lg:w-64 bg-slate-950 border-b lg:border-b-0 lg:border-r border-white/5 flex flex-col justify-between p-6">
        <div>
          {/* Brand header */}
          <div className="flex items-center gap-3 pb-6 border-b border-white/5 mb-6">
            <div className="p-2 rounded-xl bg-portfolio-primary/10 text-portfolio-accent">
              <Shield size={20} />
            </div>
            <div>
              <h2 className="font-bold font-mono tracking-wider text-sm">CONSOLE</h2>
              <p className="text-[10px] text-slate-500 font-mono">Logged in: {user?.username}</p>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1.5 flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible gap-2 lg:gap-0 pb-4 lg:pb-0">
            <button
              onClick={() => setActiveTab('messages')}
              className={`w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-colors flex-shrink-0 ${
                activeTab === 'messages'
                  ? 'bg-portfolio-primary text-white shadow-md shadow-portfolio-primary/20'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Mail size={16} /> Messages ({messages.length})
            </button>
            
            <button
              onClick={() => setActiveTab('projects')}
              className={`w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-colors flex-shrink-0 ${
                activeTab === 'projects'
                  ? 'bg-portfolio-primary text-white shadow-md shadow-portfolio-primary/20'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <FolderKanban size={16} /> Projects ({projects.length})
            </button>

            <button
              onClick={() => setActiveTab('certificates')}
              className={`w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-colors flex-shrink-0 ${
                activeTab === 'certificates'
                  ? 'bg-portfolio-primary text-white shadow-md shadow-portfolio-primary/20'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Award size={16} /> Certificates ({certificates.length})
            </button>

            <button
              onClick={() => setActiveTab('testimonials')}
              className={`w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-colors flex-shrink-0 ${
                activeTab === 'testimonials'
                  ? 'bg-portfolio-primary text-white shadow-md shadow-portfolio-primary/20'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <MessageSquareQuote size={16} /> Reviews ({testimonials.length})
            </button>
          </nav>
        </div>

        {/* Action Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-xs font-bold font-mono tracking-wider text-red-400 hover:text-red-300 mt-6 pt-4 border-t border-white/5 uppercase"
        >
          <LogOut size={16} /> End Session
        </button>
      </aside>

      {/* MAIN CONTAINER */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
        {/* Floating Alert Panel */}
        {alert.text && (
          <div
            className={`fixed top-6 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-2xl border text-sm font-semibold shadow-2xl ${
              alert.type === 'success'
                ? 'bg-portfolio-success/15 border-portfolio-success text-portfolio-success'
                : 'bg-red-500/15 border-red-500 text-red-400'
            }`}
          >
            {alert.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
            <span>{alert.text}</span>
          </div>
        )}

        {/* Header summary statistics */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight">Admin Dashboard</h1>
            <p className="text-xs text-slate-400 font-mono mt-0.5">Database storage and messages management console</p>
          </div>
          <button
            onClick={() => window.open('/', '_blank')}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-full border border-white/5 bg-white/5 hover:bg-white/10 transition-colors"
          >
            <Compass size={14} /> Open Live Site
          </button>
        </header>

        {/* ANALYTICS SUMMARY */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
            <div className="text-slate-450 flex justify-between items-center mb-2">
              <Mail size={16} className="text-portfolio-primary" />
              <span className="text-[10px] font-mono uppercase font-semibold">Messages</span>
            </div>
            <div className="text-2xl font-extrabold">{analytics?.counts?.messages ?? 0}</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
            <div className="text-slate-450 flex justify-between items-center mb-2">
              <FolderKanban size={16} className="text-portfolio-accent" />
              <span className="text-[10px] font-mono uppercase font-semibold">Projects</span>
            </div>
            <div className="text-2xl font-extrabold">{analytics?.counts?.projects ?? 0}</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
            <div className="text-slate-450 flex justify-between items-center mb-2">
              <Award size={16} className="text-portfolio-secondary" />
              <span className="text-[10px] font-mono uppercase font-semibold">Certificates</span>
            </div>
            <div className="text-2xl font-extrabold">{analytics?.counts?.certificates ?? 0}</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
            <div className="text-slate-450 flex justify-between items-center mb-2">
              <MessageSquareQuote size={16} className="text-portfolio-success" />
              <span className="text-[10px] font-mono uppercase font-semibold">Testimonials</span>
            </div>
            <div className="text-2xl font-extrabold">{analytics?.counts?.testimonials ?? 0}</div>
          </div>
        </div>

        {/* ACTIVE PANEL CONTENT */}
        <div className="bg-white/5 border border-white/5 rounded-2xl p-6 sm:p-8">
          
          {/* TAB 1: MESSAGES */}
          {activeTab === 'messages' && (
            <div className="space-y-6">
              <div className="border-b border-white/5 pb-4">
                <h3 className="text-lg font-bold">Contact Submissions</h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">Messages sent by visitors via the contact page</p>
              </div>

              {messages.length === 0 ? (
                <div className="text-center py-12 text-slate-400 font-mono text-sm">
                  No contact messages in the database.
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg._id}
                      className="p-5 rounded-xl bg-white/5 border border-white/5 flex flex-col md:flex-row justify-between items-start gap-4 relative group"
                    >
                      <div className="space-y-2 flex-1">
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                          <span className="text-sm font-bold text-white">{msg.name}</span>
                          <span className="text-xs text-portfolio-accent font-mono">{msg.email}</span>
                          {msg.phone && <span className="text-xs text-slate-400 font-mono">{msg.phone}</span>}
                        </div>
                        <h4 className="text-xs font-semibold text-slate-300 font-mono uppercase">
                          Subject: {msg.subject}
                        </h4>
                        <p className="text-sm text-slate-350 bg-black/20 p-3 rounded-lg border border-white/5 whitespace-pre-wrap">
                          {msg.message}
                        </p>
                        <div className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                          <Clock size={10} /> {new Date(msg.createdAt).toLocaleString()}
                        </div>
                      </div>

                      <button
                        onClick={() => handleDeleteMessage(msg._id)}
                        className="p-2.5 rounded-lg border border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/25 transition-colors self-end md:self-start"
                        title="Delete Message"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: PROJECTS */}
          {activeTab === 'projects' && (
            <div className="space-y-8">
              
              {/* Add Project Form */}
              <div className="space-y-4 border-b border-white/5 pb-8">
                <div>
                  <h3 className="text-lg font-bold">Add New Project</h3>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">Upload a project to dynamically update the grid</p>
                </div>

                <form onSubmit={handleCreateProject} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold tracking-wider font-mono text-slate-400 uppercase mb-1">Title</label>
                    <input
                      type="text"
                      value={projectForm.title}
                      onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-white/5 bg-white/5 text-white focus:outline-none focus:ring-1 focus:ring-portfolio-accent"
                      placeholder="Collaborative Tool"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold tracking-wider font-mono text-slate-400 uppercase mb-1">Image URL</label>
                    <input
                      type="url"
                      value={projectForm.image}
                      onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-white/5 bg-white/5 text-white focus:outline-none focus:ring-1 focus:ring-portfolio-accent"
                      placeholder="https://images.unsplash.com/..."
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold tracking-wider font-mono text-slate-400 uppercase mb-1">GitHub URL</label>
                    <input
                      type="url"
                      value={projectForm.githubUrl}
                      onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-white/5 bg-white/5 text-white focus:outline-none focus:ring-1 focus:ring-portfolio-accent"
                      placeholder="https://github.com/..."
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold tracking-wider font-mono text-slate-400 uppercase mb-1">Live Demo URL</label>
                    <input
                      type="url"
                      value={projectForm.liveUrl}
                      onChange={(e) => setProjectForm({ ...projectForm, liveUrl: e.target.value })}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-white/5 bg-white/5 text-white focus:outline-none focus:ring-1 focus:ring-portfolio-accent"
                      placeholder="https://..."
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold tracking-wider font-mono text-slate-400 uppercase mb-1">Technologies (comma separated)</label>
                    <input
                      type="text"
                      value={projectForm.technologies}
                      onChange={(e) => setProjectForm({ ...projectForm, technologies: e.target.value })}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-white/5 bg-white/5 text-white focus:outline-none focus:ring-1 focus:ring-portfolio-accent"
                      placeholder="React, Express, MongoDB"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold tracking-wider font-mono text-slate-400 uppercase mb-1">Category</label>
                    <select
                      value={projectForm.category}
                      onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-white/5 bg-white/5 text-white focus:outline-none focus:ring-1 focus:ring-portfolio-accent"
                    >
                      <option value="Full Stack">Full Stack</option>
                      <option value="Frontend">Frontend</option>
                      <option value="Backend">Backend</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-bold tracking-wider font-mono text-slate-400 uppercase mb-1">Description</label>
                    <textarea
                      value={projectForm.description}
                      onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                      rows="3"
                      className="w-full px-3 py-2 text-sm rounded-lg border border-white/5 bg-white/5 text-white focus:outline-none focus:ring-1 focus:ring-portfolio-accent resize-none"
                      placeholder="Brief overview of the project's purpose..."
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="md:col-span-2 flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-portfolio-primary hover:bg-portfolio-primary/95 text-white text-sm font-semibold transition-all disabled:opacity-50"
                  >
                    <Plus size={16} /> Publish Project
                  </button>
                </form>
              </div>

              {/* List Projects */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-wider font-mono text-slate-400">Current Projects</h4>
                {projects.length === 0 ? (
                  <div className="text-center py-6 font-mono text-slate-500 text-xs">No projects uploaded.</div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {projects.map((proj) => (
                      <div key={proj._id} className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center gap-4 justify-between">
                        <div className="flex items-center gap-3">
                          <img src={proj.image} alt={proj.title} className="w-12 h-12 object-cover rounded-lg bg-slate-900 flex-shrink-0" />
                          <div>
                            <h5 className="font-bold text-sm text-white line-clamp-1">{proj.title}</h5>
                            <span className="text-[10px] text-portfolio-accent font-mono">{proj.category}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDeleteProject(proj._id)}
                          className="p-2 rounded-lg border border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          )}

          {/* TAB 3: CERTIFICATES */}
          {activeTab === 'certificates' && (
            <div className="space-y-8">
              
              {/* Add Certificate Form */}
              <div className="space-y-4 border-b border-white/5 pb-8">
                <div>
                  <h3 className="text-lg font-bold">Add Certificate</h3>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">Publish credentials to verify professional competency</p>
                </div>

                <form onSubmit={handleCreateCert} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold tracking-wider font-mono text-slate-400 uppercase mb-1">Title</label>
                    <input
                      type="text"
                      value={certForm.title}
                      onChange={(e) => setCertForm({ ...certForm, title: e.target.value })}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-white/5 bg-white/5 text-white focus:outline-none focus:ring-1 focus:ring-portfolio-accent"
                      placeholder="Solutions Architect"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold tracking-wider font-mono text-slate-400 uppercase mb-1">Issuer</label>
                    <input
                      type="text"
                      value={certForm.issuer}
                      onChange={(e) => setCertForm({ ...certForm, issuer: e.target.value })}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-white/5 bg-white/5 text-white focus:outline-none focus:ring-1 focus:ring-portfolio-accent"
                      placeholder="AWS"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold tracking-wider font-mono text-slate-400 uppercase mb-1">Date</label>
                    <input
                      type="text"
                      value={certForm.date}
                      onChange={(e) => setCertForm({ ...certForm, date: e.target.value })}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-white/5 bg-white/5 text-white focus:outline-none focus:ring-1 focus:ring-portfolio-accent"
                      placeholder="September 2025"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold tracking-wider font-mono text-slate-400 uppercase mb-1">Image URL</label>
                    <input
                      type="url"
                      value={certForm.image}
                      onChange={(e) => setCertForm({ ...certForm, image: e.target.value })}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-white/5 bg-white/5 text-white focus:outline-none focus:ring-1 focus:ring-portfolio-accent"
                      placeholder="https://images.unsplash.com/..."
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-bold tracking-wider font-mono text-slate-400 uppercase mb-1">Verification URL</label>
                    <input
                      type="url"
                      value={certForm.verificationUrl}
                      onChange={(e) => setCertForm({ ...certForm, verificationUrl: e.target.value })}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-white/5 bg-white/5 text-white focus:outline-none focus:ring-1 focus:ring-portfolio-accent"
                      placeholder="https://aws.amazon.com/..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="md:col-span-2 flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-portfolio-primary hover:bg-portfolio-primary/95 text-white text-sm font-semibold transition-all disabled:opacity-50"
                  >
                    <Plus size={16} /> Upload Certificate
                  </button>
                </form>
              </div>

              {/* List Certificates */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-wider font-mono text-slate-400">Current Certificates</h4>
                {certificates.length === 0 ? (
                  <div className="text-center py-6 font-mono text-slate-500 text-xs">No certificates uploaded.</div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {certificates.map((c) => (
                      <div key={c._id} className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center gap-4 justify-between">
                        <div className="flex items-center gap-3">
                          <img src={c.image} alt={c.title} className="w-12 h-12 object-cover rounded-lg bg-slate-900 flex-shrink-0" />
                          <div>
                            <h5 className="font-bold text-sm text-white line-clamp-1">{c.title}</h5>
                            <span className="text-[10px] text-portfolio-success font-mono">{c.issuer}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDeleteCert(c._id)}
                          className="p-2 rounded-lg border border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          )}

          {/* TAB 4: TESTIMONIALS */}
          {activeTab === 'testimonials' && (
            <div className="space-y-8">
              
              {/* Add Testimonial Form */}
              <div className="space-y-4 border-b border-white/5 pb-8">
                <div>
                  <h3 className="text-lg font-bold">Add Testimonial</h3>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">Insert client testimonials for slider animation</p>
                </div>

                <form onSubmit={handleCreateTestimonial} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold tracking-wider font-mono text-slate-400 uppercase mb-1">Client Name</label>
                    <input
                      type="text"
                      value={testiForm.name}
                      onChange={(e) => setTestiForm({ ...testiForm, name: e.target.value })}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-white/5 bg-white/5 text-white focus:outline-none focus:ring-1 focus:ring-portfolio-accent"
                      placeholder="Jane Miller"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold tracking-wider font-mono text-slate-400 uppercase mb-1">Position / Company</label>
                    <input
                      type="text"
                      value={testiForm.position}
                      onChange={(e) => setTestiForm({ ...testiForm, position: e.target.value })}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-white/5 bg-white/5 text-white focus:outline-none focus:ring-1 focus:ring-portfolio-accent"
                      placeholder="CTO, TechCorp"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold tracking-wider font-mono text-slate-400 uppercase mb-1">Avatar Image URL</label>
                    <input
                      type="url"
                      value={testiForm.image}
                      onChange={(e) => setTestiForm({ ...testiForm, image: e.target.value })}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-white/5 bg-white/5 text-white focus:outline-none focus:ring-1 focus:ring-portfolio-accent"
                      placeholder="https://images.unsplash.com/..."
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold tracking-wider font-mono text-slate-400 uppercase mb-1">Rating (1 to 5)</label>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      value={testiForm.rating}
                      onChange={(e) => setTestiForm({ ...testiForm, rating: parseInt(e.target.value) || 5 })}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-white/5 bg-white/5 text-white focus:outline-none focus:ring-1 focus:ring-portfolio-accent"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-bold tracking-wider font-mono text-slate-400 uppercase mb-1">Review Content</label>
                    <textarea
                      value={testiForm.review}
                      onChange={(e) => setTestiForm({ ...testiForm, review: e.target.value })}
                      rows="3"
                      className="w-full px-3 py-2 text-sm rounded-lg border border-white/5 bg-white/5 text-white focus:outline-none focus:ring-1 focus:ring-portfolio-accent resize-none"
                      placeholder="What was it like collaborating together..."
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="md:col-span-2 flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-portfolio-primary hover:bg-portfolio-primary/95 text-white text-sm font-semibold transition-all disabled:opacity-50"
                  >
                    <Plus size={16} /> Publish Testimonial
                  </button>
                </form>
              </div>

              {/* List Testimonials */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-wider font-mono text-slate-400">Current Reviews</h4>
                {testimonials.length === 0 ? (
                  <div className="text-center py-6 font-mono text-slate-500 text-xs">No reviews uploaded.</div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {testimonials.map((t) => (
                      <div key={t._id} className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center gap-4 justify-between">
                        <div className="flex items-center gap-3">
                          <img
                            src={t.image || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120&q=80'}
                            alt={t.name}
                            className="w-10 h-10 object-cover rounded-full bg-slate-900 flex-shrink-0"
                          />
                          <div>
                            <h5 className="font-bold text-sm text-white line-clamp-1">{t.name}</h5>
                            <span className="text-[10px] text-slate-400 line-clamp-1 font-mono">{t.position}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDeleteTestimonial(t._id)}
                          className="p-2 rounded-lg border border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
