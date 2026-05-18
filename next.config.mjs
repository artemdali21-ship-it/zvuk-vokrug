/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // local images only — no remote domains needed
  },
};

export default nextConfig;
