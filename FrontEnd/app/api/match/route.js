"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Chat from "./components/Chat";
import TalentCard from "./components/TalentCard";
import WhyMatchModal from "./components/WhyMatchModal";
import { mockTalents } from "./data/mockTalents";
import { Button } from "@/components/ui/button";
import { MessageSquare, Users } from "lucide-react";

export default function Home() {
	const router = useRouter();
	const [showMatches, setShowMatches] = useState(false);
	const [selectedTalent, setSelectedTalent] = useState(null);
	const [modalOpen, setModalOpen] = useState(false);

	const handleFindMatches = () => {
		setShowMatches(true);
	};

	const handleViewDetails = (talent) => {
		setSelectedTalent(talent);
		setModalOpen(true);
	};

	const topMatches = mockTalents
		.slice(0, 3)
		.sort((a, b) => b.fitScore - a.fitScore);

	return (
		<main className="container mx-auto p-4 max-w-7xl">
			<div className="mb-6 flex justify-between items-center">
				<div>
					<h1 className="text-3xl font-bold">AI Talent Staffing Co-Pilot</h1>
					<p className="text-muted-foreground mt-1">
						Find the perfect talent for your team with AI assistance
					</p>
				</div>
				<Button onClick={() => router.push("/matches")} variant="outline">
					<Users className="w-4 h-4 mr-2" />
					View All Talents
				</Button>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<div className="bg-card border rounded-lg h-[600px] flex flex-col">
					<div className="p-4 border-b flex items-center gap-2">
						<MessageSquare className="w-5 h-5" />
						<h2 className="font-semibold">Chat Assistant</h2>
					</div>
					<div className="flex-1 overflow-hidden">
						<Chat onFindMatches={handleFindMatches} />
					</div>
				</div>

				<div className="space-y-4">
					<div className="flex items-center justify-between">
						<h2 className="text-xl font-semibold">
							{showMatches
								? "Recommended Matches"
								: "Start chatting to find matches"}
						</h2>
						{showMatches && (
							<Button
								onClick={() => router.push("/matches")}
								variant="ghost"
								size="sm">
								View all
							</Button>
						)}
					</div>

					{showMatches ? (
						<div className="space-y-4">
							{topMatches.map((talent) => (
								<TalentCard
									key={talent.id}
									talent={talent}
									onViewDetails={handleViewDetails}
								/>
							))}
						</div>
					) : (
						<div className="bg-muted rounded-lg p-8 text-center">
							<MessageSquare className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
							<p className="text-muted-foreground">
								Describe your talent needs in the chat to see personalized
								recommendations
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
