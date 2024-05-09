/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'], // Assure-toi que ce domaine correspond à celui de ton serveur d'images
  },
  
};

export default nextConfig;
