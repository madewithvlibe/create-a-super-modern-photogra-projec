/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3.eu-central-2.wasabisys.com',
        pathname: '/vlibe.com/vlibe-storage/**',
      },
    ],
  },
};

module.exports = nextConfig;
