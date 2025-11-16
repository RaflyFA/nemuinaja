"use client"

import { useState } from "react"
import { useRef, useEffect } from "react"

interface DrawerSearchProps {
  onRequestClose: () => void
  onCloseComplete: () => void
}

export default function DrawerSearch({ onRequestClose, onCloseComplete }: DrawerSearchProps) {
  const [isContentClosing, setIsContentClosing] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [showInput, setShowInput] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const categories = ["Kerajinan", "Baju", "Makanan", "Minuman", "Kesenian"]

  const handleClose = () => {
    onRequestClose()
    setIsContentClosing(true)
    setIsClosing(true)
    setTimeout(() => onCloseComplete(), 560)
  }

  useEffect(() => {
    if (showInput) {
      const t = setTimeout(() => inputRef.current?.focus(), 80)
      return () => clearTimeout(t)
    }
  }, [showInput])

  const openInput = () => setShowInput(true)
  const closeInput = () => setShowInput(false)

  return (
    <>
      <div className="drawer-overlay" onClick={handleClose} role="presentation" />
      <div className={`drawer-search ${isClosing ? 'closing' : ''}`} role="search" aria-label="Search">
        <button className="drawer-close" onClick={handleClose} aria-label="Close search">
          ✕
        </button>

        <div className={`drawer-inner ${isContentClosing ? 'content-closing' : ''}`}>
          <div className="search-container">
            <div className="search-header">
              <button className="icon-btn search-toggle" aria-label="Open search input" onClick={openInput}>
                <img src="/search.webp" alt="search" style={{ width: 20, height: 20 }} />
              </button>
              <h2 className={`search-title ${showInput ? 'hidden' : ''}`}>Cari</h2>
              <input
                ref={inputRef}
                type="text"
                className={`search-input-inline ${showInput ? 'visible' : 'hidden'}`}
                placeholder="Cari UMKM..."
                aria-hidden={!showInput}
              />
            </div>

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
      </div>
    </>
  )
}
