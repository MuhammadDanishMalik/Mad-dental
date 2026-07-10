import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    const shopifyDomain = (process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN || "maddantalcares.myshopify.com").replace(/[^a-zA-Z0-9.-]/g, "");
    return [
      {
        source: '/cart/c/:path*',
        destination: `https://${shopifyDomain}/cart/c/:path*`,
        permanent: false,
      },
      {
        source: '/checkouts/c/:path*',
        destination: `https://${shopifyDomain}/checkouts/c/:path*`,
        permanent: false,
      },
      {
        source: '/checkouts/:path*',
        destination: `https://${shopifyDomain}/checkouts/:path*`,
        permanent: false,
      },
      {
        source: '/orders/:path*',
        destination: `https://${shopifyDomain}/orders/:path*`,
        permanent: false,
      }
    ];
  }
};

export default nextConfig;
