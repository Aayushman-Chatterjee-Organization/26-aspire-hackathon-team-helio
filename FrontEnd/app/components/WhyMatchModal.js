"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function WhyMatchModal({ talent, isOpen, onClose }) {
	if (!talent) return null;

	// Use the API response structure
	const matchScore = talent.match_score || 0;
	const matchedSkills = talent.skills_match?.matched || [];
	const missingSkills = talent.skills_match?.missing || [];
	const strengths = talent.strengths || [];
	const gaps = talent.gaps || [];

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle className="text-xl">
						Why {talent.candidate_name} is a Match
					</DialogTitle>
				</DialogHeader>

				<div className="space-y-6 mt-4">
					{/* Overall Match Score */}
					<div>
						<div className="flex justify-between items-center mb-2">
							<h3 className="font-semibold">Overall Match Score</h3>
							<span className="text-2xl font-bold text-blue-600">
								{matchScore}%
							</span>
						</div>
						<Progress value={matchScore} className="h-3" />
					</div>

					{/* Skills Match */}
					<div>
						<h3 className="font-semibold mb-3">Skills Analysis</h3>

						{matchedSkills.length > 0 && (
							<div className="mb-4">
								<p className="text-sm text-gray-600 mb-2">
									Matched Skills ({matchedSkills.length})
								</p>
								<div className="flex flex-wrap gap-2">
									{matchedSkills.map((skill, index) => (
										<Badge
											key={index}
											variant="default"
											className="bg-green-100 text-green-800">
											{skill}
										</Badge>
									))}
								</div>
							</div>
						)}

						{missingSkills.length > 0 && (
							<div>
								<p className="text-sm text-gray-600 mb-2">
									Missing Skills ({missingSkills.length})
								</p>
								<div className="flex flex-wrap gap-2">
									{missingSkills.slice(0, 5).map((skill, index) => (
										<Badge
											key={index}
											variant="outline"
											className="text-red-600 border-red-300">
											{skill}
										</Badge>
									))}
									{missingSkills.length > 5 && (
										<Badge variant="outline" className="text-gray-600">
											+{missingSkills.length - 5} more
										</Badge>
									)}
								</div>
							</div>
						)}
					</div>

					{/* Experience Match */}
					<div>
						<h3 className="font-semibold mb-2">Experience Analysis</h3>
						<p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">
							{talent.experience_match}
						</p>
					</div>

					{/* Strengths */}
					{strengths.length > 0 && (
						<div>
							<h3 className="font-semibold mb-2">Key Strengths</h3>
							<ul className="space-y-2">
								{strengths.map((strength, index) => (
									<li key={index} className="flex items-start">
										<span className="text-green-600 mr-2">✓</span>
										<span className="text-sm">{strength}</span>
									</li>
								))}
							</ul>
						</div>
					)}

					{/* Gaps */}
					{gaps.length > 0 && (
						<div>
							<h3 className="font-semibold mb-2">Areas for Development</h3>
							<ul className="space-y-2">
								{gaps.slice(0, 4).map((gap, index) => (
									<li key={index} className="flex items-start">
										<span className="text-yellow-600 mr-2">!</span>
										<span className="text-sm">{gap}</span>
									</li>
								))}
								{gaps.length > 4 && (
									<li className="text-sm text-gray-500">
										...and {gaps.length - 4} more considerations
									</li>
								)}
							</ul>
						</div>
					)}

					{/* Recommendation */}
					<div className="border-t pt-4">
						<h3 className="font-semibold mb-2">AI Recommendation</h3>
						<div
							className={`p-4 rounded-lg ${
								talent.recommendation === "Highly recommended"
									? "bg-green-50"
									: talent.recommendation === "Recommended"
										? "bg-blue-50"
										: talent.recommendation === "Consider"
											? "bg-yellow-50"
											: "bg-red-50"
							}`}>
							<p className="font-medium mb-2">{talent.recommendation}</p>
							<p className="text-sm text-gray-700">{talent.explanation}</p>
						</div>
					</div>

					{/* Close Button */}
					<div className="flex justify-end pt-4 border-t">
						<Button onClick={onClose}>Close</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
