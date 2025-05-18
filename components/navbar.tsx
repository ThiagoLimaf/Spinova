"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { trackEvent } from "./event-tracking"
import { cn } from "@/lib/utils"
import { HamburgerMenuIcon } from "./hamburger-menu-icon"
import { useActiveSection } from "./active-section-observer"
import { scrollToSection } from "@/utils/scroll-utils"
import { useMobileMenu } from "./mobile-menu-provider"

// Navigation items
const navItems = [
  { href: "#pilares", label: "Pilares" },
  { href: "#beneficios", label: "Benefícios" },
  { href: "#clientes", label: "Clientes" },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { activeSection } = useActiveSection()
  const { isOpen, setIsOpen, toggleMenu } = useMobileMenu()
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const lastScrollY = useRef(0)
  const [hideNavbar, setHideNavbar] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Show/hide navbar based on scroll direction
      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY.current) {
          setHideNavbar(true)
        } else {
          setHideNavbar(false)
        }
      } else {
        setHideNavbar(false)
      }

      lastScrollY.current = currentScrollY
      setScrolled(currentScrollY > 10)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (
        isOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(target) &&
        !target.closest("[data-menu-button]")
      ) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("click", handleClickOutside)
    }

    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [isOpen, setIsOpen])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
      // Add touch event listeners for swipe to close
      document.addEventListener("touchstart", handleTouchStart)
      document.addEventListener("touchmove", handleTouchMove)
      document.addEventListener("touchend", handleTouchEnd)
    } else {
      document.body.style.overflow = ""
      // Remove touch event listeners
      document.removeEventListener("touchstart", handleTouchStart)
      document.removeEventListener("touchmove", handleTouchMove)
      document.removeEventListener("touchend", handleTouchEnd)
    }

    return () => {
      document.body.style.overflow = ""
      document.removeEventListener("touchstart", handleTouchStart)
      document.removeEventListener("touchmove", handleTouchMove)
      document.removeEventListener("touchend", handleTouchEnd)
    }
  }, [isOpen])

  // Touch handling for swipe to close
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e: TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    // Swipe right to close menu
    if (touchStartX.current - touchEndX.current > 100 && isOpen) {
      setIsOpen(false)
    }
  }

  const handleNavClick = (section: string, href: string) => {
    trackEvent("navigation_click", { section })
    setIsOpen(false)

    // Extract the section ID from the href
    const sectionId = href.startsWith("#") ? href.substring(1) : href

    // Add a small delay on mobile to ensure menu closes first
    if (window.innerWidth < 768) {
      setTimeout(() => {
        scrollToSection(sectionId)
      }, 300)
    } else {
      scrollToSection(sectionId)
    }
  }

  const handleContactClick = () => {
    trackEvent("contact_button_click", { location: "navbar" })
    setIsOpen(false)
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300",
        scrolled ? "border-border/40 bg-background/95 shadow-sm" : "border-transparent bg-background/50",
        hideNavbar ? "-translate-y-full" : "translate-y-0",
      )}
    >
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <Link
          href="/"
          className="flex items-center space-x-2 touch-manipulation"
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
          {navItems.map((item) => {
            const isActive = activeSection === item.href.substring(1)
            return (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "transition-colors hover:text-primary relative py-1 px-1",
                  isActive ? "text-primary font-semibold" : "text-foreground/80",
                )}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(item.href.substring(1), item.href)
                }}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
                {isActive && <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />}
              </a>
            )
          })}
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
            className="touch-manipulation"
          >
            <Button size="sm">Entre em contato</Button>
          </a>
        </div>

        {/* Animated Hamburger Menu Button */}
        <button
          className="md:hidden flex items-center justify-center w-12 h-12 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary touch-manipulation"
          onClick={toggleMenu}
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
          ref={mobileMenuRef}
          className={cn(
            "fixed inset-y-0 right-0 z-50 w-full max-w-xs bg-background shadow-xl md:hidden transition-transform duration-300 ease-in-out overscroll-contain",
            isOpen ? "translate-x-0" : "translate-x-full",
          )}
          data-mobile-menu
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b">
              <Link
                href="/"
                className="flex items-center space-x-2 touch-manipulation"
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
                className="flex items-center justify-center w-12 h-12 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary touch-manipulation"
                onClick={() => setIsOpen(false)}
                aria-label="Fechar menu"
              >
                <HamburgerMenuIcon isOpen={true} />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto p-4 overscroll-contain" aria-label="Menu mobile">
              <ul className="space-y-4">
                {navItems.map((item, index) => {
                  const isActive = activeSection === item.href.substring(1)
                  return (
                    <li key={index} className="menu-item-appear" style={{ animationDelay: `${index * 100}ms` }}>
                      <a
                        href={item.href}
                        className={cn(
                          "flex items-center justify-between py-4 px-4 rounded-md transition-colors touch-manipulation",
                          isActive
                            ? "bg-primary/10 text-primary font-medium"
                            : "hover:bg-gray-100/10 text-foreground/80",
                        )}
                        onClick={(e) => {
                          e.preventDefault()
                          handleNavClick(item.href.substring(1), item.href)
                        }}
                        aria-current={isActive ? "page" : undefined}
                      >
                        <span className="text-lg">{item.label}</span>
                        <ArrowRight className={cn("h-4 w-4", isActive ? "text-primary" : "opacity-70")} />
                      </a>
                    </li>
                  )
                })}
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
                className="flex items-center justify-center w-full py-4 px-4 rounded-md bg-white text-black hover:bg-gray-100 transition-colors touch-manipulation"
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
