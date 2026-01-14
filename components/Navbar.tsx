import React from 'react';

interface NavbarProps {
  showGallery: boolean;
  setShowGallery: (show: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ showGallery, setShowGallery }) => {
  return (
    <nav className="relative z-[60] w-full max-w-6xl mx-auto px-6 py-6 flex justify-between items-center">
      <div className="text-2xl font-bold font-mono text-white tracking-tighter select-none cursor-pointer group">
        <span className="text-sci-500 group-hover:text-sci-400 transition-colors">&gt;</span> QUESTIFY
        <span className="animate-pulse text-sci-500">_</span>
      </div>
      {/* Right side container with relative positioning for absolute children */}
      <div className="relative flex items-center gap-6 font-mono text-sm font-semibold">

        {/* Standard Links - always in same position */}
        <div className={`flex gap-6 transition-opacity duration-300 ${showGallery ? 'opacity-50' : 'opacity-100'}`}>
          <a
            href="#features"
            className="hidden md:block hover:text-white transition-colors duration-200"
          >
            FEATURES
          </a>
          <a
            href="https://www.instagram.com/saxondevelopment?igsh=MW83emRxbGxvc3ZiZg=="
            target="_blank"
            rel="noopener noreferrer"
            className="text-sci-500 hover:text-sci-400 transition-colors duration-200"
          >
            INSTAGRAM
          </a>
        </div>

        {/* Gallery Mode Controls - absolutely positioned to the right, doesn't affect link layout */}
        <div
          style={{
            position: 'absolute',
            right: '-330px',
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            opacity: showGallery ? 1 : 0,
            pointerEvents: showGallery ? 'auto' : 'none',
            transition: 'opacity 0.3s ease'
          }}
        >
          <div className="hidden md:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sci-800 border border-slate-700 text-xs text-sci-400 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
            BETA OPENS SOON
          </div>
          <button
            onClick={() => setShowGallery(false)}
            className="px-4 py-2 bg-sci-500 hover:bg-sci-400 text-sci-900 font-bold rounded-lg shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-all transform hover:-translate-y-0.5 whitespace-nowrap"
          >
            Join Waitlist
          </button>
        </div>

      </div>
    </nav>
  );
};