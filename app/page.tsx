"use client"

import { AuthProvider } from "@/lib/auth-context"
import Home from "@/components/home"

export default function Page() {
  return (
    <AuthProvider>
      <Home />
    </AuthProvider>
  )
}
