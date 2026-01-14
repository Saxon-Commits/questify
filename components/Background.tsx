import React from 'react';

export const Background: React.FC = () => {
  return (
    <div 
      className="fixed inset-0 z-0 opacity-20 pointer-events-none" 
      style={{
        backgroundImage: 'radial-gradient(#334155 1px, transparent 1px)',
        backgroundSize: '30px 30px'
      }}
      aria-hidden="true"
    />
  );
};