/** @type {import('next').NextConfig} */
const nextConfig = {
  // App directory is now stable in Next.js 14
  // Port configuration
  env: {
    PORT: process.env.PORT || '3000',
  },
  // Netlify configuration
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Disable static optimization for dynamic content
  experimental: {
    missingSuspenseWithCSRBailout: false,
  }
}

module.exports = nextConfig
