const path = require('path'); // eslint-disable-line @typescript-eslint/no-var-requires

const defaultBasePath = '/mailing';
const defaultFallbackUrl = 'https://tamudatathon.com/:path*';

module.exports = {
  async headers() {
    return [
      {
        source: "/mailing/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "https://tamudatathon.com" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ]
  },
  sassOptions: {
    includePaths: [path.join(__dirname)]
  },
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
