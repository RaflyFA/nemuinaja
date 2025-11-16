"use client"

import React, { useMemo, useState, useEffect } from "react"
import styles from "./page.module.css"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import { getUmkmById, UMKMS } from "../../lib/umkm-data"
import PageLayout from "../../components/pages/page-layout"
import Footer from "../../components/footer"

export default function HalamanUMKMPage() {
  const [liked, setLiked] = useState(false)
  const [selectedStars, setSelectedStars] = useState(0)

  const search = useSearchParams()
  const idParam = search?.get("id") ?? "1"
  const id = parseInt(idParam, 10) || 1
  const umkm = getUmkmById(id)

  // determine main rating deterministically (fallback if data missing)
  const ratingFor = (u: { id: number; rating?: number } | null) => {
    if (!u) return 4.5
    if (typeof u.rating === "number") return u.rating
    return Math.min(5, 4 + (u.id % 11) * 0.1)
  }

  const mainRating = useMemo(() => ratingFor(umkm), [umkm])

  // other product from the same store (match by sellerName partial, fallback to same city)
  const otherProduct = useMemo(() => {
    if (!umkm) return null
    const needle = (umkm.sellerName ?? "").toLowerCase().split(" ")[0]
    const sameSeller = UMKMS.filter((u) => u.id !== umkm.id && (u.sellerName ?? "").toLowerCase().includes(needle))
    if (sameSeller.length) return sameSeller[0]
    const sameCity = UMKMS.find((u) => u.id !== umkm.id && u.sellerCity === umkm.sellerCity)
    return sameCity ?? null
  }, [umkm])

  const router = useRouter()

  // favorites storage key (kept same as favorites page)
  const STORAGE_KEY = "nemuinaja_favorites_likes"

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      const arr = raw ? JSON.parse(raw) : []
      setLiked(Array.isArray(arr) && arr.includes(id))
    } catch (e) {
      setLiked(false)
    }
  }, [id])

  const toggleLike = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      const arr: number[] = raw ? JSON.parse(raw) : []
      const exists = arr.includes(id)
      const next = exists ? arr.filter((x) => x !== id) : [...arr, id]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      setLiked(!exists)
    } catch (e) {
      setLiked((v) => !v)
    }
  }

  return (
    <PageLayout containerClassName={styles.container} mainClassName={""}>
      <div className={styles.topRow}>
        <button className={styles.backBtn} onClick={() => router.back()} aria-label="Kembali">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className={styles.detailTitle}>Detail Produk</div>
      </div>

      <div className={styles.hero} aria-hidden>
        <img src={umkm?.image ?? "/Foto Produk/Payung Geulis Karya Utama/Si Merah.webp"} alt="hero" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <button className={styles.heartBtn} aria-pressed={liked} onClick={toggleLike}>
          <img src={liked ? "/icon-park-outline_like (3).webp" : "/icon-park-outline_like (2).webp"} alt="like" style={{ width: 22, height: 22 }} />
        </button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div className={styles.ratingBadge}>
          <img src="/Star 7.webp" alt="star" style={{ width: 14, height: 14 }} />
          {mainRating.toFixed(1)}
        </div>
      </div>

      <h1 className={styles.title}>{umkm?.name ?? "Disini Tuh Nama Produknya"}</h1>
      <div className={styles.hours}>{umkm?.hours ?? "(Buka 08.00 - 17.00)"}</div>

      <div className={styles.desc}>
        <p>
          {umkm?.description ?? "Deskripsi produk tidak tersedia."}
        </p>
      </div>

      <div className={styles.sellerCard}>
        <div className={styles.avatar}>
          <img src="/profile-collestion.webp" alt="avatar" />
        </div>
        <div className="sellerInfo">
          <h4>{umkm?.sellerName ?? "Payung Geulis Karya Utama"}</h4>
          <p>Kerajinan · {umkm?.sellerCity ?? "KOTA TASIKMALAYA"}</p>
        </div>
        <Link href={`/halamanUMKM/${umkm?.id ?? id}`}><button className={styles.visitBtn}>Kunjungi</button></Link>
      </div>

      <div className={styles.statsRow}>
        <div><strong>3</strong><div style={{ fontSize: 12, color: '#8b8b8f' }}>Postingan</div></div>
        <div><strong>3</strong><div style={{ fontSize: 12, color: '#8b8b8f' }}>Dikoleksi</div></div>
        <div><strong>3</strong><div style={{ fontSize: 12, color: '#8b8b8f' }}>Disukai</div></div>
      </div>

      <div className={styles.divider} />

      <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 12 }}>Produk lain dari toko ini</h3>
      {otherProduct ? (
        <Link href={`/halamanUMKM/${otherProduct.id}`} className={styles.otherProduct}>
          <div className={styles.otherThumb}>
            <img src={otherProduct.image ?? "/Foto Produk/Payung Geulis Mandiri/Cinderamata.webp"} alt="thumb" />
          </div>
          <div className={styles.otherInfo}>
            <h5>{otherProduct.name}</h5>
            <div style={{ fontSize: 12, color: '#6e6e74' }}>{otherProduct.hours}</div>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <div className={styles.ratingBadge}>
              <img src="/Star 7.webp" alt="star" style={{ width: 12, height: 12 }} /> {ratingFor(otherProduct).toFixed(1)}
            </div>
          </div>
        </Link>
      ) : (
        <div className={styles.otherProduct}>
          <div className={styles.otherThumb}>
            <img src="/Foto Produk/Payung Geulis Mandiri/Cinderamata.webp" alt="thumb" />
          </div>
          <div className={styles.otherInfo}>
            <h5>Disini Tuh Nama Produknya</h5>
            <div style={{ fontSize: 12, color: '#6e6e74' }}>Buka 08.00 - 17.00</div>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <div className={styles.ratingBadge}>
              <img src="/Star 7.webp" alt="star" style={{ width: 12, height: 12 }} /> {4.9}
            </div>
          </div>
        </div>
      )}

      <div className={styles.contact}>
        <div style={{ marginTop: 18, marginBottom: 8 }}>Hubungi mereka</div>
        <img src="/Vector (2).webp" alt="wa" className={styles.waIcon} />
      </div>

      <div className={styles.divider} />

      <div style={{ textAlign: 'center', marginTop: 8 }}>Bagikan pengalaman Anda</div>
      <div className={styles.stars}>
        {[1, 2, 3, 4, 5].map((n) => (
          <button key={n} className={styles.starBtn} onClick={() => setSelectedStars(n)} aria-pressed={selectedStars >= n}>
            <img src={selectedStars >= n ? "/Star 7 (1).webp" : "/Star 7.webp"} alt={`star-${n}`} style={{ width: 26, height: 26 }} />
          </button>
        ))}
      </div>

      <div className={styles.mapBox}>
        <iframe
          title="map"
          width="100%"
          height="100%"
          frameBorder="0"
          src={`https://www.google.com/maps?q=${encodeURIComponent((umkm?.sellerName ?? '') + ' ' + (umkm?.sellerCity ?? ''))}&output=embed`}
          allowFullScreen
        />
      </div>

      <Footer />
    </PageLayout>
  )
}
