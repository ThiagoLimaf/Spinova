"use client"

// Utility functions for tracking events
export const trackEvent = (eventName: string, eventParams?: Record<string, string | number | boolean>) => {
  if (window.gtag) {
    window.gtag("event", eventName, eventParams)
  }
}
