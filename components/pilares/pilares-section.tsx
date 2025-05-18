"use client"

import { useState } from "react"
import { FadeIn } from "../animations/fade-in"
import { ChevronRight } from "lucide-react"

// Define the pillar data structure
interface SubSection {
  id: string
  title: string
}

interface Pilar {
  id: string
  title: string
  subtitle?: string
  subSections: SubSection[]
}

// Data for the three pillars
const pilares: Pilar[] = [
  {
    id: "software",
    title: "Software",
    subtitle: "Soluções Tecnológicas Integradas",
    subSections: [
      { id: "1.1", title: "Desenvolvimento de Software e Aplicativos" },
      { id: "1.2", title: "Planejamento e Design de Produtos Digitais" },
      { id: "1.3", title: "Business Intelligence e Análise de Dados" },
      { id: "1.4", title: "Automação e DevOps" },
      { id: "1.5", title: "Qualidade e Testes" },
    ],
  },
  {
    id: "inovacao",
    title: "Inovação",
    subtitle: "Transformação Tecnológica e Cultural",
    subSections: [
      { id: "2.1", title: "Estratégia de IA e Automação" },
      { id: "2.2", title: "Implementação de Soluções de IA" },
      { id: "2.3", title: "Consultoria Executiva em IA" },
      { id: "2.4", title: "Cultura de Inovação e Escala" },
      { id: "2.5", title: "Implementação de Tecnologias Emergentes" },
    ],
  },
  {
    id: "venture",
    title: "Venture",
    subtitle: "Estratégias de Capital e Crescimento",
    subSections: [
      { id: "3.1", title: "Consultoria Executiva em Investimentos" },
      { id: "3.2", title: "Investimento em Startups" },
      { id: "3.3", title: "Programas de Aceleração e Incubação" },
      { id: "3.4", title: "Venture Building" },
      { id: "3.5", title: "M&A e Estruturação" },
    ],
  },
]

export default function PilaresSection() {
  const [activePilar, setActivePilar] = useState<string>(pilares[0].id)

  const handlePilarClick = (pilarId: string) => {
    setActivePilar(pilarId)
  }

  return (
    <section id="pilares" className="py-16 sm:py-24 md:py-32">
      <div className="container mx-auto">
        <FadeIn className="mx-auto max-w-[58rem] text-center px-4 mb-12">
          <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">Pilares</h2>
          <p className="mt-4 text-muted-foreground sm:text-lg">
            Combinamos expertise em desenvolvimento de software, inovação e investimentos para impulsionar o crescimento
            do seu negócio.
          </p>
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
                  Saiba mais
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
