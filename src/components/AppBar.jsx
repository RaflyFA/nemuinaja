"use client"

export default function AppBar({ onMenuClick, onSearchClick }) {
  return (
    <header className="appbar">
      <div className="appbar-container">
        <div className="logo">
          <span className="logo-icon">🎯</span>
          <span className="logo-text">nemuinaja</span>
        </div>
        <div className="appbar-actions">
          <button className="icon-btn" aria-label="Search" onClick={onSearchClick}>
            <img src="/search.webp" alt="Search" className="icon-img" />
          </button>
          <button className="icon-btn hamburger" aria-label="Menu" onClick={onMenuClick}>
            ☰
          </button>
        </div>
      </div>
    </header>
  )
}
