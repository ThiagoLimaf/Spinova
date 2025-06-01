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
  { href: "/partners", label: t("nav.partnersPage", language as any), isPage: true },
  { href: "#contato", label: t("nav.contact", language as any), mobileOnly: true },
]

export default function Navbar() {
  const { language } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const { activeSection, setActiveSection } = useActiveSection()
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

    // Check if we're on the home page (only on client side)
    const isHomePage = typeof window !== "undefined" ? window.location.pathname === "/" : true

    // If we're not on the home page and trying to navigate to a section, go to home first
    if (!isHomePage && href.startsWith("#")) {
      if (typeof window !== "undefined") {
        window.location.href = `/${href}`
      }
      return
    }

    // Extract the section ID from the href
    const sectionId = href.startsWith("#") ? href.substring(1) : href

    // Close the mobile menu first
    setIsOpen(false)

    // Add a small delay on mobile to ensure menu closes first before scrolling
    setTimeout(
      () => {
        // Enhanced smooth scrolling
        const targetElement = document.getElementById(sectionId)
        if (targetElement) {
          // Get the header height to offset the scroll position
          const header = document.querySelector("header")
          const headerOffset = header ? header.getBoundingClientRect().height : 0

          // Calculate the target position with offset
          const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerOffset - 20

          // Smooth scroll with enhanced easing
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          })

          // Update URL hash without jumping
          setTimeout(() => {
            history.pushState(null, "", `#${sectionId}`)
            // Force active section update
            if (setActiveSection) {
              setActiveSection(sectionId)
            }
          }, 100)
        } else {
          scrollToSection(sectionId)
        }
      },
      typeof window !== "undefined" && window.innerWidth < 768 ? 300 : 0,
    )
  }

  const handleContactClick = () => {
    trackEvent("contact_button_click", { location: "navbar" })
    setIsOpen(false)
  }

  useEffect(() => {
    // Enhanced scroll behavior for smoother active section detection
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100 // Offset for better detection

      // Get all section elements
      const sections = navItems
        .filter((item) => !item.mobileOnly && item.href.startsWith("#"))
        .map((item) => {
          const sectionId = item.href.substring(1)
          const element = document.getElementById(sectionId)
          return { id: sectionId, element, top: element?.offsetTop || 0 }
        })
        .filter((section) => section.element)

      // Find the current active section based on scroll position
      let currentSection = null
      for (let i = sections.length - 1; i >= 0; i--) {
        if (scrollPosition >= sections[i].top) {
          currentSection = sections[i].id
          break
        }
      }

      // If we found an active section and it's different from the current one
      if (currentSection && activeSection !== currentSection) {
        // Update active section in the context
        if (setActiveSection) {
          setActiveSection(currentSection)
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    // Initial check
    setTimeout(handleScroll, 100)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [navItems, activeSection, setActiveSection])

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
            .filter((item) => !item.mobileOnly)
            .map((item, index) => {
              const isActive = item.isPage
                ? typeof window !== "undefined"
                  ? window.location.pathname === item.href
                  : false
                : activeSection === item.href.substring(1)

              return (
                <FadeIn key={item.href} delay={100 + index * 100} duration="fast">
                  {item.isPage ? (
                    <Link
                      href={item.href}
                      className={cn(
                        "transition-all duration-300 hover:text-primary relative py-1 px-1 group",
                        isActive ? "text-primary font-semibold" : "text-foreground/80",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                        "active:scale-95",
                      )}
                      aria-current={isActive ? "page" : undefined}
                      data-nav-item
                    >
                      {item.label}
                      <span
                        className={cn(
                          "absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full transition-all duration-300",
                          isActive ? "opacity-100 w-full" : "opacity-0 w-0 group-hover:w-1/2 group-hover:opacity-50",
                        )}
                      />
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      className={cn(
                        "transition-all duration-300 hover:text-primary relative py-1 px-1 group",
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
                      <span
                        className={cn(
                          "absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full transition-all duration-300",
                          isActive ? "opacity-100 w-full" : "opacity-0 w-0 group-hover:w-1/2 group-hover:opacity-50",
                        )}
                      />
                    </a>
                  )}
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
            "transition-all duration-500 ease-out",
            isOpen ? "opacity-100 backdrop-blur-md" : "opacity-0 pointer-events-none backdrop-blur-none",
          )}
          style={{
            backdropFilter: isOpen ? "blur(12px)" : "blur(0px)",
            WebkitBackdropFilter: isOpen ? "blur(12px)" : "blur(0px)",
            background: isOpen ? "linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 100%)" : "transparent",
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
            "fixed inset-y-0 right-0 z-50 w-full sm:max-w-sm bg-background shadow-2xl md:hidden overscroll-contain",
            "flex flex-col h-[100dvh] max-h-[100dvh] border-l border-border/20",
            isOpen ? "translate-x-0" : "translate-x-full",
          )}
          style={{
            transition: "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            height: "100dvh",
            maxHeight: "100dvh",
            display: "flex",
            flexDirection: "column",
            boxShadow: isOpen ? "-10px 0 50px rgba(0, 0, 0, 0.3), -5px 0 20px rgba(0, 0, 0, 0.1)" : "none",
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-menu-title"
          data-mobile-menu
        >
          <div
            className={cn("flex flex-col h-full relative overflow-hidden", isOpen ? "animate-in" : "animate-out")}
            style={{
              background: "linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--background)/0.98) 100%)",
            }}
          >
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
                <ul className="space-y-2 w-full max-w-md mx-auto" role="menu">
                  {navItems.map((item, index) => {
                    const isActive = activeSection === item.href.substring(1)
                    const animationDelay = isOpen ? index * 80 : (navItems.length - index) * 40

                    return (
                      <li
                        key={index}
                        className="w-full"
                        style={{
                          transition: `all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
                          transitionDelay: `${animationDelay}ms`,
                          transform: isOpen ? "translateX(0) scale(1)" : "translateX(30px) scale(0.95)",
                          opacity: isOpen ? 1 : 0,
                        }}
                        role="none"
                      >
                        <a
                          href={item.href}
                          className={cn(
                            "flex items-center justify-between py-4 px-5 rounded-xl transition-all duration-300 touch-manipulation text-lg group relative overflow-hidden",
                            "hover:bg-primary/5 active:bg-primary/10 active:scale-[0.98]",
                            isActive ? "bg-primary/10 text-primary font-medium shadow-sm" : "text-foreground/80",
                          )}
                          onClick={(e) => {
                            e.preventDefault()
                            handleNavClick(item.href.substring(1), item.href)
                          }}
                          aria-current={isActive ? "page" : undefined}
                          role="menuitem"
                        >
                          {/* Ripple effect background */}
                          <div className="absolute inset-0 bg-primary/5 scale-0 group-active:scale-100 transition-transform duration-300 rounded-xl" />

                          <span className="text-lg font-medium relative z-10">{item.label}</span>
                          <ArrowRight
                            className={cn(
                              "h-5 w-5 transition-all duration-300 relative z-10",
                              "group-hover:translate-x-1 group-hover:scale-110",
                              isActive ? "text-primary" : "opacity-70",
                            )}
                          />

                          {/* Active indicator */}
                          {isActive && (
                            <div
                              className="absolute left-0 top-1/2 w-1 h-8 bg-primary rounded-r-full transform -translate-y-1/2"
                              style={{
                                animation: "slideInLeft 0.3s ease-out forwards",
                              }}
                            />
                          )}
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </nav>

            <div
              className="p-6 sm:p-8 border-t border-border/20 relative"
              style={{
                transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                transitionDelay: isOpen ? `${(navItems.length + 1) * 80}ms` : "0ms",
                transform: isOpen ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
                opacity: isOpen ? 1 : 0,
              }}
              role="complementary"
              aria-label="Contato"
            >
              {/* Subtle glow effect */}
              <div
                className={cn(
                  "absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent rounded-t-xl transition-opacity duration-500",
                  isOpen ? "opacity-100" : "opacity-0",
                )}
              />

              <a
                href="mailto:contato@spinova.org.br"
                onClick={(e) => {
                  e.preventDefault()
                  window.location.href = "mailto:contato@spinova.org.br"
                  handleContactClick()
                }}
                className="flex items-center justify-center w-full py-4 px-6 rounded-xl bg-white text-black hover:bg-gray-100 transition-all duration-300 touch-manipulation mobile-menu-item group relative overflow-hidden shadow-lg hover:shadow-xl"
                role="button"
                aria-label="Enviar email para contato@spinova.org.br"
              >
                {/* Button shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

                <span className="font-medium text-lg relative z-10">{t("nav.contact", language as any)}</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 group-hover:scale-110 transition-all duration-300 relative z-10" />
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
