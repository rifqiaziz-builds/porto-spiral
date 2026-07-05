'use client';

export default function GradientBackground() {
  return (
    <div
      className="absolute inset-0 z-0 animate-gradient"
      style={{
        background:
          'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)',
        backgroundSize: '200% 200%',
      }}
    />
  );
}
