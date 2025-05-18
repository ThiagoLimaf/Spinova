"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { trackEvent } from "./event-tracking"
import { cn } from "@/lib/utils"
import { HamburgerMenuIcon } from "./hamburger-menu-icon"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (isOpen && !target.closest("[data-mobile-menu]") && !target.closest("[data-menu-button]")) {
        setIsOpen(false)
      }
    }
    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [isOpen])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const handleNavClick = (section: string) => {
    trackEvent("navigation_click", { section })
    setIsOpen(false)
  }

  const handleContactClick = () => {
    trackEvent("contact_button_click", { location: "navbar" })
    setIsOpen(false)
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-200",
        scrolled ? "border-border/40 bg-background/95 shadow-sm" : "border-transparent bg-background/50",
      )}
    >
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <Link
          href="/"
          className="flex items-center space-x-2 mobile-touch-target"
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

        {/* Desktop Navigation */}
        <nav
          className="hidden md:flex mx-auto items-center justify-center space-x-8 text-sm font-medium"
          aria-label="Principal"
        >
          <Link
            href="#pilares"
            className="transition-colors hover:text-primary mobile-touch-target"
            onClick={() => handleNavClick("pilares")}
          >
            Pilares
          </Link>
          <Link
            href="#beneficios"
            className="transition-colors hover:text-primary mobile-touch-target"
            onClick={() => handleNavClick("beneficios")}
          >
            Benefícios
          </Link>
          <Link
            href="#clientes"
            className="transition-colors hover:text-primary mobile-touch-target"
            onClick={() => handleNavClick("clientes")}
          >
            Clientes
          </Link>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center">
          <a
            href="mailto:contato@spinova.solutions"
            onClick={(e) => {
              e.preventDefault()
              window.location.href = "mailto:contato@spinova.solutions"
              handleContactClick()
            }}
            className="mobile-touch-target"
          >
            <Button size="sm">Entre em contato</Button>
          </a>
        </div>

        {/* Animated Hamburger Menu Button */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary mobile-touch-target"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          data-menu-button
        >
          <HamburgerMenuIcon isOpen={isOpen} />
        </button>

        {/* Mobile Menu Overlay */}
        <div
          className={cn(
            "fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300",
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
          )}
          aria-hidden="true"
        />

        {/* Mobile Menu */}
        <div
          id="mobile-menu"
          className={cn(
            "fixed inset-y-0 right-0 z-50 w-full max-w-xs bg-background shadow-xl md:hidden transition-transform duration-300 ease-in-out",
            isOpen ? "translate-x-0" : "translate-x-full",
          )}
          data-mobile-menu
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b">
              <Link
                href="/"
                className="flex items-center space-x-2 mobile-touch-target"
                aria-label="Spinova - Página inicial"
                onClick={() => {
                  trackEvent("logo_click")
                  setIsOpen(false)
                }}
              >
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Spinova%20extented%20white%20logo-quepSGTq5FZuyDy7EPwkwm4aHsnR0r.png"
                  alt="Spinova Logo"
                  width={120}
                  height={30}
                  className="h-8 w-auto"
                />
              </Link>
              <button
                className="flex items-center justify-center w-10 h-10 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary mobile-touch-target"
                onClick={() => setIsOpen(false)}
                aria-label="Fechar menu"
              >
                <HamburgerMenuIcon isOpen={true} />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto p-4" aria-label="Menu mobile">
              <ul className="space-y-4">
                {[
                  { href: "#pilares", label: "Pilares" },
                  { href: "#beneficios", label: "Benefícios" },
                  { href: "#clientes", label: "Clientes" },
                ].map((item, index) => (
                  <li key={index} className="menu-item-appear" style={{ animationDelay: `${index * 100}ms` }}>
                    <Link
                      href={item.href}
                      className="flex items-center justify-between py-3 px-4 rounded-md hover:bg-gray-100/10 transition-colors mobile-touch-target"
                      onClick={() => handleNavClick(item.label.toLowerCase())}
                    >
                      <span className="text-lg font-medium">{item.label}</span>
                      <ArrowRight className="h-4 w-4 opacity-70" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="p-4 border-t mt-auto">
              <a
                href="mailto:contato@spinova.solutions"
                onClick={(e) => {
                  if (window.innerWidth > 768) {
                    e.preventDefault()
                    window.location.href = "mailto:contato@spinova.solutions"
                  }
                  handleContactClick()
                }}
                className="flex items-center justify-center w-full py-3 px-4 rounded-md bg-white text-black hover:bg-gray-100 transition-colors mobile-touch-target"
              >
                <span className="font-medium">Entre em contato</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
