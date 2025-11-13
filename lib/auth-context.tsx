"use client"

import type React from "react"
import { createContext, useState, useContext } from "react"

interface User {
  name: string
}

interface AuthContextType {
  isAuthenticated: boolean
  user: User | null
  login: (username?: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  const login = (username = "Rafliii_7") => {
    setIsAuthenticated(true)
    setUser({ name: username })
  }

  const logout = () => {
    setIsAuthenticated(false)
    setUser(null)
  }

  return <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
