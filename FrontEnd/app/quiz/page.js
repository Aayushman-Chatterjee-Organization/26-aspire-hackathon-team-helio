"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	ArrowLeft,
	ArrowRight,
	Loader2,
	Edit2,
	Check,
	Plus,
	ChevronDown,
	X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Import API service
import { generateJobDescription } from "../../services/api-services";

import { uniqueSkills } from "../data/mockTalents";
import {
	noticePeriodOptions,
	craftOptions,
	industryOptions,
} from "../data/mockDropDownOptions";

export default function QuizPage() {
	const router = useRouter();
	const [currentStep, setCurrentStep] = useState(1);
	const [isLoading, setIsLoading] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [error, setError] = useState(null);

	// Form data
	const [formData, setFormData] = useState({
		required_skills: [],
		min_experience: "",
		notice_period: "",
		craft: "",
		industry: "",
	});

	// Generated job description
	const [jobDescription, setJobDescription] = useState("");

	// Skills dropdown state
	const [skillSearchTerm, setSkillSearchTerm] = useState("");
	const [showSkillDropdown, setShowSkillDropdown] = useState(false);
	const [highlightedIndex, setHighlightedIndex] = useState(0);
	const dropdownRef = useRef(null);
	const inputRef = useRef(null);

	// Get skills based on selected craft
	const getAvailableSkills = () => {
		if (!formData.craft || !uniqueSkills[formData.craft]) {
			return [];
		}
		// Filter out already selected skills
		return uniqueSkills[formData.craft].filter(
			(skill) => !formData.required_skills.includes(skill),
		);
	};

	const availableSkills = getAvailableSkills();

	// Filter skills based on search term
	const filteredSkills = availableSkills.filter((skill) =>
		skill.toLowerCase().includes(skillSearchTerm.toLowerCase()),
	);

	// Handle clicking outside to close dropdown
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setShowSkillDropdown(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	// Reset highlighted index when filtered skills change
	useEffect(() => {
		setHighlightedIndex(0);
	}, [skillSearchTerm]);

	// Reset skills when craft changes
	useEffect(() => {
		setFormData((prev) => ({
			...prev,
			required_skills: [],
		}));
		setSkillSearchTerm("");
	}, [formData.craft]);

	const handleSkillSelect = (skill) => {
		setFormData((prev) => ({
			...prev,
			required_skills: [...prev.required_skills, skill],
		}));
		setSkillSearchTerm("");
		setShowSkillDropdown(false);
		inputRef.current?.focus();
	};

	const handleKeyDown = (e) => {
		if (!showSkillDropdown || filteredSkills.length === 0) return;

		switch (e.key) {
			case "ArrowDown":
				e.preventDefault();
				setHighlightedIndex((prev) =>
					prev < filteredSkills.length - 1 ? prev + 1 : prev,
				);
				break;
			case "ArrowUp":
				e.preventDefault();
				setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : 0));
				break;
			case "Enter":
				e.preventDefault();
				if (filteredSkills[highlightedIndex]) {
					handleSkillSelect(filteredSkills[highlightedIndex]);
				}
				break;
			case "Escape":
				setShowSkillDropdown(false);
				break;
		}
	};

	const handleRemoveSkill = (skillToRemove) => {
		setFormData((prev) => ({
			...prev,
			required_skills: prev.required_skills.filter(
				(skill) => skill !== skillToRemove,
			),
		}));
	};

	const handleGenerateJobDescription = async () => {
		setIsLoading(true);
		setError(null);

		try {
			// Prepare the payload for the API
			const payload = {
				required_skills: formData.required_skills,
				min_experience: parseInt(formData.min_experience),
				notice_period: formData.notice_period,
				craft: formData.craft,
				industry: formData.industry,
			};

			// Call the actual API
			const response = await generateJobDescription(payload);

			if (response && response.job_description) {
				setJobDescription(response.job_description);
				setCurrentStep(2);
			} else {
				throw new Error("Invalid response from server");
			}
		} catch (err) {
			console.error("Error generating job description:", err);
			setError(
				err.message || "Failed to generate job description. Please try again.",
			);
		} finally {
			setIsLoading(false);
		}
	};

	const handleFindCandidates = async () => {
		setIsLoading(true);

		// Store the job description in sessionStorage for the matches page
		sessionStorage.setItem("jobDescription", jobDescription);

		// Navigate to matches page
		setTimeout(() => {
			router.push("/matches?source=quiz");
		}, 500);
	};

	const isFormValid = () => {
		return (
			formData.required_skills.length > 0 &&
			formData.min_experience &&
			formData.notice_period &&
			formData.craft
		);
	};

	return (
		<div className="min-h-screen bg-gray-50 py-8">
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<div className="mb-8">
					<Button
						onClick={() => router.push("/")}
						variant="ghost"
						className="mb-4">
						<ArrowLeft className="w-4 h-4 mr-2" />
						Back to Dashboard
					</Button>

					<h1 className="text-3xl font-bold text-gray-900">
						{currentStep === 1
							? "Create Job Requirements"
							: "Review Job Description"}
					</h1>
					<p className="text-gray-600 mt-2">
						{currentStep === 1
							? "Tell us about the role you're looking to fill"
							: "Review and edit the generated job description"}
					</p>
				</div>

				{/* Progress Indicator */}
				<div className="mb-8">
					<div className="flex items-center justify-between">
						<div
							className={`flex items-center ${currentStep >= 1 ? "text-blue-600" : "text-gray-400"}`}>
							<div
								className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? "bg-blue-600 text-white" : "bg-gray-200"}`}>
								1
							</div>
							<span className="ml-2 font-medium">Requirements</span>
						</div>
						<div
							className={`flex-1 h-1 mx-4 ${currentStep >= 2 ? "bg-blue-600" : "bg-gray-200"}`}
						/>
						<div
							className={`flex items-center ${currentStep >= 2 ? "text-blue-600" : "text-gray-400"}`}>
							<div
								className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? "bg-blue-600 text-white" : "bg-gray-200"}`}>
								2
							</div>
							<span className="ml-2 font-medium">Job Description</span>
						</div>
					</div>
				</div>

				{/* Error Alert */}
				{error && (
					<div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
						<p className="text-red-800">{error}</p>
					</div>
				)}

				{/* Step 1: Requirements Form */}
				{currentStep === 1 && (
					<Card>
						<CardHeader>
							<CardTitle>Job Requirements</CardTitle>
							<CardDescription>
								Fill in the details to generate a tailored job description
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
							{/* Craft - Moved before skills */}
							<div className="space-y-2">
								<Label htmlFor="craft">Craft/Department *</Label>
								<select
									id="craft"
									value={formData.craft}
									onChange={(e) =>
										setFormData((prev) => ({ ...prev, craft: e.target.value }))
									}
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
									required>
									<option value="">Select craft</option>
									{craftOptions.map((option) => (
										<option key={option.value} value={option.value}>
											{option.label}
										</option>
									))}
								</select>
							</div>

							{/* Required Skills - Only visible when craft is selected */}
							<div className="space-y-2">
								<Label
									htmlFor="skills"
									className={!formData.craft ? "text-gray-400" : ""}>
									Required Skills *
								</Label>
								<div className="space-y-2">
									<div className="relative" ref={dropdownRef}>
										<div className="relative">
											<Input
												ref={inputRef}
												id="skills"
												placeholder={
													formData.craft
														? "Search for skills..."
														: "Select a craft first"
												}
												value={skillSearchTerm}
												onChange={(e) => {
													setSkillSearchTerm(e.target.value);
													setShowSkillDropdown(true);
												}}
												onFocus={() =>
													formData.craft && setShowSkillDropdown(true)
												}
												onKeyDown={handleKeyDown}
												disabled={!formData.craft}
												className={`pr-10 placeholder:text-gray-600 ${!formData.craft ? "bg-gray-50 cursor-not-allowed" : ""}`}
												aria-describedby="skills-help"
												aria-expanded={showSkillDropdown}
												aria-controls="skills-dropdown"
												aria-autocomplete="list"
												role="combobox"
											/>
											<ChevronDown
												className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none ${!formData.craft ? "text-gray-300" : "text-gray-400"}`}
											/>
										</div>

										{/* Dropdown */}
										{showSkillDropdown &&
											filteredSkills.length > 0 &&
											formData.craft && (
												<div
													id="skills-dropdown"
													className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"
													role="listbox">
													{/* Close button for dropdown */}
													<div className="sticky top-0 bg-white border-b border-gray-200 p-2 flex justify-between items-center">
														<span className="text-sm font-medium text-gray-700">
															{formData.craft} Skills
														</span>
														<button
															type="button"
															onClick={() => setShowSkillDropdown(false)}
															className="p-1 hover:bg-gray-100 rounded-md transition-colors"
															aria-label="Close skills dropdown">
															<X className="w-4 h-4 text-gray-500" />
														</button>
													</div>
													{filteredSkills.map((skill, index) => (
														<button
															key={skill}
															type="button"
															onClick={() => handleSkillSelect(skill)}
															onMouseEnter={() => setHighlightedIndex(index)}
															className={`w-full px-3 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none ${
																index === highlightedIndex ? "bg-gray-100" : ""
															}`}
															role="option"
															aria-selected={index === highlightedIndex}>
															{skill}
														</button>
													))}
												</div>
											)}
									</div>

									<p id="skills-help" className="text-sm text-gray-600">
										{formData.craft
											? "Search and select skills from the list"
											: "Select a craft to see available skills"}
									</p>

									{/* Selected Skills */}
									<div
										className="flex flex-wrap gap-2"
										role="list"
										aria-label="Selected skills">
										{formData.required_skills.map((skill) => (
											<div
												key={skill}
												className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm font-medium"
												role="listitem">
												<span>{skill}</span>
												<button
													type="button"
													onClick={() => handleRemoveSkill(skill)}
													className="ml-1 text-gray-500 hover:text-gray-700 focus:outline-none"
													aria-label={`Remove ${skill}`}>
													<X className="w-3.5 h-3.5" />
												</button>
											</div>
										))}
									</div>

									{formData.craft && formData.required_skills.length === 0 && (
										<p className="text-sm text-gray-500">
											No skills selected yet
										</p>
									)}
								</div>
							</div>

							{/* Minimum Experience */}
							<div className="space-y-2">
								<Label htmlFor="experience">Minimum Experience (years) *</Label>
								<Input
									id="experience"
									type="number"
									min="0"
									placeholder="Enter number of years"
									value={formData.min_experience}
									onChange={(e) =>
										setFormData((prev) => ({
											...prev,
											min_experience: e.target.value,
										}))
									}
									className="placeholder:text-gray-600"
								/>
							</div>

							{/* Notice Period */}
							<div className="space-y-2">
								<Label htmlFor="notice">Notice Period *</Label>
								<select
									id="notice"
									value={formData.notice_period}
									onChange={(e) =>
										setFormData((prev) => ({
											...prev,
											notice_period: e.target.value,
										}))
									}
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
									required>
									<option value="">Select notice period</option>
									{noticePeriodOptions.map((option) => (
										<option key={option.value} value={option.value}>
											{option.label}
										</option>
									))}
								</select>
							</div>

							{/* Industry */}
							<div className="space-y-2">
								<Label htmlFor="industry">Industry (Optional)</Label>
								<select
									id="industry"
									value={formData.industry}
									onChange={(e) =>
										setFormData((prev) => ({
											...prev,
											industry: e.target.value,
										}))
									}
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900">
									<option value="">Select industry</option>
									{industryOptions.map((option) => (
										<option key={option.value} value={option.value}>
											{option.label}
										</option>
									))}
								</select>
							</div>

							{/* Generate Button */}
							<div className="pt-4">
								<Button
									onClick={handleGenerateJobDescription}
									disabled={!isFormValid() || isLoading}
									className="w-full">
									{isLoading ? (
										<>
											<Loader2 className="mr-2 h-4 w-4 animate-spin" />
											Generating Job Description...
										</>
									) : (
										<>
											Generate Job Description
											<ArrowRight className="ml-2 h-4 w-4" />
										</>
									)}
								</Button>
							</div>
						</CardContent>
					</Card>
				)}

				{/* Step 2: Job Description Review */}
				{currentStep === 2 && (
					<Card>
						<CardHeader>
							<CardTitle>Generated Job Description</CardTitle>
							<CardDescription>
								Review and edit the job description before finding candidates
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="space-y-2">
								<div className="flex items-center justify-between">
									<Label htmlFor="jobDescription">Job Description</Label>
									<Button
										variant="ghost"
										size="sm"
										onClick={() => setIsEditing(!isEditing)}>
										{isEditing ? (
											<>
												<Check className="w-4 h-4 mr-2" />
												Save
											</>
										) : (
											<>
												<Edit2 className="w-4 h-4 mr-2" />
												Edit
											</>
										)}
									</Button>
								</div>
								<Textarea
									id="jobDescription"
									value={jobDescription}
									onChange={(e) => setJobDescription(e.target.value)}
									readOnly={!isEditing}
									className="min-h-[300px] resize-none"
								/>
							</div>

							{/* Action Buttons */}
							<div className="flex gap-4">
								<Button
									variant="outline"
									onClick={() => setCurrentStep(1)}
									className="flex-1">
									<ArrowLeft className="w-4 h-4 mr-2" />
									Back to Requirements
								</Button>
								<Button
									onClick={handleFindCandidates}
									disabled={!jobDescription.trim() || isLoading}
									className="flex-1">
									{isLoading ? (
										<>
											<Loader2 className="mr-2 h-4 w-4 animate-spin" />
											Finding Candidates...
										</>
									) : (
										<>
											Find Matching Candidates
											<ArrowRight className="ml-2 h-4 w-4" />
										</>
									)}
								</Button>
							</div>
						</CardContent>
					</Card>
				)}
			</div>
		</div>
	);
}
