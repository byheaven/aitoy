/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glb|gltf|obj|fbx)$/,
      type: 'asset/resource',
    });
    return config;
  },
};

module.exports = nextConfig;