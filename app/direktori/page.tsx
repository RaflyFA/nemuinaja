"use client"

import { AuthProvider } from "@/lib/auth-context"
import DirektoriPageContent from "@/components/pages/direktori"

export default function DirektoriPage() {
  return (
    <AuthProvider>
      <DirektoriPageContent />
    </AuthProvider>
  )
}
