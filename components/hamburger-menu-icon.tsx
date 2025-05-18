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
          "absolute block h-0.5 w-6 bg-current transform transition duration-300 ease-in-out",
          isOpen ? "rotate-45 top-2.5" : "top-0",
        )}
      />
      <span
        className={cn(
          "absolute block h-0.5 bg-current transform transition-opacity duration-300 ease-in-out",
          isOpen ? "opacity-0 w-0" : "opacity-100 w-6 top-2",
        )}
      />
      <span
        className={cn(
          "absolute block h-0.5 w-6 bg-current transform transition duration-300 ease-in-out",
          isOpen ? "-rotate-45 top-2.5" : "top-4",
        )}
      />
    </div>
  )
}
