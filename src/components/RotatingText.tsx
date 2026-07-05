'use client';

export default function RotatingText() {
  return (
    <div className="fixed bottom-8 left-8 z-40 w-24 h-24">
      <svg viewBox="0 0 100 100" className="w-full h-full animate-spin-slow">
        <defs>
          <path id="circle-path" d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
        </defs>
        <text className="fill-white/40 text-[8px] tracking-[2px] font-[family-name:var(--font-geist-sans)]">
          <textPath href="#circle-path">
            showreel • 2025 •
          </textPath>
        </text>
      </svg>
    </div>
  );
}
