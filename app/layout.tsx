import "./globals.css"
import { Inter } from "next/font/google"
import type React from "react"
import type { Metadata } from "next"
import MouseMoveEffect from "@/components/mouse-move-effect"
import Script from "next/script"
import CookieConsent from "@/components/cookie-consent"
import GoogleAnalytics from "@/components/google-analytics"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Spinova | Instituto de Ciência e Tecnologia",
  description:
    "A Spinova é um Instituto de Ciência e Tecnologia onde engenheiros e especialistas criam soluções inovadoras em software, inovação e venture capital para impulsionar seu negócio.",
  keywords:
    "Spinova, instituto de ciência e tecnologia, inovação, software, venture capital, desenvolvimento de software, transformação digital",
  authors: [{ name: "Spinova" }],
  creator: "Spinova",
  publisher: "Spinova",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://spinova.solutions"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Spinova | Instituto de Ciência e Tecnologia",
    description:
      "A Spinova é um Instituto de Ciência e Tecnologia onde engenheiros e especialistas criam soluções inovadoras em software, inovação e venture capital.",
    url: "https://spinova.solutions",
    siteName: "Spinova",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "https://spinova.solutions/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Spinova - Instituto de Ciência e Tecnologia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Spinova | Instituto de Ciência e Tecnologia",
    description:
      "A Spinova é um Instituto de Ciência e Tecnologia onde engenheiros e especialistas criam soluções inovadoras.",
    images: ["https://spinova.solutions/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="dark scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#111827" />
      </head>
      <body className={`${inter.className} bg-background text-foreground antialiased`}>
        {/* Google Analytics */}
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>

        <Suspense fallback={null}>
          <MouseMoveEffect />
        </Suspense>
        {children}
        <Suspense fallback={null}>
          <CookieConsent />
        </Suspense>

        {/* Structured Data for Organization */}
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Spinova",
              url: "https://spinova.solutions",
              logo: "https://spinova.solutions/logo.png",
              sameAs: ["https://www.linkedin.com/company/spinova-ict", "https://github.com/spinova"],
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+55-48-98826-7335",
                contactType: "customer service",
                email: "contato@spinova.solutions",
              },
              description:
                "A Spinova é um Instituto de Ciência e Tecnologia onde engenheiros e especialistas criam soluções inovadoras em software, inovação e venture capital.",
            }),
          }}
        />
      </body>
    </html>
  )
}
