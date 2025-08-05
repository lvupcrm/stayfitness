import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  eslint: {
    dirs: ['src'],
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: false
  },
  images: {
    domains: ['placeholder.supabase.co'],
    formats: ['image/webp', 'image/avif']
  }
}

export default nextConfig