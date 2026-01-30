"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
	const [clientNeed, setClientNeed] = useState("");
	const router = useRouter();

	const submit = async () => {
		localStorage.setItem("clientNeed", clientNeed);
		router.push("/matches");
	};

	return (
		<div className="max-w-2xl mx-auto p-10">
			<h1 className="text-3xl font-bold mb-4">AI Staffing Co-Pilot</h1>

			<textarea
				className="w-full border p-4 rounded-md"
				rows={6}
				placeholder="Client needs a senior data consultant to modernize legacy reporting..."
				onChange={(e) => setClientNeed(e.target.value)}
			/>

			<button
				onClick={submit}
				className="mt-4 bg-black text-white px-6 py-2 rounded">
				Find Talent Matches
			</button>
		</div>
	);
}
