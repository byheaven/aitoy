/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'demo.amio.love'],
    unoptimized: process.env.NODE_ENV === 'development',
  },
  // Disable service worker in development
  ...(process.env.NODE_ENV === 'development' && {
    headers: async () => [
      {
        source: '/sw.js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
        ],
      },
    ],
  }),
  // Server Actions are now available by default in Next.js 14
  // Support for Three.js and 3D models
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glb|gltf|obj|fbx)$/,
      type: 'asset/resource',
    });
    return config;
  },
  // Environment variables
  env: {
    NEXT_PUBLIC_CONVEX_URL: process.env.NEXT_PUBLIC_CONVEX_URL,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  },
  // For static export (GitHub Pages)
  // Note: Server Actions require dynamic rendering, cannot use static export
  // output: 'export',
  // basePath: '',
  // trailingSlash: true,
};

module.exports = nextConfig;