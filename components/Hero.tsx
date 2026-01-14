import React, { useState, useMemo } from 'react';
import { useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

const AVATARS = [
  '/avatars/a_seraph_wings.png',
  '/avatars/avatar_master_blacksmith.png',
  '/avatars/avatar_master_bounty_hunter.png',
  '/avatars/avatar_scribe_master.png',
  '/avatars/geisha_android.png',
  '/avatars/grand_wizard_a_void_cloak.png',
  '/avatars/hero_cyber_knight.png',
  '/avatars/seraph_knight_alternate.png',
  '/avatars/seraph_knight.png',
  '/avatars/starter_elf_female.png',
  '/avatars/starter_elf_male.png',
  '/avatars/starter_villager_male.png',
  '/avatars/toxic_alchemist.png',
  '/avatars/warlord.png',
  '/avatars/xv_android_alternate.png',
  '/avatars/xv_android.png',
  '/avatars/xv_android.png',
];

const SCREENSHOTS = [
  '/screenshots/bounty_board.png',
  '/screenshots/grindstone_timer.png',
  '/screenshots/guild_overview.png',
  '/screenshots/project_view.png',
  '/screenshots/skill_tree.png',
];

interface HeroProps {
  showGallery: boolean;
  setShowGallery: (show: boolean) => void;
}

export const Hero: React.FC<HeroProps> = ({ showGallery, setShowGallery }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [currentScreenshot, setCurrentScreenshot] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const joinWaitlist = useMutation(api.waitlist.join);
  const waitlistCount = useQuery(api.waitlist.getCount) ?? 0;

  const nextScreenshot = () => {
    setCurrentScreenshot((prev) => (prev + 1) % SCREENSHOTS.length);
  };

  const prevScreenshot = () => {
    setCurrentScreenshot((prev) => (prev - 1 + SCREENSHOTS.length) % SCREENSHOTS.length);
  };


  // Randomize avatars once on mount to ensure both loop containers match
  const shuffledAvatars = useMemo(() => {
    return [...AVATARS].sort(() => Math.random() - 0.5);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');

    try {
      await joinWaitlist({ email });
      setStatus('success');
      setEmail('');
    } catch (error) {
      console.error('Error joining waitlist:', error);
      setStatus('idle');
      alert('Failed to join waitlist. Please try again.');
    }
  };

  return (
    <>
      <section className="relative z-10 pt-20 text-center perspective-[1000px]">
        <div className="max-w-4xl mx-auto px-6 pb-40 grid grid-cols-1 grid-rows-1 items-center">

          {/* --- MAIN CONTENT SLIDE --- */}
          {/* --- MAIN CONTENT LAYERS --- */}

          {/* --- MAIN CONTENT LAYERS --- */}

          {/* Layer 1b: Beta Badge (Fades Out - Navbar Badge Takes Over) */}
          <div
            className={`col-start-1 row-start-1 h-full flex flex-col items-center justify-start pt-0 transition-opacity duration-500 ease-in-out ${showGallery ? 'opacity-0' : 'opacity-100'
              }`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sci-800 border border-slate-700 text-xs font-mono mb-6 text-sci-400 shadow-lg shadow-sci-900/50">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              BETA ACCESS OPENING SOON
            </div>
          </div>

          {/* Layer 1c: REMOVED (Navbar Join Waitlist Button Takes Over) */}

          {/* Combined Content Container (Preserves Flow) */}
          <div className="col-start-1 row-start-1 h-full flex flex-col items-center justify-center pt-8">

            {/* Title Wrapper (Moves up above gallery when open) */}
            <div
              style={{
                transition: 'all 0.7s ease-in-out',
                transform: showGallery ? 'translateY(-220px) scale(0.55)' : 'translateY(0) scale(1)',
                opacity: 1,
                zIndex: 10
              }}
            >
              <div className="relative inline-block mb-6">
                <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight tracking-tight">
                  Level Up Your Life.<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-sci-500 to-sci-purple animate-pulse-slow">
                    Not Just Your Stats.
                  </span>
                </h1>

                {/* See Gallery Arrow */}
                <button
                  onClick={() => setShowGallery(true)}
                  className={`absolute -right-24 top-1/2 -translate-y-1/2 group flex items-center gap-2 text-sm font-mono text-sci-400 hover:text-sci-300 transition-all duration-300 hidden md:flex ${showGallery ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                  style={{ pointerEvents: showGallery ? 'none' : 'auto' }}
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    See Gallery &rarr;
                  </span>
                </button>
                {/* Mobile Gallery Button */}
                <button
                  onClick={() => setShowGallery(true)}
                  className={`md:hidden mt-4 mx-auto flex items-center gap-2 text-sm font-mono text-sci-400 hover:text-sci-300 transition-all duration-300 ${showGallery ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                  style={{ pointerEvents: showGallery ? 'none' : 'auto' }}
                >
                  See Gallery &rarr;
                </button>
              </div>
            </div>

            {/* Subtitle Wrapper (Fades Out) */}
            <div
              className={`transition-all duration-500 ease-in-out transform ${showGallery ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 scale-100'
                }`}
            >
              <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                A productivity app that combines high-tech Sci-Fi UI with Dark Fantasy RPG mechanics.
                Unlock <strong className="text-slate-200">real app features</strong> by leveling up your skill tree.
              </p>
            </div>

            {/* Form Wrapper (Slides DOWN) */}
            <div
              className={`w-full transition-all duration-700 ease-in-out transform ${showGallery ? 'translate-y-[600px] opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
                }`}
            >
              <div className="max-w-md mx-auto">
                {status === 'success' ? (
                  <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 font-mono text-sm animate-fade-in">
                    &gt; Access request logged. Stand by for mission updates.
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3">
                    <input
                      type="email"
                      placeholder="Enter your email protocol..."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={status === 'loading'}
                      className="flex-1 px-4 py-3 bg-sci-800 border border-slate-700 rounded-lg focus:outline-none focus:border-sci-500 focus:ring-1 focus:ring-sci-500 text-white font-mono placeholder-slate-500 transition-all disabled:opacity-50"
                      required
                    />

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="px-6 py-3 bg-sci-500 hover:bg-sci-400 text-sci-900 font-bold rounded-lg shadow-[0_0_15px_rgba(6,182,212,0.5)] hover:shadow-[0_0_25px_rgba(6,182,212,0.7)] transition-all transform hover:-translate-y-1 disabled:opacity-75 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center min-w-[140px]"
                    >
                      {status === 'loading' ? (
                        <span className="inline-block w-5 h-5 border-2 border-sci-900 border-t-transparent rounded-full animate-spin"></span>
                      ) : (
                        'Join Waitlist'
                      )}
                    </button>
                  </form>
                )}
              </div>

              <p className="text-xs text-slate-500 mt-6 font-mono">
                {waitlistCount === 0 ? (
                  <>Be the <span className="text-slate-300">#1 Founder</span> waiting for the drop.</>
                ) : (
                  <>Join <span className="text-slate-300">{waitlistCount.toLocaleString()}</span> other Founders waiting for the drop.</>
                )}
              </p>
            </div>

          </div>

          {/* --- GALLERY SLIDE --- */}
          <div
            className={`col-start-1 row-start-1 w-full transition-all duration-700 ease-in-out transform ${showGallery ? 'translate-x-0 opacity-100 rotate-y-0' : 'translate-x-[120%] opacity-0 pointer-events-none rotate-y-[-12deg]'
              }`}
          >
            <div className="relative bg-sci-900 rounded-xl overflow-hidden border border-slate-700 shadow-[0_0_50px_rgba(0,0,0,0.5)] max-w-4xl mx-auto">
              {/* Control Buttons */}
              <div className="absolute top-4 right-4 z-20 flex gap-2">
                {/* Fullscreen Toggle */}
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="bg-black/50 hover:bg-black/80 text-white p-2 rounded-full transition-colors backdrop-blur-sm"
                  title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
                >
                  {isFullscreen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3v3a2 2 0 0 1-2 2H3" /><path d="M21 8h-3a2 2 0 0 1-2-2V3" /><path d="M3 16h3a2 2 0 0 1 2 2v3" /><path d="M16 21v-3a2 2 0 0 1 2-2h3" /></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7V5a2 2 0 0 1 2-2h2" /><path d="M17 3h2a2 2 0 0 1 2 2v2" /><path d="M21 17v2a2 2 0 0 1-2 2h-2" /><path d="M7 21H5a2 2 0 0 1-2-2v-2" /></svg>
                  )}
                </button>
                {/* Close Button */}
                <button
                  onClick={() => { setShowGallery(false); setIsFullscreen(false); }}
                  className="bg-black/50 hover:bg-black/80 text-white p-2 rounded-full transition-colors backdrop-blur-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                </button>
              </div>

              {/* Main Image */}
              <div className="relative group h-full flex items-center justify-center">
                <img
                  src={SCREENSHOTS[currentScreenshot]}
                  alt="App Screenshot"
                  className={`transition-all duration-500 ${isFullscreen ? 'w-full h-full object-contain' : 'w-full h-auto max-h-[60vh] object-contain'}`}
                />

                {/* Navigation Arrows (Hover Only) */}
                <button onClick={prevScreenshot} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/40 hover:bg-black/70 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                  &larr;
                </button>
                <button onClick={nextScreenshot} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/40 hover:bg-black/70 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                  &rarr;
                </button>

                {/* Dots Indicator */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {SCREENSHOTS.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentScreenshot(idx)}
                      className={`w-2 h-2 rounded-full transition-all ${currentScreenshot === idx ? 'bg-sci-400 w-4' : 'bg-white/30 hover:bg-white/50'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-sm font-mono text-sci-400 mt-4 animate-pulse">
              &lt; SYSTEM PREVIEW // {currentScreenshot + 1} OF {SCREENSHOTS.length} &gt;
            </p>
            <p className="text-xs text-slate-500 mt-2">
              Click side arrows to navigate data streams.
            </p>
          </div>

        </div>

        {/* Avatar Carousel */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden select-none z-20 [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
          <div className="flex w-max animate-scroll">
            {/* Container 1 */}
            <div className="flex gap-8 shrink-0 pr-8">
              {[...shuffledAvatars, ...shuffledAvatars].map((avatar, i) => (
                <div key={`c1-${i}`} className="relative group">
                  <img
                    src={avatar}
                    alt="Character Avatar"
                    className="h-24 w-auto rendering-pixelated hover:scale-110 transition-transform duration-300 filter drop-shadow-[0_0_8px_rgba(6,182,212,0.3)]"
                    style={{ imageRendering: 'pixelated' }}
                  />
                </div>
              ))}
            </div>
            {/* Container 2 (Identical Duplicate) */}
            <div className="flex gap-8 shrink-0 pr-8">
              {[...shuffledAvatars, ...shuffledAvatars].map((avatar, i) => (
                <div key={`c2-${i}`} className="relative group">
                  <img
                    src={avatar}
                    alt="Character Avatar"
                    className="h-24 w-auto rendering-pixelated hover:scale-110 transition-transform duration-300 filter drop-shadow-[0_0_8px_rgba(6,182,212,0.3)]"
                    style={{ imageRendering: 'pixelated' }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Fullscreen Gallery Overlay - Rendered outside nested structure */}
      {
        isFullscreen && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 99999,
              backgroundColor: 'rgba(15, 23, 42, 0.95)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px'
            }}
          >
            <div style={{ position: 'relative', maxWidth: '95vw', maxHeight: '95vh' }}>
              {/* Close/Exit Fullscreen Button */}
              <button
                onClick={() => setIsFullscreen(false)}
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  zIndex: 10,
                  background: 'rgba(0,0,0,0.6)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  padding: '10px',
                  cursor: 'pointer'
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
              </button>

              {/* Navigation Arrows */}
              <button
                onClick={prevScreenshot}
                style={{
                  position: 'absolute',
                  left: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(0,0,0,0.6)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  padding: '15px',
                  cursor: 'pointer',
                  fontSize: '20px'
                }}
              >
                ←
              </button>
              <button
                onClick={nextScreenshot}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(0,0,0,0.6)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  padding: '15px',
                  cursor: 'pointer',
                  fontSize: '20px'
                }}
              >
                →
              </button>

              {/* Fullscreen Image */}
              <img
                src={SCREENSHOTS[currentScreenshot]}
                alt="App Screenshot"
                style={{
                  maxWidth: '100%',
                  maxHeight: '90vh',
                  objectFit: 'contain',
                  borderRadius: '12px',
                  boxShadow: '0 0 50px rgba(0,0,0,0.5)'
                }}
              />

              {/* Dots Indicator */}
              <div style={{
                position: 'absolute',
                bottom: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: '8px'
              }}>
                {SCREENSHOTS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentScreenshot(idx)}
                    style={{
                      width: currentScreenshot === idx ? '16px' : '8px',
                      height: '8px',
                      borderRadius: '4px',
                      backgroundColor: currentScreenshot === idx ? '#22d3ee' : 'rgba(255,255,255,0.3)',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        )
      }
    </>
  );
};