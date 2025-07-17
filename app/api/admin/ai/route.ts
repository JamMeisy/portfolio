import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { ResumeAIAgent } from '@/lib/ai/resume-agent';
import { z } from 'zod';

// Validation schemas
const GenerateResumeSchema = z.object({
  jobDescription: z.string().min(10, 'Job description must be at least 10 characters'),
  targetCompany: z.string().optional(),
  targetRole: z.string().optional(),
  additionalNotes: z.string().optional()
});

const FeedbackSchema = z.object({
  patternId: z.string(),
  successRating: z.number().min(1).max(10),
  userFeedback: z.string(),
  wasHired: z.boolean().optional(),
  interviewsReceived: z.number().optional()
});

// POST /api/admin/ai/generate-resume - Generate AI-tailored resume
export async function POST(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient();

    // Check authentication
    const { data: { session }, error: authError } = await supabase.auth.getSession();
    if (authError || !session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse and validate request body
    const body = await request.json();
    const { jobDescription, targetCompany, targetRole, additionalNotes } = GenerateResumeSchema.parse(body);

    // Get user's experiences from database
    const { data: experiences, error: expError } = await supabase
      .from('life_experiences')
      .select('*')
      .in('visibility', ['public', 'resume_only'])
      .order('resume_priority', { ascending: false });

    if (expError) {
      console.error('Database error:', expError);
      return NextResponse.json({ error: 'Failed to fetch experiences' }, { status: 500 });
    }

    // Get successful patterns for learning
    const { data: patterns } = await supabase
      .from('ai_patterns')
      .select('*')
      .gte('success_rating', 7)
      .order('created_at', { ascending: false })
      .limit(5);

    // Initialize AI agent and generate resume
    const aiAgent = new ResumeAIAgent();

    const tailoredContent = await aiAgent.generateTailoredResume({
      jobDescription,
      targetCompany: targetCompany || '',
      targetRole: targetRole || '',
      experiences: experiences || [],
      successfulPatterns: patterns || []
    });

    // Save the generation to database for tracking
    const { data: savedPattern, error: saveError } = await supabase
      .from('ai_patterns')
      .insert([{
        job_analysis: tailoredContent,
        tailored_content: tailoredContent,
        target_company: targetCompany,
        target_role: targetRole
      }])
      .select()
      .single();

    if (saveError) {
      console.error('Failed to save pattern:', saveError);
      // Don't fail the request if we can't save the pattern
    }

    return NextResponse.json({
      success: true,
      tailoredContent,
      patternId: savedPattern?.id
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        error: 'Validation failed',
        details: error.errors
      }, { status: 400 });
    }

    console.error('AI generation error:', error);
    return NextResponse.json({
      error: 'Failed to generate resume',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// GET /api/admin/ai/patterns - Get AI patterns for analysis
export async function GET(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient();

    // Check authentication
    const { data: { session }, error: authError } = await supabase.auth.getSession();
    if (authError || !session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const company = searchParams.get('company');
    const role = searchParams.get('role');
    const limit = parseInt(searchParams.get('limit') || '20');

    // Build query
    let query = supabase
      .from('ai_patterns')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    // Apply filters
    if (company) {
      query = query.ilike('target_company', `%${company}%`);
    }
    if (role) {
      query = query.ilike('target_role', `%${role}%`);
    }

    const { data: patterns, error } = await query;

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: 'Failed to fetch patterns' }, { status: 500 });
    }

    return NextResponse.json({ patterns });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT /api/admin/ai/feedback - Provide feedback on AI generation
export async function PUT(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient();

    // Check authentication
    const { data: { session }, error: authError } = await supabase.auth.getSession();
    if (authError || !session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse and validate request body
    const body = await request.json();
    const { patternId, successRating, userFeedback, wasHired, interviewsReceived } = FeedbackSchema.parse(body);

    // Update pattern with feedback
    const { data: updatedPattern, error } = await supabase
      .from('ai_patterns')
      .update({
        success_rating: successRating,
        user_feedback: userFeedback,
        // Store additional feedback in metadata
        metadata: {
          wasHired,
          interviewsReceived,
          feedbackDate: new Date().toISOString()
        }
      })
      .eq('id', patternId)
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: 'Failed to save feedback' }, { status: 500 });
    }

    if (!updatedPattern) {
      return NextResponse.json({ error: 'Pattern not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Feedback saved successfully'
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        error: 'Validation failed',
        details: error.errors
      }, { status: 400 });
    }

    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
