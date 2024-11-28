/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', port: '', hostname: 'ipfs.io' },
      { protocol: 'https', port: '', hostname: 'gateway.pinata.cloud' },
      {
        protocol: 'https',
        hostname: 'giveth.mypinata.cloud',
      },
      {
        protocol: 'https',
        hostname: 'gateway.pinata.cloud',
      },
      {
        hostname: 'example.com',
      },
    ],
  },
  redirects: async () => {
    return [
      {
        source: '/kyc',
        destination: '/zkid',
        permanent: true,
      },
      {
        source: '/create/verify-privado',
        destination: '/create/get-verified',
        permanent: true,
      },
    ];
  },
  webpack: config => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    return config;
  },
};

export default nextConfig;
