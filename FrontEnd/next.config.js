/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,

	typescript: {
		// ⚠️ Allows production builds to successfully complete even if
		// your project has type errors.
		ignoreBuildErrors: true,
	},
};

module.exports = nextConfig;
