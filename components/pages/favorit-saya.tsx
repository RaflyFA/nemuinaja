"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import PageLayout from "./page-layout"
import Footer from "../footer"

const favoriteItems = Array.from({ length: 6 }).map((_, index) => ({
  id: index + 1,
  name: "Disini Tuh Nama Produknya",
  hours: "Buka 08.00 - 17.00",
  rating: 5,
}))

const STORAGE_KEY = "nemuinaja_favorites_likes"

export default function FavoritSayaPage() {
  const router = useRouter()
  const [likedIds, setLikedIds] = useState<number[]>([])
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setLikedIds(JSON.parse(raw))
    } catch (e) {
      setLikedIds([])
    }
  }, [])
  const toggleLike = (id: number) => {
    setLikedIds((prev) => {
      const exists = prev.includes(id)
      const next = exists ? prev.filter((x) => x !== id) : [...prev, id]
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      } catch (e) {
      }
      return next
    })
  }
  return (
    <>
      <PageLayout containerClassName="favorites-container" mainClassName="favorites-page">
        <header className="favorites-header">
          <button
            className="favorites-back"
            onClick={() => router.back()}
            aria-label="Kembali"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M15 18L9 12L15 6"
                stroke="#FAFAFA"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <h1 className="favorites-title">
            <span className="muted">Favorit</span> saya
          </h1>
          {}
          <div className="favorites-header-spacer" aria-hidden="true" />
        </header>

        <section className="favorites-grid">
          {favoriteItems.map((item) => (
            <article key={item.id} className="favorite-card">
              <div className="favorite-card-media">
                <button
                  className={`favorite-heart ${likedIds.includes(item.id) ? "liked" : ""}`}
                  aria-pressed={likedIds.includes(item.id)}
                  onClick={() => toggleLike(item.id)}
                >
                  <img src="/like.webp" alt={likedIds.includes(item.id) ? "Unlike" : "Like"} width={20} height={20} />
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
      </PageLayout>

      <Footer />
    </>
  )
}
