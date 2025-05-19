"use client"

import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { t } from "@/utils/translate"
import { Button } from "@/components/ui/button"
import { Check, ChevronDown, Globe } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

const languages = [
  {
    code: "en",
    name: "English",
    flag: "🇺🇸",
  },
  {
    code: "pt-BR",
    name: "Português",
    flag: "🇧🇷",
  },
]

export function LanguageSwitcher({ variant = "icon" }: { variant?: "icon" | "full" | "minimal" }) {
  const { language, setLanguage, isLoading } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const currentLanguage = languages.find((lang) => lang.code === language) || languages[0]

  const handleLanguageChange = (langCode: string) => {
    setLanguage(langCode as "en" | "pt-BR")
    setIsOpen(false)
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "flex items-center gap-1 px-2 py-1 h-auto",
            variant === "minimal" && "p-0 hover:bg-transparent hover:text-primary",
          )}
          disabled={isLoading}
          aria-label={t("language.switchTo", language, { language: currentLanguage.name })}
        >
          {variant !== "minimal" && <span className="text-lg mr-1">{currentLanguage.flag}</span>}
          {variant === "full" && <span className="text-sm">{t(`language.${currentLanguage.code}`, language)}</span>}
          {variant === "icon" && <Globe className="h-4 w-4" />}
          <ChevronDown className={cn("h-3 w-3 transition-transform", isOpen && "rotate-180")} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            className={cn("flex items-center gap-2 cursor-pointer", lang.code === language && "font-medium bg-muted")}
            onClick={() => handleLanguageChange(lang.code)}
          >
            <span className="text-lg">{lang.flag}</span>
            <span className="flex-1">{t(`language.${lang.code}`, language)}</span>
            {lang.code === language && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
