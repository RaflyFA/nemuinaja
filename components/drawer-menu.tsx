"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// === PATH DIPERBAIKI (1) ===
// Path yang benar adalah naik satu level (../) lalu masuk ke 'lib'
import { useAuth } from "../lib/auth-context";

// === PATH DIPERBAIKI (2) ===
// Path yang benar adalah di dalam folder 'components' (./) lalu masuk ke 'pages'
import { APP_PAGES, type AppPageConfig } from "./pages/routes";

interface DrawerMenuProps {
  onRequestClose: () => void;
  onCloseComplete: () => void;
}

export default function DrawerMenu({
  onRequestClose,
  onCloseComplete,
}: DrawerMenuProps) {
  const { isAuthenticated, user, logout } = useAuth();
  const [isContentClosing, setIsContentClosing] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const router = useRouter(); // Diambil dari kode rekan setim

  const handleClose = () => {
    onRequestClose();
    setIsContentClosing(true);
    setIsClosing(true);
    setTimeout(() => onCloseComplete(), 560);
  };

  const handleLogout = () => {
    logout();
    handleClose();
  };

  // Diambil dari kode rekan setim
  const handleMenuItemClick =
    (item: AppPageConfig) => (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      if (item.href) {
        router.push(item.href);
        handleClose();
      }
    };

  return (
    <>
      <div className="drawer-overlay" onClick={handleClose} role="presentation" />

      <nav
        className={`drawer-menu ${isClosing ? "closing" : ""}`}
        role="navigation"
        aria-label="Main menu"
      >
        <button
          className="drawer-close"
          onClick={handleClose}
          aria-label="Close menu"
        >
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

                  {/* === INI KODE ANDA (LINK LOGIN) YANG DIGABUNGKAN === */}
                  <div className="user-links">
                    <Link
                      href="/login"
                      className="user-link"
                      onClick={handleClose}
                    >
                      Masuk
                    </Link>
                    <span className="link-separator">›</span>
                    <Link
                      href="/register" // Kita akan buat halaman ini selanjutnya
                      className="user-link"
                      onClick={handleClose}
                    >
                      Daftar
                    </Link>
                  </div>
                  {/* === AKHIR BLOK ANDA === */}
                </>
              )}
            </div>
          </div>

          <hr className="drawer-divider" />

          {/* === INI KODE REKAN SETIM ANDA (MENU DINAMIS) YANG DIGABUNGKAN === */}
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
                        <a
                          href={sub.href ?? "#"}
                          onClick={handleMenuItemClick(sub)}
                        >
                          {sub.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
          {/* === AKHIR BLOK REKAN SETIM ANDA === */}
        </div>
      </nav>
    </>
  );
}