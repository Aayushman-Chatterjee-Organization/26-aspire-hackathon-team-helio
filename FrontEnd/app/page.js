import { Button } from "@/components/ui/button";
import { Sun } from "lucide-react";

export default function Home() {
	return (
		<main className="flex flex-col items-center justify-center min-h-screen gap-8 p-4">
			<h1 className="text-4xl font-bold text-center">🚀 Hackathon Starter</h1>
			<p className="text-lg text-center max-w-md">
				This is a minimal Next.js app with Tailwind CSS and shadcn/ui
				components. Ready for rapid prototyping and Vercel deployment.
			</p>
			<Button className="flex items-center gap-2" aria-label="Get Started">
				<Sun className="w-5 h-5" aria-hidden="true" />
				Get Started
			</Button>
		</main>
	);
}
