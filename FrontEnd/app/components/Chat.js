"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Send, Bot, User } from "lucide-react";

export default function Chat({ onFindMatches }) {
	const [messages, setMessages] = useState([
		{
			id: 1,
			type: "assistant",
			content:
				"Hello! I'm your AI Talent Staffing Co-Pilot. How can I help you find the perfect talent for your team?",
			timestamp: new Date(),
		},
	]);
	const [input, setInput] = useState("");
	const [isTyping, setIsTyping] = useState(false);
	const messagesEndRef = useRef(null);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	const actionChips = [
		{ label: "Find matches", action: "find_matches" },
		{ label: "View all talents", action: "view_all" },
		{ label: "Filter by skills", action: "filter_skills" },
		{ label: "Check availability", action: "check_availability" },
	];

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

		// Simulate AI response
		setTimeout(() => {
			const assistantMessage = {
				id: messages.length + 2,
				type: "assistant",
				content: generateResponse(input),
				timestamp: new Date(),
				showActions: shouldShowActions(input),
			};
			setMessages((prev) => [...prev, assistantMessage]);
			setIsTyping(false);
		}, 1000);
	};

	const generateResponse = (userInput) => {
		const lowerInput = userInput.toLowerCase();

		if (lowerInput.includes("developer") || lowerInput.includes("engineer")) {
			return "I understand you're looking for development talent. We have several excellent developers available. Would you like to see matches based on specific skills or availability?";
		} else if (lowerInput.includes("designer") || lowerInput.includes("ux")) {
			return "Great! We have talented designers in our network. What specific design skills are you looking for?";
		} else if (
			lowerInput.includes("immediate") ||
			lowerInput.includes("urgent")
		) {
			return "I'll prioritize candidates with immediate availability. Let me find the best matches for you.";
		} else {
			return "I can help you find the perfect talent. Could you tell me more about the role, required skills, or timeline for your project?";
		}
	};

	const shouldShowActions = (userInput) => {
		const keywords = [
			"find",
			"show",
			"need",
			"looking",
			"search",
			"developer",
			"designer",
			"engineer",
		];
		return keywords.some((keyword) =>
			userInput.toLowerCase().includes(keyword),
		);
	};

	const handleActionChip = (action) => {
		if (action === "find_matches") {
			onFindMatches();
		}
		// Handle other actions as needed
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
										{actionChips.map((chip) => (
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
						placeholder="Describe your talent needs..."
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
