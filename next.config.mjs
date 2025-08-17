/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.nhlbi.nih.gov",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;