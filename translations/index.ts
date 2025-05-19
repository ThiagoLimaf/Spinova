import { en } from "./en"
import { ptBR } from "./pt-BR"

export const translations = {
  en,
  "pt-BR": ptBR,
}

export type Language = keyof typeof translations
