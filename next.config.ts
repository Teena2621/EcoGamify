 import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  
  // CRITICAL FIX: Add 'phaser' to transpilePackages.
  // This tells Next.js to compile the Phaser module as if it were local source code,
  // which resolves the 'Export default doesn't exist' error.
  transpilePackages: ['phaser'], 

  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
