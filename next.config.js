/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'ars-dev-bucket.s3.eu-central-1.amazonaws.com',
			},
		],
	},
	compiler: {
		// Enables the styled-components SWC transform
		styledComponents: true,
	},
};

module.exports = nextConfig;
