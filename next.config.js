const defaultBasePath = '/mailing';
const defaultFallbackUrl = 'https://tamudatathon.com/:path*';

module.exports = {
  module: true,
  env: {
    BASE_PATH: process.env.BASE_PATH || defaultBasePath
  },
  basePath: process.env.BASE_PATH || defaultBasePath,
  async rewrites() {
    return {
      fallback: [
        // These rewrites are checked after both pages/public files
        // and dynamic routes are checked
        {
          source: '/:path*',
          basePath: false,
          destination: process.env.FALLBACK_URL || defaultFallbackUrl
        }
      ]
    };
  }
};
