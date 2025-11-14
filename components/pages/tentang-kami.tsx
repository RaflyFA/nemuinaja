"use client"

import { useRouter } from "next/navigation"
import PageLayout from "./page-layout"
import Footer from "../footer"

const principles = [
  {
    title: "Asli lokal",
    description: "Kami bangga dengan produk dan karya asli daerah. Dari kita, untuk kita",
    icon: "??",
  },
  {
    title: "Komunitas",
    description: "Bukan sekadar direktori, tapi wadah untuk berbagi cerita antara pemilik usaha dan pelanggan",
    icon: "??",
  },
]

const stats = [
  { label: "UMKM terdaftar", value: "10+" },
  { label: "Pencarian bulan ini", value: "100+" },
  { label: "Kota", value: "1" },
]

export default function TentangKamiPage() {
  const router = useRouter()

  return (
    <PageLayout containerClassName="about-container" mainClassName="about-page">
      <header className="about-header">
        <button className="about-back" aria-label="Kembali" onClick={() => router.back()}>
          <svg width="50" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M15 18L9 12L15 6" stroke="#FAFAFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <h1>Tentang kami</h1>
      </header>

      <div className="about-hero" aria-hidden="true" />

      <section className="about-section">
        <h2>Berawal dari sebuah permasalahan</h2>
        <p>
          Kami menyadari banyak tempat hebat di sekitar kita mulai dari kuliner legendaris hingga toko kerajinan bagus
          yang sulit ditemukan secara online. Informasinya tersebar dan seringkali tidak lengkap.
        </p>
        <p>
          Itulah mengapa nemuinaja lahir. Kami ingin membangun peta digital yang ramah untuk semua, membantu UMKM
          mendapatkan panggung yang layak, dan membantu Anda menemukan tempat favorit baru.
        </p>
      </section>

      <section className="about-pill-grid">
        <article className="about-pill">
          <h3>VISI</h3>
          <p>Menjadi platform penghubung nomor satu yang menjadikan UMKM lokal agar berdaya saing dan mudah diakses.</p>
        </article>
        <article className="about-pill">
          <h3>MISI</h3>
          <p>
            Menjadi peta digital yang ramah dan mudah digunakan untuk menemukan bisnis di sekitar kita dan mengangkat
            cerita dibalik usaha lokal.
          </p>
        </article>
      </section>

      <section className="about-section">
        <h2>Prinsip kami</h2>
        <div className="about-principles">
          {principles.map((principle) => (
            <article key={principle.title} className="about-principle-card">
              <div className="icon" aria-hidden="true">
                {principle.icon}
              </div>
              <div>
                <h3>{principle.title}</h3>
                <p>{principle.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="about-stats">
        {stats.map((stat) => (
          <div key={stat.label} className="about-stat">
            <span className="value">{stat.value}</span>
            <span className="label">{stat.label}</span>
          </div>
        ))}
      </section>

      <section className="about-cta">
        <p>Siap menemukan tempat favorit barumu? atau punya usaha yang ingin dikenal?</p>
        <div className="cta-buttons">
          <button className="cta-outline">Mulai jelajah</button>
          <button className="cta-solid">Daftarkan usaha</button>
        </div>
      </section>

      <Footer />
    </PageLayout>
  )
}
