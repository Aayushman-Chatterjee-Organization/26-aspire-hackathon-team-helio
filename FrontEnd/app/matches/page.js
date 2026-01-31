"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import TalentCard from "../components/TalentCard";
import WhyMatchModal from "../components/WhyMatchModal";
import { mockTalents } from "../data/mockTalents";
import { Search, Filter, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function MatchesPage() {
	const router = useRouter();
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedSkills, setSelectedSkills] = useState([]);
	const [selectedTalent, setSelectedTalent] = useState(null);
	const [modalOpen, setModalOpen] = useState(false);

	// Extract all unique skills
	const allSkills = [...new Set(mockTalents.flatMap((t) => t.skills))];

	// Filter talents based on search and selected skills
	const filteredTalents = mockTalents.filter((talent) => {
		const matchesSearch =
			searchTerm === "" ||
			talent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			talent.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
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

	return (
		<main className="container mx-auto p-4 max-w-7xl">
			<div className="mb-6">
				<Button
					onClick={() => router.push("/")}
					variant="ghost"
					className="mb-4">
					<ArrowLeft className="w-4 h-4 mr-2" />
					Back to Chat
				</Button>

				<h1 className="text-3xl font-bold">Talent Matches</h1>
				<p className="text-muted-foreground mt-1">
					Browse and filter available talent
				</p>
			</div>

			<div className="space-y-6">
				{/* Search and Filter Section */}
				<div className="bg-card border rounded-lg p-4 space-y-4">
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
				</div>

				{/* Results Section */}
				<div>
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
				</div>
			</div>

			<WhyMatchModal
				talent={selectedTalent}
				isOpen={modalOpen}
				onClose={() => setModalOpen(false)}
			/>
		</main>
	);
}
