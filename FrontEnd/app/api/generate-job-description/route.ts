import { NextRequest, NextResponse } from 'next/server';

interface GenerateJDInput {
  required_skills: string[];
  min_experience: number;
  notice_period: string;
  craft: string;
  industry?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: GenerateJDInput = await request.json();
    const { required_skills, min_experience, notice_period, craft } = body;

    if (!required_skills || !min_experience || !notice_period || !craft) {
      return NextResponse.json(
        { error: 'Missing required parameters: required_skills, min_experience, notice_period, or craft' },
        { status: 400 }
      );
    }
    const responseData = {
      job_description: "Lorem Ipsum"
    };

    return NextResponse.json(responseData, { status: 200 });

  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid Request Body' },
      { status: 500 }
    );
  }
}