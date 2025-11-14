"use client"

import { useRouter } from "next/navigation"
import PageLayout from "./page-layout"
import Footer from "../footer"

const collectionItems = Array.from({ length: 4 }).map((_, index) => ({
  id: index + 1,
  name: "Payung Geulis Karya Utama",
  category: "Kerajinan",
  city: "Kota Tasikmalaya",
}))

export default function KoleksiSayaPage() {
  const router = useRouter()

  return (
    <PageLayout containerClassName="collection-container" mainClassName="collection-page">
      <header className="collection-header">
        <button className="collection-back" aria-label="Kembali" onClick={() => router.back()}>
          ←
        </button>
        <h1>
          <span className="muted">Koleksi</span> saya
        </h1>
      </header>

      <section className="collection-list">
        {collectionItems.map((item) => (
          <article key={item.id} className="collection-card">
            <div className="collection-avatar" aria-hidden="true">
              <span>👤</span>
            </div>
            <div className="collection-card-body">
              <h3>{item.name}</h3>
              <p>{item.category}</p>
              <p className="collection-city">{item.city}</p>
            </div>
            <button className="collection-bookmark" aria-pressed="false" aria-label="Simpan">
              🔖
            </button>
          </article>
        ))}
      </section>

      <Footer />
    </PageLayout>
  )
}
