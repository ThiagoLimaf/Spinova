import ClientPage from "./client-page"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Spinova | Conduzindo Inovação em Tecnologia",
  description:
    "A Spinova é um Instituto de Ciência e Tecnologia especializado em software, inovação e venture capital para impulsionar a transformação digital do seu negócio.",
}

export default function Home() {
  return <ClientPage />
}
