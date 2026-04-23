/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Removed basePath because zalada.in is the root
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
}

export default nextConfig