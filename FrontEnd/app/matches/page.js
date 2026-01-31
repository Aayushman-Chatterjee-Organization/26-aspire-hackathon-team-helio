"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import TalentCard from "../components/TalentCard";
import WhyMatchModal from "../components/WhyMatchModal";
import { mockTalents } from "../data/mockTalents";
import { Search, Filter, ArrowLeft, Sparkles } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { mockRecommendResponse } from "../../mockApiResponses";

export default function MatchesPage() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedSkills, setSelectedSkills] = useState([]);
	const [selectedTalent, setSelectedTalent] = useState(null);
	const [modalOpen, setModalOpen] = useState(false);
	const [recommendations, setRecommendations] = useState(null);
	const [jobDescription, setJobDescription] = useState(null);

	// Check if coming from quiz
	const isFromQuiz = searchParams.get("source") === "quiz";

	useEffect(() => {
		if (isFromQuiz) {
			// Load job description from sessionStorage
			const storedJobDescription = sessionStorage.getItem("jobDescription");
			if (storedJobDescription) {
				setJobDescription(storedJobDescription);
				// Set mock recommendations (in real app, this would come from API)
				setRecommendations(mockRecommendResponse);
			}
		}
	}, [isFromQuiz]);

	// Extract all unique skills
	const allSkills = [...new Set(mockTalents.flatMap((t) => t.skills))];

	// Filter talents based on search and selected skills
	const filteredTalents = mockTalents.filter((talent) => {
		const matchesSearch =
			searchTerm === "" ||
			talent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			(talent.title &&
				talent.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
			talent.skills.some((skill) =>
				skill.toLowerCase().includes(searchTerm.toLowerCase()),
			);

		const matchesSkills =
			selectedSkills.length === 0 ||
			selectedSkills.some((skill) => talent.skills.includes(skill));

		return matchesSearch && matchesSkills;
	});

	const handleSkillToggle = (skill) => {
		setSelectedSkills((prev) =>
			prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill],
		);
	};

	const handleViewDetails = (talent) => {
		setSelectedTalent(talent);
		setModalOpen(true);
	};

	// Convert recommendation data to talent card format
	const convertRecommendationToTalent = (candidate) => {
		return {
			id: candidate.rank,
			name: candidate.candidate_name,
			title: "Senior Software Engineer", // Default title
			location: "Remote",
			experience: candidate.experience_match,
			skills: [
				...candidate.skills_match.matched,
				...candidate.skills_match.missing,
			],
			summary: candidate.explanation,
			availability: "2 weeks notice",
			rate: "$150-180/hr",
			matchScore: candidate.match_score,
			profileEnrichment: {
				source: "Slingshot AI",
				recommendation: candidate.recommendation,
				strengths: candidate.strengths,
				gaps: candidate.gaps,
			},
			whyMatch: {
				skillMatch: candidate.skills_match.matched.map(
					(skill) => `Strong proficiency in ${skill}`,
				),
				availability: "Available within notice period",
				experience: candidate.experience_match,
				cultural: "Strong fit based on AI analysis",
			},
		};
	};

	return (
		<main className="container mx-auto p-4 max-w-7xl">
			<header className="mb-6">
				<Button
					onClick={() => router.push("/")}
					variant="ghost"
					className="mb-4">
					<ArrowLeft className="w-4 h-4 mr-2" />
					Back to Dashboard
				</Button>

				<h1 className="text-3xl font-bold">
					{isFromQuiz && recommendations
						? "AI-Recommended Matches"
						: "Talent Matches"}
				</h1>
				<p className="text-muted-foreground mt-1">
					{isFromQuiz && recommendations
						? `Found ${recommendations.total_candidates_found} candidates matching your requirements`
						: "Browse and filter available talent"}
				</p>
			</header>

			<div className="space-y-6">
				{/* Show Job Summary if from quiz */}
				{isFromQuiz && recommendations && (
					<Card className="bg-blue-50 border-blue-200">
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Sparkles className="w-5 h-5 text-blue-600" />
								AI-Generated Matches
							</CardTitle>
							<CardDescription>Based on your job requirements</CardDescription>
						</CardHeader>
						<CardContent>
							<p className="text-sm text-gray-700 mb-4">
								{recommendations.job_summary}
							</p>
							<div className="text-sm text-gray-600">
								<strong>Search Summary:</strong>{" "}
								{recommendations.search_summary}
							</div>
						</CardContent>
					</Card>
				)}

				{/* Show recommended candidates first if from quiz */}
				{isFromQuiz && recommendations && (
					<section className="space-y-4">
						<h2 className="text-xl font-semibold">
							Top Recommended Candidates
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
							{recommendations.ranked_candidates.map((candidate) => {
								const talentData = convertRecommendationToTalent(candidate);
								return (
									<TalentCard
										key={candidate.rank}
										talent={talentData}
										onViewDetails={handleViewDetails}
									/>
								);
							})}
						</div>
					</section>
				)}

				{/* Divider if showing recommendations */}
				{isFromQuiz && recommendations && (
					<div className="border-t pt-6">
						<h2 className="text-xl font-semibold mb-4">All Available Talent</h2>
					</div>
				)}

				{/* Search and Filter Section */}
				<section className="bg-card border rounded-lg p-4 space-y-4">
					<div className="relative">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
						<Input
							placeholder="Search by name, role, or skills..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="pl-10"
							aria-label="Search talents"
						/>
					</div>

					<div>
						<div className="flex items-center gap-2 mb-2">
							<Filter className="w-4 h-4 text-muted-foreground" />
							<span className="text-sm font-medium">Filter by skills</span>
						</div>
						<div className="flex flex-wrap gap-2">
							{allSkills.map((skill) => (
								<Badge
									key={skill}
									variant={
										selectedSkills.includes(skill) ? "default" : "outline"
									}
									className="cursor-pointer"
									onClick={() => handleSkillToggle(skill)}>
									{skill}
								</Badge>
							))}
						</div>
					</div>
				</section>

				{/* Results Section */}
				<section>
					<p className="text-sm text-muted-foreground mb-4">
						Showing {filteredTalents.length} of {mockTalents.length} talents
					</p>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{filteredTalents.map((talent) => (
							<TalentCard
								key={talent.id}
								talent={talent}
								onViewDetails={handleViewDetails}
							/>
						))}
					</div>

					{filteredTalents.length === 0 && (
						<div className="text-center py-12">
							<p className="text-muted-foreground">
								No talents found matching your criteria
							</p>
						</div>
					)}
				</section>
			</div>

			<WhyMatchModal
				talent={selectedTalent}
				isOpen={modalOpen}
				onClose={() => setModalOpen(false)}
			/>
		</main>
	);
}
