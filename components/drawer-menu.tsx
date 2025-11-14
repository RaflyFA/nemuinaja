"use client"

import { useState } from "react"
// Perbaikan: Mencoba lagi path relatif
import { useAuth } from "../lib/auth-context" 
import Link from "next/link";

interface DrawerMenuProps {
  onRequestClose: () => void
  onCloseComplete: () => void
}

export default function DrawerMenu({ onRequestClose, onCloseComplete }: DrawerMenuProps) {
  const { isAuthenticated, user, login, logout } = useAuth() // login (dari useAuth) tidak kita pakai lagi di sini
  const [isContentClosing, setIsContentClosing] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  const handleClose = () => {
    // tell parent to hide AppBar immediately (request)
    onRequestClose()
    // start both inner-content fade and drawer slide together so the content
    // remains visible while the drawer moves up (no early disappearance)
    setIsContentClosing(true)
    setIsClosing(true)
    // wait for the full CSS animation duration (matching globals.css: 0.52s) before unmount
    setTimeout(() => onCloseComplete(), 560)
  }

  const handleLogout = () => {
    logout()
    handleClose()
  }

  // Kita tidak lagi memerlukan 'handleLogin' karena navigasi
  // akan ditangani oleh <Link>
  //
  // const handleLogin = () => {
  //  login()
  //  handleClose()
  // }

  const menuItems = [
    "Profil",
    "Beranda",
    "Direktori",
    "Ajukan UMKM",
    "Favorit Saya",
    "Koleksi Saya",
    "Tentang Kami",
    "Bantuan",
  ]

  return (
    <>
      <div className="drawer-overlay" onClick={handleClose} role="presentation" />

      <nav className={`drawer-menu ${isClosing ? "closing" : ""}`} role="navigation" aria-label="Main menu">
        <button className="drawer-close" onClick={handleClose} aria-label="Close menu">
          ✕
        </button>

        <div className={`drawer-inner ${isContentClosing ? "content-closing" : ""}`}>
          <div className="drawer-header">
            <div className="user-icon">👤</div> {/* Ganti dengan <Image> jika perlu */}
            <div className="user-info">
              {isAuthenticated ? (
                <>
                  <p className="user-name">{user?.name}</p>
                  <button className="user-link" onClick={handleLogout}>
                    Keluar
                  </button>
                </>
              ) : (
                <>
                  <p className="user-greeting">Hai, Kamu</p>
                  
                  {/* === BLOK YANG DIUBAH === */}
                  <div className="user-links">
                    <Link
                      href="/login"
                      className="user-link"
                      onClick={handleClose}
                    >
                      Masuk
                    </Link> { /* Perbaikan: Tag penutup yang benar */ }
                    <span className="link-separator">›</span>
                    <Link
                      href="/register" // Kita akan buat halaman ini selanjutnya
                      className="user-link"
                      onClick={handleClose}
                    >
                      Daftar
                    </Link>
                  </div>
                  {/* === AKHIR BLOK YANG DIUBAH === */}

                </>
              )}
            </div>
          </div>

          <hr className="drawer-divider" />

          <ul className="menu-list">
            {menuItems.map((item) => (
              <li key={item}>
                {/* Anda juga bisa mengubah ini menjadi <Link> nanti */}
                <a href="#" onClick={(e) => e.preventDefault()}>
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  )
}