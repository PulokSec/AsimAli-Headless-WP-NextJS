const { withFaust } = require('@faustjs/next');
const withOffline = require('next-offline');


/**
 * @type {import('next').NextConfig}
 **/

const withPWA = require('next-pwa')({
  dest: 'public'
})

module.exports = withOffline ( withFaust ( withPWA({
  compress: true,
  eslint: { ignoreDuringBuilds: true },
  reactStrictMode: true,
  staticPageGenerationTimeout: 5000,
  experimental: {
    images: {
      optimized: true,
    },
    granularChunks: true,
  },
  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|png|webp)",
        locale: false,
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=9999999999, must-revalidate",
          },
        ],
      },
    ];
  },
    eslint: {
      ignoreDuringBuilds: true,
    }
})));


