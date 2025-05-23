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
import { useLanguage } from "@/contexts/language-context"
import { t } from "@/utils/translate"
import { LanguageSwitcher } from "./language-switcher"

// Navigation items
const getNavItems = (language: string) => [
  { href: "#pilares", label: t("nav.pillars", language as any) },
  { href: "#como-atuamos", label: t("nav.howWeWork", language as any) },
  { href: "#beneficios", label: t("nav.benefits", language as any) },
  { href: "#clientes", label: t("nav.experience", language as any) },
  { href: "#contato", label: t("nav.contact", language as any), mobileOnly: true },
]

export default function Navbar() {
  const { language } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const { activeSection } = useActiveSection()
  const { isOpen, setIsOpen, toggleMenu } = useMobileMenu()
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const lastScrollY = useRef(0)
  const [hideNavbar, setHideNavbar] = useState(false)

  const navItems = getNavItems(language)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Add or remove scrolled class on body
      if (currentScrollY > 10) {
        document.body.classList.add("header-scrolled")
      } else {
        document.body.classList.remove("header-scrolled")
      }

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
        scrolled ? "border-border/40 bg-background/95 shadow-sm h-14" : "border-transparent bg-background/50 h-20",
      )}
      role="banner"
      aria-label="Site navigation"
    >
      <div className="container flex h-full max-w-screen-2xl items-center justify-between relative" data-nav-container>
        <FadeIn duration="fast" className="z-10">
          <Link
            href="/"
            className="flex items-center space-x-2 touch-manipulation transition-transform duration-200 hover:scale-105 active:scale-95"
            aria-label="Spinova - Página inicial"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: "smooth" })
              trackEvent("logo_click")
              setIsOpen(false)
            }}
          >
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Spinova%20extented%20white%20logo-quepSGTq5FZuyDy7EPwkwm4aHsnR0r.png"
              alt="Spinova Logo"
              width={120}
              height={30}
              className={cn("w-auto transition-all duration-300", scrolled ? "h-7" : "h-9")}
              priority
            />
          </Link>
        </FadeIn>

        {/* Desktop Navigation */}
        <nav
          className={cn(
            "hidden md:flex mx-auto items-center justify-center space-x-8 transition-all duration-300",
            scrolled ? "text-sm" : "text-base",
          )}
          aria-label="Principal"
          role="navigation"
          id="desktop-navigation"
          data-nav-desktop
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
                      "transition-all duration-200 hover:text-primary relative py-1 px-1",
                      isActive ? "text-primary font-semibold" : "text-foreground/80",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                      "active:scale-95",
                    )}
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavClick(item.href.substring(1), item.href)
                    }}
                    aria-current={isActive ? "page" : undefined}
                    data-nav-item
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

        {/* Desktop CTA and Language Switcher */}
        <FadeIn className="hidden md:flex items-center space-x-2" delay={400} duration="fast">
          <LanguageSwitcher variant="full" />
          <a
            href="mailto:contato@spinova.org.br"
            onClick={(e) => {
              e.preventDefault()
              window.location.href = "mailto:contato@spinova.org.br"
              handleContactClick()
            }}
            className="touch-manipulation"
          >
            <Button size={scrolled ? "sm" : "default"}>{t("nav.contact", language as any)}</Button>
          </a>
        </FadeIn>

        {/* Animated Hamburger Menu Button */}
        <FadeIn
          className={cn(
            "md:hidden flex items-center space-x-2 transition-all duration-300",
            scrolled ? "scale-95" : "scale-100",
          )}
          duration="fast"
        >
          <LanguageSwitcher variant="icon" />
          <button
            className={cn(
              "flex items-center justify-center rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary touch-manipulation z-50 transition-all duration-300",
              scrolled ? "w-10 h-10" : "w-12 h-12",
            )}
            onClick={toggleMenu}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
            aria-haspopup="true"
            data-menu-button
          >
            <HamburgerMenuIcon
              isOpen={isOpen}
              className={cn("transition-all duration-300", scrolled ? "scale-90" : "scale-100")}
            />
          </button>
        </FadeIn>

        {/* Mobile Menu Overlay */}
        <div
          className={cn(
            "fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden",
            "transition-opacity duration-300 ease-in-out",
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
          )}
          style={{
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
          aria-hidden="true"
          role="presentation"
          onClick={() => setIsOpen(false)}
        />

        {/* Mobile Menu */}
        <div
          id="mobile-menu"
          ref={mobileMenuRef}
          className={cn(
            "fixed inset-y-0 right-0 z-50 w-full sm:max-w-sm bg-background shadow-xl md:hidden overscroll-contain",
            isOpen ? "translate-x-0" : "translate-x-full",
            "flex flex-col h-[100dvh] max-h-[100dvh]",
          )}
          style={{
            transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
            height: "100dvh",
            maxHeight: "100dvh",
            display: "flex",
            flexDirection: "column",
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-menu-title"
          data-mobile-menu
        >
          <div className={cn("flex flex-col h-full", isOpen ? "mobile-menu-content-enter" : "opacity-0")}>
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
              <div className="flex items-center space-x-2">
                <LanguageSwitcher variant="minimal" />
                <button
                  className="flex items-center justify-center w-12 h-12 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary touch-manipulation"
                  onClick={() => setIsOpen(false)}
                  aria-label="Fechar menu"
                  aria-controls="mobile-menu"
                >
                  <HamburgerMenuIcon isOpen={true} />
                </button>
              </div>
            </div>

            <nav
              className="flex-1 overflow-y-auto p-6 sm:p-8 overscroll-contain"
              aria-label="Menu mobile"
              role="navigation"
              id="mobile-navigation"
              style={{
                transition: "opacity 0.3s ease, transform 0.3s ease",
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? "translateY(0)" : "translateY(-10px)",
              }}
            >
              <div className="flex flex-col justify-center min-h-[50vh]">
                <ul
                  className="space-y-4 w-full max-w-md mx-auto"
                  role="menu"
                  style={{
                    transition: "opacity 0.4s ease",
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  {navItems.map((item, index) => {
                    const isActive = activeSection === item.href.substring(1)
                    return (
                      <li
                        key={index}
                        className="w-full"
                        style={{
                          transition: `transform 0.3s ease ${index * 0.05}s, opacity 0.3s ease ${index * 0.05}s`,
                          transform: isOpen ? "translateY(0)" : "translateY(20px)",
                          opacity: isOpen ? 1 : 0,
                        }}
                        role="none"
                      >
                        <a
                          href={item.href}
                          className={cn(
                            "flex items-center justify-between py-3 px-4 rounded-md transition-all duration-200 touch-manipulation text-lg",
                            "hover:bg-gray-100/10 active:bg-gray-100/20 active:scale-[0.98]",
                            isActive ? "bg-primary/10 text-primary font-medium" : "text-foreground/80",
                          )}
                          onClick={(e) => {
                            e.preventDefault()
                            handleNavClick(item.href.substring(1), item.href)
                          }}
                          aria-current={isActive ? "page" : undefined}
                          role="menuitem"
                        >
                          <span className="text-lg font-medium">{item.label}</span>
                          <ArrowRight
                            className={cn(
                              "h-5 w-5 transition-transform duration-200 group-hover:translate-x-1",
                              isActive ? "text-primary" : "opacity-70",
                            )}
                          />
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </nav>

            <div
              className="p-6 sm:p-8 border-t menu-item-appear"
              style={{ animationDelay: `${(navItems.length + 1) * 80}ms` }}
              role="complementary"
              aria-label="Contato"
            >
              <a
                href="mailto:contato@spinova.org.br"
                onClick={(e) => {
                  e.preventDefault()
                  window.location.href = "mailto:contato@spinova.org.br"
                  handleContactClick()
                }}
                className="flex items-center justify-center w-full py-4 px-5 rounded-md bg-white text-black hover:bg-gray-100 transition-colors touch-manipulation mobile-menu-item"
                role="button"
                aria-label="Enviar email para contato@spinova.org.br"
              >
                <span className="font-medium text-lg">{t("nav.contact", language as any)}</span>
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
