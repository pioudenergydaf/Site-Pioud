/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        // Fiche BAT-TH-146 / BAT-TH-155 abrogée (01/08/2025), sans remplaçante.
        source: "/professionnels/tertiaire/matelas-isolant",
        destination: "/professionnels/tertiaire",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
