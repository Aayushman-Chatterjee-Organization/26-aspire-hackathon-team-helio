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
	// CHANGE: Add state for loading phrase rotation
	const [loadingPhraseIndex, setLoadingPhraseIndex] = useState(0);

	// CHANGE: Add loading phrases array
	const loadingPhrases = [
		"Finding the perfect candidate for you",
		"Looking up all our candidate database",
		"Analyzing skill matches",
		"Calculating compatibility scores",
		"Reviewing experience levels",
		"Matching your requirements",
		"Almost there, finalizing results",
		"Discovering top talent",
	];

	// CHANGE: Add effect for rotating loading phrases
	useEffect(() => {
		if (!isLoading) return;

		const interval = setInterval(() => {
			setLoadingPhraseIndex((prev) => (prev + 1) % loadingPhrases.length);
		}, 2000);

		return () => clearInterval(interval);
	}, [isLoading, loadingPhrases.length]);

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
					{/* CHANGE: Enhanced loading component with animations */}
					<div className="flex flex-col items-center justify-center min-h-[60vh]">
						{/* CHANGE: Animated dots loader */}
						<div className="mb-8" role="status" aria-label="Loading matches">
							<div className="flex space-x-2">
								{[0, 1, 2, 3].map((index) => (
									<div
										key={index}
										className="w-3 h-3 bg-blue-600 rounded-full animate-pulse"
										style={{
											animationDelay: `${index * 0.15}s`,
											animationDuration: "1.4s",
										}}
									/>
								))}
							</div>
						</div>

						{/* CHANGE: Rotating text with fade animation */}
						<div className="relative h-8 w-full max-w-md overflow-hidden">
							<p
								className="text-lg text-center text-gray-700 absolute inset-0 transition-all duration-500 ease-in-out"
								style={{
									opacity: 1,
									transform: "translateY(0)",
									animation: "fadeInOut 2s infinite",
								}}
								aria-live="polite"
								aria-atomic="true">
								{loadingPhrases[loadingPhraseIndex]}
							</p>
						</div>

						{/* CHANGE: Progress indicator */}
						<div className="mt-8 w-full max-w-xs">
							<div className="h-1 bg-gray-200 rounded-full overflow-hidden">
								<div
									className="h-full bg-blue-600 rounded-full transition-all duration-300"
									style={{
										width: `${((loadingPhraseIndex + 1) / loadingPhrases.length) * 100}%`,
										animation: "shimmer 1.5s infinite",
									}}
								/>
							</div>
						</div>

						{/* CHANGE: Add CSS animations via style tag */}
						<style jsx>{`
							@keyframes fadeInOut {
								0%,
								100% {
									opacity: 0;
									transform: translateY(10px);
								}
								20%,
								80% {
									opacity: 1;
									transform: translateY(0);
								}
							}

							@keyframes shimmer {
								0% {
									transform: translateX(-100%);
								}
								100% {
									transform: translateX(100%);
								}
							}

							@media (prefers-reduced-motion: reduce) {
								.animate-pulse {
									animation: none;
								}

								@keyframes fadeInOut {
									0%,
									100% {
										opacity: 0.7;
									}
									20%,
									80% {
										opacity: 1;
									}
								}

								@keyframes shimmer {
									0%,
									100% {
										transform: none;
									}
								}
							}
						`}</style>
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
							{/* CHANGE: Added bg-gray-100 for better contrast and visual separation */}
							<TabsList className="grid w-full grid-cols-2 bg-gray-100">
								{/* CHANGE: Added data-state styling for active tab underline and better contrast */}
								<TabsTrigger
									value="matches"
									className="data-[state=active]:text-blue-600">
									Matches ({totalCandidates})
								</TabsTrigger>
								<TabsTrigger
									value="job-details"
									className="data-[state=active]:text-blue-600">
									Job Details
								</TabsTrigger>
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
										<CardTitle className="text-gray-900">
											Job Description
										</CardTitle>
										{/* CHANGE: Removed CardDescription to avoid duplicate job summary */}
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
									<span className="text-sm">Total Candidates</span>
									<span className="font-medium">{totalCandidates}</span>
								</div>
								<div className="flex items-center justify-between">
									<span className="text-sm">Primary Skill</span>
									{/* CHANGE: Fixed required_skills display to properly format array with comma separation */}
									<div className="flex flex-wrap gap-2">
										{Array.isArray(quizAnswers.required_skills) ? (
											quizAnswers.required_skills.map((skill, i) => (
												<span
													key={i}
													className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-sm">
													{skill}
												</span>
											))
										) : (
											<span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm">
												N/A
											</span>
										)}
									</div>
								</div>
								<div className="flex items-center justify-between">
									<span className="text-sm">Experience</span>
									<span className="font-medium">
										{quizAnswers.min_experience || "N/A"}
									</span>
								</div>
								<div className="flex items-center justify-between">
									<span className="text-sm">Notice Period</span>
									<span className="font-medium">
										{quizAnswers.notice_period || "N/A"}
									</span>
								</div>
								<div className="flex items-center justify-between">
									<span className="text-sm">Industry</span>
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
											{candidates.filter((c) => c.match_score >= 70).length}
										</span>
									</div>
									<div className="flex justify-between text-sm">
										<span>Good Matches</span>
										<span>
											{
												candidates.filter(
													(c) => c.match_score >= 40 && c.match_score < 70,
												).length
											}
										</span>
									</div>
									<div className="flex justify-between text-sm">
										<span>Fair Matches</span>
										<span>
											{candidates.filter((c) => c.match_score < 40).length}
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
