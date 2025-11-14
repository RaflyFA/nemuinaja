"use client"

import type React from "react"
import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { APP_PAGES, type AppPageConfig } from "./pages/routes"

interface DrawerMenuProps {
  onRequestClose: () => void
  onCloseComplete: () => void
}

export default function DrawerMenu({ onRequestClose, onCloseComplete }: DrawerMenuProps) {
  const { isAuthenticated, user, login, logout } = useAuth()
  const [isContentClosing, setIsContentClosing] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const router = useRouter()

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

  const handleMenuItemClick = (item: AppPageConfig) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    if (item.href) {
      router.push(item.href)
      handleClose()
    }
  }

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
            {APP_PAGES.map((item) => (
              <li key={item.key}>
                <a href={item.href ?? "#"} onClick={handleMenuItemClick(item)}>
                  {item.label}
                </a>
                {item.subPages?.length ? (
                  <ul className="submenu-list">
                    {item.subPages.map((sub) => (
                      <li key={sub.key}>
                        <a href={sub.href ?? "#"} onClick={handleMenuItemClick(sub)}>
                          {sub.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  )
}
