"use client"

import React, {  Suspense } from "react"
import Link from "next/link"
import styles from "./page.module.css"
import { Umkm } from "../../../lib/umkm-data"

type UmkmPageClientProps = {
  umkm: Umkm
  gallery: Array<{ id: number; name: string; image?: string; hours?: string }>
}

function UmkmPageContent({ umkm, gallery }: UmkmPageClientProps) {
//   const searchParams = useSearchParams()
//   const selectedProductId = searchParams?.get("product")

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.avatar}>
          <img src={umkm.avatar ?? "/profile-collestion.webp"} alt={umkm.name} />
        </div>
        <div className={styles.headInfo}>
          <h1 className={styles.name}>{umkm.name}</h1>
          <div className={styles.manager}>{umkm.manager ?? "-"}</div>
          <div className={styles.stats}>
            <div className={styles.statItem}>
              <strong>{gallery.length}</strong>
              <span>Postingan</span>
            </div>
            <div className={styles.statItem}>
              <strong>—</strong>
              <span>Dikoleksi</span>
            </div>
            <div className={styles.statItem}>
              <strong>—</strong>
              <span>Disukai</span>
            </div>
          </div>
        </div>
        <div className={styles.actions}>
          <Link href={`/profil`} className={styles.visitBtn}>
            Kunjungi
          </Link>
        </div>
      </div>

      <div className={styles.description}>
        <p>{umkm.description ?? "Deskripsi tidak tersedia."}</p>
        <div className={styles.contacts}>
          {umkm.instagram ? (
            <a href={`https://instagram.com/${umkm.instagram}`} target="_blank" rel="noreferrer">
              @{umkm.instagram}
            </a>
          ) : null}
          {umkm.whatsapp ? (
            <a href={`https://wa.me/${umkm.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noreferrer">
              Hubungi via WhatsApp
            </a>
          ) : null}
        </div>
      </div>

      <h2 className={styles.sectionTitle}>Produk / Galeri</h2>
      <div className={styles.gallery}>
        {gallery.map((p: any) => (
          <Link key={p.id} href={`/halamanUMKM/${umkm.id}?product=${p.id}`} className={styles.card}>
            <div className={styles.cardMedia}>
              <img src={p.image ?? "/Foto Produk/baru1/produk1.webp"} alt={p.name} />
            </div>
            <div className={styles.cardBody}>
              <div className={styles.cardTitle}>{p.name}</div>
              <div className={styles.cardHours}>{p.hours ?? "-"}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default function UmkmPageClient({ umkm, gallery }: UmkmPageClientProps) {
  return (
    <Suspense
      fallback={
        <div className={styles.container}>
          <div style={{ padding: "20px", textAlign: "center" }}>
            <p>Memuat galeri...</p>
          </div>
        </div>
      }
    >
      <UmkmPageContent umkm={umkm} gallery={gallery} />
    </Suspense>
  )
}
