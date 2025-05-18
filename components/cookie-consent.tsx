"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

export default function CookieConsent() {
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
            Utilizamos cookies para melhorar sua experiência em nosso site. Eles nos ajudam a entender como você
            interage com nosso conteúdo e a personalizar sua experiência. Ao clicar em "Aceitar", você concorda com o
            uso de cookies conforme descrito em nossa{" "}
            <a href="/privacidade" className="underline hover:text-white">
              Política de Privacidade
            </a>
            . Para mais informações, entre em contato via{" "}
            <a href="mailto:contato@spinova.solutions" className="underline hover:text-white">
              contato@spinova.solutions
            </a>
            .
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" onClick={declineCookies} className="text-gray-300 border-gray-700">
            Recusar
          </Button>
          <Button size="sm" onClick={acceptCookies}>
            Aceitar
          </Button>
          <button
            onClick={() => setShowConsent(false)}
            className="text-gray-400 hover:text-white p-1"
            aria-label="Fechar aviso de cookies"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
