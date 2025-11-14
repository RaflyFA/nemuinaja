"use client"

import { AuthProvider } from "@/lib/auth-context"
import KoleksiSayaPage from "@/components/pages/koleksi-saya"

export default function KoleksiPage() {
  return (
    <AuthProvider>
      <KoleksiSayaPage />
    </AuthProvider>
  )
}
