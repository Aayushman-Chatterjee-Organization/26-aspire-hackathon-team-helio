import { NextRequest, NextResponse } from 'next/server';

interface RecommendInput {
  job_summary: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: RecommendInput = await request.json();

    if (!body.job_summary) {
      return NextResponse.json(
        { error: 'Missing required parameter: job_summary' },
        { status: 400 }
      );
    }

    const responseData = {
      status: "success",
      job_description: "Role: Data Science Professional - Retail Industry\n\nMinimum Experience:\n- At least 5 years...",
      result: {
        job_summary: "Data Science Professional for Retail industry, requiring 5+ years in data/analytics...",
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
                "Cross-functional collaboration"
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
                "Predictive retail use cases (demand forecasting, recommendation, pricing, inventory, churn)"
              ]
            },
            experience_match: "Senior data professional (14 years, Data | Senior). Strong background in analytics...",
            strengths: [
              "Very strong overall data/analytics experience (14 years)",
              "Senior data capability level - can likely lead projects and mentor others",
              "Solid SQL and Databricks experience, good fit for data sourcing and transformation from warehouses",
              "Tableau experience for insight communication and visualization",
              "LLM exposure suggests comfort with advanced analytics / modern AI stack",
              "Short bench time - immediately available"
            ],
            gaps: [
              "No documented Python experience or Python DS libraries",
              "No explicit retail, e-commerce, or consumer goods domain work",
              "No explicit mention of predictive/prescriptive modeling use cases relevant to retail",
              "No explicit mention of software engineering best practices in code"
            ],
            recommendation: "Consider",
            explanation: "Patricia has the strongest overall data experience among the data-capability candidates..."
          }
        ],
        search_summary: "Started from the provided skills and experience search results. Focused primarily on candidates..."
      }
    };
    return NextResponse.json(responseData, { status: 200 });

  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid Request Body' },
      { status: 500 }
    );
  }
}