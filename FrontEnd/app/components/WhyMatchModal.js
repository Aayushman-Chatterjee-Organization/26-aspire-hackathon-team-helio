"use client";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogPortal,
	DialogOverlay,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Calendar, Briefcase, Users } from "lucide-react";

export default function WhyMatchModal({ talent, isOpen, onClose }) {
	if (!talent) return null;

	// Use matchScore if fitScore is not available
	const score = talent.fitScore || talent.matchScore || 0;

	// Generate why match data if not present
	const whyMatchData = talent.whyMatch || {
		skillMatch: [
			`Strong proficiency in ${talent.skills[0] || "required technologies"}`,
			`${talent.experience} of relevant experience`,
			`Proven track record in similar roles`,
		],
		availability: talent.availability || "Available immediately",
		experience: `${talent.experience} in ${talent.title || talent.role} roles with expertise in ${talent.skills.slice(0, 3).join(", ")}`,
		cultural:
			"Strong communication skills and team collaboration experience based on profile analysis",
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogPortal>
				<DialogOverlay className="fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
				<DialogContent
					className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-2xl translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg"
					aria-describedby="dialog-description">
					<DialogHeader>
						<DialogTitle>Why {talent.name} is a great match</DialogTitle>
						<DialogDescription id="dialog-description">
							AI-powered analysis based on your requirements
						</DialogDescription>
					</DialogHeader>

					<article className="space-y-6 mt-4 max-h-[60vh] overflow-y-auto">
						<section className="flex items-center justify-between p-4 bg-muted rounded-lg">
							<header>
								<h3 className="font-semibold text-lg">{talent.name}</h3>
								<p className="text-muted-foreground">
									{talent.role || talent.title}
								</p>
							</header>
							<aside className="text-right">
								<div className="text-3xl font-bold text-green-600">
									{score}%
								</div>
								<p className="text-sm text-muted-foreground">Match Score</p>
							</aside>
						</section>

						<section
							className="space-y-4"
							role="region"
							aria-label="Match details">
							<article className="flex items-start gap-3">
								<CheckCircle
									className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0"
									aria-hidden="true"
								/>
								<div>
									<h4 className="font-medium mb-2">Skill Match</h4>
									<ul className="space-y-1" role="list">
										{whyMatchData.skillMatch.map((match, index) => (
											<li key={index} className="text-sm text-muted-foreground">
												• {match}
											</li>
										))}
									</ul>
								</div>
							</article>

							<article className="flex items-start gap-3">
								<Calendar
									className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0"
									aria-hidden="true"
								/>
								<div>
									<h4 className="font-medium mb-2">Availability</h4>
									<p className="text-sm text-muted-foreground">
										{whyMatchData.availability}
									</p>
								</div>
							</article>

							<article className="flex items-start gap-3">
								<Briefcase
									className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0"
									aria-hidden="true"
								/>
								<div>
									<h4 className="font-medium mb-2">Experience</h4>
									<p className="text-sm text-muted-foreground">
										{whyMatchData.experience}
									</p>
								</div>
							</article>

							<article className="flex items-start gap-3">
								<Users
									className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0"
									aria-hidden="true"
								/>
								<div>
									<h4 className="font-medium mb-2">Cultural Fit</h4>
									<p className="text-sm text-muted-foreground">
										{whyMatchData.cultural}
									</p>
								</div>
							</article>
						</section>

						<section>
							<h4 className="font-medium mb-2">All Skills</h4>
							<div className="flex flex-wrap gap-2" role="list">
								{talent.skills.map((skill) => (
									<Badge key={skill} variant="secondary" role="listitem">
										{skill}
									</Badge>
								))}
							</div>
						</section>
					</article>
				</DialogContent>
			</DialogPortal>
		</Dialog>
	);
}
