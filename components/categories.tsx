"use client"

import { useState } from "react"

export default function Categories() {
  const [currentCategory, setCurrentCategory] = useState(0)

  const categories = [
    { id: 1, name: "nama", rating: 4.5 },
    { id: 2, name: "nama", rating: 4.8 },
    { id: 3, name: "nama", rating: 4.3 },
  ]

  const nextCategory = () => {
    setCurrentCategory((prev) => (prev + 1) % categories.length)
  }

  const prevCategory = () => {
    setCurrentCategory((prev) => (prev - 1 + categories.length) % categories.length)
  }

  const handleCardClick = (index: number) => {
    setCurrentCategory(index)
  }

  return (
    <section className="categories-section">
      <h2 className="section-title">
        Jelajahi UMKM <br></br>
        <span
          style={{
            background: 'linear-gradient(90deg, #5AC4B5 4%, #303030 83%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >populer</span>
      </h2>

      <div className="categories-carousel">
        <button className="category-arrow prev" onClick={prevCategory} aria-label="Previous category">
          ‹
        </button>

        <div className="categories-track">
          {categories.map((cat, idx) => (
            <div
              key={cat.id}
              className={`category-card ${idx === currentCategory ? "active" : ""}`}
              onClick={() => handleCardClick(idx)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleCardClick(idx)
                }
              }}
              aria-pressed={idx === currentCategory}
            >
              <div className="card-image" />
              <div className="card-info">
                <h3>{cat.name}</h3>
                <p className="rating">⭐ {cat.rating}</p>
              </div>
            </div>
          ))}
        </div>

        <button className="category-arrow next" onClick={nextCategory} aria-label="Next category">
          ›
        </button>
      </div>

      <div className="categories-dots">
        {categories.map((_, idx) => (
          <button
            key={idx}
            className={`dot ${idx === currentCategory ? "active" : ""}`}
            onClick={() => setCurrentCategory(idx)}
            aria-label={`Go to category ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
