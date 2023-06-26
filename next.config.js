/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  /* compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? true : false,
  }, */
  images: {
    domains: ['lh3.googleusercontent.com', 'i.imgur.com'],
  },
}

module.exports = nextConfig
