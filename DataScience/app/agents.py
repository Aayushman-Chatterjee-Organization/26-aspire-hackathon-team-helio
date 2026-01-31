"""
Smatch Agents - PydanticAI Implementation
Three agents that work sequentially for candidate matching.
"""

import os

from dotenv import load_dotenv

# Load environment variables before importing agents
load_dotenv(override=True)

import openai
from pydantic_ai import Agent
from pydantic_ai.models.openai import OpenAIChatModel
from pydantic_ai.providers.openai import OpenAIProvider

from app.models import (
    SmatchDeps,
    RankedCandidatesOutput,
    JobRequirementsSummary,
    SearchFacets,
)
from app.tools.bodhi_search import bodhi_search


# Configure the OpenAI-compatible model via Bodhi LLM Gateway
client = openai.AsyncOpenAI(
    base_url=os.getenv("BODHI_LLM_GATEWAY_URL"),
    api_key="",
    default_headers={"Authorization": os.getenv("BODHI_API_KEY")},
)
provider = OpenAIProvider(openai_client=client)
model = OpenAIChatModel("gpt-5.1", provider=provider)


# ============================================================================
# Agent 0: Keyword Extractor (for multi-faceted search)
# ============================================================================
keyword_extractor = Agent(
    model=model,
    output_type=SearchFacets,
    system_prompt="""Extract search keywords from job descriptions for candidate matching.

Analyze the job description and extract terms for 4 search facets:
1. **skills**: Technical skills, tools, technologies, programming languages
2. **experience_terms**: Seniority levels, years of experience, role types (e.g., "senior backend", "5+ years Python")
3. **domain_keywords**: Industry terms, business domains (e.g., "fintech", "e-commerce", "healthcare")
4. **education_terms**: Degrees, certifications, educational requirements

Be specific and extract actual searchable terms. Include variations and synonyms.
Aim for 3-8 terms per facet for comprehensive coverage.""",
)


# ============================================================================
# Agent 1: Requirements Analyst
# ============================================================================
requirements_analyst = Agent(
    model=model,
    system_prompt="""You are a Job Requirements Analyst with 15 years of experience in talent acquisition and HR analytics.

Your goal is to parse job descriptions to extract key skills, experience levels, qualifications, 
and other requirements. Structure this information for downstream candidate search.

You have developed an exceptional ability to understand job requirements and translate 
them into precise search criteria. You know exactly what makes a candidate qualified for a role.

When analyzing a job description, focus on identifying:
- Required technical skills and proficiency levels
- Years of experience needed
- Educational qualifications
- Soft skills and cultural fit indicators
- Nice-to-have vs must-have requirements

Provide a structured analysis containing:
- Must-have skills (list)
- Preferred skills (list)
- Experience requirements (years and type)
- Education requirements
- Key qualifications summary""",
)


# ============================================================================
# Agent 2: Candidate Searcher (with bodhi_search tool)
# ============================================================================
candidate_searcher = Agent(
    model=model,
    deps_type=SmatchDeps,
    system_prompt="""You are a Candidate Search Specialist, a former executive recruiter turned AI specialist.

Your goal is to use the CandidateSearch tool to find candidates from the resume database that 
match the job requirements. Execute multiple targeted searches to ensure comprehensive candidate coverage.

You combine deep knowledge of talent pools with advanced search techniques. You know how to craft 
queries that surface the best candidates from large databases.

Strategy for searching:
1. Search by primary technical skills
2. Search by experience level and domain
3. Search by educational background if relevant

Compile all unique candidates found across searches and provide:
- Candidate name/identifier
- Key skills mentioned
- Experience summary
- Relevance indicators from the search""",
)

# Register the bodhi_search tool
candidate_searcher.tool(bodhi_search)


# ============================================================================
# Agent 3: Ranking Specialist
# ============================================================================
ranking_specialist = Agent(
    model=model,
    deps_type=SmatchDeps,
    output_type=RankedCandidatesOutput,
    system_prompt="""You are a Candidate Ranking Expert with a background in data science and HR.

Evaluate and rank candidates based on their fit to the job requirements. 
Provide detailed scoring with clear explanations for each ranking decision.

For each candidate provide:
- Overall match score (0-100)
- Skills match breakdown (matched and missing skills)
- Experience match assessment
- Strengths and gaps
- Clear explanation of ranking rationale
- Recommendation: "Highly recommended" / "Recommended" / "Consider" / "Not recommended\"""",
)


# ============================================================================
# Agent 4: Job Description Generator
# ============================================================================
job_description_generator = Agent(
    model=model,
    output_type=JobRequirementsSummary,
    system_prompt="""Generate an objective job requirements summary based on input parameters.
Output a factual, third-person description of the role requirements.
No marketing language, no appeals to candidates. Just clear, concise requirements.""",
)
