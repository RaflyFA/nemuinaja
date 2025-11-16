"use client"

import { useEffect, useState, useRef } from "react"
import AppBar from "./app-bar"
import DrawerMenu from "./drawer-menu"
import DrawerSearch from "./drawer-search"
import Footer from "./footer"
import Link from "next/link"

type DirectoryCardData = {
  id: number
  name: string
  hours: string
  rating: number
}

const trendingItems: DirectoryCardData[] = [
  { id: 1, name: "Disini Tuh Nama Produknya", hours: "Buka 08.00 - 17.00", rating: 5 },
  { id: 2, name: "Disini Tuh Nama Produknya", hours: "Buka 08.00 - 17.00", rating: 5 },
  { id: 3, name: "Disini Tuh Nama Produknya", hours: "Buka 08.00 - 17.00", rating: 5 },
  { id: 4, name: "Disini Tuh Nama Produknya", hours: "Buka 08.00 - 17.00", rating: 5 },
  { id: 5, name: "Disini Tuh Nama Produknya", hours: "Buka 08.00 - 17.00", rating: 5 },
  { id: 6, name: "Disini Tuh Nama Produknya", hours: "Buka 08.00 - 17.00", rating: 5 },
]

const specialItems: DirectoryCardData[] = [
  { id: 7, name: "Disini Tuh Nama Produknya", hours: "Buka 08.00 - 17.00", rating: 5 },
  { id: 8, name: "Disini Tuh Nama Produknya", hours: "Buka 08.00 - 17.00", rating: 5 },
  { id: 9, name: "Disini Tuh Nama Produknya", hours: "Buka 08.00 - 17.00", rating: 5 },
  { id: 10, name: "Disini Tuh Nama Produknya", hours: "Buka 08.00 - 17.00", rating: 5 },
]

export default function Directory() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuVisible, setMenuVisible] = useState(false)
  const [searchVisible, setSearchVisible] = useState(false)

  const specialTrackRef = useRef<HTMLDivElement | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (searchOpen) setMenuOpen(false)
  }, [searchOpen])

  useEffect(() => {
    if (menuOpen) setSearchOpen(false)
  }, [menuOpen])

  useEffect(() => {
    if (menuOpen || searchOpen) {
      document.body.style.overflow = "hidden"
      document.body.classList.add("drawer-open")
    } else {
      document.body.style.overflow = "auto"
      document.body.classList.remove("drawer-open")
    }

    return () => {
      document.body.style.overflow = "auto"
      document.body.classList.remove("drawer-open")
    }
  }, [menuOpen, searchOpen])

  useEffect(() => {
    const closing = (menuVisible && !menuOpen) || (searchVisible && !searchOpen)
    if (closing) document.body.classList.add("drawer-closing")
    else document.body.classList.remove("drawer-closing")

    return () => document.body.classList.remove("drawer-closing")
  }, [menuVisible, menuOpen, searchVisible, searchOpen])
  useEffect(() => {
    const el = specialTrackRef.current
    if (!el) return

    const update = () => {
      const scrollWidth = el.scrollWidth
      const clientWidth = el.clientWidth
      const maxScroll = scrollWidth - clientWidth
      if (maxScroll <= 0) {
        setActiveIndex(0)
        return
      }
      const page = Math.round((el.scrollLeft / maxScroll) * (specialItems.length - 1))
      setActiveIndex(page)
    }

    update()
    el.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      el.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [])
  const goToIndex = (index: number) => {
    const el = specialTrackRef.current
    if (!el) return
    const scrollWidth = el.scrollWidth
    const clientWidth = el.clientWidth
    const maxScroll = scrollWidth - clientWidth
    if (maxScroll <= 0) return
    const targetLeft = (index / (specialItems.length - 1)) * maxScroll
    el.scrollTo({ left: targetLeft, behavior: "smooth" })
  }

  const isDrawerOpen = menuOpen || searchOpen

  return (
    <div className="directory-container">
      <AppBar
        onMenuClick={() => {
          setMenuOpen(true)
          setMenuVisible(true)
        }}
        onSearchClick={() => {
          setSearchOpen(true)
          setSearchVisible(true)
        }}
        menuOpen={menuOpen}
        searchOpen={searchOpen}
      />

      {menuVisible && (
        <DrawerMenu
          onRequestClose={() => setMenuOpen(false)}
          onCloseComplete={() => setMenuVisible(false)}
        />
      )}

      {searchVisible && (
        <DrawerSearch
          onRequestClose={() => setSearchOpen(false)}
          onCloseComplete={() => setSearchVisible(false)}
        />
      )}

      <main className={`directory-page ${isDrawerOpen ? "blur" : ""}`}>
        <section className="directory-section">
          <h1 className="directory-heading">
            <span className="muted">Trending</span> minggu ini
          </h1>
          <div className="directory-hero-card" aria-hidden />

          <div className="directory-grid">
            {trendingItems.map((item) => (
              <Link key={item.id} href={`/halamanUMKM?id=${item.id}`}>
                <article className="directory-card">
                  <div className="directory-card-media" />
                  <div className="directory-card-body">
                    <span className="directory-rating">
                      <span aria-hidden="true">★</span> {item.rating.toFixed(1)}
                    </span>
                    <h3>{item.name}</h3>
                    <p>{item.hours}</p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>

        <section className="directory-section">
          <div className="directory-section-title">
            <h2>
              Mau nyari yang <span>spesial?</span>
            </h2>
          </div>
          <div className="directory-special-track" ref={specialTrackRef}>
            {specialItems.map((item) => (
              <Link key={item.id} href={`/halamanUMKM?id=${item.id}`}>
                <article className="directory-feature-card">
                  <div className="directory-feature-media" />
                  <div className="directory-feature-body">
                    <span className="directory-rating">
                      <span aria-hidden="true">★</span> {item.rating.toFixed(1)}
                    </span>
                    <h3>{item.name}</h3>
                    <p>{item.hours}</p>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          <div className="directory-scrollbar" aria-hidden>
            <div className="scroll-dots" role="tablist">
              {specialItems.map((_, i) => (
                <button
                  key={i}
                  className={`dot ${i === activeIndex ? "active" : ""}`}
                  onClick={() => goToIndex(i)}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

          <section className="directory-section directory-stack">
            {specialItems.map((item) => (
              <Link key={`stack-${item.id}`} href={`/halamanUMKM?id=${item.id}`}>
                <article className="directory-stack-card">
                  <div className="directory-stack-media" />
                  <div className="directory-stack-body">
                    <span className="directory-rating">
                      <span aria-hidden="true">★</span> {item.rating.toFixed(1)}
                    </span>
                    <h3>{item.name}</h3>
                    <p>{item.hours}</p>
                  </div>
                </article>
              </Link>
            ))}
          </section>
        </main>

        <Footer />
    </div>
  )
}
