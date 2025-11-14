"use client"

import { useRouter } from "next/navigation"
import PageLayout from "./page-layout"
import Footer from "../footer"

const favoriteItems = Array.from({ length: 6 }).map((_, index) => ({
  id: index + 1,
  name: "Disini Tuh Nama Produknya",
  hours: "Buka 08.00 - 17.00",
  rating: 5,
}))

export default function FavoritSayaPage() {
  const router = useRouter()

  return (
    <PageLayout containerClassName="favorites-container" mainClassName="favorites-page">
      <header className="favorites-header">
        <button className="favorites-back" onClick={() => router.back()} aria-label="Kembali">
          ←
        </button>
        <h1>
          <span className="muted">Favorit</span> saya
        </h1>
      </header>

      <section className="favorites-grid">
        {favoriteItems.map((item) => (
          <article key={item.id} className="favorite-card">
            <div className="favorite-card-media">
              <button className="favorite-heart" aria-pressed="false">
                ♥
              </button>
              <span className="favorite-rating">
                <span aria-hidden="true">★</span> {item.rating.toFixed(1)}
              </span>
            </div>
            <div className="favorite-card-body">
              <h3>{item.name}</h3>
              <p>{item.hours}</p>
            </div>
          </article>
        ))}
      </section>

      <Footer />
    </PageLayout>
  )
}
