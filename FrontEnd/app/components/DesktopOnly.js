"use client";

import { useEffect, useState } from "react";

export default function DesktopOnly({ children, minWidth = 1024 }) {
	const [isDesktop, setIsDesktop] = useState(null);

	useEffect(() => {
		const checkWidth = () => setIsDesktop(window.innerWidth >= minWidth);

		checkWidth();
		window.addEventListener("resize", checkWidth);

		return () => window.removeEventListener("resize", checkWidth);
	}, [minWidth]);

	// While we don't know the viewport yet, render nothing
	if (isDesktop === null) return null;

	return isDesktop ? (
		<>{children}</>
	) : (
		<div
			role="alert"
			aria-live="polite"
			className="min-h-screen flex items-center justify-center p-6 bg-white text-center">
			<div className="max-w-md w-full">
				<h1 className="text-2xl font-semibold mb-4">
					Desktop Experience Required
				</h1>
				<p className="text-gray-600 mb-6">
					This application is optimized for desktop browsers. Please access it
					from a computer.
				</p>
			</div>
		</div>
	);
}
