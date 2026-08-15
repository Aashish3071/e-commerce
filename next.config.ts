import type { NextConfig } from 'next';

const remotePatterns: NonNullable<NextConfig['images']>['remotePatterns'] = [
  {
    protocol: 'https',
    hostname: '**',
  },
  {
    protocol: 'http',
    hostname: '**',
  },
];

const nextConfig: NextConfig = {
  reactCompiler: true,
  serverExternalPackages: ['graphql', '@keystone-6/core', '@prisma/client', 'bcryptjs', '@hapi/iron'],
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  // Workaround since we diverged from Keystone relationship and document views
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns,
  },
};

export default nextConfig;