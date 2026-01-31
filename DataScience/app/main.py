#!/usr/bin/env python
"""
Smatch FastAPI Server - Candidate Matching API (PydanticAI Implementation)
"""

import os
import sys
from pathlib import Path
from typing import Optional

# Add parent to path for imports
sys.path.insert(0, str(Path(__file__).parent.parent))

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

# Load environment variables before importing agents
load_dotenv(override=True)

from app.models import RankedCandidatesOutput
from app.orchestrator import run_matching_workflow

app = FastAPI(
    title="Smatch API",
    description="AI-Powered Candidate Matching using PydanticAI and AskBodhi",
    version="0.2.0",
)


class MatchRequest(BaseModel):
    """Request body for candidate matching."""

    job_description: str
    collection_name: Optional[str] = os.getenv("DEFAULT_COLLECTION_NAME")


class MatchResponse(BaseModel):
    """Response from candidate matching."""

    status: str
    job_description: str
    result: RankedCandidatesOutput


@app.get("/")
async def root():
    """Health check endpoint."""
    return {"status": "ok", "service": "smatch", "framework": "pydantic-ai"}


@app.post("/match", response_model=MatchResponse)
async def match_candidates(request: MatchRequest):
    """
    Match candidates to a job description.

    Args:
        request: MatchRequest with job_description and optional collection_name

    Returns:
        MatchResponse with ranked candidates
    """
    try:
        collection = request.collection_name or os.getenv(
            "DEFAULT_COLLECTION_NAME", "helio"
        )

        result = await run_matching_workflow(
            job_description=request.job_description,
            collection_name=collection,
        )

        return MatchResponse(
            status="success",
            job_description=request.job_description,
            result=result,
        )
    except Exception as e:
        print(f"[MAIN] ERROR: {str(e)}")
        import traceback

        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))


# ============================================================================
# Job Description Generator Endpoint
# ============================================================================

from app.models import JobDescriptionRequest
from app.agents import job_description_generator


class GenerateJDResponse(BaseModel):
    """Response from job description generation."""

    job_description: str


@app.post("/generate-jd", response_model=GenerateJDResponse)
async def generate_job_description(request: JobDescriptionRequest):
    """
    Generate a job description based on input parameters.

    Args:
        request: JobDescriptionRequest with required_skills, min_experience, etc.

    Returns:
        GenerateJDResponse with generated job description text
    """
    try:
        prompt = f"""Generate a job description for a role with:
- Required Skills: {", ".join(request.required_skills)}
- Minimum Experience: {request.min_experience} years
- Notice Period: {request.notice_period or "Flexible"}
- Craft/Discipline: {request.craft or "Technology"}
- Industry: {request.industry or "General"}"""

        result = await job_description_generator.run(prompt)

        return GenerateJDResponse(job_description=result.output.job_description)
    except Exception as e:
        print(f"[MAIN] ERROR: {str(e)}")
        import traceback

        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))


def main():
    """Run the FastAPI server."""
    import uvicorn

    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
    )


if __name__ == "__main__":
    main()
