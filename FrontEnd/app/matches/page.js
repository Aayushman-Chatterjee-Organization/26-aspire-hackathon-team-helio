"use client";

import MatchCard from "../components/MatchCard";
import { consultants } from "../data/consultants"; // import your hardcoded JSON

export default function Matches() {
	// Just use the hardcoded consultants for now
	const matches = consultants;

	return (
		<div className="max-w-4xl mx-auto p-10">
			<h2 className="text-2xl font-bold mb-6">Top Matches</h2>

			<div className="grid gap-4">
				{matches.map((m) => (
					<MatchCard key={m.id} consultant={m} />
				))}
			</div>
		</div>
	);
}
