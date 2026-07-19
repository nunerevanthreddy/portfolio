import React from 'react';
import { Home, Compass, AlertTriangle } from 'lucide-react';

const NotFound = () => {
  const handleHomeClick = () => {
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white px-4 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute w-[300px] h-[300px] bg-portfolio-primary/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute w-[300px] h-[300px] bg-portfolio-secondary/10 rounded-full blur-[80px] pointer-events-none top-1/4" />

      {/* Main content frame */}
      <div className="text-center relative z-10 flex flex-col items-center max-w-md">
        <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-portfolio-accent mb-6 animate-bounce">
          <AlertTriangle size={48} />
        </div>
        
        <h1 className="text-8xl font-black font-mono tracking-widest bg-gradient-to-r from-portfolio-primary via-portfolio-accent to-portfolio-secondary bg-clip-text text-transparent">
          404
        </h1>
        
        <h2 className="mt-4 text-xl font-bold tracking-wider font-mono">
          PAGE NOT FOUND
        </h2>
        
        <p className="mt-2 text-sm text-slate-400 font-mono">
          The path you are looking for has been moved or does not exist.
        </p>

        {/* Back Home CTA */}
        <button
          onClick={handleHomeClick}
          className="mt-8 flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white bg-portfolio-primary hover:bg-portfolio-primary/95 shadow-[0_4px_15px_rgba(37,99,235,0.4)] transition-all text-sm"
        >
          <Home size={16} /> Return to Website
        </button>
      </div>
    </div>
  );
};

export default NotFound;
