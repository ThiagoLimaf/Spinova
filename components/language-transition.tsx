"use client"

import { useLanguage } from "@/contexts/language-context"
import { cn } from "@/lib/utils"

export function LanguageTransition() {
  const { isLoading } = useLanguage()

  if (!isLoading) return null

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm transition-opacity duration-300",
        isLoading ? "opacity-100" : "opacity-0 pointer-events-none",
      )}
    >
      <div className="relative h-12 w-12">
        <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin"></div>
      </div>
    </div>
  )
}
