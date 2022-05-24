/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost", "coe-api.damiisdandy.com", "res.cloudinary.com"],
  },
};

module.exports = nextConfig;
