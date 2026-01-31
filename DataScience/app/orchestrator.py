"""
Smatch Orchestrator - Enhanced Workflow for Candidate Matching
Flow: keyword_extractor -> parallel_faceted_search -> ranking_specialist
"""

import os

from dotenv import load_dotenv

# Load environment variables before importing agents
load_dotenv(override=True)
from app.models import SmatchDeps, RankedCandidatesOutput
from app.agents import keyword_extractor, ranking_specialist
from app.tools.bodhi_search import parallel_faceted_search
from app.logging_utils import log, log_search_facets, log_final_ranking


async def run_matching_workflow(
    job_description: str, collection_name: str
) -> RankedCandidatesOutput:
    """
    Run the enhanced candidate matching workflow.

    This orchestrates:
    1. Keyword Extractor - extracts searchable facets from job description
    2. Parallel Faceted Search - runs concurrent searches (skills, experience, domain, education)
    3. Ranking Specialist - ranks and scores candidates, outputs JSON

    Args:
        job_description: The job description to match candidates against
        collection_name: The AskBodhi collection to search in

    Returns:
        RankedCandidatesOutput with ranked candidates
    """
    deps = SmatchDeps(
        collection_name=collection_name,
        job_description=job_description,
    )
    extra_headers = {"Authorization": f"Bearer {os.getenv('BODHI_API_KEY')}"}

    # Step 1: Extract search keywords
    log("WORKFLOW", "Step 1: Extracting search keywords...")

    extract_result = await keyword_extractor.run(
        f"Extract search keywords from this job description:\n\n{job_description}",
        model_settings={"extra_headers": extra_headers},
    )
    facets = extract_result.output
    log_search_facets(facets)

    # Step 2: Parallel faceted search
    log("WORKFLOW", "Step 2: Running parallel faceted search...")

    search_output = await parallel_faceted_search(collection_name, facets)

    # Step 3: Rank candidates
    log("WORKFLOW", "Step 3: Ranking candidates...")

    ranking_prompt = f"""Evaluate and rank the following candidates against the job requirements.

Job Description:
{job_description}

Search Keywords Used:
- Skills: {", ".join(facets.skills)}
- Experience: {", ".join(facets.experience_terms)}
- Domain: {", ".join(facets.domain_keywords)}

Candidates Found:
{search_output}

Provide detailed scoring and ranking for each candidate."""

    ranking_result = await ranking_specialist.run(
        ranking_prompt,
        deps=deps,
        model_settings={"extra_headers": extra_headers},
    )

    log_final_ranking(ranking_result.output.total_candidates_found)
    log("WORKFLOW", "Complete!")

    return ranking_result.output
