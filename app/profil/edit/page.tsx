"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import PageLayout from "../../../components/pages/page-layout"
import Footer from "../../../components/footer"
import { useAuth } from "../../../lib/auth-context"

export default function EditProfilePage() {
  const router = useRouter()
  const { isAuthenticated, user, updateProfile } = useAuth()
  const [formState, setFormState] = useState({
    name: user?.name ?? "",
    bio: user?.bio ?? "",
    link: user?.link ?? "",
  })

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/profil")
    }
  }, [isAuthenticated, router])

  useEffect(() => {
    if (user) {
      setFormState({ name: user.name, bio: user.bio, link: user.link })
    }
  }, [user])

  if (!isAuthenticated || !user) {
    return null
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    updateProfile({
      name: formState.name,
      bio: formState.bio,
      link: formState.link,
      umkmDescription: user.hasUmkm ? formState.bio : undefined,
    })
    router.push("/profil")
  }

  return (
    <>
      <PageLayout containerClassName="profile-container" mainClassName="profile-page">
        <div className="profile-card">
          <header className="profile-header">
            <button className="profile-back" onClick={() => router.back()} aria-label="Kembali">
              ←
            </button>
            <h1>Edit profil</h1>
          </header>
          <div className="profile-avatar-large">
            <span>👤</span>
            <button type="button">Ubah foto</button>
          </div>

          <form className="profile-edit-form" onSubmit={handleSubmit}>
            <label className="profile-edit-field">
              <span>Nama</span>
              <input
                type="text"
                value={formState.name}
                onChange={(event) => setFormState((prev) => ({ ...prev, name: event.target.value }))}
                placeholder="Masukkan nama"
              />
            </label>
            <label className="profile-edit-field">
              <span>Bio</span>
              <textarea
                value={formState.bio}
                onChange={(event) => setFormState((prev) => ({ ...prev, bio: event.target.value }))}
                placeholder="Tulis deskripsi singkat tentang dirimu"
              />
            </label>
            <label className="profile-edit-field">
              <span>Link</span>
              <input
                type="text"
                value={formState.link}
                onChange={(event) => setFormState((prev) => ({ ...prev, link: event.target.value }))}
                placeholder="Tambahkan Link"
              />
            </label>
            <button className="profile-primary-btn" type="submit">
              Simpan
            </button>
          </form>
        </div>
      </PageLayout>
      <Footer />
    </>
  )
}
