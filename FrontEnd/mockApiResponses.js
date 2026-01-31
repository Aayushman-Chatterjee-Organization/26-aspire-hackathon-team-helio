// Mock API responses based on api-contract.json

export const mockJobDescriptionResponse = {
	job_description:
		"We are seeking an experienced AWS Cloud Engineer to join our dynamic team. The ideal candidate will have 5+ years of hands-on experience with AWS services and infrastructure. You will be responsible for designing, implementing, and maintaining scalable cloud solutions for our retail/healthcare clients. Key responsibilities include architecting cloud infrastructure, implementing CI/CD pipelines, ensuring security best practices, and optimizing cloud costs. Strong knowledge of AWS services (EC2, S3, Lambda, RDS, etc.), Infrastructure as Code (Terraform/CloudFormation), and containerization technologies is required. Experience in retail or healthcare domains is a plus.",
};

export const mockRecommendResponse = {
	job_summary:
		"Data Science Professional for Retail industry, requiring 5+ years in data/analytics, strong Python and Python DS libraries, SQL/warehouse experience, end-to-end modeling, and clear retail / e-commerce / consumer goods domain application.",
	total_candidates_found: 6,
	ranked_candidates: [
		{
			rank: 1,
			candidate_name: "Patricia Leblanc (PS-002)",
			match_score: 48,
			skills_match: {
				matched: [
					"SQL",
					"Databricks",
					"Tableau",
					"LLMs",
					"Structured data / data warehousing concepts",
					"5+ years data/analytics experience",
					"End-to-end analytics / DS delivery",
					"Cross-functional collaboration",
				],
				missing: [
					"Python",
					"pandas",
					"NumPy",
					"SciPy",
					"scikit-learn",
					"statsmodels",
					"matplotlib/seaborn",
					"Retail / e-commerce domain experience",
					"Retail metrics (conversion, basket size, CLV, etc.)",
					"Predictive retail use cases (demand forecasting, recommendation, pricing, inventory, churn)",
				],
			},
			experience_match:
				"Senior data professional (14 years, Data | Senior). Strong background in analytics and modern data platforms (Databricks, SQL, Tableau, LLMs). No explicit retail or consumer domain experience and no documented use of Python or common Python DS libraries. Likely experienced with large datasets, feature engineering, and insight generation, but documented tools lean toward SQL/Databricks/BI rather than Python-centric DS.",
			strengths: [
				"Very strong overall data/analytics experience (14 years)",
				"Senior data capability level - can likely lead projects and mentor others",
				"Solid SQL and Databricks experience, good fit for data sourcing and transformation from warehouses",
				"Tableau experience for insight communication and visualization",
				"LLM exposure suggests comfort with advanced analytics / modern AI stack",
				"Short bench time - immediately available",
			],
			gaps: [
				"No documented Python experience or Python DS libraries",
				"No explicit retail, e-commerce, or consumer goods domain work",
				"No explicit mention of predictive/prescriptive modeling use cases relevant to retail (forecasting, recommendation, churn, pricing, inventory)",
				"No explicit mention of software engineering best practices in code (version control, testing, modular code)",
			],
			recommendation: "Consider",
			explanation:
				'Patricia has the strongest overall data experience among the data-capability candidates and is already at a Senior level. She brings solid SQL/Databricks/Tableau skills and will likely handle data sourcing, preparation, and insight generation well. However, the role is explicitly Python-first with heavy use of the Python DS ecosystem and asks for retail-domain modeling; Patricia\'s profile shows neither Python nor retail/domain-specific work. She is ranked first relative to this pool because of her depth in analytics, but the absolute fit against the Python + retail DS brief is moderate at best, so she is a "Consider" rather than a clear recommend.',
		},
		{
			rank: 2,
			candidate_name: "Karen Garcia (PS-012)",
			match_score: 45,
			skills_match: {
				matched: [
					"Snowflake",
					"Tableau",
					"PyTorch (Python-adjacent ML)",
					"RAG / LLM-related skills",
					"5+ years data/analytics experience",
					"End-to-end data / AI solution experience",
					"Cross-functional collaboration",
				],
				missing: [
					"Python (as a core skill)",
					"pandas",
					"NumPy",
					"SciPy",
					"scikit-learn",
					"statsmodels",
					"matplotlib/seaborn",
					"Retail / e-commerce domain experience",
					"Retail metrics and KPIs",
					"Classical predictive modeling for retail use cases (forecasting, pricing, churn, CLV, inventory)",
				],
			},
			experience_match:
				"Data | Lead with 12 years' experience, suggesting leadership in data/AI projects. Strong exposure to modern cloud data stack (Snowflake, Tableau) and generative AI / RAG / PyTorch, implying good modeling and MLOps familiarity. However, profile does not explicitly list Python even though PyTorch is present, and there is no stated retail or consumer domain background.",
			strengths: [
				"Lead-level data role - comfortable owning end-to-end solutions and stakeholder management",
				"Strong experience with Snowflake and BI (Tableau), aligning with SQL/warehouse and visualization needs",
				"Hands-on with PyTorch and RAG, indicating ML and representation-learning capability",
				"Likely comfortable framing business problems and translating them into analytical workstreams",
			],
			gaps: [
				"Python is not explicitly listed as a core skill despite PyTorch; this is a concern for a Python-centric DS role",
				"No documented use of core Python DS libraries (pandas, scikit-learn, etc.)",
				"No explicit retail or e-commerce project experience",
				"Profile emphasizes modern AI/RAG more than classical applied analytics (forecasting, pricing, churn)",
				"No clear evidence of software engineering best practices in Python (version control, tests, packaging)",
			],
			recommendation: "Consider",
			explanation:
				"Karen's Lead-level data and ML/AI background makes her a strong general data science/AI practitioner, with good experience in Snowflake, Tableau, and PyTorch. Relative to the job, her biggest weaknesses are the lack of explicitly documented Python and the absence of retail domain work. Her strength in leading and delivering complex data/AI solutions earns her a slightly lower but still competitive score versus Patricia. She is viable if the client can flex on Python being explicitly documented and on prior retail domain experience, but overall fit to the stated role is partial.",
		},
		{
			rank: 3,
			candidate_name: "Charles Benson (PS-004)",
			match_score: 42,
			skills_match: {
				matched: [
					"SQL",
					"Tableau",
					"PyTorch",
					"5+ years data/analytics experience (13 years, Director)",
					"Leadership and cross-functional engagement",
				],
				missing: [
					"Python",
					"pandas",
					"NumPy",
					"SciPy",
					"scikit-learn",
					"statsmodels",
					"matplotlib/seaborn",
					"Retail / e-commerce domain",
					"Retail analytics metrics and KPIs",
					"Hands-on data engineering in Python / modeling in Python",
				],
			},
			experience_match:
				"Data | Director with 13 years' experience, indicating strong leadership across data initiatives. Core skills emphasize Tableau, PyTorch, SQL, and likely strategic/architectural responsibilities. However, profile doesn't show Python or hands-on retail analytics. As a Director, he may be more removed from day-to-day coding than the role expects.",
			strengths: [
				"Very senior leadership profile - can drive strategy, stakeholder alignment, and cross-functional collaboration",
				"Experience with SQL and Tableau for data analysis and visualization",
				"PyTorch exposure suggests some ML familiarity",
			],
			gaps: [
				"No explicit Python experience despite PyTorch; missing core Python DS ecosystem",
				"No documented retail, e-commerce, or consumer domain experience",
				"Likely limited recent hands-on coding due to Director responsibilities; role appears to require active individual-contributor modeling",
				"No explicit mention of building specific retail-oriented models (demand, pricing, churn, CLV, recommendation)",
			],
			recommendation: "Consider",
			explanation:
				"Charles brings Director-level data leadership and relevant tools (SQL, Tableau, PyTorch), but likely operates at a more strategic level than this role, which expects strong individual-contributor Python modeling skills and detailed retail problem-solving. The lack of explicit Python and retail domain content is a major mismatch. He's ranked below Patricia and Karen due to the higher risk that he is not in a hands-on DS posture and would not meet the Python-IC expectations, though he could be valuable if the ask shifts toward leading a broader data program.",
		},
		{
			rank: 4,
			candidate_name: "Alicia Miller (PS-016)",
			match_score: 40,
			skills_match: {
				matched: [
					"SQL",
					"Databricks",
					"RAG / LLMs",
					"5+ years data/analytics experience (14 years)",
					"Experience with modern data platforms and AI",
				],
				missing: [
					"Python",
					"pandas",
					"NumPy",
					"SciPy",
					"scikit-learn",
					"statsmodels",
					"matplotlib/seaborn",
					"Retail / e-commerce domain",
					"Retail metrics and use cases",
					"Classical predictive modeling focus (forecasting, pricing, churn, inventory)",
				],
			},
			experience_match:
				"Data | Associate with 14 years total experience, suggesting a non-linear path into data (significant prior non-data experience plus more recent data roles). Strong skills in Databricks, SQL, LLMs/RAG. No explicit evidence of Python-based modeling or of retail/consumer-focused analytics.",
			strengths: [
				"Long overall professional experience, including significant data exposure",
				"Strong data platform skills (Databricks, SQL) align with data sourcing and preparation",
				"LLM and RAG skills show readiness for modern AI use cases",
				"Likely comfortable working with large, structured datasets",
			],
			gaps: [
				"No explicit Python or Python DS libraries",
				"No retail / e-commerce / consumer goods domain work documented",
				"Emphasis is more on platforms and LLMs than on traditional supervised modeling for business KPIs",
				"Associate capability level in Data despite long total experience - may not yet operate as a senior DS lead",
			],
			recommendation: "Consider",
			explanation:
				"Alicia's profile is strong in modern data platforms and LLM-oriented work but does not present the explicit Python + retail analytics toolkit requested. Compared to Patricia and Karen, she appears slightly less senior in core DS responsibilities (Associate level, and focus on platforms/LLMs rather than end-to-end business modeling). She is ranked fourth as a possible fit if the client can flex heavily on both Python and retail requirements and is open to a more platform/AI-oriented data practitioner.",
		},
		{
			rank: 5,
			candidate_name: "Kayla Villa DVM (PS-015)",
			match_score: 36,
			skills_match: {
				matched: [
					"Snowflake",
					"Tableau",
					"PyTorch",
					"RAG",
					"5 years data/analytics experience (minimum met)",
				],
				missing: [
					"Python (explicit)",
					"pandas",
					"NumPy",
					"SciPy",
					"scikit-learn",
					"statsmodels",
					"matplotlib/seaborn",
					"Retail / e-commerce domain",
					"Retail KPIs and use cases",
					"Strong evidence of large-scale predictive modeling for commercial use cases",
				],
			},
			experience_match:
				"Data | Associate with 5 years of experience, exactly meeting the minimum. Technical stack is focused on modern AI/data tools (RAG, PyTorch, Snowflake, Tableau). No explicit mention of Python, classical predictive modeling, or retail domain work. Seniority and breadth are lower than Patricia/Karen/Charles/Alicia.",
			strengths: [
				"Meets minimum years of experience requirement in data",
				"Hands-on with modern AI tooling (RAG, PyTorch)",
				"Exposure to Snowflake and Tableau indicates comfort with modern warehousing and BI",
			],
			gaps: [
				"No explicit Python or DS library skills",
				"No retail or consumer analytics background described",
				"Limited evidence of independently owning end-to-end DS projects at commercial scale",
				"Less experienced than senior/lead/director peers in this list",
			],
			recommendation: "Consider",
			explanation:
				"Kayla is early-career relative to the other data candidates and lacks explicit Python and domain depth. Her profile is promising from a modern AI tooling perspective but does not yet map closely to the specific Python + retail analytics requirements. She is ranked below the more experienced data candidates; she could be a stretch option for a junior/associate DS role on the account, but not ideal for the described position.",
		},
		{
			rank: 6,
			candidate_name: "Eric Alexander (PS-008)",
			match_score: 30,
			skills_match: {
				matched: [
					"Python (core skill)",
					"General software engineering (Node.js, Go, AWS)",
					"Experience with automation and scripting",
					"Exposure to Generative AI (internal certification)",
				],
				missing: [
					"pandas",
					"NumPy",
					"SciPy",
					"scikit-learn",
					"statsmodels",
					"matplotlib/seaborn",
					"SQL / data warehousing for analytics",
					"Data cleaning / feature engineering in analytics context",
					"Predictive/prescriptive modeling experience",
					"Retail / e-commerce / consumer goods analytics",
					"Applied statistics / classical ML for business problems",
				],
			},
			experience_match:
				"Engineering Director with prior 9-year career as a herpetologist; currently more aligned to software/engineering leadership than data science. Has Python as a core technical skill but no evidence of using it for data science modeling or retail analytics. No explicit DS/analytics discipline or applied modeling track record.",
			strengths: [
				"Explicit Python skill - the only candidate listing Python as a core technical skill",
				"Strong general engineering background (Node.js, Go, AWS) and leadership as an Engineering Director",
				"Experience with scripting/automation and likely good software engineering practices (version control, testing)",
				"Internal certification in Generative AI",
			],
			gaps: [
				"No evidence of using Python for data science (pandas, scikit-learn, etc. absent)",
				"No documented predictive modeling or analytics work",
				"No retail or consumer analytics projects",
				"Role profile is engineering management, not DS/analytics; may not meet expectations for statistical and modeling expertise",
				"Unclear experience with SQL/data warehouses in an analytics context",
			],
			recommendation: "Not recommended",
			explanation:
				"Eric is the only candidate who clearly lists Python, but his profile is that of an engineering leader rather than an applied data scientist. He lacks documented experience with the Python DS ecosystem, predictive modeling, and retail or commercial analytics. For this role, the Python requirement is specifically for DS/analytics work with libraries like pandas and scikit-learn, not just for backend engineering. As a result, his overall fit is weaker than the senior data candidates who, while missing Python, have deep analytics experience. He is therefore not recommended for this specific role.",
		},
	],
	search_summary:
		"Started from the provided skills and experience search results. Focused primarily on candidates with a Data capability and 5+ years in analytics/data (Patricia Leblanc, Karen Garcia, Kayla Villa DVM, Charles Benson, Alicia Miller) plus Eric Alexander as the only profile explicitly listing Python. No profiles showed explicit retail, e-commerce, or consumer goods experience; marketing-style taglines mentioning e-commerce/e-tailers were disregarded as they are tied to internal certifications. Tooling matches favored SQL, Databricks, Snowflake, Tableau, PyTorch, RAG, and LLMs rather than the Python DS stack. Rankings prioritize: (1) overall data/analytics seniority and end-to-end delivery capability, (2) proximity to Python/ML tooling, and (3) any indication of domain-relevant analytics, while clearly noting that all candidates fall short of the ideal Python + retail DS profile.",
};
