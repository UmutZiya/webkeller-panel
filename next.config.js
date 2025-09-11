/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  // If you need static export in the future, note that API routes won't work with 'output: export'.
};

module.exports = nextConfig;
