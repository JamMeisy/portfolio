import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

// GET - Fetch all content entities
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { searchParams } = new URL(request.url)
    
    // Get query parameters
    const entityType = searchParams.get('type')
    const featured = searchParams.get('featured')
    const visible = searchParams.get('visible')
    const limit = searchParams.get('limit')

    // Build query
    let query = supabase
      .from('content_entities')
      .select('*')
      .order('display_order', { ascending: true })

    // Apply filters
    if (entityType) {
      query = query.eq('entity_type', entityType)
    }
    
    if (featured === 'true') {
      query = query.eq('is_featured', true)
    }
    
    if (visible !== 'false') {
      query = query.eq('is_visible', true)
    }

    if (limit && !isNaN(parseInt(limit))) {
      query = query.limit(parseInt(limit))
    }

    const { data, error } = await query

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch content entities', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      data: data || [],
      count: data?.length || 0,
      success: true
    })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

// POST - Create new content entity
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const body = await request.json()

    // Validate required fields
    const { entity_type, title } = body
    if (!entity_type || !title) {
      return NextResponse.json(
        { error: 'entity_type and title are required' },
        { status: 400 }
      )
    }

    // Validate entity_type
    const validTypes = ['work', 'project', 'education', 'certification', 'volunteer', 'publication', 'award', 'course', 'organization', 'skill']
    if (!validTypes.includes(entity_type)) {
      return NextResponse.json(
        { error: `Invalid entity_type. Must be one of: ${validTypes.join(', ')}` },
        { status: 400 }
      )
    }

    // Get next display order for this entity type
    const { data: maxOrderData } = await supabase
      .from('content_entities')
      .select('display_order')
      .eq('entity_type', entity_type)
      .order('display_order', { ascending: false })
      .limit(1)

    const nextOrder = (maxOrderData?.[0]?.display_order || 0) + 1

    // Prepare data for insertion
    const entityData = {
      entity_type,
      title,
      subtitle: body.subtitle || null,
      description: body.description || null,
      date_start: body.date_start || null,
      date_end: body.date_end || null,
      is_current: body.is_current || false,
      is_featured: body.is_featured || false,
      is_visible: body.is_visible !== false, // default to true
      display_order: body.display_order || nextOrder,
      metadata: body.metadata || {},
    }

    const { data, error } = await supabase
      .from('content_entities')
      .insert(entityData)
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to create content entity', details: error.message },
        { status: 500 }
      )
    }

    // Trigger static regeneration
    revalidatePath('/')

    return NextResponse.json({ 
      data,
      success: true,
      message: 'Content entity created successfully'
    }, { status: 201 })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

// PUT - Update content entity
export async function PUT(request: NextRequest) {
  try {
    const supabase = await createClient()
    const body = await request.json()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'ID parameter is required' },
        { status: 400 }
      )
    }

    // Remove id from body to prevent updating it
    const { id: _, ...updateData } = body

    // Ensure updated_at is set
    updateData.updated_at = new Date().toISOString()

    const { data, error } = await supabase
      .from('content_entities')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to update content entity', details: error.message },
        { status: 500 }
      )
    }

    if (!data) {
      return NextResponse.json(
        { error: 'Content entity not found' },
        { status: 404 }
      )
    }

    // Trigger static regeneration
    revalidatePath('/')

    return NextResponse.json({ 
      data,
      success: true,
      message: 'Content entity updated successfully'
    })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

// DELETE - Delete content entity
export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'ID parameter is required' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('content_entities')
      .delete()
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to delete content entity', details: error.message },
        { status: 500 }
      )
    }

    if (!data) {
      return NextResponse.json(
        { error: 'Content entity not found' },
        { status: 404 }
      )
    }

    // Trigger static regeneration
    revalidatePath('/')

    return NextResponse.json({ 
      data,
      success: true,
      message: 'Content entity deleted successfully'
    })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}