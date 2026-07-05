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
        <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-black/80 backdrop-blur-md border border-white/10">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-black">
            <img
              src={hoveredProject.thumbnailUrl}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-sm text-white/80 font-mono tracking-wider">
            {hoveredProject.title}
          </span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
