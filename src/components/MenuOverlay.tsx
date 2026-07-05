'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useAppStore } from '@/store/useAppStore';

export default function MenuOverlay() {
  const { menuOpen, setMenuOpen } = useAppStore();

  const close = () => setMenuOpen(false);

  return (
    <AnimatePresence>
      {menuOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white"
          initial={{ clipPath: 'circle(0% at 100% 0%)' }}
          animate={{ clipPath: 'circle(150% at 100% 0%)' }}
          exit={{ clipPath: 'circle(0% at 100% 0%)' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <button
            onClick={close}
            className="absolute top-8 right-8 text-black/40 hover:text-black transition-colors text-sm font-mono tracking-widest uppercase"
            data-cursor="close"
          >
            close
          </button>

          <nav className="flex flex-col items-center gap-8" onClick={close}>
            <Link
              href="/"
              className="text-6xl md:text-8xl font-bold text-black/10 hover:text-black transition-colors tracking-tighter"
              data-cursor="works"
            >
              Works
            </Link>
            <Link
              href="/about"
              className="text-6xl md:text-8xl font-bold text-black/10 hover:text-black transition-colors tracking-tighter"
              data-cursor="about"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-6xl md:text-8xl font-bold text-black/10 hover:text-black transition-colors tracking-tighter"
              data-cursor="contact"
            >
              Contact
            </Link>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
