"use client"

import React from "react"
import AppBar from "../components/AppBar"
import DrawerMenu from "../components/DrawerMenu"
import DrawerSearch from "../components/DrawerSearch"
import Hero from "../components/Hero"
import Carousel from "../components/Carousel"
import Categories from "../components/Categories"
import CtaDark from "../components/CtaDark"
import Faq from "../components/Faq"
import Footer from "../components/Footer"

export default function Home() {
  const [menuOpen, setMenuOpen] = React.useState(false)
  const [searchOpen, setSearchOpen] = React.useState(false)

  return (
    <div className="home-container">
      <AppBar onMenuClick={() => setMenuOpen(!menuOpen)} onSearchClick={() => setSearchOpen(!searchOpen)} />
      {menuOpen && <DrawerMenu onClose={() => setMenuOpen(false)} />}
      {searchOpen && <DrawerSearch onClose={() => setSearchOpen(false)} />}

      <main className="home-content">
        <Hero />
        <Carousel />
        <Categories />
        <CtaDark />
        <Faq />
        <Footer />
      </main>
    </div>
  )
}
