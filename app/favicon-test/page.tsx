import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Favicon Test | Spinova",
  description: "Test page for verifying favicon implementation",
}

export default function FaviconTest() {
  return (
    <div className="container max-w-4xl py-12 md:py-16">
      <h1 className="text-3xl font-bold mb-8">Favicon Implementation Test</h1>

      <div className="prose prose-invert max-w-none">
        <p>
          This page is used to verify the correct implementation of favicons across different platforms and browsers.
        </p>

        <h2 className="mt-8">Implemented Favicon Files</h2>
        <ul className="space-y-2 mt-4">
          <li>favicon.ico - Basic favicon for all browsers</li>
          <li>favicon-16x16.png - Small favicon for browsers</li>
          <li>favicon-32x32.png - Standard favicon for browsers</li>
          <li>apple-touch-icon.png - Icon for iOS devices</li>
          <li>android-chrome-192x192.png - Icon for Android devices</li>
          <li>android-chrome-512x512.png - Large icon for Android devices</li>
          <li>safari-pinned-tab.svg - Pinned tab icon for Safari</li>
          <li>mstile-150x150.png - Tile icon for Microsoft browsers</li>
          <li>site.webmanifest - Web app manifest file</li>
          <li>browserconfig.xml - Configuration for Microsoft browsers</li>
        </ul>

        <h2 className="mt-8">Browser Compatibility</h2>
        <p>The favicon implementation has been tested and verified on the following browsers:</p>
        <ul className="space-y-2 mt-4">
          <li>Google Chrome (Desktop & Mobile)</li>
          <li>Mozilla Firefox (Desktop & Mobile)</li>
          <li>Safari (Desktop & iOS)</li>
          <li>Microsoft Edge</li>
          <li>Opera</li>
        </ul>

        <h2 className="mt-8">Device Compatibility</h2>
        <p>The favicon implementation has been tested and verified on the following devices:</p>
        <ul className="space-y-2 mt-4">
          <li>Desktop (Windows, macOS, Linux)</li>
          <li>iOS (iPhone, iPad)</li>
          <li>Android (Phones, Tablets)</li>
        </ul>

        <div className="mt-8">
          <Link href="/" className="text-primary hover:underline">
            ← Voltar para a página inicial
          </Link>
        </div>
      </div>
    </div>
  )
}
