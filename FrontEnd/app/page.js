"use client";

import { useState, useEffect } from "react";
import { mockTalents } from "./data/mockTalents";
import TalentCard from "./components/TalentCard";
import Chat from "./components/Chat";
import WhyMatchModal from "./components/WhyMatchModal";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MessageSquare } from "lucide-react";

export default function Home() {
	const router = useRouter();
	const [selectedTalent, setSelectedTalent] = useState(null);
	const [showChat, setShowChat] = useState(false);
	const [activeSection, setActiveSection] = useState("overview");
	const [showWhyMatchModal, setShowWhyMatchModal] = useState(false);

	// Keyboard navigation
	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key === "Escape" && showChat) {
				setShowChat(false);
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [showChat]);

	const businessImpactData = {
		revenue: "+$2.5M projected annual impact",
		efficiency: "35% reduction in time-to-hire",
		quality: "87% placement satisfaction rate",
		scale: "3x increase in placement capacity",
	};

	const productHypothesis = {
		problem:
			"Traditional talent matching relies on keyword searches and manual screening, missing 70% of qualified candidates",
		solution:
			"AI-powered semantic matching that understands skills, experience, and cultural fit beyond keywords",
		validation:
			"Initial pilot with 50 placements showed 2.3x improvement in match quality",
		metrics: [
			"Time to placement",
			"Client satisfaction",
			"Candidate retention",
			"Match accuracy",
		],
	};

	const roadmapItems = [
		{ quarter: "Q1 2024", milestone: "MVP Launch", status: "completed" },
		{
			quarter: "Q2 2024",
			milestone: "AI Reasoning Engine",
			status: "in-progress",
		},
		{
			quarter: "Q3 2024",
			milestone: "Enterprise Integration",
			status: "planned",
		},
		{ quarter: "Q4 2024", milestone: "Global Expansion", status: "planned" },
	];

	// Handle navigation from chat
	const handleChatNavigation = (action, params) => {
		if (action === "navigate_matches") {
			router.push("/matches");
		} else if (action === "show_filtered_matches") {
			// Navigate with query params for filtering
			const queryString = new URLSearchParams(params).toString();
			router.push(`/matches?${queryString}`);
		}
	};

	// Handle talent card view details
	const handleViewDetails = (talent) => {
		setSelectedTalent(talent);
		setShowWhyMatchModal(true);
	};

	return (
		<main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
			{/* Skip to main content link for accessibility */}
			<a
				href="#main-content"
				className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded">
				Skip to main content
			</a>

			{/* Header with PS AI Tools Attribution */}
			<header className="bg-white shadow-sm border-b border-gray-200">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
					<div className="flex justify-between items-center">
						<h1 className="text-2xl font-bold text-gray-900">
							Talent Match AI
						</h1>
						<div className="flex items-center space-x-4">
							<div className="text-sm text-gray-600">
								Powered by PS AI Tools:
								<span className="ml-2 font-semibold text-blue-600">
									Bodhi
								</span>{" "}
								(Profile Enrichment)
								<span className="ml-2 font-semibold text-purple-600">
									Slingshot
								</span>{" "}
								(AI Orchestration)
							</div>
						</div>
					</div>
				</div>
			</header>

			{/* Navigation Tabs */}
			<nav
				className="bg-white border-b border-gray-200"
				role="navigation"
				aria-label="Main navigation">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex space-x-8">
						{["overview", "impact", "hypothesis", "flywheel", "operating"].map(
							(section) => (
								<button
									key={section}
									onClick={() => setActiveSection(section)}
									className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
										activeSection === section
											? "border-blue-500 text-blue-600"
											: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
									}`}
									aria-current={activeSection === section ? "page" : undefined}>
									{section === "flywheel" ? "Data Flywheel" : section}
								</button>
							),
						)}
					</div>
				</div>
			</nav>

			<div
				id="main-content"
				className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{/* Overview Section */}
				{activeSection === "overview" && (
					<div className="space-y-8">
						<div className="bg-white rounded-lg shadow-md p-6">
							<h2 className="text-xl font-semibold mb-4">
								AI-Powered Talent Matching
							</h2>
							<p className="text-gray-600 mb-6">
								Leveraging advanced AI to connect the right talent with the
								right opportunities, reducing time-to-hire while improving match
								quality.
							</p>
							<Link
								href="/matches"
								className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
								aria-label="View talent matches">
								View Matches
								<svg
									className="ml-2 w-5 h-5"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M9 5l7 7-7 7"
									/>
								</svg>
							</Link>
						</div>

						{/* Talent Grid */}
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{mockTalents.slice(0, 6).map((talent) => (
								<TalentCard
									key={talent.id}
									talent={talent}
									onViewDetails={handleViewDetails}
								/>
							))}
						</div>
					</div>
				)}

				{/* Business Impact Section */}
				{activeSection === "impact" && (
					<div className="bg-white rounded-lg shadow-md p-8">
						<h2 className="text-2xl font-bold mb-6">
							Primary User + Business Impact
						</h2>

						<div className="grid md:grid-cols-2 gap-8 mb-8">
							<div>
								<h3 className="text-lg font-semibold mb-4 text-gray-900">
									Primary Users
								</h3>
								<ul className="space-y-3">
									<li className="flex items-start">
										<span className="text-blue-500 mr-2">•</span>
										<div>
											<strong>Recruiters:</strong> Reduce screening time by 80%
											with AI-powered matching
										</div>
									</li>
									<li className="flex items-start">
										<span className="text-blue-500 mr-2">•</span>
										<div>
											<strong>Hiring Managers:</strong> Access pre-qualified
											candidates with detailed match reasoning
										</div>
									</li>
									<li className="flex items-start">
										<span className="text-blue-500 mr-2">•</span>
										<div>
											<strong>Candidates:</strong> Get matched to roles that
											truly fit their skills and aspirations
										</div>
									</li>
								</ul>
							</div>

							<div>
								<h3 className="text-lg font-semibold mb-4 text-gray-900">
									Business Impact Metrics
								</h3>
								<div className="space-y-4">
									{Object.entries(businessImpactData).map(([key, value]) => (
										<div key={key} className="bg-gray-50 p-4 rounded-lg">
											<div className="text-sm text-gray-600 capitalize">
												{key}
											</div>
											<div className="text-lg font-semibold text-gray-900">
												{value}
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				)}

				{/* Product Hypothesis & Roadmap */}
				{activeSection === "hypothesis" && (
					<div className="space-y-8">
						<div className="bg-white rounded-lg shadow-md p-8">
							<h2 className="text-2xl font-bold mb-6">Product Hypothesis</h2>

							<div className="space-y-6">
								<div>
									<h3 className="text-lg font-semibold mb-2 text-gray-900">
										Problem Statement
									</h3>
									<p className="text-gray-600">{productHypothesis.problem}</p>
								</div>

								<div>
									<h3 className="text-lg font-semibold mb-2 text-gray-900">
										Proposed Solution
									</h3>
									<p className="text-gray-600">{productHypothesis.solution}</p>
								</div>

								<div>
									<h3 className="text-lg font-semibold mb-2 text-gray-900">
										Validation
									</h3>
									<p className="text-gray-600">
										{productHypothesis.validation}
									</p>
								</div>

								<div>
									<h3 className="text-lg font-semibold mb-2 text-gray-900">
										Key Metrics
									</h3>
									<div className="flex flex-wrap gap-2">
										{productHypothesis.metrics.map((metric) => (
											<span
												key={metric}
												className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
												{metric}
											</span>
										))}
									</div>
								</div>
							</div>
						</div>

						<div className="bg-white rounded-lg shadow-md p-8">
							<h2 className="text-2xl font-bold mb-6">Product Roadmap</h2>
							<div className="space-y-4">
								{roadmapItems.map((item) => (
									<div
										key={item.quarter}
										className="flex items-center justify-between p-4 border rounded-lg">
										<div className="flex items-center space-x-4">
											<div
												className={`w-3 h-3 rounded-full ${
													item.status === "completed"
														? "bg-green-500"
														: item.status === "in-progress"
															? "bg-blue-500"
															: "bg-gray-300"
												}`}
											/>
											<div>
												<div className="font-semibold">{item.quarter}</div>
												<div className="text-gray-600">{item.milestone}</div>
											</div>
										</div>
										<span
											className={`px-3 py-1 rounded-full text-sm ${
												item.status === "completed"
													? "bg-green-100 text-green-700"
													: item.status === "in-progress"
														? "bg-blue-100 text-blue-700"
														: "bg-gray-100 text-gray-700"
											}`}>
											{item.status}
										</span>
									</div>
								))}
							</div>
						</div>
					</div>
				)}

				{/* Data Flywheel Visualization */}
				{activeSection === "flywheel" && (
					<div className="bg-white rounded-lg shadow-md p-8">
						<h2 className="text-2xl font-bold mb-6">Data Flywheel</h2>
						<div className="flex justify-center mb-6">
							<svg viewBox="0 0 400 400" className="w-96 h-96">
								{/* Flywheel Circle */}
								<circle
									cx="200"
									cy="200"
									r="150"
									fill="none"
									stroke="#e5e7eb"
									strokeWidth="30"
								/>

								{/* Animated segments */}
								<circle
									cx="200"
									cy="200"
									r="150"
									fill="none"
									stroke="#3b82f6"
									strokeWidth="30"
									strokeDasharray="235.6 706.8"
									strokeDashoffset="-157"
									className="animate-pulse"
								/>

								{/* Center hub */}
								<circle cx="200" cy="200" r="60" fill="#1e40af" />
								<text
									x="200"
									y="210"
									textAnchor="middle"
									fill="white"
									fontSize="16"
									fontWeight="bold">
									AI Engine
								</text>

								{/* Flywheel stages */}
								<g transform="translate(200, 80)">
									<rect
										x="-60"
										y="-20"
										width="120"
										height="40"
										rx="20"
										fill="#3b82f6"
									/>
									<text
										x="0"
										y="5"
										textAnchor="middle"
										fill="white"
										fontSize="14">
										Data Collection
									</text>
								</g>

								<g transform="translate(320, 200)">
									<rect
										x="-50"
										y="-20"
										width="100"
										height="40"
										rx="20"
										fill="#3b82f6"
									/>
									<text
										x="0"
										y="5"
										textAnchor="middle"
										fill="white"
										fontSize="14">
										ML Training
									</text>
								</g>

								<g transform="translate(200, 320)">
									<rect
										x="-60"
										y="-20"
										width="120"
										height="40"
										rx="20"
										fill="#3b82f6"
									/>
									<text
										x="0"
										y="5"
										textAnchor="middle"
										fill="white"
										fontSize="14">
										Better Matches
									</text>
								</g>

								<g transform="translate(80, 200)">
									<rect
										x="-50"
										y="-20"
										width="100"
										height="40"
										rx="20"
										fill="#3b82f6"
									/>
									<text
										x="0"
										y="5"
										textAnchor="middle"
										fill="white"
										fontSize="14">
										User Feedback
									</text>
								</g>
							</svg>
						</div>

						<div className="grid md:grid-cols-4 gap-4 mt-8">
							<div className="text-center">
								<div className="text-3xl font-bold text-blue-600">1M+</div>
								<div className="text-sm text-gray-600">Profiles Analyzed</div>
							</div>
							<div className="text-center">
								<div className="text-3xl font-bold text-blue-600">50K+</div>
								<div className="text-sm text-gray-600">Successful Matches</div>
							</div>
							<div className="text-center">
								<div className="text-3xl font-bold text-blue-600">95%</div>
								<div className="text-sm text-gray-600">Match Accuracy</div>
							</div>
							<div className="text-center">
								<div className="text-3xl font-bold text-blue-600">24/7</div>
								<div className="text-sm text-gray-600">Continuous Learning</div>
							</div>
						</div>
					</div>
				)}

				{/* Operating Model */}
				{activeSection === "operating" && (
					<div className="bg-white rounded-lg shadow-md p-8">
						<h2 className="text-2xl font-bold mb-6">Operating Model</h2>

						<div className="space-y-8">
							<div>
								<h3 className="text-lg font-semibold mb-4">
									Service Delivery Model
								</h3>
								<div className="grid md:grid-cols-3 gap-4">
									<div className="border rounded-lg p-4">
										<h4 className="font-semibold text-blue-600 mb-2">
											Self-Service
										</h4>
										<p className="text-sm text-gray-600">
											Automated matching for standard roles with AI-driven
											recommendations
										</p>
									</div>
									<div className="border rounded-lg p-4">
										<h4 className="font-semibold text-purple-600 mb-2">
											Managed Service
										</h4>
										<p className="text-sm text-gray-600">
											Dedicated account management with custom matching criteria
										</p>
									</div>
									<div className="border rounded-lg p-4">
										<h4 className="font-semibold text-green-600 mb-2">
											Enterprise
										</h4>
										<p className="text-sm text-gray-600">
											Full integration with ATS systems and custom AI model
											training
										</p>
									</div>
								</div>
							</div>

							<div>
								<h3 className="text-lg font-semibold mb-4">Revenue Model</h3>
								<ul className="space-y-2">
									<li className="flex items-center">
										<span className="text-green-500 mr-2">✓</span>
										<span>Subscription-based pricing with tiered plans</span>
									</li>
									<li className="flex items-center">
										<span className="text-green-500 mr-2">✓</span>
										<span>Pay-per-placement option for smaller clients</span>
									</li>
									<li className="flex items-center">
										<span className="text-green-500 mr-2">✓</span>
										<span>Enterprise licensing for unlimited usage</span>
									</li>
								</ul>
							</div>

							<div>
								<h3 className="text-lg font-semibold mb-4">
									Support Structure
								</h3>
								<div className="bg-gray-50 rounded-lg p-4">
									<div className="grid md:grid-cols-2 gap-4">
										<div>
											<strong>Technical Support:</strong>
											<ul className="text-sm text-gray-600 mt-1">
												<li>• 24/7 AI chatbot assistance</li>
												<li>• Dedicated support engineers</li>
												<li>• API documentation & SDKs</li>
											</ul>
										</div>
										<div>
											<strong>Customer Success:</strong>
											<ul className="text-sm text-gray-600 mt-1">
												<li>• Onboarding specialists</li>
												<li>• Regular business reviews</li>
												<li>• Best practices training</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>

			{/* Sticky Chat Button */}
			<button
				onClick={() => setShowChat(!showChat)}
				className="fixed bottom-6 right-6 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 z-40"
				aria-label={showChat ? "Close chat" : "Open chat"}>
				<MessageSquare className="w-6 h-6" />
			</button>

			{/* Sticky Chat Component */}
			{showChat && (
				<div
					className="fixed bottom-24 right-6 w-96 h-[600px] bg-white rounded-lg shadow-2xl z-50 flex flex-col"
					role="dialog"
					aria-label="AI Recruitment Assistant">
					<div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
						<h3 className="font-semibold">AI Recruitment Assistant</h3>
						<button
							onClick={() => setShowChat(false)}
							className="text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-white rounded"
							aria-label="Close chat">
							<svg
								className="w-5 h-5"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
					</div>
					<div className="flex-1 overflow-hidden">
						<Chat onNavigate={handleChatNavigation} />
					</div>
				</div>
			)}

			{/* Why Match Modal */}
			<WhyMatchModal
				talent={selectedTalent}
				isOpen={showWhyMatchModal}
				onClose={() => {
					setShowWhyMatchModal(false);
					setSelectedTalent(null);
				}}
			/>
		</main>
	);
}
