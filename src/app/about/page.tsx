'use client';

import Link from 'next/link';

export default function About() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
      <Link
        href="/"
        className="absolute top-8 left-8 text-sm text-white/40 hover:text-white transition-colors font-mono tracking-widest uppercase"
        data-cursor="back"
      >
        ← back
      </Link>
      <div className="max-w-xl text-center">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8">
          About
        </h1>
        <p className="text-lg text-white/60 leading-relaxed">
          A motion &amp; sound designer based in paris, crafting immersive digital
          experiences that blend 3D visuals, generative art, and interactive
          storytelling.
        </p>
      </div>
    </div>
  );
}
