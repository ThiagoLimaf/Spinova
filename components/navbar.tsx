"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { trackEvent } from "./event-tracking"

export default function Navbar() {
  const handleNavClick = (section: string) => {
    trackEvent("navigation_click", { section })
  }

  const handleContactClick = () => {
    trackEvent("contact_button_click", { location: "navbar" })
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link
          href="/"
          className="mr-6 flex items-center space-x-2"
          aria-label="Spinova - Página inicial"
          onClick={() => trackEvent("logo_click")}
        >
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Spinova%20extented%20white%20logo-quepSGTq5FZuyDy7EPwkwm4aHsnR0r.png"
            alt="Spinova Logo"
            width={120}
            height={30}
            className="h-8 w-auto"
            priority
          />
        </Link>
        <nav className="flex mx-auto items-center justify-center space-x-8 text-sm font-medium" aria-label="Principal">
          <Link
            href="#pilares"
            className="transition-colors hover:text-primary"
            onClick={() => handleNavClick("pilares")}
          >
            Pilares
          </Link>
          <Link
            href="#beneficios"
            className="transition-colors hover:text-primary"
            onClick={() => handleNavClick("beneficios")}
          >
            Benefícios
          </Link>
          <Link
            href="#clientes"
            className="transition-colors hover:text-primary"
            onClick={() => handleNavClick("clientes")}
          >
            Clientes
          </Link>
        </nav>
        <div className="flex items-center">
          <a
            href="mailto:contato@spinova.solutions"
            onClick={(e) => {
              e.preventDefault()
              window.location.href = "mailto:contato@spinova.solutions"
              handleContactClick()
            }}
          >
            <Button size="sm">Entre em contato</Button>
          </a>
        </div>
      </div>
    </header>
  )
}
