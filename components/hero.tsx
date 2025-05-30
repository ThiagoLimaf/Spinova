"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { trackEvent } from "./event-tracking"
import { scrollToSection } from "@/utils/scroll-utils"
import { FadeIn } from "./animations/fade-in"
import { Reveal } from "./animations/reveal"
import { useLanguage } from "@/contexts/language-context"
import { t } from "@/utils/translate"

export default function Hero() {
  const { language } = useLanguage()

  const handleContactClick = () => {
    trackEvent("contact_button_click", { location: "hero" })
  }

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()
    scrollToSection(sectionId)
    trackEvent("hero_navigation_click", { section: sectionId })
  }

  return (
    <section className="container flex min-h-[calc(100vh-3.5rem)] max-w-screen-2xl flex-col items-center justify-center space-y-8 py-24 text-center md:py-32 px-4 sm:px-6">
      <div className="space-y-4">
        <Reveal>
          <h1 className="bg-gradient-to-br from-foreground from-30% via-foreground/90 to-foreground/70 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
            {t("hero.title", language as any)}
          </h1>
        </Reveal>
        <FadeIn delay={300} duration="medium">
          <p className="mx-auto max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            {t("hero.subtitle", language as any)}
          </p>
        </FadeIn>
      </div>
      <FadeIn delay={600} duration="medium">
        <div className="flex gap-4">
          <a
            href="mailto:contato@spinova.org.br"
            onClick={(e) => {
              e.preventDefault()
              window.location.href = "mailto:contato@spinova.org.br"
              handleContactClick()
            }}
            className="touch-manipulation"
          >
            <Button size="lg" className="px-6 py-6 text-base sm:text-lg">
              {t("hero.cta", language as any)}
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Button>
          </a>
        </div>
      </FadeIn>
      <FadeIn delay={800} duration="medium">
        <div className="mt-8 flex flex-col sm:flex-row gap-6">
          <a
            href="#pilares"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2 touch-manipulation"
            onClick={(e) => handleScrollToSection(e, "pilares")}
          >
            {t("hero.explorePillars", language as any)}
          </a>
          <a
            href="#beneficios"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2 touch-manipulation"
            onClick={(e) => handleScrollToSection(e, "beneficios")}
          >
            {t("hero.seeBenefits", language as any)}
          </a>
        </div>
      </FadeIn>
    </section>
  )
}
