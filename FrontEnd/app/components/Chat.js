"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Send, Bot, User } from "lucide-react";

export default function Chat({ onNavigate }) {
	const [messages, setMessages] = useState([
		{
			id: 1,
			type: "assistant",
			content:
				"Hello! I'm your AI Recruitment Assistant. What can I help you with in recruitment today?",
			timestamp: new Date(),
		},
	]);
	const [input, setInput] = useState("");
	const [isTyping, setIsTyping] = useState(false);
	const [conversationState, setConversationState] = useState("initial");
	const [requirements, setRequirements] = useState({});
	const messagesEndRef = useRef(null);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	const actionChips = {
		initial: [
			{ label: "Find talent", action: "start_talent_search" },
			{ label: "View all candidates", action: "view_all" },
			{ label: "Help with job description", action: "job_description" },
		],
		gathering_requirements: [
			{ label: "Skip to matches", action: "skip_to_matches" },
			{ label: "Start over", action: "reset" },
		],
		ready_to_search: [
			{ label: "Show relevant matches", action: "show_matches" },
			{ label: "Show all matches", action: "view_all" },
			{ label: "Filter by experience", action: "filter_experience" },
			{ label: "Filter by tech stack", action: "filter_skills" },
		],
	};

	const handleSend = async () => {
		if (!input.trim()) return;

		const userMessage = {
			id: messages.length + 1,
			type: "user",
			content: input,
			timestamp: new Date(),
		};

		setMessages((prev) => [...prev, userMessage]);
		setInput("");
		setIsTyping(true);

		// Process the message and generate response
		setTimeout(() => {
			const response = processUserInput(input);
			const assistantMessage = {
				id: messages.length + 2,
				type: "assistant",
				content: response.content,
				timestamp: new Date(),
				showActions: response.showActions,
			};
			setMessages((prev) => [...prev, assistantMessage]);
			setIsTyping(false);

			if (response.newState) {
				setConversationState(response.newState);
			}
		}, 1000);
	};

	const processUserInput = (userInput) => {
		const lowerInput = userInput.toLowerCase();

		// Initial state - determine what user wants
		if (conversationState === "initial") {
			if (
				lowerInput.includes("find") ||
				lowerInput.includes("need") ||
				lowerInput.includes("looking for") ||
				lowerInput.includes("hire")
			) {
				setConversationState("gathering_requirements");
				return {
					content:
						"Great! I'll help you find the perfect candidate. What role are you looking to fill?",
					showActions: false,
					newState: "gathering_requirements",
				};
			}
		}

		// Gathering requirements state
		if (conversationState === "gathering_requirements") {
			// Check if user mentioned a role
			if (
				lowerInput.includes("engineer") ||
				lowerInput.includes("developer") ||
				lowerInput.includes("designer") ||
				lowerInput.includes("analyst") ||
				lowerInput.includes("manager")
			) {
				// Extract role info
				setRequirements((prev) => ({ ...prev, role: userInput }));

				// Ask about experience
				if (!requirements.experience) {
					return {
						content: "Perfect! How many years of experience should they have?",
						showActions: true,
						newState: "gathering_requirements",
					};
				}
			}

			// Check if user mentioned experience
			if (lowerInput.match(/\d+\s*(year|yr)/)) {
				setRequirements((prev) => ({ ...prev, experience: userInput }));

				// Ask about skills
				if (!requirements.skills) {
					return {
						content:
							"What technical skills or technologies should they be proficient in?",
						showActions: true,
						newState: "gathering_requirements",
					};
				}
			}

			// Check if user mentioned skills
			if (
				lowerInput.includes("python") ||
				lowerInput.includes("java") ||
				lowerInput.includes("react") ||
				lowerInput.includes("aws") ||
				lowerInput.includes("etl") ||
				lowerInput.includes("gcp") ||
				requirements.role // If we already have a role, assume this is skills
			) {
				setRequirements((prev) => ({ ...prev, skills: userInput }));

				// We have enough info
				return {
					content: `Got it! I'm looking for a ${requirements.role || "professional"} with ${requirements.experience || "relevant experience"} and expertise in ${userInput}. I can now show you the best matches!`,
					showActions: true,
					newState: "ready_to_search",
				};
			}
		}

		// Default responses
		return {
			content:
				"I can help you find the perfect talent. Could you tell me more about the role, required skills, or timeline for your project?",
			showActions: true,
		};
	};

	const handleActionChip = (action) => {
		switch (action) {
			case "start_talent_search":
				setConversationState("gathering_requirements");
				const startMessage = {
					id: messages.length + 1,
					type: "assistant",
					content:
						"Great! Let's find the perfect candidate for you. What role are you looking to fill?",
					timestamp: new Date(),
				};
				setMessages((prev) => [...prev, startMessage]);
				break;

			case "view_all":
				onNavigate("navigate_matches", {});
				break;

			case "show_matches":
				// Navigate with the gathered requirements
				onNavigate("show_filtered_matches", requirements);
				break;

			case "filter_experience":
				const expMessage = {
					id: messages.length + 1,
					type: "assistant",
					content: "What experience level are you looking for?",
					timestamp: new Date(),
				};
				setMessages((prev) => [...prev, expMessage]);
				break;

			case "filter_skills":
				const skillMessage = {
					id: messages.length + 1,
					type: "assistant",
					content: "Which technical skills are most important for this role?",
					timestamp: new Date(),
				};
				setMessages((prev) => [...prev, skillMessage]);
				break;

			case "skip_to_matches":
				onNavigate("navigate_matches", {});
				break;

			case "reset":
				setConversationState("initial");
				setRequirements({});
				setMessages([
					{
						id: 1,
						type: "assistant",
						content:
							"Hello! I'm your AI Recruitment Assistant. What can I help you with in recruitment today?",
						timestamp: new Date(),
					},
				]);
				break;
		}
	};

	const getCurrentActionChips = () => {
		return actionChips[conversationState] || actionChips.initial;
	};

	return (
		<div className="flex flex-col h-full">
			<div className="flex-1 overflow-y-auto p-4 space-y-4">
				{messages.map((message) => (
					<div
						key={message.id}
						className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
						<div
							className={`flex items-start space-x-2 max-w-[80%] ${message.type === "user" ? "flex-row-reverse space-x-reverse" : ""}`}>
							<div
								className={`w-8 h-8 rounded-full flex items-center justify-center ${message.type === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
								{message.type === "user" ? (
									<User className="w-4 h-4" />
								) : (
									<Bot className="w-4 h-4" />
								)}
							</div>
							<Card
								className={`p-3 ${message.type === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
								<p className="text-sm">{message.content}</p>
								{message.showActions && (
									<div className="mt-3 flex flex-wrap gap-2">
										{getCurrentActionChips().map((chip) => (
											<Button
												key={chip.action}
												variant="secondary"
												size="sm"
												onClick={() => handleActionChip(chip.action)}
												className="text-xs">
												{chip.label}
											</Button>
										))}
									</div>
								)}
							</Card>
						</div>
					</div>
				))}
				{isTyping && (
					<div className="flex justify-start">
						<div className="flex items-center space-x-2">
							<div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
								<Bot className="w-4 h-4" />
							</div>
							<Card className="p-3 bg-muted">
								<div className="flex space-x-1">
									<div
										className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
										style={{ animationDelay: "0ms" }}></div>
									<div
										className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
										style={{ animationDelay: "150ms" }}></div>
									<div
										className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
										style={{ animationDelay: "300ms" }}></div>
								</div>
							</Card>
						</div>
					</div>
				)}
				<div ref={messagesEndRef} />
			</div>

			<div className="border-t p-4">
				<form
					onSubmit={(e) => {
						e.preventDefault();
						handleSend();
					}}
					className="flex space-x-2">
					<Input
						value={input}
						onChange={(e) => setInput(e.target.value)}
						placeholder="Type your message..."
						className="flex-1"
						aria-label="Chat input"
					/>
					<Button type="submit" size="icon" aria-label="Send message">
						<Send className="w-4 h-4" />
					</Button>
				</form>
			</div>
		</div>
	);
}
