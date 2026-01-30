import "../styles/global.css";

export const metadata = {
	title: "Hackathon Starter",
	description: "Simple Next.js + Tailwind + shadcn/ui for hackathon",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white min-h-screen">
				{children}
			</body>
		</html>
	);
}
