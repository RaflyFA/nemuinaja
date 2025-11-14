"use client"

import { AuthProvider } from "@/lib/auth-context"
import FavoritSayaPage from "@/components/pages/favorit-saya"

export default function FavoritPage() {
  return (
    <AuthProvider>
      <FavoritSayaPage />
    </AuthProvider>
  )
}
