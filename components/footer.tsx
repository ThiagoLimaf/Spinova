"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { Linkedin, Mail, MapPin, Copy, ExternalLink } from "lucide-react"
import { trackEvent } from "@/utils/trackEvent"
import { scrollToSection } from "@/utils/scroll-utils"
import { FadeIn } from "./animations/fade-in"
import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { t } from "@/utils/translate"

export default function Footer() {
  const { language } = useLanguage()
  const [copySuccess, setCopySuccess] = useState(false)
  const address = "Av. Engenheiro Luís Carlos Berrini, 1748 - Itaim Bibi, São Paulo/SP - 04571-010"

  const handleSectionClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()
    scrollToSection(sectionId)
    trackEvent("footer_navigation_click", { section: sectionId })
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(address)
    setCopySuccess(true)
    trackEvent("address_copied", { location: "footer" })
    setTimeout(() => setCopySuccess(false), 2000)
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
          <p className="text-sm text-gray-400">{t("footer.description", language as any)}</p>
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
              href="mailto:contato@spinova.org.br"
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
          <address className="text-sm text-gray-400 not-italic space-y-3">
            <p>
              <a
                href="https://wa.me/5548988267335"
                className="hover:text-white transition-colors touch-manipulation"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("contact_click", { location: "footer", type: "whatsapp_text" })}
              >
                +55 48 9 8826 7335
              </a>
            </p>
            <p>
              <a
                href="mailto:contato@spinova.org.br"
                className="hover:text-white transition-colors touch-manipulation"
                onClick={() => trackEvent("contact_click", { location: "footer", type: "email_text" })}
              >
                contato@spinova.org.br
              </a>
            </p>
            <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/50">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0 text-primary" aria-hidden="true" />
                <div className="ml-2">
                  <p className="font-medium text-gray-300 mb-1">{t("footer.office", language as any)}</p>
                  <p className="leading-relaxed">
                    Av. Engenheiro Luís Carlos Berrini, 1748
                    <br />
                    Itaim Bibi, São Paulo/SP
                    <br />
                    04571-010
                  </p>
                  <div className="flex mt-2 space-x-2">
                    <button
                      onClick={copyToClipboard}
                      className="inline-flex items-center text-xs bg-gray-700/50 hover:bg-gray-700 px-2 py-1 rounded transition-colors"
                      aria-label={t("footer.copy", language as any)}
                    >
                      <Copy className="h-3 w-3 mr-1" />
                      {copySuccess ? t("footer.copied", language as any) : t("footer.copy", language as any)}
                    </button>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-xs bg-gray-700/50 hover:bg-gray-700 px-2 py-1 rounded transition-colors"
                      onClick={() => trackEvent("address_map_click", { location: "footer" })}
                      aria-label={t("footer.viewMap", language as any)}
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      {t("footer.viewMap", language as any)}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </address>
        </div>
        <nav className="grid flex-1 grid-cols-2 gap-8 sm:gap-12 sm:grid-cols-3" aria-label="Rodapé">
          <div className="space-y-4">
            <h3 className="text-sm font-medium">{t("footer.solutions", language as any)}</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="#pilares"
                  className="text-gray-400 transition-colors hover:text-white block py-2 touch-manipulation"
                  onClick={(e) => handleSectionClick(e, "pilares")}
                >
                  {t("pillars.software.title", language as any)}
                </a>
              </li>
              <li>
                <a
                  href="#pilares"
                  className="text-gray-400 transition-colors hover:text-white block py-2 touch-manipulation"
                  onClick={(e) => handleSectionClick(e, "pilares")}
                >
                  {t("pillars.innovation.title", language as any)}
                </a>
              </li>
              <li>
                <a
                  href="#pilares"
                  className="text-gray-400 transition-colors hover:text-white block py-2 touch-manipulation"
                  onClick={(e) => handleSectionClick(e, "pilares")}
                >
                  {t("pillars.venture.title", language as any)}
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium">{t("footer.company", language as any)}</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 transition-colors hover:text-white block py-2 touch-manipulation"
                >
                  {t("footer.aboutUs", language as any)}
                </Link>
              </li>
              <li>
                <a
                  href="#clientes"
                  className="text-gray-400 transition-colors hover:text-white block py-2 touch-manipulation"
                  onClick={(e) => handleSectionClick(e, "clientes")}
                >
                  {t("nav.clients", language as any)}
                </a>
              </li>
              <li>
                <a
                  href="#beneficios"
                  className="text-gray-400 transition-colors hover:text-white block py-2 touch-manipulation"
                  onClick={(e) => handleSectionClick(e, "beneficios")}
                >
                  {t("nav.benefits", language as any)}
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium">{t("footer.resources", language as any)}</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/blog"
                  className="text-gray-400 transition-colors hover:text-white block py-2 touch-manipulation"
                >
                  {t("nav.blog", language as any)}
                </Link>
              </li>
              <li>
                <Link
                  href="mailto:contato@spinova.org.br"
                  className="text-gray-400 transition-colors hover:text-white block py-2 touch-manipulation"
                  onClick={() => trackEvent("contact_click", { location: "footer_menu", type: "contact_link" })}
                >
                  {t("nav.contact", language as any)}
                </Link>
              </li>
              <li>
                <Link
                  href="/privacidade"
                  className="text-gray-400 transition-colors hover:text-white block py-2 touch-manipulation"
                >
                  {t("nav.privacy", language as any)}
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </FadeIn>
      <div className="container border-t border-gray-800 py-6 px-4 sm:px-6">
        <p className="text-center text-sm text-gray-400">
          {t("footer.copyright", language as any, { year: new Date().getFullYear() })}
        </p>
      </div>
    </footer>
  )
}
