"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import PageLayout from "./page-layout"
import Link from "next/link"
import Footer from "../footer"
import { useAuth } from "../../lib/auth-context"

const collectionItems = Array.from({ length: 4 }).map((_, index) => ({
  id: index + 1,
  name: "Payung Geulis Karya Utama",
  category: "Kerajinan",
  city: "Kota Tasikmalaya",
}))

const COLLECTION_STORAGE_KEY = "nemuinaja_collection_bookmarks"

export default function KoleksiSayaPage() {
  const router = useRouter()
  const { isAuthenticated, isReady } = useAuth()
  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>([])

  useEffect(() => {
    if (!isReady) return
    if (!isAuthenticated) {
      router.replace("/profil")
    }
  }, [isAuthenticated, isReady, router])

  useEffect(() => {
    try {
      const raw = localStorage.getItem(COLLECTION_STORAGE_KEY)
      if (raw) setBookmarkedIds(JSON.parse(raw))
    } catch {
      setBookmarkedIds([])
    }
  }, [])

  const toggleBookmark = (id: number) => {
    setBookmarkedIds((prev) => {
      const exists = prev.includes(id)
      const next = exists ? prev.filter((x) => x !== id) : [...prev, id]
      try {
        localStorage.setItem(COLLECTION_STORAGE_KEY, JSON.stringify(next))
      } catch {
      }
      return next
    })
  }
  if (!isReady) {
    return null
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <>
      <PageLayout containerClassName="collection-container" mainClassName="collection-page">
        <header className="collection-header">
          <button
            className="collection-back"
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
          <h1 className="collection-title">
            <span className="muted">Koleksi</span> saya
          </h1>
          <div className="collection-header-spacer" aria-hidden="true" />
        </header>
        <section className="collection-list">
          {collectionItems.map((item) => {
            const bookmarked = bookmarkedIds.includes(item.id)
            return (
              <Link key={item.id} href={`/halamanUMKM/${item.id}`}>
                <article className="collection-card">
                  <div className="collection-avatar" aria-hidden="true">
                    <span role="img" aria-hidden="true">
                      <img src="/profile-collestion.webp" alt="Profile UMKM" width={100} height={100} aria-hidden="true" />
                    </span>
                  </div>
                  <div className="collection-card-body">
                    <h3>{item.name}</h3>
                    <p>{item.category}</p>
                    <p className="collection-city">{item.city}</p>
                  </div>
                  <button
                    className={`collection-bookmark ${bookmarked ? "saved" : ""}`}
                    aria-pressed={bookmarked}
                    aria-label={bookmarked ? "Hapus dari koleksi" : "Simpan ke koleksi"}
                    onClick={(e) => { e.preventDefault(); toggleBookmark(item.id) }}
                  >
                    <img src="/bookmark.webp" alt="" width={18} height={18} aria-hidden="true" />
                  </button>
                </article>
              </Link>
            )
          })}
        </section>
      </PageLayout>
    <Footer />
    </>
  )
}
