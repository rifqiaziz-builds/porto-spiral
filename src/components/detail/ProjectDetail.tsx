'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import GradientBackground from './GradientBackground';

export default function ProjectDetail() {
  const { activeProject, currentView, setActiveProject, setView, previousView } =
    useAppStore();
  const [hasPlayed, setHasPlayed] = useState(false);

  if (currentView !== 'detail' || !activeProject) return null;

  const handleClose = () => {
    setActiveProject(null);
    setView(previousView);
  };

  const handlePlay = () => {
    setHasPlayed(true);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-30 flex flex-col bg-black"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <GradientBackground />

        {!hasPlayed ? (
          <div
            className="relative z-10 flex flex-col items-center justify-center flex-1 cursor-pointer"
            onClick={handlePlay}
            data-cursor="play!"
          >
            <span className="text-8xl font-bold text-white mix-blend-overlay opacity-40">
              ▶
            </span>
            <span className="mt-4 text-sm text-white/60 font-mono tracking-[0.3em] uppercase mix-blend-overlay">
              play!
            </span>
          </div>
        ) : (
          <div className="relative z-10 flex-1 overflow-y-auto">
            <div className="max-w-3xl mx-auto px-6 py-24">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-6">
                {activeProject.title}
              </h1>
              <p className="text-lg text-white/70 mb-12 leading-relaxed">
                {activeProject.description}
              </p>
              <div className="flex flex-col gap-8">
                {activeProject.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`${activeProject.title} ${i + 1}`}
                    className="w-full rounded-lg"
                    data-cursor="zoom"
                  />
                ))}
              </div>
            </div>
          </div>
        )}

      </motion.div>
    </AnimatePresence>
  );
}
