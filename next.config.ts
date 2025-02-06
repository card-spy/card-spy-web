import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        // this isn't strictly a good practice, but there are too many domains to list out explicitly
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
