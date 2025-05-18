"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { trackEvent } from "./event-tracking"

export default function Hero() {
  const handleContactClick = () => {
    trackEvent("contact_button_click", { location: "hero" })
  }

  return (
    <section className="container flex min-h-[calc(100vh-3.5rem)] max-w-screen-2xl flex-col items-center justify-center space-y-8 py-24 text-center md:py-32">
      <div className="space-y-4">
        <h1 className="bg-gradient-to-br from-foreground from-30% via-foreground/90 to-foreground/70 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
          Conduzindo Inovação
        </h1>
        <p className="mx-auto max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          A Spinova é um Instituto de Ciência e Tecnologia onde engenheiros e especialistas criam soluções que
          impulsionam seu negócio.
        </p>
      </div>
      <div className="flex gap-4">
        <a
          href="mailto:contato@spinova.solutions"
          onClick={(e) => {
            e.preventDefault()
            window.location.href = "mailto:contato@spinova.solutions"
            handleContactClick()
          }}
        >
          <Button size="lg">
            Entre em contato
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Button>
        </a>
      </div>
    </section>
  )
}
