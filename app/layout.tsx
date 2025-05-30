import "./globals.css"
import { Inter } from "next/font/google"
import type React from "react"
import type { Metadata } from "next"
import MouseMoveEffect from "@/components/mouse-move-effect"
import Script from "next/script"
import CookieConsent from "@/components/cookie-consent"
import GoogleAnalytics from "@/components/google-analytics"
import { Suspense } from "react"
import { MobileMenuProvider } from "@/components/mobile-menu-provider"
import { ActiveSectionProvider } from "@/components/active-section-observer"
import { LanguageProvider } from "@/contexts/language-context"
import Navbar from "@/components/navbar"

const inter = Inter({ subsets: ["latin"], display: "swap" })

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
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover",
  themeColor: "#111827",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#111827",
      },
    ],
  },
  manifest: "/site.webmanifest",
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
  applicationName: "Spinova",
  appleWebApp: {
    title: "Spinova",
    statusBarStyle: "black-translucent",
    capable: true,
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
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#111827" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#111827" />
        <meta name="msapplication-TileImage" content="/mstile-150x150.png" />
        <meta name="theme-color" content="#111827" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover, user-scalable=no"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className={`${inter.className} bg-background text-foreground antialiased mobile-safe-area`}>
        <LanguageProvider>
          {/* Google Analytics */}
          <Suspense fallback={null}>
            <GoogleAnalytics />
          </Suspense>

          <Suspense fallback={null}>
            <MouseMoveEffect />
          </Suspense>

          <ActiveSectionProvider>
            <MobileMenuProvider>
              <Navbar /> {/* Add this line to ensure Navbar appears on all pages */}
              {children}
            </MobileMenuProvider>
          </ActiveSectionProvider>

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
                sameAs: [
                  "https://www.linkedin.com/company/spinova-ict",
                  "https://github.com/spinova",
                  "https://spinova.solutions/partners",
                ],
                contactPoint: {
                  "@type": "ContactPoint",
                  telephone: "+55-48-98826-7335",
                  contactType: "customer service",
                  email: "contato@spinova.org.br",
                },
                description:
                  "A Spinova é um Instituto de Ciência e Tecnologia onde engenheiros e especialistas criam soluções inovadoras em software, inovação e venture capital.",
              }),
            }}
          />
        </LanguageProvider>
      </body>
    </html>
  )
}
