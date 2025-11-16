"use client"

import PageLayout from "./page-layout"
import Link from "next/link"
import Footer from "../footer"
import { useMemo } from "react"

type DirectoryCardData = {
  id: number
  name: string
  hours: string
  rating: number
  image: string
}

const trendingItems: DirectoryCardData[] = [
  { id: 1, name: "Es Bojong", hours: "Buka 08.00 - 17.00", rating: 5.0, image: "/Foto Produk/Es Bojong/es bojong.webp" },
  { id: 2, name: "Kupat Tahu Mangunreja", hours: "Buka 09.00 - 21.00", rating: 5.0, image: "/Foto Produk/Kupat Tahu Mangunreja/Kupat Tahu.webp" },
  { id: 3, name: "Payung Geulis Si Merah", hours: "Buka 08.00 - 17.00", rating: 5.0, image: "/Foto Produk/Payung Geulis Karya Utama/Si Merah.webp" },
  { id: 4, name: "Gamis Biru", hours: "Buka 07.15 - 20.00", rating: 5.0, image: "/Foto Produk/Ibe Store 22/Gamis Biru.webp" },
  { id: 5, name: "Bakul Nasi", hours: "Buka 08.30 - 17.00", rating: 5.0, image: "/Foto Produk/Kartika Art Collection/Bakul Nasi.webp" },
  { id: 6, name: "Nusa Indah Florist", hours: "Buka 07.00 - 18.00", rating: 5.0, image: "/Foto Produk/Nusa Indah Florist/Contoh Produk.webp" },
]

const specialItems: DirectoryCardData[] = [
  { id: 7, name: "Cinderamata", hours: "Buka 08.00 - 20.00", rating: 5.0, image: "/Foto Produk/Payung Geulis Mandiri/Cinderamata.webp" },
  { id: 8, name: "Kelom Geulis Biru Bulan", hours: "Buka 09.00 - 23.00", rating: 5.0, image: "/Foto Produk/PD. Mustika Kelom Geulis/Biru Bulan.webp" },
  { id: 9, name: "Kelom Batik Merah", hours: "Buka 09.00 - 17.00", rating: 5.0, image: "/Foto Produk/Raja Kelom/Batik Merah.webp" },
  { id: 10, name: "Seblak Komplit", hours: "Buka 07.00 - 23.00", rating: 5.0, image: "/Foto Produk/Seblak Teh Eni/Seblak Komplit.webp" },
]

const heroImages = [
  "/Foto Produk/Es Bojong/es bojong.webp",
  "/Foto Produk/Kupat Tahu Mangunreja/Kupat Tahu.webp",
  "/Foto Produk/Payung Geulis Karya Utama/Si Merah.webp",
  "/Foto Produk/Ibe Store 22/Gamis Biru.webp",
  "/Foto Produk/Kartika Art Collection/Bakul Nasi.webp",
  "/Foto Produk/Nusa Indah Florist/Contoh Produk.webp",
  "/Foto Produk/Payung Geulis Mandiri/Cinderamata.webp",
  "/Foto Produk/PD. Mustika Kelom Geulis/Biru Bulan.webp",
  "/Foto Produk/Raja Kelom/Batik Merah.webp",
  "/Foto Produk/Seblak Teh Eni/Seblak Komplit.webp",
]

export default function DirektoriPageContent() {
  // generate a stable random rating per item on mount (4.5 - 5.0, one decimal)
  const generateRandomRating = () => {
    const val = 4.5 + Math.random() * 0.5
    return Math.round(val * 10) / 10
  }

  const trendingWithRandom = useMemo(() => {
    return trendingItems.map((item) => ({ ...item, rating: generateRandomRating() }))
  }, [])

  const specialWithRandom = useMemo(() => {
    return specialItems.map((item) => ({ ...item, rating: generateRandomRating() }))
  }, [])
  return (
    <>
      <PageLayout containerClassName="directory-container" mainClassName="directory-page">
        <section className="directory-section">
          <h2 className="directory-heading">
            <span className="muted" style={{
              background: 'linear-gradient(90deg, #5AC4B5 50%, #303030 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Trending</span> minggu ini
          </h2>
          <div className="directory-hero-card" aria-hidden>
            <img
              src="/Foto Produk/Payung Geulis Karya Utama/Si Merah.webp"
              alt="Payung Geulis"
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '24px', display: 'block' }}
            />
          </div>
          
          
          <div className="directory-grid">
            {trendingWithRandom.map((item) => (
              <Link key={item.id} href={`/halamanUMKM?id=${item.id}`}>
                <article className="directory-card">
                  <div className="directory-card-media">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div className="directory-card-body">
                    <span className="directory-rating">
                      <span aria-hidden="true">★</span> {item.rating.toFixed(1)}
                    </span>
                    <h3>{item.name}</h3>
                    <p>{item.hours}</p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
          
        <section className="directory-section">
          <div className="directory-section-title">
            <h2>
              Mau nyari yang <span>spesial?</span>
            </h2>
          </div>
          <div className="directory-special-track">
            {specialWithRandom.map((item) => (
              <Link key={item.id} href={`/halamanUMKM?id=${item.id}`}>
                <article className="directory-feature-card">
                  <div className="directory-feature-media">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div className="directory-feature-body">
                    <span className="directory-rating">
                      <span aria-hidden="true">★</span> {item.rating.toFixed(1)}
                    </span>
                    <h3>{item.name}</h3>
                    <p>{item.hours}</p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
          <div className="directory-dots">
            {[0, 1, 2, 3].map((dot) => (
              <span key={dot} className={`dot ${dot === 0 ? "active" : ""}`} />
            ))}
          </div>
        </section>
          
        <section className="directory-section directory-stack">
          {specialWithRandom.map((item) => (
            <Link key={`stack-${item.id}`} href={`/halamanUMKM?id=${item.id}`}>
              <article className="directory-stack-card">
                <div className="directory-stack-media">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div className="directory-stack-body">
                  <span className="directory-rating">
                    <span aria-hidden="true">★</span> {item.rating.toFixed(1)}
                  </span>
                  <h3>{item.name}</h3>
                  <p>{item.hours}</p>
                </div>
              </article>
            </Link>
          ))}
        </section>
      </PageLayout>
      <Footer />
    </>
  )
}
