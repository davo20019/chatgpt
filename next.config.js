/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    runtime: 'edge',
  },
  images: {
    domains: ['oaidalleapiprodscus.blob.core.windows.net'],
    disableStaticImages: true,
  },

}

module.exports = nextConfig
