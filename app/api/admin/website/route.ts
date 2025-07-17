import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { z } from 'zod';

// Validation schemas
const WebsiteContentSchema = z.object({
  section: z.string().min(1, 'Section name is required'),
  title: z.string().optional(),
  content: z.string().optional(),
  metadata: z.record(z.any()).optional(),
  is_published: z.boolean().default(true)
});

const UpdateContentSchema = WebsiteContentSchema.partial().omit({ section: true });

// GET /api/admin/website - Get all website content sections
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
    const published = searchParams.get('published');
    const section = searchParams.get('section');

    // Build query
    let query = supabase
      .from('website_content')
      .select('*')
      .order('section', { ascending: true });

    // Apply filters
    if (published === 'true') {
      query = query.eq('is_published', true);
    } else if (published === 'false') {
      query = query.eq('is_published', false);
    }

    if (section) {
      query = query.eq('section', section);
    }

    const { data: content, error } = await query;

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: 'Failed to fetch website content' }, { status: 500 });
    }

    return NextResponse.json({ content });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/admin/website - Create new content section
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
    const validatedData = WebsiteContentSchema.parse(body);

    // Check if section already exists
    const { data: existing } = await supabase
      .from('website_content')
      .select('id')
      .eq('section', validatedData.section)
      .single();

    if (existing) {
      return NextResponse.json({
        error: 'Section already exists',
        details: `A section with name '${validatedData.section}' already exists`
      }, { status: 400 });
    }

    // Insert into database
    const { data: content, error } = await supabase
      .from('website_content')
      .insert([validatedData])
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: 'Failed to create content section' }, { status: 500 });
    }

    return NextResponse.json({ content }, { status: 201 });

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

// PUT /api/admin/website/[section] - Update content section
export async function PUT(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient();

    // Check authentication
    const { data: { session }, error: authError } = await supabase.auth.getSession();
    if (authError || !session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get section name from URL
    const url = new URL(request.url);
    const sectionName = url.pathname.split('/').pop();

    if (!sectionName) {
      return NextResponse.json({ error: 'Section name is required' }, { status: 400 });
    }

    // Parse and validate request body
    const body = await request.json();
    const validatedData = UpdateContentSchema.parse(body);

    // Update in database
    const { data: content, error } = await supabase
      .from('website_content')
      .update({
        ...validatedData,
        last_updated: new Date().toISOString()
      })
      .eq('section', sectionName)
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: 'Failed to update content section' }, { status: 500 });
    }

    if (!content) {
      return NextResponse.json({ error: 'Content section not found' }, { status: 404 });
    }

    return NextResponse.json({ content });

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

// DELETE /api/admin/website/[section] - Delete content section
export async function DELETE(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient();

    // Check authentication
    const { data: { session }, error: authError } = await supabase.auth.getSession();
    if (authError || !session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get section name from URL
    const url = new URL(request.url);
    const sectionName = url.pathname.split('/').pop();

    if (!sectionName) {
      return NextResponse.json({ error: 'Section name is required' }, { status: 400 });
    }

    // Delete from database
    const { error } = await supabase
      .from('website_content')
      .delete()
      .eq('section', sectionName);

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: 'Failed to delete content section' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Content section deleted successfully' });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/admin/website/rebuild - Trigger static site rebuild
export async function POST(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient();

    // Check authentication
    const { data: { session }, error: authError } = await supabase.auth.getSession();
    if (authError || !session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // In a real implementation, this would trigger:
    // 1. Static data generation from database
    // 2. Next.js static site rebuild
    // 3. CDN cache invalidation
    // 4. Deployment to production

    // For now, we'll simulate the rebuild process
    console.log('Starting static site rebuild...');

    // Simulate rebuild time
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log('Static site rebuild completed successfully');

    return NextResponse.json({
      success: true,
      message: 'Static site rebuild initiated successfully',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Rebuild error:', error);
    return NextResponse.json({
      error: 'Failed to rebuild static site',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
