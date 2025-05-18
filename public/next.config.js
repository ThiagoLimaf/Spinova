/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
    domains: ["blob.v0.dev"],
    unoptimized: true,
  },
  experimental: {
    optimizeCss: true,
    optimizeServerReact: true,
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/privacidade",
        destination: "/privacy-policy",
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
