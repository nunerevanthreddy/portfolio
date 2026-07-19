import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { Shield, KeyRound, User, ChevronLeft, AlertTriangle } from 'lucide-react';

const Login = () => {
  const { login, isAuthenticated } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    // If already logged in, redirect to admin dashboard
    if (isAuthenticated) {
      window.history.pushState({}, '', '/admin');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  }, [isAuthenticated]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoggingIn(true);
    const result = await login(username, password);
    setIsLoggingIn(false);

    if (result.success) {
      window.history.pushState({}, '', '/admin');
      window.dispatchEvent(new PopStateEvent('popstate'));
    } else {
      setError(result.message || 'Invalid credentials');
    }
  };

  const handleBackToHome = () => {
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-slate-900 overflow-hidden px-4 sm:px-6">
      {/* Background visual glows */}
      <div className="absolute w-[400px] h-[400px] bg-portfolio-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute w-[400px] h-[400px] bg-portfolio-secondary/15 rounded-full blur-[120px] pointer-events-none bottom-10" />

      {/* Back to Site trigger */}
      <button
        onClick={handleBackToHome}
        className="absolute top-6 left-6 flex items-center gap-1.5 text-xs font-semibold font-mono text-slate-400 hover:text-white transition-colors"
      >
        <ChevronLeft size={16} /> Back to Website
      </button>

      {/* Login Card */}
      <div className="w-full max-w-md p-8 sm:p-10 rounded-3xl border border-white/5 bg-white/5 shadow-2xl backdrop-blur-xl relative z-10 text-white">
        <div className="flex flex-col items-center mb-8">
          <div className="p-3.5 rounded-2xl bg-portfolio-primary/10 text-portfolio-accent mb-4 border border-portfolio-accent/20">
            <Shield size={32} />
          </div>
          <h2 className="text-xl font-bold tracking-widest font-mono text-center">
            ADMIN GATEWAY
          </h2>
          <p className="text-xs text-slate-400 font-mono mt-1">Authorized access only</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="flex gap-2 items-center p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold">
              <AlertTriangle size={14} className="flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Username */}
          <div>
            <label className="block text-[10px] font-bold tracking-wider font-mono text-slate-400 uppercase mb-2">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-white/5 bg-white/5 text-white focus:outline-none focus:ring-1 focus:ring-portfolio-accent transition-all"
                placeholder="Enter admin username"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-[10px] font-bold tracking-wider font-mono text-slate-400 uppercase mb-2">
              Password
            </label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-white/5 bg-white/5 text-white focus:outline-none focus:ring-1 focus:ring-portfolio-accent transition-all"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoggingIn}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-portfolio-primary hover:bg-portfolio-primary/95 text-white font-semibold shadow-lg shadow-portfolio-primary/20 transition-all disabled:opacity-50 text-sm mt-8"
          >
            {isLoggingIn ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              'Authenticate'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
