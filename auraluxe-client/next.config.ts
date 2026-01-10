const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "192.168.100.245",
        port: "8080",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "api.tilottoma.com",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "api.tilottoma.com",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "mykitchen.creativeati.xyz",
      },
      {
        protocol: "http",
        hostname: "api.mykitchen-bd.com",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "api.mykitchen-bd.com",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
