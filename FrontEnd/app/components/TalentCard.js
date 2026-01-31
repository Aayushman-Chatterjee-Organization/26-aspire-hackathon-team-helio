"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Calendar, MapPin, DollarSign, Info } from "lucide-react";

export default function TalentCard({ talent, onViewDetails }) {
	const getFitScoreColor = (score) => {
		if (score >= 90) return "text-green-600";
		if (score >= 80) return "text-yellow-600";
		return "text-orange-600";
	};

	return (
		<Card className="hover:shadow-lg transition-shadow">
			<CardHeader>
				<div className="flex justify-between items-start">
					<div>
						<CardTitle className="text-lg">{talent.name}</CardTitle>
						<p className="text-sm text-muted-foreground">{talent.role}</p>
					</div>
					<div className="text-right">
						<div
							className={`text-2xl font-bold ${getFitScoreColor(talent.fitScore)}`}>
							{talent.fitScore}%
						</div>
						<p className="text-xs text-muted-foreground">Fit Score</p>
					</div>
				</div>
			</CardHeader>
			<CardContent className="space-y-4">
				<div>
					<p className="text-sm text-muted-foreground mb-1">Match Strength</p>
					<Progress value={talent.fitScore} className="h-2" />
				</div>

				<div>
					<p className="text-sm font-medium mb-2">Skills</p>
					<div className="flex flex-wrap gap-1">
						{talent.skills.slice(0, 4).map((skill) => (
							<Badge key={skill} variant="secondary" className="text-xs">
								{skill}
							</Badge>
						))}
						{talent.skills.length > 4 && (
							<Badge variant="outline" className="text-xs">
								+{talent.skills.length - 4} more
							</Badge>
						)}
					</div>
				</div>

				<div className="space-y-2 text-sm">
					<div className="flex items-center gap-2">
						<Calendar className="w-4 h-4 text-muted-foreground" />
						<span>Available: {talent.availability}</span>
					</div>
					<div className="flex items-center gap-2">
						<MapPin className="w-4 h-4 text-muted-foreground" />
						<span>{talent.location}</span>
					</div>
					<div className="flex items-center gap-2">
						<DollarSign className="w-4 h-4 text-muted-foreground" />
						<span>{talent.rate}</span>
					</div>
				</div>

				<Button
					onClick={() => onViewDetails(talent)}
					className="w-full"
					variant="outline">
					<Info className="w-4 h-4 mr-2" />
					Why this match?
				</Button>
			</CardContent>
		</Card>
	);
}
