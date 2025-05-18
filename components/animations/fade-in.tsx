"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

type FadeInProps = {
  children: React.ReactNode
  className?: string
  duration?: "fast" | "medium" | "slow"
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "none"
  threshold?: number
  once?: boolean
  as?: React.ElementType
}

export function FadeIn({
  children,
  className,
  duration = "medium",
  delay = 0,
  direction = "up",
  threshold = 0.2,
  once = true,
  as: Component = "div",
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  // Map duration to actual time values
  const durationMap = {
    fast: 300,
    medium: 500,
    slow: 700,
  }

  // Map direction to transform values
  const directionMap = {
    up: "translate3d(0, 20px, 0)",
    down: "translate3d(0, -20px, 0)",
    left: "translate3d(20px, 0, 0)",
    right: "translate3d(-20px, 0, 0)",
    none: "translate3d(0, 0, 0)",
  }

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
          if (once && ref.current) {
            observer.unobserve(ref.current)
          }
        } else if (!once) {
          setIsVisible(false)
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
  }, [threshold, once, prefersReducedMotion])

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
        transform: isVisible ? "translate3d(0, 0, 0)" : directionMap[direction],
        transition: `opacity ${durationMap[duration]}ms ease-out, transform ${durationMap[duration]}ms ease-out`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </Component>
  )
}
