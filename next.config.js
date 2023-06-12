/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'res.cloudinary.com',
      'icon-library.com',
      'avatars.githubusercontent.com',
    ],
  },

  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
