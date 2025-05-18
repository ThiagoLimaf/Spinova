"use client"

import { Code, Lightbulb, TrendingUp, Award, Handshake, Puzzle, FlaskRound, Target, ArrowRight } from "lucide-react"
import Image from "next/image"
import { trackEvent } from "./event-tracking"
import { FadeIn } from "./animations/fade-in"
import { StaggerChildren } from "./animations/stagger-children"

const pillars = [
  {
    name: "Software",
    description:
      "Evoluir e melhorar soluções internas • Terceirizações/outsourcing • Legal Advisor • Times de tecnologia • Consultorias • Construção de DOP (sistemas internos) • Gerenciamento de contratação e de empresas de tecnologia e/ou inovação (Procurement)",
    icon: Code,
  },
  {
    name: "Inovação",
    description:
      "Ações de inovação • Construção e desenvolvimento de novos sistemas (novos produtos) • Gestão de contratação de projetos e inovação • Diagnósticos e treinamento • M&A • Transformação digital",
    icon: Lightbulb,
  },
  {
    name: "Venture",
    description:
      "CVC • Private equity • Programas de investimentos, aceleração e incubação • Licenciamento de propriedade intelectual • Regulamentação de investimento • Compliance • Governança • Contratação, Incorporação de startups",
    icon: TrendingUp,
  },
]

const benefits = [
  {
    title: "Expertise",
    description:
      "Acesso à laboratórios de pesquisas e conexão com importantes universidades na busca por tecnologias nascentes em diversas áreas científicas.",
    icon: FlaskRound,
  },
  {
    title: "Parcerias Estratégicas",
    description:
      "Estabelecimento de parcerias estratégicas com organizações do mercado e hubs de tecnologia, possibilitando o compartilhamento de recursos e portfólio. Colaboração para inovação em rede aberta acelerando o desenvolvimento de soluções inovadoras em conjunto.",
    icon: Handshake,
  },
  {
    title: "Co-construção de Soluções e Negócios",
    description:
      "Construção de soluções sob medida para atender as necessidades específicas da empresa. Mapeamento de processos para a digitalização em produtos digitais de oportunidades de inovação para modernização da empresa, melhorando sua competitividade e posição no mercado.",
    icon: Puzzle,
  },
  {
    title: "Maturidade Tecnológica (TRL)",
    description:
      "Evolução de maturidade tecnológica em projetos de P&D com o acesso a pesquisa e infraestrutura de laboratórios de ponta. Soluções sofisticadas em ambientes de simulação e reais para aplicação em processos de inovação com demandas em: IoT, IA, Nuvem, API abertas, etc.",
    icon: Award,
  },
  {
    title: "Competitividade de Mercado",
    description:
      "Desenvolvimento de novos negócios e produtos orientados pelo retorno de investimento (ROI) em problemas chaves no mercado. Conferindo assim, vantagem competitiva e acesso a tendências de tecnologias que otimizam a tomada de decisão nos planejamentos e estratégias de mercado.",
    icon: Target,
  },
  {
    title: "Retorno de Investimento",
    description:
      "Potencialização de redução de custos operacionais através de inovação e recursos compartilhados com o ICT. Acesso a benefícios e incentivos para P&D na contratação de soluções tecnológicas e busca por retorno de investimento nos orçamentos previstos para inovação continuada.",
    icon: TrendingUp,
  },
]

// All client logos with their URLs
const clients = [
  // Original logos
  {
    name: "iDEXO",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-13-YvDAUtnY5qVmMOtAbmaUwbkHFcijyE.png",
    alt: "iDEXO logo - Parceiro de inovação da Spinova",
  },
  {
    name: "Acqio",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-15-bu9h5enEGOEYFlK0FfF8fp06N0qdfn.png",
    alt: "Acqio logo - Cliente Spinova em soluções de pagamento",
  },
  {
    name: "Elcoma Networks",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-12-MYeUmYODl9xGEHoKreRWyJJsdJEqN4.png",
    alt: "Elcoma Networks logo - Parceiro de tecnologia da Spinova",
  },
  {
    name: "PTI",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-16-V0fzRAwLxVFIxoAw1rMB3x8jpuRqWG.png",
    alt: "Parque Tecnológico Itaipu logo - Parceiro institucional da Spinova",
  },
  {
    name: "Creative Pack",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-14-oFDU0wItNJ8Li0mXNe0kgclYXAA4aq.png",
    alt: "Creative Pack logo - Cliente Spinova em soluções criativas",
  },
  {
    name: "Shopping Recife",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-8-smkCRmrXAEO1vTEY4DuO0B72NsIzWC.png",
    alt: "Shopping Recife logo - Cliente Spinova em transformação digital",
  },
  {
    name: "FindUP",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-11-ETisvZxPb0FreQz39HSYk9r8upSqck.png",
    alt: "FindUP logo - Parceiro de inovação da Spinova",
  },
  {
    name: "CHEZ",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-9-XwCboE4phmGRrgXSZxtj8pMrjzv7Ad.png",
    alt: "CHEZ logo - Cliente Spinova em soluções tecnológicas",
  },
  {
    name: "Safetec",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-10-lLzFtQhPcnGU707CJeBKk2FwtHrpTF.png",
    alt: "Safetec logo - Parceiro de segurança da Spinova",
  },
  // New logos
  {
    name: "Hering",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-3-7TvDcJ0MygMopMSPgLdo2tHFh0zJOt.png",
    alt: "Hering logo - Cliente Spinova em transformação digital no varejo",
  },
  {
    name: "Enviou",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-7-JEKnMWzQWAojQrZiEz3iJpNk2X78Nc.png",
    alt: "Enviou logo - Parceiro de marketing da Spinova",
  },
  {
    name: "Arkadium",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-5-sh1x4IBhmLXX236RI9inpll6kwpA9d.png",
    alt: "Arkadium logo - Cliente Spinova em soluções de software",
  },
  {
    name: "MeuDimDim",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-4-UPVlUMjN9KEmSmmWzhDOi3fm9EeCgG.png",
    alt: "MeuDimDim logo - Cliente Spinova em soluções financeiras",
  },
  {
    name: "LIGA Ventures",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-6-XxFKhRbFjrS6cxVRUBexz8vbP9sYC0.png",
    alt: "LIGA Ventures logo - Parceiro de venture capital da Spinova",
  },
  {
    name: "Mr.Cat",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-1-H50dErtDnppMwtw8Y2CY6ywf91HUw9.png",
    alt: "Mr.Cat logo - Cliente Spinova em transformação digital no varejo",
  },
  {
    name: "FCA",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-2-GqIzVHv1WEndfH0YAkVRur3FgC07Ck.png",
    alt: "FCA logo - Cliente Spinova em soluções automotivas",
  },
  {
    name: "Nickelpay",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-eHXQasOsrh63bIjGso9Zcvbl7XQ9ZK.png",
    alt: "Nickelpay logo - Cliente Spinova em soluções de pagamento",
  },
]

export default function Features() {
  const handleContactClick = (location: string) => {
    trackEvent("contact_click", {
      location,
      type: "button",
      device: window.innerWidth <= 768 ? "mobile" : "desktop",
    })
  }

  return (
    <>
      {/* Benefícios Section */}
      <section id="beneficios" className="container space-y-12 sm:space-y-16 py-16 sm:py-24 md:py-32 bg-gray-50/10">
        <FadeIn className="mx-auto max-w-[58rem] text-center px-4">
          <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">Benefícios</h2>
          <p className="mt-4 text-muted-foreground sm:text-lg">
            Descubra como nossa abordagem integrada pode transformar seu negócio
          </p>
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
            href="mailto:contato@spinova.solutions"
            onClick={(e) => {
              // On mobile devices, we want the default mailto behavior
              if (window.innerWidth > 768) {
                e.preventDefault()
                window.location.href = "mailto:contato@spinova.solutions"
              }
              handleContactClick("benefits_section")
            }}
            className="group inline-flex items-center px-4 py-3 sm:px-6 sm:py-4 text-base font-medium rounded-md bg-white text-black hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 active:bg-gray-200 touch-manipulation"
            aria-label="Enviar email para contato@spinova.solutions"
            role="button"
          >
            <span>Entre em contato</span>
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
          <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">Clientes</h2>
          <p className="mt-4 text-gray-300 sm:text-lg">
            Empresas e organizações que confiam na Spinova para impulsionar sua transformação digital e inovação
            tecnológica em diversos setores do mercado.
          </p>
        </FadeIn>
        <StaggerChildren
          className="mx-auto grid max-w-7xl grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 sm:gap-8 md:gap-10 px-4"
          staggerDelay={50}
          initialDelay={300}
        >
          {clients.map((client) => (
            <div
              key={client.name}
              className="flex items-center justify-center p-4 transition-all duration-300 hover:opacity-80"
            >
              <Image
                src={client.logo || "/placeholder.svg"}
                alt={client.alt}
                width={140}
                height={70}
                className="max-h-10 w-auto object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </StaggerChildren>
      </section>
    </>
  )
}
