import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  eslint: {
    dirs: ['src']
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