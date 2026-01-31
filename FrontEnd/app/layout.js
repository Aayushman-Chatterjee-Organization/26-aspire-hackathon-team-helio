import { Inter } from "next/font/google";
import "../styles/global.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { AuthProvider } from "./contexts/AuthContext";

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
			<body className={`${inter.className} min-h-screen flex flex-col`}>
				<AuthProvider>
					<Header />
					<main className="flex-1">{children}</main>
					<Footer />
				</AuthProvider>
			</body>
		</html>
	);
}
