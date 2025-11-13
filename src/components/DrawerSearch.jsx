"use client"

export default function DrawerSearch({ onClose }) {
  const categories = ["Kerajinan", "Baju", "Makanan", "Minuman", "Kesenian"]

  return (
    <>
      <div className="drawer-overlay" onClick={onClose} role="presentation" />
      <div className="drawer-search" role="search" aria-label="Search">
        <button className="drawer-close" onClick={onClose} aria-label="Close search">
          ✕
        </button>

        <div className="search-container">
          <h2 className="search-title">Cari</h2>

          <input type="text" className="search-input" placeholder="Cari UMKM..." autoFocus />

          <p className="search-subtitle">Paling banyak dicari</p>
          <div className="search-chips">
            {categories.map((cat) => (
              <button key={cat} className="chip">
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
