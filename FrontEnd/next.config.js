/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,

	typescript: {
		ignoreBuildErrors: true, // ⬅️ THIS
	},

	eslint: {
		ignoreDuringBuilds: true, // ⬅️ optional but recommended
	},
};

module.exports = nextConfig;
