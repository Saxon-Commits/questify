import React from 'react';

export const Navbar: React.FC = () => {
  return (
    <nav className="relative z-10 w-full max-w-6xl mx-auto px-6 py-6 flex justify-between items-center">
      <div className="text-2xl font-bold font-mono text-white tracking-tighter select-none cursor-pointer group">
        <span className="text-sci-500 group-hover:text-sci-400 transition-colors">&gt;</span> QUESTIFY
        <span className="animate-pulse text-sci-500">_</span>
      </div>
      <div className="flex gap-6 font-mono text-sm font-semibold">
        <a 
          href="#features" 
          className="hidden md:block hover:text-white transition-colors duration-200"
        >
          FEATURES
        </a>
        <a 
          href="https://twitter.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-sci-500 hover:text-sci-400 transition-colors duration-200"
        >
          TWITTER
        </a>
      </div>
    </nav>
  );
};