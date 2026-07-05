'use client';

import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { projects } from '@/data/projects';

export default function ListView() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { currentView } = useAppStore();

  if (currentView !== 'list') return null;

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 z-20 flex items-start justify-center overflow-y-auto"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
    >
      <div className="flex flex-col items-center gap-4 md:gap-6 py-20">
        {projects.map((project) => (
          <ListProjectItem
            key={project.id}
            project={project}
            onHover={setHoveredProject}
            isHovered={hoveredProject === project.id}
          />
        ))}
      </div>

      <AnimatePresence>
        {hoveredProject !== null && (
          <motion.div
            className="fixed pointer-events-none z-30 w-64 h-44 overflow-hidden rounded-lg"
            style={{
              left: mousePos.x + 30,
              top: mousePos.y - 88,
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <img
              src={projects.find((p) => p.id === hoveredProject)?.thumbnailUrl || ''}
              alt=""
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ListProjectItem({
  project,
  onHover,
  isHovered,
}: {
  project: (typeof projects)[0];
  onHover: (id: number | null) => void;
  isHovered: boolean;
}) {
  const { setActiveProject, setView } = useAppStore();

  const handleClick = () => {
    setActiveProject(project);
    setView('detail');
  };

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => onHover(project.id)}
      onMouseLeave={() => onHover(null)}
      data-cursor="view"
      className="group relative"
    >
      <span
        className={`text-4xl md:text-7xl font-bold tracking-tighter transition-all duration-300 ${
          isHovered
            ? 'text-white scale-105'
            : 'text-white/20'
        }`}
      >
        {project.title}
      </span>
    </button>
  );
}
