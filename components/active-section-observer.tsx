"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

type ActiveSectionContextType = {
  activeSection: string | null
  setActiveSection: (section: string | null) => void
}

const ActiveSectionContext = createContext<ActiveSectionContextType | undefined>(undefined)

export function ActiveSectionProvider({ children }: { children: React.ReactNode }) {
  const [activeSection, setActiveSection] = useState<string | null>(null)

  useEffect(() => {
    const sections = ["pilares", "beneficios", "clientes", "contato"]
    const sectionElements = sections.map((section) => document.getElementById(section))

    // Adjust rootMargin based on device type
    const isMobile = window.innerWidth < 768

    const observerOptions = {
      root: null,
      // Improved rootMargin values for better detection
      rootMargin: isMobile ? "-15% 0px -65% 0px" : "-25% 0px -65% 0px",
      threshold: [0, 0.1, 0.2, 0.5], // Multiple thresholds for smoother transitions
    }

    const observerCallback: IntersectionObserverCallback = (entries) => {
      // Filter for entries that are intersecting
      const intersectingEntries = entries.filter((entry) => entry.isIntersecting)

      if (intersectingEntries.length > 0) {
        // Sort by intersection ratio to find the most visible section
        const mostVisibleEntry = intersectingEntries.reduce((prev, current) => {
          return prev.intersectionRatio > current.intersectionRatio ? prev : current
        })

        // Only update if the intersection ratio is significant
        if (mostVisibleEntry.intersectionRatio > 0.1) {
          setActiveSection(mostVisibleEntry.target.id)
        }
      }
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    sectionElements.forEach((element) => {
      if (element) observer.observe(element)
    })

    // Handle resize events to adjust observer settings for different devices
    const handleResize = () => {
      // Re-initialize observer with updated settings when screen size changes
      sectionElements.forEach((element) => {
        if (element) observer.unobserve(element)
      })

      const newIsMobile = window.innerWidth < 768
      const newOptions = {
        root: null,
        rootMargin: newIsMobile ? "-10% 0px -70% 0px" : "-20% 0px -70% 0px",
        threshold: 0,
      }

      observer.disconnect()
      const newObserver = new IntersectionObserver(observerCallback, newOptions)

      sectionElements.forEach((element) => {
        if (element) newObserver.observe(element)
      })
    }

    window.addEventListener("resize", handleResize)

    return () => {
      sectionElements.forEach((element) => {
        if (element) observer.unobserve(element)
      })
      observer.disconnect()
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <ActiveSectionContext.Provider value={{ activeSection, setActiveSection }}>
      {children}
    </ActiveSectionContext.Provider>
  )
}

export function useActiveSection() {
  const context = useContext(ActiveSectionContext)
  if (context === undefined) {
    throw new Error("useActiveSection must be used within an ActiveSectionProvider")
  }
  return context
}
