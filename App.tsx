import React, { useState } from 'react';
import { Background } from './components/Background';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  const [showGallery, setShowGallery] = useState(false);

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background Effects */}
      <Background />

      {/* Scanline Overlay (Optional aesthetic choice based on HTML comments) */}
      <div className="scanline" aria-hidden="true" />

      {/* Main Content */}
      <Navbar showGallery={showGallery} setShowGallery={setShowGallery} />

      <main className="flex-grow">
        <Hero showGallery={showGallery} setShowGallery={setShowGallery} />
        <Features />
      </main>

      <Footer />
    </div>
  );
};

export default App;