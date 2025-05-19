"use client"

import { useEffect } from "react"
import { useLanguage } from "@/contexts/language-context"

export function DynamicMetadata() {
  const { language } = useLanguage()

  useEffect(() => {
    // Update metadata based on language
    const title = document.querySelector("title")
    const description = document.querySelector('meta[name="description"]')

    if (title) {
      title.textContent =
        language === "en" ? "Spinova | Driving Innovation in Technology" : "Spinova | Conduzindo Inovação em Tecnologia"
    }

    if (description) {
      const content =
        language === "en"
          ? "Spinova is a Science and Technology Institute specialized in software, innovation, and venture capital to drive your business's digital transformation."
          : "A Spinova é um Instituto de Ciência e Tecnologia especializado em software, inovação e venture capital para impulsionar a transformação digital do seu negócio."

      description.setAttribute("content", content)
    }

    // Update Open Graph metadata
    const ogTitle = document.querySelector('meta[property="og:title"]')
    const ogDescription = document.querySelector('meta[property="og:description"]')

    if (ogTitle) {
      ogTitle.setAttribute(
        "content",
        language === "en"
          ? "Spinova | Driving Innovation in Technology"
          : "Spinova | Conduzindo Inovação em Tecnologia",
      )
    }

    if (ogDescription) {
      ogDescription.setAttribute(
        "content",
        language === "en"
          ? "Spinova is a Science and Technology Institute where engineers and specialists create innovative solutions."
          : "A Spinova é um Instituto de Ciência e Tecnologia onde engenheiros e especialistas criam soluções inovadoras.",
      )
    }

    // Update Twitter metadata
    const twitterTitle = document.querySelector('meta[name="twitter:title"]')
    const twitterDescription = document.querySelector('meta[name="twitter:description"]')

    if (twitterTitle) {
      twitterTitle.setAttribute(
        "content",
        language === "en"
          ? "Spinova | Driving Innovation in Technology"
          : "Spinova | Conduzindo Inovação em Tecnologia",
      )
    }

    if (twitterDescription) {
      twitterDescription.setAttribute(
        "content",
        language === "en"
          ? "Spinova is a Science and Technology Institute where engineers and specialists create innovative solutions."
          : "A Spinova é um Instituto de Ciência e Tecnologia onde engenheiros e especialistas criam soluções inovadoras.",
      )
    }
  }, [language])

  return null
}
