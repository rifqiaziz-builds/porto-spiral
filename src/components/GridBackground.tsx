'use client';

export default function GridBackground() {
  return (
    <>
      <div className="grid-bg fixed inset-0 z-0" />
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(80, 60, 180, 0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(255, 100, 100, 0.05) 0%, transparent 40%), radial-gradient(ellipse at 20% 80%, rgba(100, 200, 255, 0.05) 0%, transparent 40%)',
        }}
      />
    </>
  );
}
