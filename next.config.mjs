/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/zalada',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
}

export default nextConfig

