"use client"

interface AppBarProps {
  onMenuClick: () => void
  onSearchClick: () => void
  menuOpen?: boolean
  searchOpen?: boolean
}

export default function AppBar({ onMenuClick, onSearchClick, menuOpen = false, searchOpen = false }: AppBarProps) {
  const isDrawerOpen = menuOpen || searchOpen

  return (
    <header className="appbar">
      <div className="appbar-container">
        <div className={`logo ${isDrawerOpen ? 'hidden' : ''}`}>
          <img src="/logo.webp" alt="Search" className="icon-img" style={{ width: "48px", height: "48px" }} />
          <span className="logo-text nemuinaja-text">nemuinaja</span>
        </div>
        <div className="appbar-actions">
          <button className={`icon-btn ${isDrawerOpen ? 'active' : ''}`} aria-label="Search" onClick={onSearchClick}>
            <img src="/search.webp" alt="Search" className="icon-img" style={{ width: "17px", height: "17px" }}/>
          </button>
          <button className={`icon-btn hamburger ${menuOpen ? 'active' : ''}`} aria-label="Menu" onClick={onMenuClick}>
            <img src="/hamburger.webp" alt="Search" className="icon-img" style={{ width: "17px", height: "17px" }}/>
          </button>
        </div>
      </div>
    </header>
  )
}
