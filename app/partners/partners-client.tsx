"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { FadeIn } from "@/components/animations/fade-in"
import { StaggerChildren } from "@/components/animations/stagger-children"
import { useLanguage } from "@/contexts/language-context"
import { t } from "@/utils/translate"
import { ActiveSectionProvider } from "@/components/active-section-observer"
import { MobileMenuProvider } from "@/components/mobile-menu-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ScrollToTop from "@/components/scroll-to-top"

export default function PartnersClient() {
  const { language } = useLanguage()

  // Featured partner logos for hero section
  const featuredPartners = [
    {
      name: "DATABIZZ",
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DATABIZZ%20Logo-wBVxS3QgTTSBH9NexDFtN5WTcPVBCI.png",
      alt: "DATABIZZ logo - Business Intelligence partner of Spinova",
    },
    {
      name: "CHEZ",
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Chez%20Logo%20branca-xFV5MpwK2i1P1Zr858gJj7bb8K2Fkw.png",
      alt: "CHEZ logo - Strategic technology partner of Spinova",
    },
    {
      name: "Navega",
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Navega%20Logo-ep7g0WcmvGsd5RMaIWebQZMJ96IRXG.png",
      alt: "Navega logo - Digital navigation partner of Spinova",
    },
    {
      name: "NPMP",
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/NPMP%20Logo-NXiSLSb3rDwrTVVnzzP6fAzaVM601Q.png",
      alt: "NPMP logo - Project management partner of Spinova",
    },
  ]

  // Partner logos data with source URLs - Complete collection
  const partnerLogos = [
    // Remove the first four featured partner logos from this grid
    // Featured partner logos are now only shown in the hero section above
    {
      name: "acqio",
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-15-R50w6gPHr2haZMjJPXR026UecqF0iT.png",
      alt: "Acqio logo - Fintech partner of Spinova",
    },
    {
      name: "PTI",
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-16-XNbnT7djRoSj7vdkS9EMzgLYLTDY7D.png",
      alt: "PTI (Parque Tecnológico Itaipu) logo - Technology park partner of Spinova",
    },
    {
      name: "elcoma",
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-12-fFUHQDiYPmv3ZhrUaypq7YR2QWvOBO.png",
      alt: "Elcoma Networks logo - Networking partner of Spinova",
    },
    {
      name: "iDEXO",
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-13-C11yCeqEydD2Tw06QEifLNxxLYTgb4.png",
      alt: "iDEXO logo - Innovation partner of Spinova",
    },
    {
      name: "creative pack",
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-14-NKnn9cfJ1zxa3Gf1frMQs33XUOljdG.png",
      alt: "Creative Pack logo - Creative agency partner of Spinova",
    },
    {
      name: "SHOPPING RECIFE",
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-8-ViRfTkevlidoF1hxjUD87NVR2NJDAr.png",
      alt: "Shopping Recife logo - Retail partner of Spinova",
    },
    {
      name: "FindUP",
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-11-UaFNNk1ekXbGlpV4tCyKQtd8BcFAW0.png",
      alt: "FindUP logo - Technology partner of Spinova",
    },
    {
      name: "safetec",
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-10-fVM3Vvg5VQ9rGrq4yldo4QTkJViewm.png",
      alt: "Safetec logo - Security technology partner of Spinova",
    },
    // New logos
    {
      name: "LIGA VENTURES",
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-6-QWE6Fx3I4fPRigcYTgC8DebomdiWj9.png",
      alt: "Liga Ventures logo - Venture capital partner of Spinova",
    },
    {
      name: "Hering",
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-3-K3oFNfPiWkO8PBpRCUwi8ZCYvJeSkJ.png",
      alt: "Hering logo - Fashion retail partner of Spinova",
    },
    {
      name: "MeuDimDim",
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-4-5YwI1i5gihIFiKx9sdJlCgAlY6noTX.png",
      alt: "MeuDimDim logo - Fintech partner of Spinova",
    },
    {
      name: "Enviou",
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-7-oPseUJqUyCsgBUh3BxI1I3ujrDc4xb.png",
      alt: "Enviou logo - Marketing partner of Spinova",
    },
    {
      name: "Arkadium",
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-5-J6GRaBGMKlrZ6uBc1cWxUvn8rKYVae.png",
      alt: "Arkadium logo - Gaming partner of Spinova",
    },
    {
      name: "FCA",
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-2-9EKlbq1Uf9T0zxOyFpg7AIW1oUZqiD.png",
      alt: "FCA logo - Automotive partner of Spinova",
    },
    {
      name: "nickelpay",
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-xXJdmvzbrIRqvlLSdQk5AjfZzw8ccE.png",
      alt: "Nickelpay logo - Payment solutions partner of Spinova",
    },
    {
      name: "Mr.Cat",
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-1-TqERkgL3aXCOTggjVe802yq4r8UVBO.png",
      alt: "Mr.Cat logo - Pet industry partner of Spinova",
    },
  ]

  return (
    <ActiveSectionProvider>
      <MobileMenuProvider>
        <div className="relative min-h-screen">
          <Navbar />

          {/* Background gradients */}
          <div className="pointer-events-none fixed inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
            <div className="absolute right-0 top-0 h-[500px] w-[500px] bg-blue-500/10 blur-[100px]" />
            <div className="absolute bottom-0 left-0 h-[500px] w-[500px] bg-purple-500/10 blur-[100px]" />
          </div>

          <div className="relative z-10">
            <main className="pt-20">
              {/* Hero Section with Description */}
              <section className="container flex flex-col items-center justify-center space-y-8 py-24 text-center md:py-32 px-4 sm:px-6">
                <FadeIn>
                  <h1 className="bg-gradient-to-br from-foreground from-30% via-foreground/90 to-foreground/70 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl">
                    {t("partnersPage.title", language as any)}
                  </h1>
                </FadeIn>
                <FadeIn delay={200}>
                  <p className="mx-auto max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
                    {t("partnersPage.subtitle", language as any)}
                  </p>
                </FadeIn>
                <FadeIn delay={300} className="w-full max-w-4xl">
                  <StaggerChildren
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto"
                    staggerDelay={100}
                  >
                    {featuredPartners.map((partner, index) => (
                      <div
                        key={partner.name}
                        className="aspect-[16/9] flex items-center justify-center p-4 md:p-6 rounded-lg bg-transparent border border-white/10 backdrop-blur-sm hover:border-white/20 hover:bg-white/5 transition-all duration-300 group"
                      >
                        <Image
                          src={partner.url || "/placeholder.svg"}
                          alt={partner.alt}
                          width={160}
                          height={90}
                          className="w-auto max-h-8 md:max-h-10 object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300 filter brightness-100"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </StaggerChildren>
                </FadeIn>
              </section>

              {/* Transparent Partner Logos Grid */}
              <section className="container py-8 px-4 sm:px-6">
                <FadeIn className="mb-12">
                  <h2 className="text-2xl font-bold text-center mb-6">Rede de Transformação</h2>
                  <p className="mx-auto max-w-[42rem] text-center text-muted-foreground">
                    Nossa rede completa de parceiros multiplica o alcance das soluções Spinova, levando inovação e
                    transformação digital para organizações em diversos setores e mercados.
                  </p>
                </FadeIn>

                <StaggerChildren
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6 max-w-7xl mx-auto"
                  staggerDelay={80}
                >
                  {partnerLogos.map((logo, index) => (
                    <div
                      key={logo.name}
                      className="aspect-[16/9] flex items-center justify-center p-3 md:p-4 rounded-lg bg-transparent border border-white/8 backdrop-blur-sm hover:border-white/16 hover:bg-white/2 transition-all duration-300 group"
                    >
                      <Image
                        src={logo.url || "/placeholder.svg"}
                        alt={logo.alt}
                        width={160}
                        height={90}
                        className="w-auto max-h-10 md:max-h-12 object-contain opacity-75 group-hover:opacity-95 transition-opacity duration-300 filter brightness-100"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </StaggerChildren>
              </section>

              {/* Back to Home */}
              <section className="container py-16 px-4 sm:px-6">
                <FadeIn className="flex justify-center">
                  <Link
                    href="/"
                    className="group inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => {
                      // Ensure we navigate to home page and then scroll to top
                      window.location.href = "/"
                    }}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform duration-300" />
                    {t("partnersPage.backToHome", language as any)}
                  </Link>
                </FadeIn>
              </section>
            </main>
            <Footer />
            <ScrollToTop />
          </div>
        </div>
      </MobileMenuProvider>
    </ActiveSectionProvider>
  )
}
