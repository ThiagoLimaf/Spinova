"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"

type Language = "en" | "pt-BR"

type LanguageContextType = {
  language: Language
  setLanguage: (language: Language) => void
  isLoading: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [language, setLanguageState] = useState<Language>("pt-BR")
  const [isLoading, setIsLoading] = useState(false)

  // Initialize language from localStorage or browser preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    const browserLanguage = navigator.language

    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "pt-BR")) {
      setLanguageState(savedLanguage)
    } else if (browserLanguage.startsWith("en")) {
      setLanguageState("en")
    } else if (browserLanguage.startsWith("pt")) {
      setLanguageState("pt-BR")
    }
  }, [])

  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("language", language)

    // Set HTML lang attribute
    document.documentElement.lang = language

    // You could also update the URL to include the language
    // e.g., /en/about, /pt-BR/about
    // This would require more complex routing setup
  }, [language])

  const setLanguage = (newLanguage: Language) => {
    setIsLoading(true)
    setLanguageState(newLanguage)

    // Simulate page transition for better UX
    setTimeout(() => {
      setIsLoading(false)
    }, 300)
  }

  return <LanguageContext.Provider value={{ language, setLanguage, isLoading }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
