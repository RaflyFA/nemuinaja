"use client";

import type React from "react";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// === PATH DIPERBAIKI (1) ===
// Path yang benar adalah naik satu level (../) lalu masuk ke 'lib'
import { useAuth } from "../lib/auth-context";

// === PATH DIPERBAIKI (2) ===
// Path yang benar adalah di dalam folder 'components' (./) lalu masuk ke 'pages'
import { APP_PAGES, type AppPageConfig } from "./pages/routes";

const DEVELOPER_EMAIL = "developer@nemuinaja.id";

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
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [helpEmail, setHelpEmail] = useState("");
  const [helpMessage, setHelpMessage] = useState("");
  const [helpError, setHelpError] = useState<string | null>(null);
  const helpMessageRef = useRef<HTMLTextAreaElement | null>(null);
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
    (item: AppPageConfig) =>
    (event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
      event.preventDefault();
      if (item.requiresAuth && !isAuthenticated) {
        router.push("/profil");
        handleClose();
        return;
      }
      if (item.opensHelpPanel) {
        setIsHelpOpen((prev) => !prev);
        setHelpError(null);
        return;
      }
      if (item.href) {
        router.push(item.href);
        handleClose();
      }
    };

  const handleHelpSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!helpMessage.trim()) {
      setHelpError("Kamu harus isi kolom yang ini yaa");
      helpMessageRef.current?.focus();
      return;
    }

    const subject = encodeURIComponent("Keluhan Pengguna nemuinaja");
    const bodyLines = [
      `Email: ${helpEmail || "-"}`,
      "",
      "Keluhan:",
      helpMessage.trim(),
    ];
    const body = encodeURIComponent(bodyLines.join("\n"));
    window.open(`mailto:${DEVELOPER_EMAIL}?subject=${subject}&body=${body}`, "_blank");
    setHelpMessage("");
    setHelpEmail("");
    setIsHelpOpen(false);
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
                    <Link
                      href="/profil"
                      className="user-link"
                      onClick={handleClose}
                    >
                      Masuk
                    </Link>
                    <span className="link-separator">›</span>
                    <Link
                      href="/profil"
                      className="user-link"
                      onClick={handleClose}
                    >
                      Daftar
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
          <hr className="drawer-divider" />
          <ul className="menu-list">
            {APP_PAGES.map((item) => (
              <li key={item.key}>
                {item.opensHelpPanel ? (
                  <button
                    type="button"
                    className={`menu-help-trigger ${isHelpOpen ? "active" : ""}`}
                    onClick={handleMenuItemClick(item)}
                  >
                    {item.label}
                  </button>
                ) : (
                  <a
                    className="menu-page-link"
                    href={item.href ?? "#"}
                    onClick={handleMenuItemClick(item)}
                  >
                    {item.label}
                  </a>
                )}
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

          <div className={`drawer-help-panel ${isHelpOpen ? "visible" : ""}`}>
            <div className="drawer-help-header">
              <div>
                <p className="help-title">Bantuan</p>
                <p className="help-subtitle">Ceritakan masalahmu, kami siap bantu.</p>
              </div>
              <button
                className="help-close"
                type="button"
                aria-label="Tutup bantuan"
                onClick={() => setIsHelpOpen(false)}
              >
                ×
              </button>
            </div>
            <form className="help-form" onSubmit={handleHelpSubmit}>
              <label className="help-label" htmlFor="help-email">
                Email kamu
              </label>
              <input
                id="help-email"
                className="help-input"
                type="email"
                placeholder="contoh@nemuinaja.id"
                value={helpEmail}
                onChange={(event) => setHelpEmail(event.target.value)}
              />
              <label className="help-label" htmlFor="help-message">
                Ceritakan masalahmu
              </label>
              <div className="help-textarea-wrapper">
                <textarea
                  id="help-message"
                  className="help-textarea"
                  ref={helpMessageRef}
                  placeholder="Jelaskan kendala yang kamu alami..."
                  value={helpMessage}
                  onChange={(event) => setHelpMessage(event.target.value)}
                  onInput={() => setHelpError(null)}
                  onInvalid={(event) => {
                    event.preventDefault();
                    setHelpError("Kamu harus isi kolom yang ini yaa");
                  }}
                  required
                />
                <button className="help-send" type="submit" aria-label="Kirim keluhan">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M4 12L20 4L13 20L11 13L4 12Z"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
              {helpError ? (
                <div className="help-error" role="alert">
                  <span className="help-error-icon">!</span>
                  <span>{helpError}</span>
                </div>
              ) : null}
              <span className="help-note">Pesanmu akan diteruskan ke {DEVELOPER_EMAIL}</span>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}
