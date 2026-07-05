'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';

const socials = [
  {
    label: 'GitHub',
    href: 'https://github.com/rifqiaziz',
    path: 'M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12',
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/rifqiaziz',
    path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z',
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/rifqiaziz',
    path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  },
];

export default function Header() {
  const pathname = usePathname();
  const { currentView, setView, isAudioPlaying } = useAppStore();
  const [logoActive, setLogoActive] = useState(false);
  const isHome = pathname === '/';

  const playSfx = useRef<HTMLAudioElement | null>(null);

  const handleLogoClick = () => {
    setLogoActive((p) => !p);
    if (!isAudioPlaying) return;
    if (!playSfx.current) {
      playSfx.current = new Audio();
      playSfx.current.volume = 0.4;
    }
    playSfx.current.src = '/click.ogg';
    playSfx.current.currentTime = 0;
    playSfx.current.play().catch(() => {});
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 grid grid-cols-3 items-center px-8 py-6">
      <div className="relative flex items-center gap-6">
        <motion.button
          data-cursor="logo"
          onClick={handleLogoClick}
          animate={
            logoActive
              ? { scale: 1.1, rotateX: -10, rotateY: -15, z: 20 }
              : { scale: 1, rotateX: 0, rotateY: 0, z: 0 }
          }
          whileHover={
            !logoActive
              ? { scale: 1.2, rotateX: -8, rotateY: -12, z: 20 }
              : {}
          }
          transition={{ type: 'spring', stiffness: 200, damping: 10 }}
          className="origin-left shrink-0"
          style={{ perspective: 500 }}
        >
          <span
            className={`text-2xl font-bold tracking-tight inline-block ${!logoActive ? 'animate-breathe' : ''}`}
            style={{
              color: '#fff',
              textShadow:
                '0 1px 0 rgba(255,255,255,0.4), 0 2px 0 rgba(255,255,255,0.3), 0 3px 0 rgba(255,255,255,0.2), 0 4px 8px rgba(0,0,0,0.5), 0 6px 12px rgba(0,0,0,0.3)',
            }}
          >
            M. Rifqi Aziz
          </span>
        </motion.button>

        <AnimatePresence>
          {!logoActive && (
            <motion.span
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: [0.4, 1, 0.4], x: [0, 4, 0] }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-white/15 bg-white/5 text-[10px] text-white/60 font-mono tracking-wider uppercase"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/40">
                <path d="M15 18l-6-6 6-6" />
              </svg>
              click
            </motion.span>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {logoActive &&
            socials.map((s, i) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="social"
                initial={{ opacity: 0, x: -40 - i * 10, scale: 0.4 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -40 - i * 10, scale: 0.4 }}
                transition={{ delay: i * 0.07, type: 'spring', stiffness: 350, damping: 14 }}
                className="w-10 h-10 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 flex items-center justify-center transition-colors shrink-0"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white/70 hover:fill-white transition-colors">
                  <path d={s.path} />
                </svg>
              </motion.a>
            ))}
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-center">
        {currentView !== 'detail' && isHome && (
          <div className="flex items-center gap-8">
            <button
              onClick={() => setView('spiral')}
              data-cursor="view"
              className={`text-sm font-mono tracking-widest uppercase transition-colors ${currentView === 'spiral'
                ? 'text-white'
                : 'text-white/30 hover:text-white/60'
                }`}
            >
              spiral
            </button>
            <span className="text-white/20 text-sm">/</span>
            <button
              onClick={() => setView('list')}
              data-cursor="view"
              className={`text-sm font-mono tracking-widest uppercase transition-colors ${currentView === 'list'
                ? 'text-white'
                : 'text-white/30 hover:text-white/60'
                }`}
            >
              list
            </button>
          </div>
        )}
      </div>

      <div className="flex justify-end">
        {currentView !== 'detail' && <MenuButton />}
      </div>
    </header>
  );
}

function MenuButton() {
  const { setMenuOpen } = useAppStore();
  return (
    <button
      onClick={() => setMenuOpen(true)}
      data-cursor="menu"
      className="flex items-center gap-2 px-5 py-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 transition-all text-sm font-mono tracking-widest uppercase text-white/60 hover:text-white"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
      menu
    </button>
  );
}
