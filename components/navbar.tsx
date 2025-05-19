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
import { FadeIn } from "./animations/fade-in"

// Navigation items
const navItems = [
  { href: "#pilares", label: "Pilares" },
  { href: "#beneficios", label: "Benefícios" },
  { href: "#clientes", label: "Clientes" },
  { href: "#contato", label: "Contato", mobileOnly: true },
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

  const announceMenuState = (isOpen: boolean) => {
    const statusElement = document.getElementById("navigation-status")
    if (statusElement) {
      statusElement.textContent = isOpen ? "Menu de navegação aberto" : "Menu de navegação fechado"
    }
  }

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      // Save the current scroll position
      const scrollY = window.scrollY
      document.body.style.position = "fixed"
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = "100%"

      // Add touch event listeners for swipe to close
      document.addEventListener("touchstart", handleTouchStart)
      document.addEventListener("touchmove", handleTouchMove)
      document.addEventListener("touchend", handleTouchEnd)

      // Announce menu state change
      announceMenuState(true)
    } else {
      // Restore the scroll position
      const scrollY = document.body.style.top
      document.body.style.position = ""
      document.body.style.top = ""
      document.body.style.width = ""
      window.scrollTo(0, Number.parseInt(scrollY || "0") * -1)

      // Remove touch event listeners
      document.removeEventListener("touchstart", handleTouchStart)
      document.removeEventListener("touchmove", handleTouchMove)
      document.removeEventListener("touchend", handleTouchEnd)

      // Announce menu state change
      announceMenuState(false)
    }

    return () => {
      document.body.style.position = ""
      document.body.style.top = ""
      document.body.style.width = ""
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
    // Swipe right to close menu (more sensitive)
    if (touchStartX.current - touchEndX.current > 50 && isOpen) {
      setIsOpen(false)
    }
  }

  const handleNavClick = (section: string, href: string) => {
    trackEvent("navigation_click", { section })

    // Extract the section ID from the href
    const sectionId = href.startsWith("#") ? href.substring(1) : href

    // Close the mobile menu first
    setIsOpen(false)

    // Add a small delay on mobile to ensure menu closes first before scrolling
    setTimeout(
      () => {
        scrollToSection(sectionId)
      },
      window.innerWidth < 768 ? 300 : 0,
    )
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
      role="banner"
      aria-label="Site navigation"
    >
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between relative">
        <FadeIn duration="fast">
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
        </FadeIn>

        {/* Desktop Navigation */}
        <nav
          className="hidden md:flex mx-auto items-center justify-center space-x-8 text-sm font-medium"
          aria-label="Principal"
          role="navigation"
          id="desktop-navigation"
        >
          {navItems
            .filter((item) => !item.mobileOnly) // Exclude mobile-only items
            .map((item, index) => {
              const isActive = activeSection === item.href.substring(1)
              return (
                <FadeIn key={item.href} delay={100 + index * 100} duration="fast">
                  <a
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
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full active-indicator" />
                    )}
                  </a>
                </FadeIn>
              )
            })}
        </nav>

        {/* Desktop CTA */}
        <FadeIn className="hidden md:flex items-center" delay={400} duration="fast">
          <a
            href="mailto:contato@spinova.org.br"
            onClick={(e) => {
              e.preventDefault()
              window.location.href = "mailto:contato@spinova.org.br"
              handleContactClick()
            }}
            className="touch-manipulation"
          >
            <Button size="sm">Entre em contato</Button>
          </a>
        </FadeIn>

        {/* Animated Hamburger Menu Button */}
        <FadeIn className="md:hidden" duration="fast">
          <button
            className="flex items-center justify-center w-12 h-12 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary touch-manipulation z-50"
            onClick={toggleMenu}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
            aria-haspopup="true"
            data-menu-button
          >
            <HamburgerMenuIcon isOpen={isOpen} />
          </button>
        </FadeIn>

        {/* Mobile Menu Overlay */}
        <div
          className={cn(
            "fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300",
            isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
          )}
          aria-hidden="true"
          role="presentation"
          onClick={() => setIsOpen(false)}
        />

        {/* Mobile Menu */}
        <div
          id="mobile-menu"
          ref={mobileMenuRef}
          className={cn(
            "fixed inset-y-0 right-0 z-50 w-full sm:max-w-sm bg-background shadow-xl md:hidden transition-transform duration-300 ease-in-out overscroll-contain",
            isOpen ? "translate-x-0" : "translate-x-full",
            "flex flex-col h-[100dvh]", // Use dynamic viewport height for better mobile support
          )}
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-menu-title"
          data-mobile-menu
        >
          <div className="flex flex-col h-full">
            <span id="mobile-menu-title" className="sr-only">
              Menu de navegação
            </span>
            <div className="flex items-center justify-between p-5 border-b">
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
                aria-controls="mobile-menu"
              >
                <HamburgerMenuIcon isOpen={true} />
              </button>
            </div>

            <nav
              className="flex-1 overflow-y-auto p-5 overscroll-contain"
              aria-label="Menu mobile"
              role="navigation"
              id="mobile-navigation"
            >
              <ul className="space-y-4" role="menu">
                {navItems.map((item, index) => {
                  const isActive = activeSection === item.href.substring(1)
                  return (
                    <li
                      key={index}
                      className="menu-item-appear"
                      style={{ animationDelay: `${index * 100}ms` }}
                      role="none"
                    >
                      <a
                        href={item.href}
                        className={cn(
                          "flex items-center justify-between py-4 px-5 rounded-md transition-colors touch-manipulation text-lg",
                          isActive
                            ? "bg-primary/10 text-primary font-medium"
                            : "hover:bg-gray-100/10 text-foreground/80",
                        )}
                        onClick={(e) => {
                          e.preventDefault()
                          handleNavClick(item.href.substring(1), item.href)
                        }}
                        aria-current={isActive ? "page" : undefined}
                        role="menuitem"
                      >
                        <span className="text-lg font-medium">{item.label}</span>
                        <ArrowRight className={cn("h-5 w-5", isActive ? "text-primary" : "opacity-70")} />
                      </a>
                    </li>
                  )
                })}
              </ul>
            </nav>

            <div className="p-5 border-t mt-auto" role="complementary" aria-label="Contato">
              <a
                href="mailto:contato@spinova.org.br"
                onClick={(e) => {
                  e.preventDefault()
                  window.location.href = "mailto:contato@spinova.org.br"
                  handleContactClick()
                }}
                className="flex items-center justify-center w-full py-4 px-5 rounded-md bg-white text-black hover:bg-gray-100 transition-colors touch-manipulation"
                role="button"
                aria-label="Enviar email para contato@spinova.org.br"
              >
                <span className="font-medium text-lg">Entre em contato</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div aria-live="polite" className="sr-only" id="navigation-status">
        {isOpen ? "Menu de navegação aberto" : "Menu de navegação fechado"}
      </div>
    </header>
  )
}
