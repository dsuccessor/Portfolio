/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: { appDir: true },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.postimg.cc",
        port: "",
        //pathname: "/cHJdWSZ8/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        //pathname: "/cHJdWSZ8/**",
      },
    ],
  },
};

module.exports = nextConfig;
