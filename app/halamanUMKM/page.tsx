"use client"

import React, { Suspense } from "react"
import styles from "./page.module.css"
import HalamanUMKMPageContent from "./page-content"

export default function HalamanUMKMPage() {
  return (
    <Suspense
      fallback={
        <div className={styles.container}>
          <div style={{ padding: "20px", textAlign: "center" }}>
            <p>Memuat detail produk...</p>
          </div>
        </div>
      }
    >
      <HalamanUMKMPageContent />
    </Suspense>
  )
}