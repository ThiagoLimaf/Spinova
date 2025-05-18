"use client"

// Utility functions for tracking events
export const trackEvent = (eventName: string, eventParams?: Record<string, string | number | boolean>) => {
  if (window.gtag) {
    window.gtag("event", eventName, eventParams)
  }
}

// Specific function for tracking contact clicks
export const trackContactClick = (location: string, type = "button") => {
  trackEvent("contact_click", {
    location,
    type,
    destination: "contato@spinova.solutions",
  })
}

// Example usage:
// trackEvent('button_click', { button_name: 'contact_us' });
// trackEvent('form_submit', { form_name: 'contact_form', success: true });
// trackEvent('download', { file_name: 'brochure.pdf' });
