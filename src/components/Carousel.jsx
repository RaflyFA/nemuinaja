"use client"

import { useState } from "react"

export default function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      id: 1,
      title: "Slide 1",
      text: "ini ada 5 foto di slide oleh kursor atau tangan atau klik dengan ikon arrow juga bisa",
    },
    { id: 2, title: "Slide 2", text: "Jelajahi koleksi terbaik dari pengrajin lokal" },
    { id: 3, title: "Slide 3", text: "Temukan produk unik dan berkualitas tinggi" },
    { id: 4, title: "Slide 4", text: "Dukung UMKM lokal dengan berbelanja" },
    { id: 5, title: "Slide 5", text: "Rasakan pengalaman berbelanja yang tak terlupakan" },
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  return (
    <section className="carousel-section">
      <div className="carousel-container">
        <button className="carousel-arrow prev" onClick={prevSlide} aria-label="Previous slide">
          ‹
        </button>

        <div className="carousel-slide">
          <div className="slide-placeholder">{slides[currentSlide].text}</div>
        </div>

        <button className="carousel-arrow next" onClick={nextSlide} aria-label="Next slide">
          ›
        </button>
      </div>

      <div className="carousel-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentSlide ? "active" : ""}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentSlide}
          />
        ))}
      </div>
    </section>
  )
}
