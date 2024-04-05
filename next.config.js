/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  output: 'standalone',
  experimental: {
    optimizePackageImports: ['@telefonica/mistica'],
  },
}

module.exports = nextConfig
