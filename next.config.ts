import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/privacy",
        destination: "/privacy-policy",
        permanent: true,
      },
      {
        source: "/disclosures",
        destination: "/regulatory-disclosures",
        permanent: true,
      },
      {
        source: "/regulatory",
        destination: "/regulatory-disclosures",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
