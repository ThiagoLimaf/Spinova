"use client"

import { useState } from "react"
import { FadeIn } from "../animations/fade-in"
import { ChevronRight } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { t } from "@/utils/translate"

export default function PilaresSection() {
  const { language } = useLanguage()
  const [activePilar, setActivePilar] = useState<string>("software")

  const handlePilarClick = (pilarId: string) => {
    setActivePilar(pilarId)
  }

  // Get pillar data from translations
  const pilares = [
    {
      id: "software",
      title: t("pillars.software.title", language as any),
      subtitle: t("pillars.software.subtitle", language as any),
      description: t("pillars.software.description", language as any),
      subSections: [
        { id: "1.1", title: t("pillars.software.subSections.development", language as any) },
        { id: "1.2", title: t("pillars.software.subSections.planning", language as any) },
        { id: "1.3", title: t("pillars.software.subSections.bi", language as any) },
        { id: "1.4", title: t("pillars.software.subSections.automation", language as any) },
        { id: "1.5", title: t("pillars.software.subSections.quality", language as any) },
      ],
    },
    {
      id: "inovacao",
      title: t("pillars.innovation.title", language as any),
      subtitle: t("pillars.innovation.subtitle", language as any),
      description: t("pillars.innovation.description", language as any),
      subSections: [
        { id: "2.1", title: t("pillars.innovation.subSections.strategy", language as any) },
        { id: "2.2", title: t("pillars.innovation.subSections.implementation", language as any) },
        { id: "2.3", title: t("pillars.innovation.subSections.consulting", language as any) },
        { id: "2.4", title: t("pillars.innovation.subSections.culture", language as any) },
        { id: "2.5", title: t("pillars.innovation.subSections.emerging", language as any) },
      ],
    },
    {
      id: "venture",
      title: t("pillars.venture.title", language as any),
      subtitle: t("pillars.venture.subtitle", language as any),
      description: t("pillars.venture.description", language as any),
      subSections: [
        { id: "3.1", title: t("pillars.venture.subSections.consulting", language as any) },
        { id: "3.2", title: t("pillars.venture.subSections.investment", language as any) },
        { id: "3.3", title: t("pillars.venture.subSections.acceleration", language as any) },
        { id: "3.4", title: t("pillars.venture.subSections.building", language as any) },
        { id: "3.5", title: t("pillars.venture.subSections.ma", language as any) },
      ],
    },
  ]

  return (
    <section id="pilares" className="py-16 sm:py-24 md:py-32">
      <div className="container mx-auto">
        <FadeIn className="mx-auto max-w-[58rem] text-center px-4 mb-12">
          <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
            {t("pillars.title", language as any)}
          </h2>
          <p className="mt-4 text-muted-foreground sm:text-lg">{t("pillars.subtitle", language as any)}</p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pilares.map((pilar) => (
            <div
              key={pilar.id}
              className="bg-card rounded-lg border shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-6 border-b bg-muted/30">
                <h3 className="text-2xl font-bold">{pilar.title}</h3>
                {pilar.subtitle && <p className="text-muted-foreground mt-2">{pilar.subtitle}</p>}
              </div>

              <div className="p-6">
                <ul className="space-y-3">
                  {pilar.subSections.map((subSection) => (
                    <li
                      key={subSection.id}
                      className="border-l-4 border-primary/70 pl-4 py-2 hover:bg-muted/20 transition-colors rounded-r-md"
                    >
                      <div className="flex items-center">
                        <span className="font-medium">{subSection.title}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-muted/10 border-t">
                <button
                  className="w-full py-2 px-4 rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors font-medium flex items-center justify-center"
                  onClick={() => handlePilarClick(pilar.id)}
                >
                  {t("pillars.learnMore", language as any)}
                  <ChevronRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
