/**
 * Smoothly scrolls to a target element with offset for fixed header
 * Optimized for mobile and desktop devices
 */
export function scrollToSection(sectionId: string): void {
  // Remove the # if it's included
  const targetId = sectionId.startsWith("#") ? sectionId.substring(1) : sectionId
  const targetElement = document.getElementById(targetId)

  if (!targetElement) return

  // Get the header height to offset the scroll position
  const header = document.querySelector("header")
  const headerOffset = header ? header.getBoundingClientRect().height : 0

  // Add extra padding on mobile devices
  const isMobile = window.innerWidth < 768
  const mobilePadding = isMobile ? 16 : 0

  // Calculate the target position with offset
  const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerOffset - mobilePadding

  // Scroll options
  const scrollOptions: ScrollToOptions = {
    top: targetPosition,
    behavior: "smooth",
  }

  // Perform the scroll
  window.scrollTo(scrollOptions)

  // Update URL hash without jumping
  setTimeout(() => {
    history.pushState(null, "", `#${targetId}`)
  }, 10)
}

/**
 * Detects if the device is a touch device
 */
export function isTouchDevice(): boolean {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0
}

/**
 * Scrolls to the top of the page smoothly
 */
export function scrollToTop(): void {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
}
