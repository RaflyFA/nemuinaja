"use client"

import { useAuth } from "@/lib/auth-context"

export default function CtaDark() {
  const { isAuthenticated } = useAuth()

  return (
    <section className="cta-dark">
      <h2 className="cta-title">Siap Ditemukan <br></br>Pelanggan <span
          style={{
            background: 'linear-gradient(90deg, #5AC4B5 58%, #FAFAFA 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >Baru?</span>
      </h2>
      <p className="cta-description">
        {isAuthenticated
          ? "Daftarkan Produk Anda untuk menjangkau lebih banyak mata melihat produk dan membuat profil Anda lebih lengkap."
          : "Tambahkan Produk Anda untuk menarik lebih banyak pelanggan dan membuat profil Anda lebih menarik."}
      </p>
      <button className="btn btn-accent">{isAuthenticated ? "Ajukan UMKM" : "Daftar Sekarang"}</button>
    </section>
  )
}
