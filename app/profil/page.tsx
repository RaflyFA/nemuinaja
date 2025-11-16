"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import PageLayout from "../../components/pages/page-layout"
import Footer from "../../components/footer"
import { useAuth } from "../../lib/auth-context"

const OWNER_EMAILS = new Set(["payunggeulismandiri@gmail.com"])

type AuthMode = "login" | "register" | "username" | "forgot"

export default function ProfilPage() {
  const { isAuthenticated, user } = useAuth()

  return (
    <>
      <PageLayout
        containerClassName="profile-container"
        mainClassName="profile-page"
        hideAppBar={!isAuthenticated}
      >
        {isAuthenticated && user ? (
          user.hasUmkm ? <UmkmProfileView /> : <UserProfileView />
        ) : (
          <ProfileAuthScreen />
        )}
      </PageLayout>
      <Footer />
    </>
  )
}

function ProfileAuthScreen() {
  const [mode, setMode] = useState<AuthMode>("login")

  return (
    <section className="profile-auth">
      <div className="profile-auth-header">
        <h1>
          {mode === "login" ? "Masuk ke akun" : mode === "register" ? "Daftarkan akun" : mode === "forgot" ? "Lupa kata sandi" : "Masukkan nama pengguna"}{" "}
          <span>nemuin</span>
        </h1>
        <p>
          {mode === "login"
            ? "Masukkan email dan kata sandi sesuai akunmu."
            : mode === "forgot"
            ? "Kami akan kirim tautan verifikasi ke email kamu."
            : "Pilih mode yang kamu mau terus ikuti langkahnya ya."}
        </p>
      </div>

      {mode === "login" && <LoginForm onSwitchMode={setMode} />}
      {mode === "forgot" && <ForgotPasswordForm onSwitchMode={setMode} />}
      {mode === "register" && <RegisterForm onSwitchMode={setMode} />}
      {mode === "username" && <UsernameStep />}
    </section>
  )
}

function LoginForm({ onSwitchMode }: { onSwitchMode: (m: AuthMode) => void }) {
  const router = useRouter()
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const nextErrors: typeof errors = {}
    if (!email) nextErrors.email = "Masukkan alamat email atau nomor telepon"
    if (!password) nextErrors.password = "Masukkan sandi"
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length === 0) {
      const normalizedEmail = email.trim().toLowerCase()
      const isOwnerAccount = OWNER_EMAILS.has(normalizedEmail)
      login(isOwnerAccount ? { hasUmkm: true } : { hasUmkm: false })
      router.push("/profil")
    }
  }

  return (
    <form className="profile-form" onSubmit={handleSubmit}>
      <label className={`profile-input ${errors.email ? "error" : ""}`}>
        <span>Email/Telepon</span>
        <input type="text" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="contoh@tes.com" />
      </label>
      {errors.email ? <p className="profile-input-hint">{errors.email}</p> : null}

      <label className={`profile-input ${errors.password ? "error" : ""}`}>
        <span>Masukkan kata sandi</span>
        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="********" />
      </label>
      {errors.password ? <p className="profile-input-hint">{errors.password}</p> : null}

      <div className="profile-auth-links">
        <button type="button" onClick={() => onSwitchMode("forgot")}>
          Lupa sandi?
        </button>
      </div>

      <button className="profile-primary-btn" type="submit">
        Masuk
      </button>
      <p className="profile-auth-footer">
        Tidak memiliki akun?{" "}
        <button type="button" onClick={() => onSwitchMode("register")}>
          Buat
        </button>
      </p>
      <AuthSocial />
    </form>
  )
}
function ForgotPasswordForm({ onSwitchMode }: { onSwitchMode: (mode: AuthMode) => void }) {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!email.trim()) {
      setError("Masukkan email kamu")
      return
    }
    setError(null)
    setSubmitted(true)
  }

  return (
    <form className="profile-form" onSubmit={handleSubmit}>
      <label className={`profile-input ${error ? "error" : ""}`}>
        <span>Email yang terdaftar</span>
        <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="contoh@tes.com" />
      </label>
      {error ? <p className="profile-input-hint">{error}</p> : null}
      {submitted ? <p className="profile-success">Kami telah mengirim tautan verifikasi ke email kamu.</p> : null}
      <button className="profile-primary-btn" type="submit">
        Kirim tautan reset
      </button>
      <p className="profile-auth-footer">
        <button type="button" onClick={() => onSwitchMode("login")}>
          Kembali ke masuk
        </button>
      </p>
    </form>
  )
}
function RegisterForm({ onSwitchMode }: { onSwitchMode: (mode: AuthMode) => void }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [errors, setErrors] = useState<{ email?: string; password?: string; confirm?: string }>({})

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const nextErrors: typeof errors = {}
    if (!email) nextErrors.email = "Masukkan email kamu"
    if (!password) {
      nextErrors.password = "Gunakan minimal 8 karakter yang menggabungkan huruf besar, huruf kecil, dan angka."
    }
    if (password && password !== confirm) {
      nextErrors.confirm = "Kata sandi tidak cocok"
    }
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length === 0) {
      onSwitchMode("username")
    }
  }

  return (
    <form className="profile-form" onSubmit={handleSubmit}>
      <label className={`profile-input ${errors.email ? "error" : ""}`}>
        <span>Email/Telepon</span>
        <input type="text" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="email@email.com" />
      </label>
      {errors.email ? <p className="profile-input-hint">{errors.email}</p> : null}

      <label className={`profile-input ${errors.password ? "error" : ""}`}>
        <span>Masukkan kata sandi</span>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="********"
        />
      </label>
      {errors.password ? <p className="profile-input-hint">{errors.password}</p> : null}

      <label className={`profile-input ${errors.confirm ? "error" : ""}`}>
        <span>Konfirmasi kata sandi</span>
        <input
          type="password"
          value={confirm}
          onChange={(event) => setConfirm(event.target.value)}
          placeholder="********"
        />
      </label>
      {errors.confirm ? <p className="profile-input-hint">{errors.confirm}</p> : null}

      <button className="profile-primary-btn" type="submit">
        Lanjut
      </button>
      <p className="profile-auth-footer">
        Sudah punya akun?{" "}
        <button type="button" onClick={() => onSwitchMode("login")}>
          Masuk
        </button>
      </p>
      <AuthSocial />
      <p className="profile-note">Daftar dengan nomor telepon Anda kapan saja.</p>
    </form>
  )
}

function UsernameStep() {
  const router = useRouter()
  const { login } = useAuth()
  const [username, setUsername] = useState("")

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!username.trim()) return
    login({
      hasUmkm: false,
      name: username.trim(),
      username: username.trim().toLowerCase(),
    })
    router.push("/profil")
  }

  return (
    <form className="profile-form" onSubmit={handleSubmit}>
      <label className="profile-input">
        <span>Masukkan nama pengguna</span>
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Masukin namamu yu"
        />
      </label>
      <button className="profile-primary-btn" type="submit">
        Simpan
      </button>
    </form>
  )
}

function AuthSocial() {
  return (
    <div className="profile-social">
      <div className="profile-social-divider">
        <span />
        <p>Masuk dengan</p>
        <span />
      </div>
      <div className="profile-social-buttons">
        <button type="button" aria-label="Masuk dengan Facebook">
          f
        </button>
        <button type="button" aria-label="Masuk dengan Google">
          G
        </button>
      </div>
    </div>
  )
}

function ProfileHeader({ title }: { title: string }) {
  const router = useRouter()
  return (
    <header className="profile-header">
      <button className="profile-back" onClick={() => router.back()} aria-label="Kembali">
        ←
      </button>
      <h1>{title}</h1>
    </header>
  )
}

function UserProfileView() {
  const router = useRouter()
  const { user } = useAuth()
  if (!user) return null
  return (
    <div className="profile-card">
      <ProfileHeader title="Profil" />
      <div className="profile-hero">
        <div className="profile-avatar" aria-hidden="true">
          <span>👤</span>
        </div>
        <div>
          <h2>{user.name}</h2>
          <div className="profile-stats">
            <div>
              <strong>{user.stats.posts}</strong>
              <span>Postingan</span>
            </div>
            <div>
              <strong>{user.stats.collections}</strong>
              <span>Dikoleksi</span>
            </div>
            <div>
              <strong>{user.stats.likes}</strong>
              <span>Disukai</span>
            </div>
          </div>
        </div>
      </div>
      <div className="profile-actions">
        <button onClick={() => router.push("/profil/edit")}>Edit Profil</button>
        <button onClick={() => router.push("/ajukan/tambah-produk")}>Ajukan UMKM</button>
      </div>
      <p className="profile-empty-bio">Tidak ada bio</p>
      <hr />
    </div>
  )
}

function UmkmProfileView() {
  const router = useRouter()
  const { user } = useAuth()
  if (!user) return null
  const placeholders = Array.from({ length: 6 })

  return (
    <div className="profile-card">
      <ProfileHeader title="Profil" />
      <div className="profile-hero">
        <div className="profile-avatar" aria-hidden="true">
          <span>👤</span>
        </div>
        <div>
          <h2>{user.umkmName ?? user.name}</h2>
          <div className="profile-stats">
            <div>
              <strong>{user.stats.posts}</strong>
              <span>Postingan</span>
            </div>
            <div>
              <strong>{user.stats.collections}</strong>
              <span>Dikoleksi</span>
            </div>
            <div>
              <strong>{user.stats.likes}</strong>
              <span>Disukai</span>
            </div>
          </div>
        </div>
      </div>
      <div className="profile-actions">
        <button onClick={() => router.push("/profil/edit")}>Edit Profil</button>
        <button onClick={() => router.push("/ajukan/tambah-produk")}>Tambahkan Produk</button>
      </div>
      <p className="profile-description">{user.umkmDescription ?? user.bio}</p>
      <div className="profile-divider" />
      <div className="profile-grid">
        {placeholders.map((_, index) => (
          <div key={index} className="profile-grid-cell" aria-hidden="true" />
        ))}
      </div>
    </div>
  )
}


