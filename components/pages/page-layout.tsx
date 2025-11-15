"use client"

import type { ReactNode } from "react"
import { useEffect, useState } from "react"
import AppBar from "../app-bar"
import DrawerMenu from "../drawer-menu"
import DrawerSearch from "../drawer-search"

type PageLayoutProps = {
  children: ReactNode
  containerClassName?: string
  mainClassName?: string
  hideAppBar?: boolean
}

function PlainLayout({
  children,
  containerClassName,
  mainClassName,
}: {
  children: ReactNode
  containerClassName: string
  mainClassName?: string
}) {
  return (
    <div className={containerClassName}>
      <main className={mainClassName ?? ""}>{children}</main>
    </div>
  )
}

function LayoutWithAppBar({
  children,
  containerClassName,
  mainClassName,
}: {
  children: ReactNode
  containerClassName: string
  mainClassName?: string
}) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuVisible, setMenuVisible] = useState(false)
  const [searchVisible, setSearchVisible] = useState(false)

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

  const isDrawerOpen = menuOpen || searchOpen

  return (
    <div className={containerClassName}>
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

      <main className={`${mainClassName ?? ""} ${isDrawerOpen ? "blur" : ""}`.trim()}>{children}</main>
    </div>
  )
}

export default function PageLayout({
  children,
  containerClassName = "home-container",
  mainClassName,
  hideAppBar = false,
}: PageLayoutProps) {
  if (hideAppBar) {
    return <PlainLayout containerClassName={containerClassName} mainClassName={mainClassName}>{children}</PlainLayout>
  }

  return (
    <LayoutWithAppBar containerClassName={containerClassName} mainClassName={mainClassName}>
      {children}
    </LayoutWithAppBar>
  )
}
