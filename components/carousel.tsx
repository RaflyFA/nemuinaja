"use client";

import type React from "react";
import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartRef = useRef<number | null>(null);

  const slides = [
    {
      id: 1,
      img: "/Foto Produk/baru1/produk1.webp",
      text: "Biru Bulan",
    },
    {
      id: 2,
      img: "/Foto Produk/baru1/produk2.webp",
      text: "Logo",
    },
    {
      id: 3,
      img: "/Foto Produk/baru1/produk3.webp",
      text: "Biru Bulan",
    },
    {
      id: 4,
      img: "/Foto Produk/baru1/produk4.webp",
      text: "Motif Bunga 1",
    },
    {
      id: 5,
      img: "/Foto Produk/baru1/produk5.webp",
      text: "Motif Bunga 2",
    },
  ];
  // ---------------------------------------------

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // --- Logika Swipe (Geser) ---
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const startX = touchStartRef.current;
    const endX = e.changedTouches[0].clientX;
    touchStartRef.current = null;
    if (startX == null) return;
    const distance = startX - endX;
    const threshold = 50; // Jarak minimal geser
    if (distance > threshold) nextSlide();
    else if (distance < -threshold) prevSlide();
  };

  return (
    // Section utama, padding vertikal, dan batasi lebar max
    <section
      className="py-12 w-full max-w-sm mx-auto"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Container relatif untuk tombol panah */}
      <div className="relative">
        {/* Viewport: Menyembunyikan slide yang 'overflow' */}
        <div className="overflow-hidden rounded-lg h-52 shadow-2xl">
          {/* Track: Ini adalah 'flex' container
            Ini yang akan bergeser ke samping
          */}
          <div
            className="flex h-full transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {/* Render semua slide/gambar */}
            {slides.map((slide) => (
              <div
                key={slide.id}
                // Setiap slide: lebar 100% dan tidak akan 'shrink'
                className="relative h-full w-full flex-shrink-0"
              >
                <img
                  src={slide.img}
                  alt={slide.text}
                  className="w-full h-full object-cover" // Menggunakan Tailwind untuk 'fill' dan 'objectFit'
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Tombol Kiri */}
        <button
          className="absolute top-1/2 left-2 -translate-y-1/2 z-10
                     w-10 h-10 rounded-full bg-gray-800 bg-opacity-70 text-white 
                     flex items-center justify-center hover:bg-opacity-100 transition-all"
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Tombol Kanan */}
        <button
          className="absolute top-1/2 right-2 -translate-y-1/2 z-10
                     w-10 h-10 rounded-full bg-gray-800 bg-opacity-70 text-white 
                     flex items-center justify-center hover:bg-opacity-100 transition-all"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Dots Indikator */}
      <div className="flex justify-center gap-2 mt-10" style={{marginTop: '24px'}}>
        {slides.map((_, index) => (
          <button
            key={index}
            className={`h-2 rounded-full transition-all duration-300
                       ${
                         index === currentSlide
                           ? "w-6 bg-gray-800" // Dot aktif
                           : "w-2 bg-gray-300" // Dot non-aktif
                       }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentSlide}
          />
        ))}
      </div>
    </section>
  );
}
