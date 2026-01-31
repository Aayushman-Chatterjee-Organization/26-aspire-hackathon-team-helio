"use client";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Calendar, Briefcase, Users } from "lucide-react";

export default function WhyMatchModal({ talent, isOpen, onClose }) {
	if (!talent) return null;

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="max-w-2xl">
				<DialogHeader>
					<DialogTitle>Why {talent.name} is a great match</DialogTitle>
					<DialogDescription>
						AI-powered analysis based on your requirements
					</DialogDescription>
				</DialogHeader>

				<div className="space-y-6 mt-4">
					<div className="flex items-center justify-between p-4 bg-muted rounded-lg">
						<div>
							<h3 className="font-semibold text-lg">{talent.name}</h3>
							<p className="text-muted-foreground">{talent.role}</p>
						</div>
						<div className="text-right">
							<div className="text-3xl font-bold text-green-600">
								{talent.fitScore}%
							</div>
							<p className="text-sm text-muted-foreground">Match Score</p>
						</div>
					</div>

					<div className="space-y-4">
						<div className="flex items-start gap-3">
							<CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
							<div>
								<h4 className="font-medium mb-2">Skill Match</h4>
								<ul className="space-y-1">
									{talent.whyMatch?.skillMatch?.map((match, index) => (
										<li key={index} className="text-sm text-muted-foreground">
											• {match}
										</li>
									))}
								</ul>
							</div>
						</div>

						<div className="flex items-start gap-3">
							<Calendar className="w-5 h-5 text-blue-600 mt-0.5" />
							<div>
								<h4 className="font-medium mb-2">Availability</h4>
								<p className="text-sm text-muted-foreground">
									{talent.whyMatch?.availability}
								</p>
							</div>
						</div>

						<div className="flex items-start gap-3">
							<Briefcase className="w-5 h-5 text-purple-600 mt-0.5" />
							<div>
								<h4 className="font-medium mb-2">Experience</h4>
								<p className="text-sm text-muted-foreground">
									{talent.whyMatch?.experience}
								</p>
							</div>
						</div>

						<div className="flex items-start gap-3">
							<Users className="w-5 h-5 text-orange-600 mt-0.5" />
							<div>
								<h4 className="font-medium mb-2">Cultural Fit</h4>
								<p className="text-sm text-muted-foreground">
									{talent.whyMatch?.cultural}
								</p>
							</div>
						</div>
					</div>

					<div>
						<h4 className="font-medium mb-2">All Skills</h4>
						<div className="flex flex-wrap gap-2">
							{talent.skills.map((skill) => (
								<Badge key={skill} variant="secondary">
									{skill}
								</Badge>
							))}
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
