import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 border-t border-slate-800 py-12 text-center bg-sci-900">
      <p className="text-slate-600 font-mono text-sm">
        Crafted by a Solo Dev • &copy; {new Date().getFullYear()} Questify Protocol
      </p>
    </footer>
  );
};