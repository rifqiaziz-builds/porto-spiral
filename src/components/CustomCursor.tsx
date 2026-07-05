'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [label, setLabel] = useState('');
  const [isHovering, setIsHovering] = useState(false);
  const pos = useRef({ x: 0, y: 0 });

  const springX = useSpring(0, { damping: 20, stiffness: 200 });
  const springY = useSpring(0, { damping: 20, stiffness: 200 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      springX.set(e.clientX);
      springY.set(e.clientY);
    };

    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const cursorLabel = t.getAttribute('data-cursor');
      if (cursorLabel) {
        setLabel(cursorLabel);
        setIsHovering(true);
      } else if (t.closest('[data-cursor]')) {
        const el = t.closest('[data-cursor]') as HTMLElement;
        setLabel(el.getAttribute('data-cursor') || '');
        setIsHovering(true);
      } else {
        setIsHovering(false);
        setLabel('');
      }
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
    };
  }, [springX, springY]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] w-3 h-3 bg-white rounded-full mix-blend-difference"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovering ? 2.5 : 1,
          opacity: isHovering ? 0.6 : 1,
        }}
        transition={{ duration: 0.2 }}
      />
      {isHovering && label && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9999] whitespace-nowrap"
          style={{
            x: springX,
            y: springY,
            translateX: '12px',
            translateY: '-50%',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <span className="text-xs text-white/70 font-mono tracking-widest uppercase">
            {label}
          </span>
        </motion.div>
      )}
    </>
  );
}
