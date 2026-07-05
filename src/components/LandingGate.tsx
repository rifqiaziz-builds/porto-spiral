'use client';

import { motion } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';

export default function LandingGate() {
  const { setHasEntered, toggleAudio, setView } = useAppStore();

  const enterWithSound = () => {
    toggleAudio();
    setView('spiral');
    setHasEntered(true);
  };

  const enterWithoutSound = () => {
    setView('spiral');
    setHasEntered(true);
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-4">
        PORTO
      </h1>
      <p className="text-sm text-white/40 mb-12 font-mono tracking-widest uppercase">
        interactive portfolio
      </p>
      <div className="flex flex-col items-center gap-4">
        <button
          onClick={enterWithSound}
          data-cursor="enter →"
          className="text-sm text-white/60 hover:text-white transition-colors font-mono tracking-[0.2em] uppercase"
        >
          enter with sound
        </button>
        <button
          onClick={enterWithoutSound}
          data-cursor="enter →"
          className="text-sm text-white/30 hover:text-white/60 transition-colors font-mono tracking-[0.2em] uppercase"
        >
          enter without sound
        </button>
      </div>
    </motion.div>
  );
}
