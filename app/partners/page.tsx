import type { Metadata } from "next"
import PartnersClient from "./partners-client"

export const metadata: Metadata = {
  title: "Parceiros | Spinova",
  description:
    "Conheça as empresas e organizações que colaboram com a Spinova para impulsionar a inovação e transformação digital em diversos setores do mercado.",
  keywords: "parceiros Spinova, colaborações, parcerias estratégicas, transformação digital, inovação empresarial",
}

export default function PartnersPage() {
  return <PartnersClient />
}
