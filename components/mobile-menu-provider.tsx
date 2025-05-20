"use client"

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react"

type MobileMenuContextType = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  toggleMenu: () => void
  isAnimating: boolean
}

const MobileMenuContext = createContext<MobileMenuContextType | undefined>(undefined)

export function MobileMenuProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  // Handle animation states
  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true)
      // Animation duration is approximately 400ms
      const timer = setTimeout(() => {
        setIsAnimating(false)
      }, 400)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  return (
    <MobileMenuContext.Provider value={{ isOpen, setIsOpen, toggleMenu, isAnimating }}>
      {children}
    </MobileMenuContext.Provider>
  )
}

export function useMobileMenu() {
  const context = useContext(MobileMenuContext)
  if (context === undefined) {
    throw new Error("useMobileMenu must be used within a MobileMenuProvider")
  }
  return context
}
