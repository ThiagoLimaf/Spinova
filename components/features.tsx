"use client"

import { TrendingUp, Award, Handshake, Puzzle, FlaskRound, Target, ArrowRight } from "lucide-react"
import Image from "next/image"
import { trackEvent } from "./event-tracking"
import { FadeIn } from "./animations/fade-in"
import { useLanguage } from "@/contexts/language-context"
import { t } from "@/utils/translate"
import Link from "next/link"

// Selected partner logos for main section display
const clients = [
  {
    name: "DATABIZZ",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DATABIZZ%20Logo-WaRwxqT0istlkzgNM4uqRBNtVVeGqE.png",
    alt: "DATABIZZ logo - Parceiro em Business Intelligence da Spinova",
  },
  {
    name: "CHEZ",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Chez%20Logo%20branca-IjwofXzgVIVS4JQM1stlAoADn2qRBp.png",
    alt: "CHEZ logo - Parceiro estratégico em soluções tecnológicas da Spinova",
  },
  {
    name: "Navega",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Navega%20Logo-mc3F5eL0pwjHkEYpfuUN4iNd8p3X5l.png",
    alt: "Navega logo - Parceiro em experiência digital da Spinova",
  },
  {
    name: "NPMP",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/NPMP%20Logo-JsoutsCy8VbwxHP6VdZZrPWEIKvFui.png",
    alt: "NPMP logo - Parceiro em gestão de projetos da Spinova",
  },
]

export default function Features() {
  const { language } = useLanguage()

  const handleContactClick = (location: string) => {
    trackEvent("contact_click", {
      location,
      type: "button",
      device: window.innerWidth <= 768 ? "mobile" : "desktop",
    })
  }

  // Map benefit keys to their icons
  const benefitIcons = {
    expertise: FlaskRound,
    partnerships: Handshake,
    solutions: Puzzle,
    maturity: Award,
    competitiveness: Target,
    roi: TrendingUp,
  }

  // Get benefits from translations
  const benefitKeys = ["expertise", "partnerships", "solutions", "maturity", "competitiveness", "roi"]
  const benefits = benefitKeys.map((key) => {
    const Icon = benefitIcons[key as keyof typeof benefitIcons]
    return {
      title: t(`benefits.items.${key}.title`, language as any),
      description: t(`benefits.items.${key}.description`, language as any),
      icon: Icon,
    }
  })

  return (
    <>
      {/* Benefícios Section */}
      <section id="beneficios" className="container space-y-12 sm:space-y-16 py-16 sm:py-24 md:py-32 bg-gray-50/10">
        <FadeIn className="mx-auto max-w-[58rem] text-center px-4">
          <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
            {t("benefits.title", language as any)}
          </h2>
          <p className="mt-4 text-muted-foreground sm:text-lg">{t("benefits.subtitle", language as any)}</p>
        </FadeIn>
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 px-4">
          {benefits.map((benefit, index) => (
            <FadeIn
              key={benefit.title}
              className="relative overflow-hidden rounded-lg border bg-background p-6 sm:p-8 shadow-sm transition-all hover:shadow-md"
              delay={index * 100}
              duration="medium"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <benefit.icon className="h-6 w-6 text-primary" aria-hidden="true" />
              </div>
              <h3 className="mb-2 text-xl font-bold">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.description}</p>
            </FadeIn>
          ))}
        </div>
        <FadeIn className="flex justify-center mt-8 sm:mt-12 px-4" delay={600}>
          <a
            href="mailto:contato@spinova.org.br"
            onClick={(e) => {
              // On mobile devices, we want the default mailto behavior
              if (window.innerWidth > 768) {
                e.preventDefault()
                window.location.href = "mailto:contato@spinova.org.br"
              }
              handleContactClick("benefits_section")
            }}
            className="group inline-flex items-center px-4 py-3 sm:px-6 sm:py-4 text-base font-medium rounded-md bg-white text-black hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 active:bg-gray-200 touch-manipulation"
            aria-label="Enviar email para contato@spinova.org.br"
            role="button"
          >
            <span>{t("benefits.contactCta", language as any)}</span>
            <ArrowRight
              className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300"
              aria-hidden="true"
            />
          </a>
        </FadeIn>
      </section>

      {/* Clientes Section */}
      <section
        id="clientes"
        className="container space-y-12 sm:space-y-16 py-16 sm:py-24 md:py-32 bg-gray-900 text-white"
      >
        <FadeIn className="mx-auto max-w-[58rem] text-center px-4">
          <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
            {t("partners.title", language as any)}
          </h2>
          <p className="mt-4 text-gray-300 sm:text-lg">{t("partners.subtitle", language as any)}</p>
        </FadeIn>
        <div className="partners-grid">
          {clients.map((client, index) => (
            <FadeIn
              key={client.name}
              delay={300 + index * 100}
              className="partner-logo-container flex items-center justify-center"
            >
              <Image
                src={client.logo || "/placeholder.svg"}
                alt={client.alt}
                width={160}
                height={80}
                className="max-h-12 w-auto object-contain filter brightness-0 invert opacity-80 hover:opacity-100 transition-opacity duration-300"
                loading="lazy"
              />
            </FadeIn>
          ))}
        </div>
        <FadeIn className="flex justify-center mt-8 sm:mt-12 px-4" delay={600}>
          <Link
            href="/partners"
            className="group inline-flex items-center px-4 py-3 sm:px-6 sm:py-4 text-base font-medium rounded-md bg-white text-black hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 active:bg-gray-200 touch-manipulation"
            onClick={() => trackEvent("partners_cta_click", { location: "partners_section" })}
          >
            <span>{language === "en" ? "Learn More" : "Saiba Mais"}</span>
            <ArrowRight
              className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300"
              aria-hidden="true"
            />
          </Link>
        </FadeIn>
      </section>
    </>
  )
}
