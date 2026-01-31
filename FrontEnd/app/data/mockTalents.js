// CHANGE: Enhanced mock data with realistic candidate profiles
export const mockTalents = [
	{
		id: 1,
		name: "Sarah Chen",
		candidate_name: "Sarah Chen",
		title: "Senior Full Stack Developer",
		role: "Senior Full Stack Developer",
		location: "San Francisco, CA",
		availability: "2 weeks",
		rate: "$150-180/hr",
		fitScore: 92,
		matchScore: 92,
		match_score: 92,
		skills: [
			"React",
			"Node.js",
			"TypeScript",
			"AWS",
			"GraphQL",
			"PostgreSQL",
			"Docker",
		],
		experience: "8 years",
		education: "MS Computer Science, Stanford University",
		strengths: [
			"Strong React/Node.js expertise",
			"AWS certified solutions architect",
			"Led teams of 5-10 developers",
			"Experience with high-traffic applications",
		],
		gaps: [
			"Limited experience with Kubernetes",
			"No recent mobile development",
		],
		recommendation: "Highly recommended",
		explanation:
			"Sarah's extensive full-stack experience and leadership skills make her an excellent match. Her AWS expertise aligns perfectly with your cloud infrastructure needs.",
		matchReason:
			"92% match based on technical skills, leadership experience, and domain expertise in fintech applications.",
	},
	{
		id: 2,
		name: "Michael Rodriguez",
		candidate_name: "Michael Rodriguez",
		title: "Backend Engineer",
		role: "Backend Engineer",
		location: "Austin, TX",
		availability: "Immediate",
		rate: "$120-140/hr",
		fitScore: 85,
		matchScore: 85,
		match_score: 85,
		skills: [
			"Python",
			"Django",
			"PostgreSQL",
			"Redis",
			"Docker",
			"Microservices",
		],
		experience: "6 years",
		education: "BS Computer Engineering, UT Austin",
		strengths: [
			"Expert in Python/Django",
			"Microservices architecture",
			"Database optimization specialist",
			"Strong API design skills",
		],
		gaps: [
			"Limited frontend experience",
			"No experience with your specific industry",
		],
		recommendation: "Recommended",
		explanation:
			"Michael's backend expertise is solid, particularly in Python ecosystems. His microservices experience would be valuable for scaling your platform.",
		matchReason:
			"85% match based on strong backend skills and architectural experience. Would need support on frontend tasks.",
	},
	{
		id: 3,
		name: "Emily Johnson",
		candidate_name: "Emily Johnson",
		title: "DevOps Engineer",
		role: "DevOps Engineer",
		location: "Seattle, WA",
		availability: "1 month",
		rate: "$140-160/hr",
		fitScore: 78,
		matchScore: 78,
		match_score: 78,
		skills: [
			"Kubernetes",
			"Terraform",
			"AWS",
			"CI/CD",
			"Jenkins",
			"Prometheus",
		],
		experience: "7 years",
		education: "BS Information Systems, University of Washington",
		strengths: [
			"Kubernetes expert",
			"Infrastructure as Code specialist",
			"Strong monitoring and observability skills",
			"Experience with large-scale deployments",
		],
		gaps: [
			"Limited application development experience",
			"No experience with your tech stack",
		],
		recommendation: "Consider",
		explanation:
			"Emily brings strong DevOps skills but may need time to understand your application architecture. Best suited for infrastructure-focused roles.",
		matchReason:
			"78% match for DevOps needs. Strong infrastructure skills but limited overlap with your application stack.",
	},
	{
		id: 4,
		name: "David Park",
		candidate_name: "David Park",
		title: "Frontend Developer",
		role: "Frontend Developer",
		location: "New York, NY",
		availability: "3 weeks",
		rate: "$130-150/hr",
		fitScore: 88,
		matchScore: 88,
		match_score: 88,
		skills: [
			"React",
			"Vue.js",
			"TypeScript",
			"CSS",
			"Webpack",
			"Jest",
			"Figma",
		],
		experience: "5 years",
		education: "BA Design & Computer Science, Parsons",
		strengths: [
			"Expert in modern frontend frameworks",
			"Strong UI/UX sensibilities",
			"Performance optimization specialist",
			"Accessibility compliance expert",
		],
		gaps: ["No backend experience", "Limited DevOps knowledge"],
		recommendation: "Highly recommended",
		explanation:
			"David's frontend expertise and design background make him ideal for UI-heavy projects. His focus on performance and accessibility adds significant value.",
		matchReason:
			"88% match for frontend role. Exceptional UI/UX skills combined with strong technical implementation abilities.",
	},
	{
		id: 5,
		name: "Lisa Thompson",
		candidate_name: "Lisa Thompson",
		title: "Data Engineer",
		role: "Data Engineer",
		location: "Chicago, IL",
		availability: "2 weeks",
		rate: "$135-155/hr",
		fitScore: 72,
		matchScore: 72,
		match_score: 72,
		skills: ["Python", "Spark", "Airflow", "SQL", "AWS", "Kafka"],
		experience: "6 years",
		education: "MS Data Science, Northwestern University",
		strengths: [
			"Big data processing expert",
			"ETL pipeline specialist",
			"Strong analytical skills",
			"Experience with real-time data processing",
		],
		gaps: [
			"No web development experience",
			"Limited knowledge of your business domain",
		],
		recommendation: "Consider",
		explanation:
			"Lisa's data engineering skills are strong but may not align with immediate web development needs. Better suited for data-intensive features.",
		matchReason:
			"72% match. Excellent data skills but limited overlap with core web development requirements.",
	},
	{
		id: 6,
		name: "James Wilson",
		candidate_name: "James Wilson",
		title: "Mobile Developer",
		role: "Mobile Developer",
		location: "Denver, CO",
		availability: "1 month",
		rate: "$125-145/hr",
		fitScore: 65,
		matchScore: 65,
		match_score: 65,
		skills: ["React Native", "Swift", "Kotlin", "Firebase", "REST APIs"],
		experience: "5 years",
		education: "BS Computer Science, Colorado State",
		strengths: [
			"Cross-platform mobile development",
			"Native iOS and Android experience",
			"Strong API integration skills",
		],
		gaps: [
			"No web development experience",
			"Limited backend knowledge",
			"Different tech stack focus",
		],
		recommendation: "Consider",
		explanation:
			"James is a skilled mobile developer but lacks web development experience. Would need significant ramp-up time for web projects.",
		matchReason:
			"65% match. Strong mobile skills but limited relevance to web-focused requirements.",
	},
];

// CHANGE: Export function to get mock talent by ID
export const getMockTalentById = (id) => {
	return mockTalents.find((talent) => talent.id === parseInt(id));
};

// CHANGE: Export function to get filtered mock talents
export const getFilteredMockTalents = (filters = {}) => {
	return mockTalents.filter((talent) => {
		if (filters.minScore && talent.fitScore < filters.minScore) return false;
		if (filters.location && !talent.location.includes(filters.location))
			return false;
		if (filters.skills && filters.skills.length > 0) {
			const hasRequiredSkills = filters.skills.some((skill) =>
				talent.skills.includes(skill),
			);
			if (!hasRequiredSkills) return false;
		}
		return true;
	});
};

// Skills organized by craft categories
export const uniqueSkills = {
	Engineering: [
		"React",
		"Java",
		"Go",
		"AWS",
		"Kubernetes",
		"Node.js",
		"Python",
	],
	Data: ["Snowflake", "PyTorch", "SQL", "Tableau", "LLMs", "RAG", "Databricks"],
	Experience: [
		"Figma",
		"User Research",
		"Adobe XD",
		"Service Design",
		"Accessibility",
	],
	Product: ["Agile", "Scrum", "Product Roadmap", "Jira", "Market Analysis"],
	Strategy: ["GTM Strategy", "Digital Transformation", "Business Case", "M&A"],
};
