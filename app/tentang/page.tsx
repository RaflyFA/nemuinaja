"use client"

import { AuthProvider } from "@/lib/auth-context"
import TentangKamiPage from "@/components/pages/tentang-kami"

export default function TentangPage() {
  return (
    <AuthProvider>
      <TentangKamiPage />
    </AuthProvider>
  )
}
