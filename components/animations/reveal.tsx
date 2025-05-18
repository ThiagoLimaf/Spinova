"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

type RevealProps = {
  children: React.ReactNode
  className?: string
  direction?: "left" | "right" | "top" | "bottom"
  duration?: number
  delay?: number
  threshold?: number
  as?: React.ElementType
}

export function Reveal({
  children,
  className,
  direction = "bottom",
  duration = 800,
  delay = 0,
  threshold = 0.1,
  as: Component = "div",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isRevealed, setIsRevealed] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  // Map direction to transform values
  const directionMap = {
    left: "translateX(-100%)",
    right: "translateX(100%)",
    top: "translateY(-100%)",
    bottom: "translateY(100%)",
  }

  useEffect(() => {
    // If user prefers reduced motion, show content immediately
    if (prefersReducedMotion) {
      setIsRevealed(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true)
          observer.unobserve(entry.target)
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -50px 0px",
      },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [threshold, prefersReducedMotion])

  // If reduced motion is preferred, render without animation
  if (prefersReducedMotion) {
    return <Component className={className}>{children}</Component>
  }

  return (
    <Component ref={ref} className={cn("overflow-hidden", className)}>
      <div
        style={{
          transform: isRevealed ? "translate3d(0, 0, 0)" : directionMap[direction],
          transition: `transform ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms`,
        }}
      >
        {children}
      </div>
    </Component>
  )
}
