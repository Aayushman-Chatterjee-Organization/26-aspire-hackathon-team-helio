"""
Pydantic Models for Smatch Application
"""

from dataclasses import dataclass
from typing import Optional, List
from pydantic import BaseModel, Field


@dataclass
class SmatchDeps:
    """Dependencies passed to agents via RunContext."""

    collection_name: str
    job_description: str


class SkillsMatch(BaseModel):
    """Skills matching breakdown."""

    matched: List[str] = Field(
        default_factory=list, description="Skills that match the requirements"
    )
    missing: List[str] = Field(
        default_factory=list, description="Required skills not found in candidate"
    )


class RankedCandidate(BaseModel):
    """A single ranked candidate."""

    rank: int = Field(description="Ranking position (1 = best)")
    candidate_name: str = Field(description="Name or identifier of the candidate")
    match_score: int = Field(ge=0, le=100, description="Overall match score 0-100")
    skills_match: SkillsMatch = Field(description="Skills matching breakdown")
    experience_match: str = Field(description="Experience match assessment")
    strengths: List[str] = Field(
        default_factory=list, description="Candidate strengths"
    )
    gaps: List[str] = Field(
        default_factory=list, description="Candidate gaps or weaknesses"
    )
    recommendation: str = Field(
        description="Highly recommended / Recommended / Consider / Not recommended"
    )
    explanation: str = Field(description="Detailed reasoning for this ranking")


class RankedCandidatesOutput(BaseModel):
    """Final output from the ranking agent - JSON format for UI integration."""

    job_summary: str = Field(description="Brief description of the role")
    total_candidates_found: int = Field(description="Total number of candidates found")
    ranked_candidates: List[RankedCandidate] = Field(
        default_factory=list, description="List of ranked candidates"
    )
    search_summary: str = Field(description="How the search was conducted")


class RequirementsAnalysis(BaseModel):
    """Output from requirements analysis."""

    must_have_skills: List[str] = Field(
        default_factory=list, description="Required skills"
    )
    preferred_skills: List[str] = Field(
        default_factory=list, description="Nice-to-have skills"
    )
    experience_years: Optional[int] = Field(
        None, description="Years of experience required"
    )
    experience_type: Optional[str] = Field(
        None, description="Type of experience required"
    )
    education_requirements: Optional[str] = Field(
        None, description="Educational qualifications"
    )
    key_qualifications_summary: str = Field(description="Summary of key qualifications")


# ============================================================================
# Job Description Generator Models
# ============================================================================


class JobDescriptionRequest(BaseModel):
    """Input for generating a job description."""

    required_skills: List[str] = Field(description="List of required skills")
    min_experience: int = Field(
        ge=0, description="Minimum years of experience required"
    )
    notice_period: Optional[str] = Field(
        None, description="Expected notice period, e.g., '2 weeks'"
    )
    craft: Optional[str] = Field(None, description="Craft or discipline, e.g., 'XT|DE'")
    industry: Optional[str] = Field(
        None, description="Target industry, e.g., 'Retail | HealthCare'"
    )


class JobRequirementsSummary(BaseModel):
    """Generated job requirements summary - simple structured output."""

    job_description: str = Field(
        description="The generated job requirements description"
    )


# ============================================================================
# Enhanced Search Models
# ============================================================================


class SearchFacets(BaseModel):
    """Structured keyword extraction for multi-faceted search."""

    skills: List[str] = Field(
        description="Technical skills and technologies to search for"
    )
    experience_terms: List[str] = Field(
        description="Experience-related search queries (e.g., 'senior developer', '5 years backend')"
    )
    domain_keywords: List[str] = Field(
        description="Industry/domain terms (e.g., 'fintech', 'healthcare', 'e-commerce')"
    )
    education_terms: List[str] = Field(
        default_factory=list,
        description="Education-related terms (e.g., 'MS Computer Science', 'PhD')",
    )


class CandidateHit(BaseModel):
    """A candidate found from search with source tracking."""

    name: str = Field(description="Candidate name or identifier")
    content: str = Field(description="Resume/profile content snippet")
    source_facets: List[str] = Field(
        default_factory=list,
        description="Which facets found this candidate (skills, experience, domain, education)",
    )
    facet_boost: int = Field(
        default=0, description="Score boost based on multi-facet matches"
    )
