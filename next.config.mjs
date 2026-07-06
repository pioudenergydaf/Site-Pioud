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
        // Fiche BAT-TH-146/155 (tertiaire) abrogée le 01/08/2025. L'opération
        // a été réorientée vers l'équivalent résidentiel collectif BAR-TH-161.
        source: "/professionnels/tertiaire/matelas-isolant",
        destination: "/professionnels/collectif/points-singuliers",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
