"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import PageLayout from "./page-layout"
import Footer from "../footer"

const principles = [
  {
    title: "Asli lokal",
    description: "Kami bangga dengan produk dan karya asli daerah. Dari kita, untuk kita",
    iconPath: "/aslilokal.webp",
    fallbackInitial: "A",
    iconAlt: "Ikon lokasi untuk nilai Asli Lokal",
  },
  {
    title: "Komunitas",
    description: "Bukan sekadar direktori, tapi wadah untuk berbagi cerita antara pemilik usaha dan pelanggan",
    iconPath: "/community.webp",
    fallbackInitial: "K",
    iconAlt: "Ikon komunitas untuk nilai Komunitas",
  },
]

const stats = [
  { label: "UMKM terdaftar", value: "10+" },
  { label: "Pencarian bulan ini", value: "100+" },
  { label: "Kota", value: "1" },
]

const visionMission = [
  {
    label: "VISI",
    descriptions: [
      "Menjadi platform penghubung nomor satu yang mendigitalkan UMKM lokal agar berdaya saing dan mudah diakses oleh siapa saja.",
    ],
  },
  {
    label: "MISI",
    descriptions: [
      "Membangun peta digital yang paling ramah dan mudah digunakan untuk menemukan bisnis di sekitar kita.",
      "Bukan hanya menampilkan alamat, tapi juga menyuarakan cerita unik dan perjuangan di balik setiap usaha.",
      "Mengajak masyarakat untuk bangga dan lebih sering berbelanja di warung tetangga dan usaha teman sendiri.",
    ],
  },
];

export function VisionMissionSection() {
  return (
    <div>
      {visionMission.map((item) => (
        <section key={item.label}>
          <h2 className="visi-misi">{item.label}</h2>

          {item.descriptions.map((desc, i) => (
            <p key={i}>{desc}</p>
          ))}
        </section>
      ))}
    </div>
  );
}


export default function TentangKamiPage() {
  const router = useRouter()

  return (
    <>
      <PageLayout containerClassName="about-container" mainClassName="about-page">
        <header className="about-header">
          <button
            className="about-back"
            aria-label="Kembali"
            onClick={() => router.back()}
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
          
          <h1 className="about-title">
            <span className="muted">Tentang</span> kami
          </h1>
          
          <div className="about-header-spacer" aria-hidden="true" />
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
          {visionMission.map((item) => (
            <article className="about-pill" key={item.label}>
              <div className="about-pill-label visi-misi" aria-hidden="true">
                {item.label}
              </div>
              <div className="about-pill-content">
                {item.descriptions.map((text, index) => (
                  <p key={`${item.label}-${index}`}>{text}</p>
                ))}
              </div>
            </article>
          ))}
        </section>

        <section className="about-section">
          <h2>Prinsip kami</h2>
          <div className="about-principles">
            {principles.map((principle) => (
              <article key={principle.title} className="about-principle-card">
                {principle.iconPath ? (
                  <div className="about-principle-icon-wrapper">
                    <Image
                      src={principle.iconPath}
                      alt={principle.iconAlt}
                      width={56}
                      height={56}
                      className="about-principle-icon"
                    />
                  </div>
                ) : (
                  <div className="about-principle-icon-wrapper fallback" aria-hidden="true">
                    {principle.fallbackInitial}
                  </div>
                )}
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
            <button className="cta-outline" onClick={() => router.push("/direktori")}>Mulai jelajah</button>
            <button className="cta-solid" onClick={() => router.push("/ajukan")}>Daftarkan usaha</button>
          </div>
        </section>
      </PageLayout>
      <Footer />
      </>
  )
}
