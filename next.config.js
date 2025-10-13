/** @type {import('next').NextConfig} */
const nextConfig = {
  // App directory is now stable in Next.js 14
  // Port configuration
  env: {
    PORT: process.env.PORT || '4000',
  },
}

module.exports = nextConfig
