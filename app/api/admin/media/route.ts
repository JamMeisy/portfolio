import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// GET - Fetch media files
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const entityType = searchParams.get('entity_type')
    const entityId = searchParams.get('entity_id')
    const mediaType = searchParams.get('media_type')
    const featured = searchParams.get('featured')
    const limit = searchParams.get('limit')

    // Build query
    let query = supabase
      .from('media_files')
      .select('*')
      .order('created_at', { ascending: false })

    // Apply filters
    if (entityType) {
      query = query.eq('entity_type', entityType)
    }
    
    if (entityId) {
      query = query.eq('entity_id', entityId)
    }
    
    if (mediaType) {
      query = query.eq('media_type', mediaType)
    }
    
    if (featured === 'true') {
      query = query.eq('is_featured', true)
    }

    if (limit && !isNaN(parseInt(limit))) {
      query = query.limit(parseInt(limit))
    }

    const { data, error } = await query

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch media files', details: error.message },
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

// POST - Upload media file
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File
    const entityType = formData.get('entity_type') as string
    const entityId = formData.get('entity_id') as string
    const mediaType = formData.get('media_type') as string
    const description = formData.get('description') as string
    const altText = formData.get('alt_text') as string
    const isCoverImage = formData.get('is_cover_image') === 'true'
    const isFeatured = formData.get('is_featured') === 'true'

    // Validate required fields
    if (!file || !entityType || !entityId) {
      return NextResponse.json(
        { error: 'file, entity_type, and entity_id are required' },
        { status: 400 }
      )
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File size must be less than 10MB' },
        { status: 400 }
      )
    }

    // Validate file type
    const allowedTypes = [
      'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp',
      'application/pdf', 'application/msword', 
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ]
    
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Allowed types: images, PDF, Word documents' },
        { status: 400 }
      )
    }

    // Generate unique filename
    const timestamp = Date.now()
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
    const fileName = `${timestamp}_${sanitizedName}`
    const filePath = `${entityType}/${entityId}/${fileName}`

    // Upload file to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('media')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (uploadError) {
      console.error('Storage upload error:', uploadError)
      return NextResponse.json(
        { error: 'Failed to upload file', details: uploadError.message },
        { status: 500 }
      )
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('media')
      .getPublicUrl(filePath)

    // Save file metadata to database
    const mediaData = {
      entity_type: entityType,
      entity_id: entityId,
      file_path: filePath,
      file_name: file.name,
      file_size: file.size,
      mime_type: file.type,
      media_type: mediaType || getMediaTypeFromMime(file.type),
      description: description || null,
      alt_text: altText || null,
      is_cover_image: isCoverImage,
      is_featured: isFeatured,
      metadata: {
        public_url: publicUrl,
        uploaded_by: user.id,
        original_name: file.name
      }
    }

    const { data, error } = await supabase
      .from('media_files')
      .insert(mediaData)
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      
      // Clean up uploaded file if database insert fails
      try {
        await supabase.storage.from('media').remove([filePath])
      } catch (cleanupError) {
        console.error('Failed to clean up uploaded file:', cleanupError)
      }

      return NextResponse.json(
        { error: 'Failed to save file metadata', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      data: {
        ...data,
        public_url: publicUrl
      },
      success: true,
      message: 'File uploaded successfully'
    }, { status: 201 })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

// PUT - Update media file metadata
export async function PUT(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

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

    const { data, error } = await supabase
      .from('media_files')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to update media file', details: error.message },
        { status: 500 }
      )
    }

    if (!data) {
      return NextResponse.json(
        { error: 'Media file not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ 
      data,
      success: true,
      message: 'Media file updated successfully'
    })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

// DELETE - Delete media file
export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'ID parameter is required' },
        { status: 400 }
      )
    }

    // Get the media file to clean up storage
    const { data: mediaData } = await supabase
      .from('media_files')
      .select('file_path')
      .eq('id', id)
      .single()

    // Delete the database record
    const { data, error } = await supabase
      .from('media_files')
      .delete()
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to delete media file', details: error.message },
        { status: 500 }
      )
    }

    if (!data) {
      return NextResponse.json(
        { error: 'Media file not found' },
        { status: 404 }
      )
    }

    // Clean up file from storage
    if (mediaData?.file_path) {
      try {
        await supabase.storage
          .from('media')
          .remove([mediaData.file_path])
      } catch (storageError) {
        console.error('Failed to clean up file from storage:', storageError)
        // Don't fail the deletion if file cleanup fails
      }
    }

    return NextResponse.json({ 
      data,
      success: true,
      message: 'Media file deleted successfully'
    })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

// Helper function to determine media type from MIME type
function getMediaTypeFromMime(mimeType: string): string {
  if (mimeType.startsWith('image/')) {
    return 'image'
  } else if (mimeType === 'application/pdf') {
    return 'document'
  } else if (mimeType.includes('word') || mimeType.includes('document')) {
    return 'document'
  } else {
    return 'document'
  }
}