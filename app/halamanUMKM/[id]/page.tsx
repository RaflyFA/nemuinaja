import React, { Suspense } from "react"
import Link from "next/link"
import styles from "./page.module.css"
import { getUmkmById, UMKMS } from "../../../lib/umkm-data"
import UmkmPageClient from "./page-client"

type Props = {
  params: Promise<{ id: string }>
}

async function UmkmPageContent({ id }: { id: string }) {
  const parseid = parseInt(id || "0", 10) || 0
  const umkm = getUmkmById(parseid)

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

  return <UmkmPageClient umkm={umkm} gallery={gallery} />
}

export default async function Page({ params }: Props) {
  const { id } = await params

  return (
    <Suspense
      fallback={
        <div className={styles.container}>
          <div style={{ padding: "20px", textAlign: "center" }}>
            <p>Memuat data UMKM...</p>
          </div>
        </div>
      }
    >
      <UmkmPageContent id={id} />
    </Suspense>
  )
}
