"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	ArrowLeft,
	Briefcase,
	Calendar,
	MapPin,
	Star,
	TrendingUp,
	Users,
} from "lucide-react";
import MatchCard from "../components/MatchCard";
import { matchCandidates } from "../../services/api-services";

export default function MatchesPage() {
	const router = useRouter();
	const [activeTab, setActiveTab] = useState("matches");
	const [isLoading, setIsLoading] = useState(true);
	const [matchData, setMatchData] = useState(null);
	const [jobDescription, setJobDescription] = useState("");
	const [quizAnswers, setQuizAnswers] = useState({});
	// CHANGE: Add ref to prevent duplicate API calls
	const fetchInitiated = useRef(false);

	useEffect(() => {
		// CHANGE: Check if fetch already initiated to prevent double calls
		if (fetchInitiated.current) return;
		fetchInitiated.current = true;

		const fetchMatches = async () => {
			try {
				// Get job description from sessionStorage
				const storedJobDescription = sessionStorage.getItem("jobDescription");
				const storedQuizAnswers = sessionStorage.getItem("quizAnswers");

				if (!storedJobDescription) {
					router.push("/quiz");
					return;
				}

				setJobDescription(storedJobDescription);
				setQuizAnswers(storedQuizAnswers ? JSON.parse(storedQuizAnswers) : {});

				// Call the match API
				const response = await matchCandidates(storedJobDescription);
				setMatchData(response);
			} catch (error) {
				console.error("Error fetching matches:", error);
				alert("Failed to fetch matches. Please try again.");
			} finally {
				setIsLoading(false);
			}
		};

		fetchMatches();
	}, [router]);

	const handleBack = () => {
		router.push("/quiz");
	};

	// CHANGE: Add handler for candidate selection
	const handleCandidateSelect = (candidate) => {
		// Navigate to candidate detail page or open modal
		console.log("Selected candidate:", candidate);
		// You can implement navigation or modal opening here
	};

	if (isLoading) {
		return (
			<div className="min-h-screen flex flex-col">
				<main className="flex-1 container mx-auto px-4 py-8">
					<div className="text-center py-12">
						<p className="text-lg">
							Finding the best matches for your requirements...
						</p>
					</div>
				</main>
			</div>
		);
	}

	const candidates = matchData?.result?.ranked_candidates || [];
	const totalCandidates = matchData?.result?.total_candidates_found || 0;
	const jobSummary = matchData?.result?.job_summary || "";

	return (
		<div className="min-h-screen flex flex-col">
			<main className="flex-1 container mx-auto px-4 py-8">
				<Button variant="ghost" onClick={handleBack} className="mb-6">
					<ArrowLeft className="mr-2 h-4 w-4" />
					Back to Quiz
				</Button>

				<div className="grid gap-6 lg:grid-cols-3">
					<div className="lg:col-span-2">
						<Tabs value={activeTab} onValueChange={setActiveTab}>
							<TabsList className="grid w-full grid-cols-2">
								<TabsTrigger value="matches">
									Matches ({totalCandidates})
								</TabsTrigger>
								<TabsTrigger value="job-details">Job Details</TabsTrigger>
							</TabsList>

							<TabsContent value="matches" className="space-y-4">
								{candidates.length > 0 ? (
									candidates.map((candidate, index) => (
										<MatchCard
											key={index}
											candidate={candidate}
											rank={candidate.rank}
											onSelect={handleCandidateSelect}
										/>
									))
								) : (
									<Card>
										<CardContent className="text-center py-12">
											<Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
											<p className="text-lg font-medium">No matches found</p>
											<p className="text-sm text-gray-500 mt-2">
												{matchData?.result?.search_summary ||
													"Try adjusting your requirements to find more candidates."}
											</p>
										</CardContent>
									</Card>
								)}
							</TabsContent>

							<TabsContent value="job-details">
								<Card>
									<CardHeader>
										<CardTitle>Job Description</CardTitle>
										<CardDescription>{jobSummary}</CardDescription>
									</CardHeader>
									<CardContent>
										<div className="prose max-w-none">
											<pre className="whitespace-pre-wrap font-sans text-sm">
												{jobDescription}
											</pre>
										</div>
									</CardContent>
								</Card>
							</TabsContent>
						</Tabs>
					</div>

					<div className="space-y-4">
						<Card>
							<CardHeader>
								<CardTitle>Search Summary</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex items-center justify-between">
									<span className="text-sm text-gray-500">
										Total Candidates
									</span>
									<span className="font-medium">{totalCandidates}</span>
								</div>
								<div className="flex items-center justify-between">
									<span className="text-sm text-gray-500">Primary Skill</span>
									<Badge>{quizAnswers.required_skills || "N/A"}</Badge>
								</div>
								<div className="flex items-center justify-between">
									<span className="text-sm text-gray-500">Experience</span>
									<span className="font-medium">
										{quizAnswers.min_experience || "N/A"}
									</span>
								</div>
								<div className="flex items-center justify-between">
									<span className="text-sm text-gray-500">Notice Period</span>
									<span className="font-medium">
										{quizAnswers.notice_period || "N/A"}
									</span>
								</div>
								<div className="flex items-center justify-between">
									<span className="text-sm text-gray-500">Industry</span>
									<Badge variant="outline">
										{quizAnswers.industry || "N/A"}
									</Badge>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Match Statistics</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="space-y-2">
									<div className="flex justify-between text-sm">
										<span>Excellent Matches</span>
										<span>
											{candidates.filter((c) => c.match_score >= 80).length}
										</span>
									</div>
									<div className="flex justify-between text-sm">
										<span>Good Matches</span>
										<span>
											{
												candidates.filter(
													(c) => c.match_score >= 60 && c.match_score < 80,
												).length
											}
										</span>
									</div>
									<div className="flex justify-between text-sm">
										<span>Fair Matches</span>
										<span>
											{candidates.filter((c) => c.match_score < 60).length}
										</span>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</main>
		</div>
	);
}
