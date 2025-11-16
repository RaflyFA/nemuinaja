import React from "react"
import Link from "next/link"
import styles from "./page.module.css"
import { getUmkmById, UMKMS } from "../../../lib/umkm-data"

type Props = {
  params: { id: string }
}

export default async function Page({ params }: Props) {
    const {id } = await params
  const parseid = parseInt(id || "0", 10) || 0
  const umkm = getUmkmById(parseid)
    console.log('umkm',id, umkm); 
  if (!umkm) {
    return (
      <div className={styles.container}>
        <div className={styles.notFound}>
          <p>Maaf, UMKM tidak ditemukan.</p>
          <Link href="/direktori">Kembali ke Direktori</Link>
        </div>
      </div>
    )
  }

  // fallback gallery: if umkm.gallery not provided, pick other products from same seller or same city
  const gallery = (umkm as any).gallery ?? UMKMS.filter((u) => u.id !== umkm.id && (u.sellerName === umkm.sellerName || u.sellerCity === umkm.sellerCity)).slice(0, 8).map((u) => ({ id: u.id, name: u.name, image: u.image, hours: u.hours }))

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
            <div className={styles.statItem}><strong>{gallery.length}</strong><span>Postingan</span></div>
            <div className={styles.statItem}><strong>—</strong><span>Dikoleksi</span></div>
            <div className={styles.statItem}><strong>—</strong><span>Disukai</span></div>
          </div>
        </div>
        <div className={styles.actions}>
          <Link href={`/profil`} className={styles.visitBtn}>Kunjungi</Link>
        </div>
      </div>

      <div className={styles.description}>
        <p>{umkm.description ?? "Deskripsi tidak tersedia."}</p>
        <div className={styles.contacts}>
          {umkm.instagram ? <a href={`https://instagram.com/${umkm.instagram}`} target="_blank" rel="noreferrer">@{umkm.instagram}</a> : null}
          {umkm.whatsapp ? <a href={`https://wa.me/${umkm.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noreferrer">Hubungi via WhatsApp</a> : null}
        </div>
      </div>

      <h2 className={styles.sectionTitle}>Produk / Galeri</h2>
      <div className={styles.gallery}>
        {gallery.map((p: any) => (
          <Link key={p.id} href={`/halamanUMKM/${id}?product=${p.id}`} className={styles.card}>
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
