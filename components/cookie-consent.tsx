"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { t } from "@/utils/translate"

export default function CookieConsent() {
  const { language } = useLanguage()
  const [showConsent, setShowConsent] = useState(false)

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem("cookieConsent")
    if (!hasConsented) {
      setShowConsent(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "true")
    setShowConsent(false)

    // Enable analytics tracking
    if (window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: "granted",
      })
    }
  }

  const declineCookies = () => {
    localStorage.setItem("cookieConsent", "false")
    setShowConsent(false)

    // Disable analytics tracking
    if (window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: "denied",
      })
    }
  }

  if (!showConsent) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 border-t border-gray-800 p-4 shadow-lg">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-300 max-w-3xl">
          <p>
            {t("cookies.message", language as any)}{" "}
            <a href="mailto:contato@spinova.org.br" className="underline hover:text-white">
              contato@spinova.org.br
            </a>
            .
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" onClick={declineCookies} className="text-gray-300 border-gray-700">
            {t("cookies.decline", language as any)}
          </Button>
          <Button size="sm" onClick={acceptCookies}>
            {t("cookies.accept", language as any)}
          </Button>
          <button
            onClick={() => setShowConsent(false)}
            className="text-gray-400 hover:text-white p-1"
            aria-label={t("cookies.close", language as any)}
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
