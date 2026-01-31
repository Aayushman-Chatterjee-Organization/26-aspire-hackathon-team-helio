const API_BASE_URL =
	"https://hackathon-26-ml-1082494551684.us-central1.run.app";

export const generateJobDescription = async (jobData) => {
	try {
		const response = await fetch(`${API_BASE_URL}/generate-jd`, {
			method: "POST",
			headers: {
				accept: "application/json",
				"content-type": "application/json",
			},
			body: JSON.stringify({
				required_skills: jobData.required_skills,
				min_experience: jobData.min_experience,
				notice_period: jobData.notice_period,
				craft: jobData.craft,
				industry: jobData.industry,
			}),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error generating job description:", error);
		throw error;
	}
};

export const matchCandidates = async (jobDescription) => {
	try {
		const response = await fetch(`${API_BASE_URL}/match`, {
			method: "POST",
			headers: {
				accept: "application/json",
				"content-type": "application/json",
			},
			body: JSON.stringify({
				job_description: jobDescription,
			}),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error matching candidates:", error);
		throw error;
	}
};
