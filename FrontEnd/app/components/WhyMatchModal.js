"use client";

import { useState } from "react";

export default function WhyMatchModal({ consultant }) {
	const [show, setShow] = useState(false);

	return (
		<>
			<button
				onClick={() => setShow(!show)}
				className="mt-2 underline text-sm text-blue-600">
				{show ? "Hide why" : "Why this match?"}
			</button>

			{show && consultant.whyThisMatch && (
				<ul className="mt-3 bg-gray-50 p-3 rounded text-sm list-disc list-inside">
					{consultant.whyThisMatch.map((bullet, i) => (
						<li key={i}>{bullet}</li>
					))}
				</ul>
			)}
		</>
	);
}
