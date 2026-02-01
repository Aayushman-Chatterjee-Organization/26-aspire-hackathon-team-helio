"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Calendar, MapPin, DollarSign, Info } from "lucide-react";
import WhyMatchModal from "./WhyMatchModal";

export default function TalentCard({ talent, onViewDetails, onSelect }) {
	const [showWhyMatch, setShowWhyMatch] = useState(false);

	const getFitScoreColor = (score) => {
		if (score >= 90) return "text-green-600";
		// CHANGE: Updated from text-yellow-600 to text-amber-700 for better color contrast
		if (score >= 80) return "text-amber-700";
		return "text-orange-600";
	};

	// Use matchScore if fitScore is not available
	const score = talent.fitScore || talent.matchScore || talent.match_score || 0;

	// CHANGE: Handle the modal open action properly
	const handleViewDetails = () => {
		if (onViewDetails) {
			onViewDetails(talent);
		} else {
			setShowWhyMatch(true);
		}
	};

	return (
		<>
			<Card className="hover:shadow-lg transition-shadow">
				<CardHeader>
					<div className="flex justify-between items-start">
						<div>
							<CardTitle className="text-lg">
								{talent.name || talent.candidate_name}
							</CardTitle>
							<p className="text-sm text-muted-foreground">
								{talent.role || talent.title}
							</p>
						</div>
						<div className="text-right">
							<div className={`text-2xl font-bold ${getFitScoreColor(score)}`}>
								{score}%
							</div>
							<p className="text-xs text-muted-foreground">Match Score</p>
						</div>
					</div>
				</CardHeader>
				<CardContent className="space-y-4">
					<div>
						<p className="text-sm text-muted-foreground mb-1">Match Strength</p>
						<Progress value={score} className="h-2" />
					</div>

					<div>
						<p className="text-sm font-medium mb-2">Skills</p>
						<div className="flex flex-wrap gap-1">
							{(talent.skills || []).slice(0, 4).map((skill) => (
								<Badge key={skill} variant="secondary" className="text-xs">
									{skill}
								</Badge>
							))}
							{(talent.skills || []).length > 4 && (
								<Badge variant="outline" className="text-xs">
									+{talent.skills.length - 4} more
								</Badge>
							)}
						</div>
					</div>

					<div className="space-y-2 text-sm">
						<div className="flex items-center gap-2">
							<Calendar className="w-4 h-4 text-muted-foreground" />
							<span>Available: {talent.availability || "Immediate"}</span>
						</div>
						<div className="flex items-center gap-2">
							<MapPin className="w-4 h-4 text-muted-foreground" />
							<span>{talent.location || "Remote"}</span>
						</div>
						<div className="flex items-center gap-2">
							<DollarSign className="w-4 h-4 text-muted-foreground" />
							<span>{talent.rate || "$100-150/hr"}</span>
						</div>
					</div>

					<Button
						onClick={handleViewDetails}
						className="w-full"
						variant="outline">
						<Info className="w-4 h-4 mr-2" />
						Why this match?
					</Button>

					{onSelect && !onViewDetails && (
						<Button
							onClick={() => onSelect(talent)}
							className="w-full"
							variant="outline">
							View Details
						</Button>
					)}
				</CardContent>
			</Card>

			{/* CHANGE: Add WhyMatchModal for standalone TalentCard usage */}
			{showWhyMatch && (
				<WhyMatchModal
					talent={talent}
					isOpen={showWhyMatch}
					onClose={() => setShowWhyMatch(false)}
				/>
			)}
		</>
	);
}
