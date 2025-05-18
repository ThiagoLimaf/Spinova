"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

type ScaleInProps = {
  children: React.ReactNode
  className?: string
  duration?: number
  delay?: number
  threshold?: number
  startScale?: number
  as?: React.ElementType
}

export function ScaleIn({
  children,
  className,
  duration = 500,
  delay = 0,
  threshold = 0.1,
  startScale = 0.95,
  as: Component = "div",
}: ScaleInProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    // If user prefers reduced motion, show content immediately
    if (prefersReducedMotion) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
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
    <Component
      ref={ref}
      className={cn(className)}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "scale(1)" : `scale(${startScale})`,
        transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </Component>
  )
}
