"use client"

import { AuthProvider } from "@/lib/auth-context"
import BerandaPage from "@/components/pages/beranda"

export default function Page() {
  return (
    <AuthProvider>
      <BerandaPage />
    </AuthProvider>
  )
}
