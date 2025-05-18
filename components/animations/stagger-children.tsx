"use client"

import type React from "react"

import { Children, cloneElement, isValidElement, useRef, useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

type StaggerChildrenProps = {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
  initialDelay?: number
  threshold?: number
  as?: React.ElementType
}

export function StaggerChildren({
  children,
  className,
  staggerDelay = 100,
  initialDelay = 0,
  threshold = 0.1,
  as: Component = "div",
}: StaggerChildrenProps) {
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

  // Clone children and add staggered animation delay
  const staggeredChildren = Children.map(children, (child, index) => {
    if (isValidElement(child)) {
      return cloneElement(child, {
        style: {
          ...child.props.style,
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 500ms ease-out, transform 500ms ease-out",
          transitionDelay: `${initialDelay + index * staggerDelay}ms`,
        },
      })
    }
    return child
  })

  return (
    <Component ref={ref} className={cn(className)}>
      {staggeredChildren}
    </Component>
  )
}
