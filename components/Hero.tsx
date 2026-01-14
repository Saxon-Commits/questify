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
];

export const Hero: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const joinWaitlist = useMutation(api.waitlist.join);
  const waitlistCount = useQuery(api.waitlist.getCount) ?? 0;

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
    <section className="relative z-10 pt-20 text-center">
      <div className="max-w-4xl mx-auto px-6 pb-40">

        {/* Beta Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sci-800 border border-slate-700 text-xs font-mono mb-8 text-sci-400 shadow-lg shadow-sci-900/50">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          BETA ACCESS OPENING SOON
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight">
          Level Up Your Life.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sci-500 to-sci-purple animate-pulse-slow">
            Not Just Your Stats.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          A productivity app that combines high-tech Sci-Fi UI with Dark Fantasy RPG mechanics.
          Unlock <strong className="text-slate-200">real app features</strong> by leveling up your skill tree.
        </p>

        {/* Email Form */}
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
  );
};