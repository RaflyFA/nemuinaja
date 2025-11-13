"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"

interface DrawerMenuProps {
  onRequestClose: () => void
  onCloseComplete: () => void
}

export default function DrawerMenu({ onRequestClose, onCloseComplete }: DrawerMenuProps) {
  const { isAuthenticated, user, login, logout } = useAuth()
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

  const handleLogin = () => {
    login()
    handleClose()
  }

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
            <div className="user-icon">👤</div>
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
                  <div className="user-links">
                    <button className="user-link" onClick={handleLogin}>
                      Masuk
                    </button>
                    <span className="link-separator">›</span>
                    <button className="user-link">Daftar</button>
                  </div>
                </>
              )}
            </div>
          </div>

          <hr className="drawer-divider" />

          <ul className="menu-list">
            {menuItems.map((item) => (
              <li key={item}>
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
