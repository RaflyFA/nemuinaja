"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useAuth } from "../../lib/auth-context"

const DEMO_ACCOUNTS = [
  {
    email: "user@gmail.com",
    password: "nemuin123",
    profile: { hasUmkm: false, name: "Ahmad", username: "ahmad" },
    label: "Pengguna biasa",
  },
  {
    email: "payunggeulismandiri@gmail.com",
    password: "nemuin123",
    profile: { hasUmkm: true, name: "Payung Geulis Karya Utama" },
    label: "Pemilik UMKM",
  },
]

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState<{ email?: string; password?: string; credentials?: string }>({})

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const nextErrors: typeof errors = {}
    if (!email) nextErrors.email = "Masukkan alamat email atau nomor telepon"
    if (!password) nextErrors.password = "Masukkan sandi"

    if (Object.keys(nextErrors).length === 0) {
      const matched = DEMO_ACCOUNTS.find(
        (account) => account.email.toLowerCase() === email.trim().toLowerCase() && account.password === password,
      )
      if (!matched) {
        nextErrors.credentials = "Email atau kata sandi tidak cocok dengan akun demo"
      } else {
        login(matched.profile)
        router.push("/profil")
      }
    }

    setErrors(nextErrors)
  }

  return (
    <div className="auth-standalone">
      <div className="auth-card">
        <h1>
          Masuk ke akun <span>nemuin</span> anda
        </h1>
        <div className="auth-credentials">
          <p>Gunakan data demo berikut:</p>
          <ul>
            {DEMO_ACCOUNTS.map((account) => (
              <li key={account.email}>
                <strong>{account.label}:</strong> {account.email} / {account.password}
              </li>
            ))}
          </ul>
        </div>
        <form onSubmit={handleSubmit} className="auth-form">
          <label className={`auth-input ${errors.email ? "error" : ""}`}>
            <span>Email/Telepon</span>
            <input type="text" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="contoh@tes.com" />
          </label>
          {errors.email ? <p className="auth-input-hint">{errors.email}</p> : null}

          <label className={`auth-input ${errors.password ? "error" : ""}`}>
            <span>Masukkan kata sandi</span>
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="********" />
          </label>
          {errors.password ? <p className="auth-input-hint">{errors.password}</p> : null}
          {errors.credentials ? <p className="auth-input-hint">{errors.credentials}</p> : null}

          <div className="profile-auth-links">
            <button type="button">Lupa sandi?</button>
          </div>

          <button className="profile-primary-btn" type="submit">
            Masuk
          </button>
        </form>

        <p className="profile-auth-footer">
          Tidak memiliki akun?{" "}
          <Link href="/register">
            <span>Buat</span>
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
        <p>ÂCopyright 2025 - nemuin. All Rights Reserved</p>
      </footer>
    </div>
  )
}



