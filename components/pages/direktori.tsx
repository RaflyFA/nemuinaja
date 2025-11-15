"use client"

import PageLayout from "./page-layout"
import Footer from "../footer"

type DirectoryCardData = {
  id: number
  name: string
  hours: string
  rating: number
}

const trendingItems: DirectoryCardData[] = [
  { id: 1, name: "Disini Tuh Nama Produknya", hours: "Buka 08.00 - 17.00", rating: 5 },
  { id: 2, name: "Disini Tuh Nama Produknya", hours: "Buka 08.00 - 17.00", rating: 5 },
  { id: 3, name: "Disini Tuh Nama Produknya", hours: "Buka 08.00 - 17.00", rating: 5 },
  { id: 4, name: "Disini Tuh Nama Produknya", hours: "Buka 08.00 - 17.00", rating: 5 },
  { id: 5, name: "Disini Tuh Nama Produknya", hours: "Buka 08.00 - 17.00", rating: 5 },
  { id: 6, name: "Disini Tuh Nama Produknya", hours: "Buka 08.00 - 17.00", rating: 5 },
]

const specialItems: DirectoryCardData[] = [
  { id: 7, name: "Disini Tuh Nama Produknya", hours: "Buka 08.00 - 17.00", rating: 5 },
  { id: 8, name: "Disini Tuh Nama Produknya", hours: "Buka 08.00 - 17.00", rating: 5 },
  { id: 9, name: "Disini Tuh Nama Produknya", hours: "Buka 08.00 - 17.00", rating: 5 },
  { id: 10, name: "Disini Tuh Nama Produknya", hours: "Buka 08.00 - 17.00", rating: 5 },
]

export default function DirektoriPageContent() {
  return (
    <>
      <PageLayout containerClassName="directory-container" mainClassName="directory-page">
        <section className="directory-section">
          <h1 className="directory-heading">
            <span className="muted" style={{
              background: 'linear-gradient(90deg, #5AC4B5 0%, #303030 23%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Trending</span> minggu ini
          </h1>
          <div className="directory-hero-card" aria-hidden />
          
          <div className="directory-grid">
            {trendingItems.map((item) => (
              <article key={item.id} className="directory-card">
                <div className="directory-card-media" />
                <div className="directory-card-body">
                  <span className="directory-rating">
                    <span aria-hidden="true">★</span> {item.rating.toFixed(1)}
                  </span>
                  <h3>{item.name}</h3>
                  <p>{item.hours}</p>
                </div>
              </article>
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
            {specialItems.map((item) => (
              <article key={item.id} className="directory-feature-card">
                <div className="directory-feature-media" />
                <div className="directory-feature-body">
                  <span className="directory-rating">
                    <span aria-hidden="true">★</span> {item.rating.toFixed(1)}
                  </span>
                  <h3>{item.name}</h3>
                  <p>{item.hours}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="directory-dots">
            {[0, 1, 2, 3].map((dot) => (
              <span key={dot} className={`dot ${dot === 0 ? "active" : ""}`} />
            ))}
          </div>
        </section>
          
        <section className="directory-section directory-stack">
          {specialItems.map((item) => (
            <article key={`stack-${item.id}`} className="directory-stack-card">
              <div className="directory-stack-media" />
              <div className="directory-stack-body">
                <span className="directory-rating">
                  <span aria-hidden="true">★</span> {item.rating.toFixed(1)}
                </span>
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
