"use client"

import Directory from "@/components/directory"
import { AuthProvider } from "@/lib/auth-context"

export default function DirektoriPage() {
  return (
    <AuthProvider>
      <Directory />
    </AuthProvider>
  )
}
