"use client"
import { useAuth } from "../context/authContext"

export default function CtaDark() {
  const { isAuthenticated } = useAuth()

  return (
    <section className="cta-dark">
      <h2 className="cta-title">Siap Ditemukan Pelanggan Baru?</h2>
      <p className="cta-description">
        {isAuthenticated
          ? "Daftarkan Produk Anda untuk menjangkau lebih banyak mata melihat produk dan membuat profil Anda lebih lengkap."
          : "Tambahkan Produk Anda untuk menarik lebih banyak pelanggan dan membuat profil Anda lebih menarik."}
      </p>
      <button className="btn btn-accent">{isAuthenticated ? "Ajukan UMKM" : "Daftar Sekarang"}</button>
      <p className="cta-footer">
        ini menggunakan background batik gelap sedih terlihat, namun baternya sedih lebih terang!
      </p>
    </section>
  )
}
