'use client';

import { useState, useEffect } from 'react';

export default function RotatingText() {
  const techs = [
    { label: 'Node.js', fileName: 'node.svg' },
    { label: 'React', fileName: 'react.svg' },
    { label: 'TypeScript', fileName: 'ts.svg' },
    { label: 'Next.js', fileName: 'next.svg' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % techs.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [techs.length]);

  // ==========================================
  // 🛠️ PENGATURAN MANDIRI (SETTING DI SINI)
  // ==========================================
  const BOX_CONFIG = {
    width: 260,          // Lebar kotak tengah (px)
    height: 150,         // Tinggi kotak tengah (px)
    borderRadius: 20,    // Lengkungan sudut kotak
    textFontSize: 20,    // Ukuran huruf teks yang berputar
    textLetterSpacing: 4,// 🔄 JARAK ANTAR HURUF: Naikkan jika dempet, turunkan jika terlalu renggang
    loopCount: 4,        // 🔄 JUMLAH PENGULANGAN KALIMAT: Berapa kali kalimat dasar diulang melingkar
    animationDuration: 15,// Kecepatan putaran teks (detik)

    // 🔄 PENGATURAN POSISI POJOK (TERSEMBUNYI)
    // Gunakan nilai minus (-) untuk menggeser kotak agar sebagian keluar dari layar
    positionLeft: -60,   // Makin minus = makin geser ke kiri luar layar
    positionBottom: -40, // Makin minus = makin geser ke bawah luar layar
  };

  // Kalimat dasar yang ingin di-loop
  const baseText = "my stack • 2026 • ";

  // Membuat deretan teks melingkar murni berdasarkan jumlah loopCount
  const fullText = baseText.repeat(BOX_CONFIG.loopCount);
  const textArray = fullText.split('');
  const totalLetters = textArray.length;

  const pad = 12; // Jarak offset teks di luar kotak
  const W_Path = BOX_CONFIG.width + pad * 2;
  const H_Path = BOX_CONFIG.height + pad * 2;
  const R_Path = BOX_CONFIG.borderRadius + pad;

  // Rumus SVG Path Dinamis pembungkus kotak
  const dynamicPath = `M ${R_Path} 0 H ${W_Path - R_Path} C ${W_Path - R_Path} 0, ${W_Path} 0, ${W_Path} ${R_Path} V ${H_Path - R_Path} C ${W_Path} ${H_Path - R_Path}, ${W_Path} ${H_Path}, ${W_Path - R_Path} ${H_Path} H ${R_Path} C ${R_Path} ${H_Path}, 0 ${H_Path}, 0 ${H_Path - R_Path} V ${R_Path} C 0 ${R_Path}, 0 0, ${R_Path} 0 Z`;

  // 🧠 RUMUS MAUT ANTI-DEMPET: Membagi rata 100% keliling lingkaran berdasarkan total huruf yang ada
  const staggerDelay = (100 / totalLetters) * (BOX_CONFIG.animationDuration / 100);

  return (
    <>
      {/* STYLING DINAMIS */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .marquee-wrapper {
          position: relative;
          width: ${BOX_CONFIG.width}px;
          height: ${BOX_CONFIG.height}px;
          transform: rotate(-13deg);
          transform-origin: center;
          transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .marquee-wrapper:hover {
          transform: rotate(-10deg) scale(1.03) translate(10px, -10px); /* Sedikit pop-out saat di-hover */
        }
        .marquee-container {
          position: absolute;
          inset: -${pad}px;
          pointer-events: none;
          width: ${W_Path}px;
          height: ${H_Path}px;
        }
.marquee-text-letter {
  position: absolute;
  font-family: monospace;
  font-size: ${BOX_CONFIG.textFontSize}px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.3);
  letter-spacing: ${BOX_CONFIG.textLetterSpacing}px;
  
  offset-path: path("${dynamicPath}");
  /* 🔄 UBAH BARIS INI JIKA TERBALIK KANAN-KIRI: */
  offset-rotate: auto; 
  
  animation: moveAlongLetter ${BOX_CONFIG.animationDuration}s linear infinite;
}
        @keyframes moveAlongLetter {
          0% { offset-distance: 0%; }
          100% { offset-distance: 100%; }
        }
      `}} />

      {/* CONTAINER UTAMA DENGAN POSISI YANG BISA DIATUR */}
      <div
        className="fixed z-40 select-none transition-all duration-500"
        style={{
          left: `${BOX_CONFIG.positionLeft}px`,
          bottom: `${BOX_CONFIG.positionBottom}px`
        }}
      >
        <div className="marquee-wrapper">

          {/* BOX KOTAK TENGAH */}
          <div
            className="w-full h-full bg-white/[0.03] border border-white/[0.08] shadow-2xl backdrop-blur-sm flex items-center justify-center overflow-hidden"
            style={{ borderRadius: `${BOX_CONFIG.borderRadius}px` }}
          >
            {/* ICON TENGAH */}
            <div className="relative w-16 h-16 flex items-center justify-center">
              {techs.map((tech, idx) => {
                const isActive = idx === currentIndex;
                return (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={tech.label}
                    src={`/icontech/${tech.fileName}`}
                    alt={tech.label}
                    className="absolute w-full h-full object-contain transition-all duration-700 ease-in-out"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? 'scale(1) rotate(0deg)' : 'scale(0.7) rotate(-15deg)',
                    }}
                  />
                );
              })}
            </div>
          </div>

          {/* LAYER TEKS AKURAT */}
          {/* LAYER TEKS AKURAT */}
          <div className="marquee-container">
            {/* ➕ TAMBAHKAN .reverse() setelah split('') atau sebelum .map() */}
            {textArray.reverse().map((char, index) => {
              const delay = (index * staggerDelay).toFixed(3);

              return (
                <span
                  key={index}
                  className="marquee-text-letter"
                  style={{ animationDelay: `${delay}s` }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              );
            })}
          </div>

        </div>
      </div>
    </>
  );
}