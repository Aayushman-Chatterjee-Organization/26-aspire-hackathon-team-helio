"""
Bodhi Search Tool for PydanticAI
Async tool to search for candidates in AskBodhi database.
"""

import os
import asyncio
import aiohttp
from pydantic_ai import RunContext

from app.models import SmatchDeps, SearchFacets
from app.logging_utils import log, log_search_results, log_combined_results


async def bodhi_search(ctx: RunContext[SmatchDeps], search_query: str) -> str:
    """
    Search for candidate resumes and profiles in the AskBodhi database.

    Use this tool to find candidates matching specific skills, experience,
    or qualifications. Provide a clear search query describing what you're
    looking for (e.g., 'Python developer with 5 years experience in ML').

    Args:
        ctx: Run context containing dependencies (collection_name)
        search_query: The search query to find matching candidates

    Returns:
        String containing candidate profiles matching the search
    """
    collection_name = ctx.deps.collection_name

    try:
        params = {
            "database": "pgvector",
            "execution_mode": "sync",
            "collections": collection_name,
        }
        payload = {
            "query": search_query,
            "search_type": "hybrid",
            "pgvector_search_config": {
                "num_results": 20,
                "output_fields": ["chunk"],
                "target_vector_fields": [
                    "chunk",
                    "page_number",
                    "image",
                ],
            },
            "generative_config": {
                "model_provider": os.getenv("MODEL_PROVIDER", "openai"),
                "model_name": os.getenv("MODEL_NAME", "gpt-5.1"),
            },
        }

        headers = {
            "Authorization": os.getenv("BODHI_API_KEY"),
            "Content-Type": "application/json",
        }
        url = os.getenv("ASK_BODHI_API_URL")
        search_url = f"{url}/api/v2/collections/{collection_name}/search"

        timeout = aiohttp.ClientTimeout(total=60, connect=10)

        async with aiohttp.ClientSession(timeout=timeout) as session:
            async with session.post(
                search_url,
                headers=headers,
                params=params,
                json=payload,
            ) as response:
                if response.status != 200:
                    text = await response.text()
                    return f"Search failed with status {response.status}: {text}"

                data = await response.json()
                return _format_results(data)

    except Exception as e:
        return f"Error searching candidates: {str(e)}"


def _format_results(data: dict) -> str:
    """Format the search results for agent consumption."""
    if not data:
        return "No candidates found matching the search criteria."

    # AskBodhi returns data["results"]["output"] as the text response
    try:
        if isinstance(data, dict) and "results" in data:
            output = data["results"].get("output", "")
            if output:
                return output
        return str(data)
    except Exception:
        return str(data)


# ============================================================================
# Parallel Faceted Search
# ============================================================================


async def _raw_search(collection_name: str, query: str) -> str:
    """Execute a single search query and return raw results."""
    try:
        params = {
            "database": "pgvector",
            "execution_mode": "sync",
            "collections": collection_name,
        }
        payload = {
            "query": query,
            "search_type": "hybrid",
            "pgvector_search_config": {
                "num_results": 15,
                "output_fields": ["chunk"],
                "target_vector_fields": ["chunk", "page_number", "image"],
            },
            "generative_config": {
                "model_provider": os.getenv("MODEL_PROVIDER", "openai"),
                "model_name": os.getenv("MODEL_NAME", "gpt-5.1"),
            },
        }

        headers = {
            "Authorization": os.getenv("BODHI_API_KEY"),
            "Content-Type": "application/json",
        }
        url = os.getenv("ASK_BODHI_API_URL")
        search_url = f"{url}/api/v2/collections/{collection_name}/search"

        timeout = aiohttp.ClientTimeout(total=60, connect=10)

        async with aiohttp.ClientSession(timeout=timeout) as session:
            async with session.post(
                search_url,
                headers=headers,
                params=params,
                json=payload,
            ) as response:
                if response.status != 200:
                    return ""
                data = await response.json()
                return _format_results(data)

    except Exception:
        return ""


async def _search_facet(
    collection_name: str, terms: list[str], facet_name: str
) -> tuple[str, str]:
    """Search for all terms in a facet and return combined results."""
    if not terms:
        return facet_name, ""

    # Join terms into a single query for efficiency
    query = " OR ".join(terms[:5])  # Limit to 5 terms to avoid too long queries
    result = await _raw_search(collection_name, query)

    return facet_name, result


async def parallel_faceted_search(collection_name: str, facets: SearchFacets) -> str:
    """
    Execute parallel searches across all facets and combine results.

    Args:
        collection_name: The collection to search
        facets: Extracted search facets from keyword_extractor

    Returns:
        Combined search results string with facet annotations
    """
    log("SEARCH", f"Starting parallel search across 4 facets...")

    # Run all facet searches in parallel
    tasks = [
        _search_facet(collection_name, facets.skills, "SKILLS"),
        _search_facet(collection_name, facets.experience_terms, "EXPERIENCE"),
        _search_facet(collection_name, facets.domain_keywords, "DOMAIN"),
        _search_facet(collection_name, facets.education_terms, "EDUCATION"),
    ]

    results = await asyncio.gather(*tasks)

    # Combine results with facet labels
    combined_parts = []
    total_hits = 0

    for facet_name, result in results:
        if result and result.strip():
            # Count approximate candidates (rough estimate based on content length)
            approx_count = max(1, len(result) // 500)
            total_hits += approx_count
            log_search_results(facet_name, approx_count)
            combined_parts.append(f"=== {facet_name} SEARCH RESULTS ===\n{result}\n")
        else:
            log_search_results(facet_name, 0)

    if not combined_parts:
        log("SEARCH", "No candidates found across any facet")
        return "No candidates found matching the search criteria."

    log_combined_results(total_hits, len(combined_parts))

    return "\n".join(combined_parts)
