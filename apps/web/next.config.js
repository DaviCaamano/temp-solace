require('dotenv').config({ path: '../../.env' });

const jsonImporter = require('node-sass-json-importer');
const backendPort = process.env.BACKENDPORT || 5002;
const backendHost = process.env.BACKENDHOST || 'http://localhost';

module.exports = {
    reactStrictMode: true,
    transpilePackages: ["shared"],
    async rewrites() {
        return {
            fallback: [
                {
                    source: '/api/:path*',
                    destination: `${backendHost}:${backendPort}/api/:path*`, // Proxy to Backend
                },
            ],
        };
    },
    webpack: (config) => {
        config.module.rules.push({
            test: /\.svg$/i,
            use: ['@svgr/webpack'],
        });
        return config;
    },
    sassOptions: {
        importer: jsonImporter(),
    },
};
