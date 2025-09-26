/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '', // leave empty for default
        pathname: '/**', // allow all paths
      },
    ],
  },
};

export default nextConfig;
