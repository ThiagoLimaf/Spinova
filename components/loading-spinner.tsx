"use client"

import { cn } from "@/lib/utils"

type LoadingSpinnerProps = {
  size?: "sm" | "md" | "lg"
  className?: string
}

export function LoadingSpinner({ size = "md", className }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-2",
    lg: "h-12 w-12 border-3",
  }

  return (
    <div
      className={cn(
        "inline-block rounded-full border-solid border-primary/20 border-t-primary animate-spin",
        sizeClasses[size],
        className,
      )}
    />
  )
}
