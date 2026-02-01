"use client";

import { useState } from "react";
import WhyMatchModal from "./WhyMatchModal";

export default function MatchCard({ candidate, rank }) {
	const [showWhyMatch, setShowWhyMatch] = useState(false);
	const [showAIReasoning, setShowAIReasoning] = useState(false);

	// Determine confidence level and styling based on match_score
	const getConfidenceStyle = () => {
		if (candidate.match_score < 40) {
			return {
				bgColor: "bg-yellow-50",
				borderColor: "border-yellow-300",
				textColor: "text-amber-700",
				scoreColor: "text-amber-700",
				message: "Low confidence match - Review carefully",
			};
		} else if (candidate.match_score >= 70) {
			return {
				bgColor: "bg-green-50",
				borderColor: "border-green-300",
				textColor: "text-green-800",
				scoreColor: "text-green-800",
				message: "High confidence match",
			};
		}
		return {
			bgColor: "bg-white",
			borderColor: "border-gray-200",
			textColor: "text-gray-700",
			scoreColor: "text-blue-600",
			message: "Good match",
		};
	};

	const confidenceStyle = getConfidenceStyle();

	// Extract first matched skill for display
	const primarySkill =
		candidate.skills_match?.matched?.[0] || "No Primary Skill matched";

	// Count matched vs missing skills
	const matchedCount = candidate.skills_match?.matched?.length || 0;
	const missingCount = candidate.skills_match?.missing?.length || 0;

	const aiReasoningData = {
		dataPoints: [
			{
				source: "Skills Analysis",
				confidence: matchedCount > 0 ? Math.min(90, matchedCount * 20) : 10,
				insight: `${matchedCount} skills matched, ${missingCount} missing`,
			},
			{
				source: "Experience Match",
				confidence: candidate.match_score,
				insight: candidate.experience_match?.substring(0, 100) + "...",
			},
			{
				source: "Strengths Assessment",
				confidence: candidate.strengths?.length > 2 ? 75 : 50,
				insight: `${candidate.strengths?.length || 0} key strengths identified`,
			},
			{
				source: "Gap Analysis",
				confidence: candidate.gaps?.length < 3 ? 80 : 40,
				insight: `${candidate.gaps?.length || 0} gaps identified`,
			},
		],
		reasoning: candidate.explanation,
		recommendation: candidate.recommendation,
	};

	return (
		<>
			<div
				className={`rounded-lg shadow-md p-6 hover:shadow-lg transition-all cursor-pointer border-2`}
				onClick={() => console.log("View candidate details:", candidate)}
				onKeyDown={(e) =>
					e.key === "Enter" && console.log("View candidate details:", candidate)
				}
				tabIndex={0}
				role="button"
				aria-label={`View match details for ${candidate.candidate_name}`}>
				<div className="flex justify-between items-start mb-4">
					<div>
						<h3 className="text-lg font-semibold text-gray-900">
							{candidate.candidate_name}
						</h3>
						<p className="text-sm text-gray-600">Rank #{rank}</p>
						<p className="text-xs text-gray-500 mt-1">{primarySkill}</p>
					</div>
					<div className="text-right">
						<div className={`text-2xl font-bold ${confidenceStyle.scoreColor}`}>
							{candidate.match_score}%
						</div>
						<div className={`text-xs ${confidenceStyle.textColor}`}>
							{confidenceStyle.message}
						</div>
					</div>
				</div>

				{/* Low Confidence Warning */}
				{candidate.match_score < 60 && (
					<div
						className="mb-4 p-3 bg-yellow-100 border border-yellow-400 rounded-md"
						role="alert">
						<div className="flex items-center">
							<svg
								className="w-5 h-5 text-amber-700 mr-2"
								fill="currentColor"
								viewBox="0 0 20 20">
								<path
									fillRule="evenodd"
									d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
									clipRule="evenodd"
								/>
							</svg>
							<span className="text-sm font-medium">
								{candidate.recommendation}
							</span>
						</div>
					</div>
				)}

				<div className="mb-4">
					<div className="flex flex-wrap gap-2">
						{candidate.skills_match?.matched
							?.slice(0, 3)
							.map((skill, index) => (
								<span
									key={index}
									className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
									{skill}
								</span>
							))}
						{candidate.skills_match?.matched?.length > 3 && (
							<span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
								+{candidate.skills_match.matched.length - 3} more
							</span>
						)}
					</div>
				</div>

				<div className="text-sm text-gray-600 mb-4">
					<p className="line-clamp-2">{candidate.explanation}</p>
				</div>

				<div className="flex gap-2">
					<button
						onClick={(e) => {
							e.stopPropagation();
							setShowWhyMatch(true);
						}}
						className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
						aria-label="View detailed match explanation">
						Why this match?
					</button>

					<button
						onClick={(e) => {
							e.stopPropagation();
							setShowAIReasoning(true);
						}}
						className="flex-1 px-3 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
						aria-label="View AI reasoning details">
						AI Reasoning
					</button>
				</div>

				{/* PS AI Tools Attribution */}
				<div className="mt-4 pt-4 border-t border-gray-200">
					<div className="flex items-center justify-between text-xs text-gray-500">
						<span>
							Enriched by{" "}
							<span className="font-semibold text-blue-600">Bodhi</span>
						</span>
						<span>
							Matched by{" "}
							<span className="font-semibold text-purple-600">Slingshot</span>
						</span>
					</div>
				</div>
			</div>

			{showWhyMatch && (
				<WhyMatchModal
					talent={candidate}
					isOpen={showWhyMatch}
					onClose={() => setShowWhyMatch(false)}
				/>
			)}

			{/* AI Reasoning Modal */}
			{showAIReasoning && (
				<div
					className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
					onClick={() => setShowAIReasoning(false)}
					role="dialog"
					aria-modal="true"
					aria-labelledby="ai-reasoning-title">
					<div
						className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
						onClick={(e) => e.stopPropagation()}>
						<div className="p-6">
							<div className="flex justify-between items-start mb-4">
								<h2
									id="ai-reasoning-title"
									className="text-xl font-bold text-gray-900">
									AI Reasoning Panel
								</h2>
								<button
									onClick={() => setShowAIReasoning(false)}
									className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded"
									aria-label="Close AI reasoning panel">
									<svg
										className="w-6 h-6"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								</button>
							</div>

							<div className="space-y-6">
								{/* Data Sources */}
								<div>
									<h3 className="text-lg font-semibold mb-3">
										Data Sources & Confidence
									</h3>
									<div className="space-y-3">
										{aiReasoningData.dataPoints.map((point, index) => (
											<div key={index} className="bg-gray-50 rounded-lg p-4">
												<div className="flex justify-between items-start mb-2">
													<span className="font-medium text-gray-700">
														{point.source}
													</span>
													<span
														className={`font-semibold ${
															point.confidence >= 80
																? "text-green-800"
																: point.confidence >= 60
																	? "text-blue-600"
																	: "text-amber-700"
														}`}>
														{point.confidence}%
													</span>
												</div>
												<p className="text-sm text-gray-600">{point.insight}</p>
											</div>
										))}
									</div>
								</div>

								{/* AI Analysis */}
								<div>
									<h3 className="text-lg font-semibold mb-3">AI Analysis</h3>
									<div className="bg-blue-50 rounded-lg p-4">
										<p className="text-gray-700">{aiReasoningData.reasoning}</p>
									</div>
								</div>

								{/* Recommendation */}
								<div>
									<h3 className="text-lg font-semibold mb-3">Recommendation</h3>
									<div
										className={`rounded-lg p-4 ${
											candidate.match_score < 60
												? "bg-yellow-50"
												: "bg-green-50"
										}`}>
										<p
											className={`font-medium ${
												candidate.match_score < 60
													? "text-amber-700"
													: "text-green-800"
											}`}>
											{aiReasoningData.recommendation}
										</p>
									</div>
								</div>

								{/* AI Tools Attribution */}
								<div className="border-t pt-4">
									<p className="text-sm text-gray-600 text-center">
										Analysis powered by PS AI Tools:
										<span className="ml-2 font-semibold text-blue-600">
											Bodhi
										</span>{" "}
										&
										<span className="ml-1 font-semibold text-purple-600">
											Slingshot
										</span>
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
