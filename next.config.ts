import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  output: 'export',           // Создаёт папку out/ со статикой
  images: {
    unoptimized: true,        // Отключаем оптимизацию картинок (нет сервера)
  },
  trailingSlash: true,        // Добавляет / в конце URL
  basePath: '',
  assetPrefix: '',

  allowedDevOrigins: ['172.19.0.1', '192.168.31.51'],
};

export default nextConfig;