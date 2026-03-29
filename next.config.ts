import type { NextConfig } from "next";

const nextConfig = {
    allowedDevOrigins: ['172.19.0.1'], // разрешаем этот адрес
    reactStrictMode: true,
}

module.exports = nextConfig

export default nextConfig;
