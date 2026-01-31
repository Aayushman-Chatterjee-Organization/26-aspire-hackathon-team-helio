// API Service for Talent Matching

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

// Mock responses for development
import {
	mockJobDescriptionResponse,
	mockRecommendResponse,
} from "../data/mockApiResponses";

export const talentService = {
	// Generate job description based on requirements
	async generateJobDescription(requirements) {
		try {
			// In production, this would be:
			// const response = await fetch(`${API_BASE_URL}/jobDescription`, {
			//   method: 'POST',
			//   headers: { 'Content-Type': 'application/json' },
			//   body: JSON.stringify(requirements)
			// });
			// return await response.json();

			// Mock response for development
			return new Promise((resolve) => {
				setTimeout(() => {
					resolve(mockJobDescriptionResponse);
				}, 1500);
			});
		} catch (error) {
			console.error("Error generating job description:", error);
			throw error;
		}
	},

	// Get candidate recommendations based on job description
	async getRecommendations(jobSummary) {
		try {
			// In production, this would be:
			// const response = await fetch(`${API_BASE_URL}/recommend`, {
			//   method: 'POST',
			//   headers: { 'Content-Type': 'application/json' },
			//   body: JSON.stringify({ job_summary: jobSummary })
			// });
			// return await response.json();

			// Mock response for development
			return new Promise((resolve) => {
				setTimeout(() => {
					resolve(mockRecommendResponse);
				}, 1500);
			});
		} catch (error) {
			console.error("Error getting recommendations:", error);
			throw error;
		}
	},
};
