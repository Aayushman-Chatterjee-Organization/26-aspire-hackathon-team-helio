"use client";

import WhyMatchModal from "./WhyMatchModal";

export default function MatchCard({ consultant }) {
	return (
		<div className="border rounded p-4">
			<h3 className="text-xl font-semibold">{consultant.name}</h3>
			<p className="text-sm text-gray-600">{consultant.role}</p>

			<p className="mt-2">
				Match Score: {(consultant.relevanceScore * 100).toFixed(1)}%
			</p>

			<WhyMatchModal consultant={consultant} />
		</div>
	);
}
