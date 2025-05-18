// Add Google Analytics to the Window interface
interface Window {
  gtag: (
    command: string,
    target: string,
    config?: {
      [key: string]: any
    },
  ) => void
  dataLayer: any[]
}
