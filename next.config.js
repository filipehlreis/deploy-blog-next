/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: '/post/page/0',
        destination: '/post/page/1',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
