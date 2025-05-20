"use client"

import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import Hero from "@/components/hero"
import PilaresSection from "@/components/pilares/pilares-section"
import Features from "@/components/features"
import Footer from "@/components/footer"
import ScrollToTop from "@/components/scroll-to-top"
import { PageTransition } from "@/components/page-transition"
import { LanguageTransition } from "@/components/language-transition"
import { DynamicMetadata } from "./dynamic-metadata"

export default function ClientPage() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="relative min-h-screen">
      {/* Dynamic metadata based on language */}
      <DynamicMetadata />

      {/* Page transition animation */}
      <PageTransition />

      {/* Language transition animation */}
      <LanguageTransition />

      {/* Background gradients */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
        <div className="absolute right-0 top-0 h-[500px] w-[500px] bg-blue-500/10 blur-[100px]" />
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] bg-purple-500/10 blur-[100px]" />
      </div>

      <div className="relative z-10">
        <main className={cn("transition-all duration-300", scrolled ? "pt-14" : "pt-20")}>
          <Hero />
          <PilaresSection />
          <Features />
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </div>
  )
}
