"use client"

import type React from "react"
import { createContext, useState, useContext, useEffect } from "react"

interface UserProfile {
  name: string
  username: string
  bio: string
  link: string
  hasUmkm: boolean
  stats: {
    posts: number
    collections: number
    likes: number
  }
  umkmName?: string
  umkmDescription?: string
  contacts?: string[]
}

interface AuthContextType {
  isAuthenticated: boolean
  isReady: boolean
  user: UserProfile | null
  login: (profile?: Partial<UserProfile>) => void
  logout: () => void
  updateProfile: (updates: Partial<UserProfile>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)
const AUTH_STORAGE_KEY = "nemuinaja_auth_user"

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<UserProfile | null>(null)
  const [isReady, setIsReady] = useState(false)

  const defaultRegularProfile: UserProfile = {
    name: "Ahmad",
    username: "ahmad",
    bio: "",
    link: "",
    hasUmkm: false,
    stats: { posts: 0, collections: 0, likes: 0 },
  }

  const defaultUmkmProfile: UserProfile = {
    name: "Payung Geulis Karya Utama",
    username: "payung_tasik",
    bio: "Payung Geulis Karya Utama adalah salah satu UMKM ada di Kota Tasikmalaya yang juga mengangkat kearifan lokal.",
    link: "https://instagram.com/payung_tasik",
    hasUmkm: true,
    stats: { posts: 3, collections: 3, likes: 3 },
    umkmName: "Payung Geulis Karya Utama",
    umkmDescription:
      "Payung Geulis Karya Utama adalah salah satu UMKM ada di Kota Tasikmalaya yang juga mengangkat kearifan lokal.\n\nKalian juga bisa hubungi kami lewat kontak di bawah ini:\nIG: @payung_tasik\nno: +621224920860",
    contacts: ["IG: @payung_tasik", "no: +621224920860"],
  }

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(AUTH_STORAGE_KEY) : null
      if (raw) {
        const parsed = JSON.parse(raw) as UserProfile
        setUser(parsed)
        setIsAuthenticated(true)
      }
    } catch {
      setUser(null)
      setIsAuthenticated(false)
    }
    setIsReady(true)
  }, [])

  const login = (profile?: Partial<UserProfile>) => {
    const base = profile?.hasUmkm ? defaultUmkmProfile : defaultRegularProfile
    const nextUser = { ...base, ...profile }
    setIsAuthenticated(true)
    setUser(nextUser)
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextUser))
    } catch {
      // ignore storage errors
    }
  }

  const logout = () => {
    setIsAuthenticated(false)
    setUser(null)
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY)
    } catch {
      // ignore
    }
  }

  const updateProfile = (updates: Partial<UserProfile>) => {
    setUser((prev) => {
      if (!prev) return prev
      const nextUser = { ...prev, ...updates }
      try {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextUser))
      } catch {
        // ignore
      }
      return nextUser
    })
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, updateProfile, isReady }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
