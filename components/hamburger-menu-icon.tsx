"use client"

import { cn } from "@/lib/utils"

interface HamburgerMenuIconProps {
  isOpen: boolean
  className?: string
}

export function HamburgerMenuIcon({ isOpen, className }: HamburgerMenuIconProps) {
  return (
    <div className={cn("relative w-6 h-5", className)}>
      <span
        className={cn(
          "absolute block h-0.5 w-6 bg-current transform transition-all duration-400 hamburger-line",
          isOpen ? "rotate-45 top-2.5 w-6" : "top-0 w-6",
        )}
      />
      <span
        className={cn(
          "absolute block h-0.5 bg-current transform transition-all duration-400 hamburger-line",
          isOpen ? "opacity-0 translate-x-3 w-0" : "opacity-100 w-5 top-2 left-0.5",
        )}
      />
      <span
        className={cn(
          "absolute block h-0.5 w-6 bg-current transform transition-all duration-400 hamburger-line",
          isOpen ? "-rotate-45 top-2.5 w-6" : "top-4 w-6",
        )}
      />
    </div>
  )
}
