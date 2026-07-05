'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';

export default function SpiralHoverUI() {
  const { hoveredProject, currentView } = useAppStore();

  if (currentView !== 'spiral' || !hoveredProject) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex items-center gap-4 px-6 py-3 rounded-full bg-black/80 backdrop-blur-md border border-white/10">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-black">
            <img
              src={hoveredProject.thumbnailUrl}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-base text-white/90 font-mono tracking-wider">
            {hoveredProject.title}
          </span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
