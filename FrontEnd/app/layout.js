import { Inter } from "next/font/google";
import "../styles/global.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Talent Match AI - Powered by PS AI Tools",
	description:
		"AI-powered talent matching platform using Bodhi for profile enrichment and Slingshot for AI orchestration",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="theme-color" content="#3b82f6" />
			</head>
			<body className={`${inter.className} min-h-screen`}>
				<div className="flex flex-col min-h-screen">{children}</div>
			</body>
		</html>
	);
}
