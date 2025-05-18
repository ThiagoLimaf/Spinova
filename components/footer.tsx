"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { Linkedin, Mail } from "lucide-react"
import { trackEvent } from "@/utils/trackEvent"
import { scrollToSection } from "@/utils/scroll-utils"
import { FadeIn } from "./animations/fade-in"

export default function Footer() {
  const handleSectionClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()
    scrollToSection(sectionId)
    trackEvent("footer_navigation_click", { section: sectionId })
  }

  return (
    <footer id="contato" className="bg-gray-900 text-white border-t border-gray-800">
      <FadeIn className="container flex flex-col gap-8 py-8 md:flex-row md:py-12 px-4 sm:px-6">
        <div className="flex-1 space-y-4">
          <Link href="/" className="inline-block touch-manipulation" aria-label="Voltar para a página inicial">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Spinova%20extented%20white%20logo-quepSGTq5FZuyDy7EPwkwm4aHsnR0r.png"
              alt="Spinova Logo"
              width={150}
              height={40}
              className="h-10 w-auto"
            />
          </Link>
          <p className="text-sm text-gray-400">
            Instituto de Ciência e Tecnologia onde engenheiros e especialistas criam soluções que impulsionam seu
            negócio.
          </p>
          <div className="flex space-x-4">
            <Link
              href="https://wa.me/5548988267335"
              className="text-gray-400 transition-colors hover:text-white touch-manipulation p-2"
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
                <path d="M13.5 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
                <path d="M9 13.5a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 0-1h-5a.5.5 0 0 0-.5.5Z" />
              </svg>
              <span className="sr-only">WhatsApp</span>
            </Link>
            <Link
              href="mailto:contato@spinova.solutions"
              className="text-gray-400 transition-colors hover:text-white touch-manipulation p-2"
              target="_blank"
              rel="noreferrer"
              aria-label="Email"
              onClick={() => trackEvent("contact_click", { location: "footer", type: "email" })}
            >
              <Mail className="h-5 w-5" aria-hidden="true" />
              <span className="sr-only">Email</span>
            </Link>
            <Link
              href="https://www.linkedin.com/company/spinova-ict"
              className="text-gray-400 transition-colors hover:text-white touch-manipulation p-2"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" aria-hidden="true" />
              <span className="sr-only">LinkedIn</span>
            </Link>
          </div>
          <address className="text-sm text-gray-400 not-italic">
            <p>+55 48 9 8826 7335</p>
            <p>
              <a
                href="mailto:contato@spinova.solutions"
                className="hover:text-white transition-colors touch-manipulation"
                onClick={() => trackEvent("contact_click", { location: "footer", type: "email_text" })}
              >
                contato@spinova.solutions
              </a>
            </p>
          </address>
        </div>
        <nav className="grid flex-1 grid-cols-2 gap-8 sm:gap-12 sm:grid-cols-3" aria-label="Rodapé">
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Soluções</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="#pilares"
                  className="text-gray-400 transition-colors hover:text-white block py-2 touch-manipulation"
                  onClick={(e) => handleSectionClick(e, "pilares")}
                >
                  Software
                </a>
              </li>
              <li>
                <a
                  href="#pilares"
                  className="text-gray-400 transition-colors hover:text-white block py-2 touch-manipulation"
                  onClick={(e) => handleSectionClick(e, "pilares")}
                >
                  Inovação
                </a>
              </li>
              <li>
                <a
                  href="#pilares"
                  className="text-gray-400 transition-colors hover:text-white block py-2 touch-manipulation"
                  onClick={(e) => handleSectionClick(e, "pilares")}
                >
                  Venture
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Empresa</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 transition-colors hover:text-white block py-2 touch-manipulation"
                >
                  Sobre Nós
                </Link>
              </li>
              <li>
                <a
                  href="#clientes"
                  className="text-gray-400 transition-colors hover:text-white block py-2 touch-manipulation"
                  onClick={(e) => handleSectionClick(e, "clientes")}
                >
                  Clientes
                </a>
              </li>
              <li>
                <a
                  href="#beneficios"
                  className="text-gray-400 transition-colors hover:text-white block py-2 touch-manipulation"
                  onClick={(e) => handleSectionClick(e, "beneficios")}
                >
                  Benefícios
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Recursos</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/blog"
                  className="text-gray-400 transition-colors hover:text-white block py-2 touch-manipulation"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="mailto:contato@spinova.solutions"
                  className="text-gray-400 transition-colors hover:text-white block py-2 touch-manipulation"
                  onClick={() => trackEvent("contact_click", { location: "footer_menu", type: "contact_link" })}
                >
                  Contato
                </Link>
              </li>
              <li>
                <Link
                  href="/privacidade"
                  className="text-gray-400 transition-colors hover:text-white block py-2 touch-manipulation"
                >
                  Privacidade
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </FadeIn>
      <div className="container border-t border-gray-800 py-6 px-4 sm:px-6">
        <p className="text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Spinova. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}
