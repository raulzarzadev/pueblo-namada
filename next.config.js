/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

module.exports = withPWA({
  pwa: {
    dest: 'public',
    runtimeCaching
  }
})
module.exports = {
  images: {
    domains: [
      'api.lorem.space',
      'firebasestorage.googleapis.com'
    ],
    formats: ['image/avif', 'image/webp']
  }
}
