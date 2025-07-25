module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://stayfitness.com',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'weekly',
  priority: 0.7,
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
    ],
  },
}; 