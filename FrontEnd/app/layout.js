import { Inter } from "next/font/google";
import "../styles/global.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import DesktopOnly from "./components/DesktopOnly";
import { AuthProvider } from "./contexts/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "TalentFlow - Powered by PS AI Tools",
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
			<body className={`${inter.className} min-h-screen flex flex-col`}>
				<AuthProvider>
					<DesktopOnly>
						<Header />
						<main className="flex-1" role="main">
							{children}
						</main>
						<Footer />
					</DesktopOnly>
				</AuthProvider>
			</body>
		</html>
	);
}
