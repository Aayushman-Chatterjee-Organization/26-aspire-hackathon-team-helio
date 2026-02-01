"use client";

import { X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function WhyMatchModal({ talent, isOpen, onClose }) {
	if (!isOpen) return null;

	// Handle missing data gracefully
	const score =
		talent?.fitScore || talent?.matchScore || talent?.match_score || 0;
	const skills = talent?.skills || [];
	const strengths = talent?.strengths || [];
	const gaps = talent?.gaps || [];
	const recommendation = talent?.recommendation || "Not specified";
	const explanation = talent?.explanation || "No explanation available";

	return (
		<div
			className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
			onClick={onClose}
			role="dialog"
			aria-modal="true"
			aria-labelledby="why-match-title">
			<div
				className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl"
				onClick={(e) => e.stopPropagation()}>
				<CardHeader className="sticky top-0 bg-white border-b z-10">
					<div className="flex justify-between items-start">
						<div>
							<CardTitle id="why-match-title" className="text-xl">
								Why {talent?.name || talent?.candidate_name || "This Candidate"}{" "}
								is a Match
							</CardTitle>
							<p className="text-sm text-muted-foreground mt-1">
								{talent?.role || talent?.title || "Role not specified"}
							</p>
						</div>
						<button
							onClick={onClose}
							className="text-gray-400 hover:text-gray-600 transition-colors"
							aria-label="Close modal">
							<X className="h-5 w-5" />
						</button>
					</div>
				</CardHeader>

				<CardContent className="p-6 space-y-6">
					{/* Match Score */}
					<div>
						<h3 className="text-lg font-semibold mb-3">Match Score</h3>
						<div className="flex items-center gap-4">
							<div className="text-3xl font-bold text-blue-600">{score}%</div>
							<div className="flex-1">
								<Progress value={score} className="h-3" />
								<p className="text-sm text-muted-foreground mt-1">
									{score >= 90
										? "Excellent Match"
										: score >= 80
											? "Strong Match"
											: score >= 70
												? "Good Match"
												: "Fair Match"}
								</p>
							</div>
						</div>
					</div>

					{/* Skills Match */}
					<div>
						<h3 className="text-lg font-semibold mb-3">Skills Match</h3>
						<div className="flex flex-wrap gap-2">
							{skills.map((skill, index) => (
								<Badge key={index} variant="secondary">
									{skill}
								</Badge>
							))}
						</div>
					</div>

					{/* Strengths */}
					{strengths.length > 0 && (
						<div>
							<h3 className="text-lg font-semibold mb-3">Key Strengths</h3>
							<ul className="space-y-2">
								{strengths.map((strength, index) => (
									<li key={index} className="flex items-start">
										<span className="text-green-800 mr-2">✓</span>
										<span className="text-sm">{strength}</span>
									</li>
								))}
							</ul>
						</div>
					)}

					{/* Gaps */}
					{gaps.length > 0 && (
						<div>
							<h3 className="text-lg font-semibold mb-3">
								Areas for Development
							</h3>
							<ul className="space-y-2">
								{gaps.map((gap, index) => (
									<li key={index} className="flex items-start">
										<span className="text-yellow-700 mr-2">!</span>
										<span className="text-sm">{gap}</span>
									</li>
								))}
							</ul>
						</div>
					)}

					{/* Recommendation */}
					<div>
						<h3 className="text-lg font-semibold mb-3">Recommendation</h3>
						<div
							className={`p-4 rounded-lg ${
								recommendation === "Highly recommended"
									? "bg-green-50 text-green-800"
									: recommendation === "Recommended"
										? "bg-blue-50 text-blue-800"
										: recommendation === "Consider"
											? "bg-yellow-50 text-yellow-800"
											: "bg-gray-50 text-gray-800"
							}`}>
							<p className="font-medium">{recommendation}</p>
						</div>
					</div>

					{/* Detailed Explanation */}
					<div>
						<h3 className="text-lg font-semibold mb-3">Detailed Analysis</h3>
						<p className="text-sm text-gray-600 leading-relaxed">
							{explanation}
						</p>
					</div>

					{/* AI Attribution */}
					<div className="border-t pt-4">
						<p className="text-xs text-center text-gray-500">
							Match analysis powered by{" "}
							<span className="font-semibold text-blue-600">Bodhi</span> &{" "}
							<span className="font-semibold text-purple-600">Slingshot</span>
						</p>
					</div>
				</CardContent>
			</div>
		</div>
	);
}
