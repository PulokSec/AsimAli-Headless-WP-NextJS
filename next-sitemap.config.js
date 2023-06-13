/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://vancouverseoservices.org',
  changefreq: 'daily',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  priority: 0.9,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    additionalSitemaps: [
      'https://vancouverseoservices.org/sitemap-0.xml',
    ],
  },
  outDir: "./public" 
}