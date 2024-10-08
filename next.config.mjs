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
  webpack: config => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    return config;
  },
};

export default nextConfig;
