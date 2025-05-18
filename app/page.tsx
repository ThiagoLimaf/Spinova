import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import Features from "@/components/features"
import Footer from "@/components/footer"
import ScrollToTop from "@/components/scroll-to-top"
import { PageTransition } from "@/components/page-transition"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Spinova | Conduzindo Inovação em Tecnologia",
  description:
    "A Spinova é um Instituto de Ciência e Tecnologia especializado em software, inovação e venture capital para impulsionar a transformação digital do seu negócio.",
}

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Page transition animation */}
      <PageTransition />

      {/* Background gradients */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
        <div className="absolute right-0 top-0 h-[500px] w-[500px] bg-blue-500/10 blur-[100px]" />
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] bg-purple-500/10 blur-[100px]" />
      </div>

      <div className="relative z-10">
        <Navbar />
        <main className="pt-14">
          <Hero />
          <Features />
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </div>
  )
}
