"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "../../lib/auth-context"

export default function RegisterPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [errors, setErrors] = useState<{ email?: string; password?: string; confirm?: string }>({})

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const nextErrors: typeof errors = {}
    if (!email) nextErrors.email = "Masukkan email kamu"
    if (!password) nextErrors.password = "Gunakan minimal 8 karakter yang menggabungkan huruf besar, huruf kecil, dan angka."
    if (password && password !== confirm) nextErrors.confirm = "Kata sandi tidak cocok"

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length === 0) {
      login({ hasUmkm: false, name: "Pengguna baru", username: email.split("@")[0] ?? "pengguna" })
      router.push("/profil")
    }
  }

  return (
    <div className="auth-standalone">
      <div className="auth-card">
        <h1>
          Daftarkan akun <span>nemuin</span> anda
        </h1>
        <form onSubmit={handleSubmit} className="auth-form">
          <label className={`auth-input ${errors.email ? "error" : ""}`}>
            <span>Email/Telepon</span>
            <input type="text" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="email@email.com" />
          </label>
          {errors.email ? <p className="auth-input-hint">{errors.email}</p> : null}

          <label className={`auth-input ${errors.password ? "error" : ""}`}>
            <span>Masukkan kata sandi</span>
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="********" />
          </label>
          {errors.password ? <p className="auth-input-hint">{errors.password}</p> : null}

          <label className={`auth-input ${errors.confirm ? "error" : ""}`}>
            <span>Konfirmasi kata sandi</span>
            <input type="password" value={confirm} onChange={(event) => setConfirm(event.target.value)} placeholder="********" />
          </label>
          {errors.confirm ? <p className="auth-input-hint">{errors.confirm}</p> : null}

          <button className="profile-primary-btn" type="submit">
            Lanjut
          </button>
        </form>

        <p className="profile-auth-footer">
          Sudah punya akun?{" "}
          <Link href="/login">
            <span>Masuk</span>
          </Link>
        </p>
      </div>

      <footer className="auth-footer">
        <p>
          <span>Follow</span> nemuinaja
        </p>
        <div className="auth-footer-links">
          <Image src="/instagram.webp" alt="Instagram" width={20} height={20} />
          <Image src="/facebook.webp" alt="Facebook" width={20} height={20} />
          <Image src="/x.webp" alt="X" width={20} height={20} />
        </div>
        <p>Â© 2025 - nemuin. All Rights Reserved</p>
      </footer>
    </div>
  )
}


