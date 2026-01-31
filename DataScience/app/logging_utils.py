"""
Smatch Logging Utility - Key metrics tracking
"""


def log(tag: str, message: str):
    """Print a formatted log message."""
    print(f"[{tag}] {message}")


def log_search_facets(facets):
    """Log extracted search facets."""
    log(
        "EXTRACT",
        f"Skills: {len(facets.skills)} | Experience: {len(facets.experience_terms)} | Domain: {len(facets.domain_keywords)} | Education: {len(facets.education_terms)}",
    )


def log_search_results(facet_name: str, count: int):
    """Log results from a single facet search."""
    log("SEARCH", f"{facet_name}: {count} candidates")


def log_combined_results(total: int, unique: int):
    """Log combined/deduped results."""
    log("COMBINE", f"Total hits: {total} | Unique candidates: {unique}")


def log_final_ranking(count: int):
    """Log final ranking output."""
    log("RANK", f"Final ranked: {count} candidates")
