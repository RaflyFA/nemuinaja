"use client"

import { useState } from "react"

export default function Faq() {
  const [expandedIndex, setExpandedIndex] = useState(null)

  const faqs = [
    { question: "Gimana cara mencari UMKM?", answer: "Gunakan fitur pencarian atau jelajahi kategori populer" },
    { question: "Ingin lihat lokasnya di peta, bisa?", answer: "Ya, setiap UMKM memiliki lokasi di peta" },
    { question: "Bisa lihat daftar favorit?", answer: 'Tentu, akses dari menu "Favorit Saya"' },
    { question: "Bisa hubungi UMKM langsung dari situs?", answer: "Ya, tersedia tombol kontak di setiap profil UMKM" },
    { question: "Aku mau komen, bisa?", answer: "Fitur komentar tersedia untuk pengguna terdaftar" },
  ]

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  return (
    <section className="faq-section">
      <h2 className="section-title">FAQ</h2>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <button
              className="faq-question"
              onClick={() => toggleExpand(index)}
              aria-expanded={expandedIndex === index}
            >
              <span>{faq.question}</span>
              <span className={`faq-arrow ${expandedIndex === index ? "expanded" : ""}`}>›</span>
            </button>
            {expandedIndex === index && <div className="faq-answer">{faq.answer}</div>}
          </div>
        ))}
      </div>
    </section>
  )
}
