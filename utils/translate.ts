import { translations } from "@/translations"
import type { Language } from "@/translations"

export function t(key: string, language: Language, params: Record<string, string | number> = {}) {
  // Split the key by dots to access nested properties
  const keys = key.split(".")

  // Get the translation object for the specified language
  let translation: any = translations[language]

  // Navigate through the nested properties
  for (const k of keys) {
    if (translation && translation[k] !== undefined) {
      translation = translation[k]
    } else {
      // If translation not found, return the key
      return key
    }
  }

  // If the translation is a string, replace any parameters
  if (typeof translation === "string") {
    return Object.entries(params).reduce((acc, [param, value]) => {
      return acc.replace(new RegExp(`{${param}}`, "g"), String(value))
    }, translation)
  }

  // If translation is not a string (e.g., an object), return the key
  return key
}
