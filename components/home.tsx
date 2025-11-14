"use client"

import { useState, useEffect } from "react"
import AppBar from "./app-bar"
import DrawerMenu from "./drawer-menu"
import DrawerSearch from "./drawer-search"
import Hero from "./hero"
import Carousel from "./carousel"
import Categories from "./categories"
import CtaDark from "./cta-dark"
import Faq from "./faq"
import Footer from "./footer"

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  // control mounting so we can show/hide AppBar immediately while drawer finishes its animation
  const [menuVisible, setMenuVisible] = useState(false)
  const [searchVisible, setSearchVisible] = useState(false)

  // Auto close menu saat search dibuka
  useEffect(() => {
    if (searchOpen) {
      setMenuOpen(false)
    }
  }, [searchOpen])

  // Auto close search saat menu dibuka
  useEffect(() => {
    if (menuOpen) {
      setSearchOpen(false)
    }
  }, [menuOpen])

  // Cegah scroll saat drawer aktif
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

  // Manage a 'drawer-closing' class so the AppBar can be promoted while the
  // drawer is still mounted but closing. This allows the navbar to fade in
  // and come to the front smoothly.
  useEffect(() => {
    const closing = (menuVisible && !menuOpen) || (searchVisible && !searchOpen)
    if (closing) {
      document.body.classList.add("drawer-closing")
    } else {
      document.body.classList.remove("drawer-closing")
    }

    return () => {
      document.body.classList.remove("drawer-closing")
    }
  }, [menuVisible, menuOpen, searchVisible, searchOpen])

  const isDrawerOpen = menuOpen || searchOpen

  return (
    <div className="home-container">
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
          onRequestClose={() => {
            // request close: hide appbar immediately but keep drawer mounted to animate
            setMenuOpen(false)
          }}
          onCloseComplete={() => {
            // finally unmount drawer after it finished animating
            setMenuVisible(false)
          }}
        />
      )}

      {searchVisible && (
        <DrawerSearch
          onRequestClose={() => {
            setSearchOpen(false)
          }}
          onCloseComplete={() => {
            setSearchVisible(false)
          }}
        />
      )}

      <main className={`home-content ${isDrawerOpen ? 'blur' : ''}`}>
        <Hero />
        <Carousel />
        <Categories />
        <CtaDark />
        <Faq />
      </main>

      <Footer />
    </div>
  )
}
