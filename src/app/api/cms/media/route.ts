import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// GET /api/cms/media - 미디어 파일 목록 조회
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { searchParams } = new URL(request.url)
    
    // Query parameters
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const folder = searchParams.get('folder') || ''
    const search = searchParams.get('search') || ''
    const mimeType = searchParams.get('type') || ''
    
    const offset = (page - 1) * limit

    // Build query
    let query = supabase
      .from('media_files')
      .select('*')

    // Apply filters
    if (folder) {
      query = query.eq('folder', folder)
    }

    if (search) {
      query = query.or(`filename.ilike.%${search}%,original_name.ilike.%${search}%,alt_text.ilike.%${search}%`)
    }

    if (mimeType) {
      if (mimeType === 'image') {
        query = query.like('mime_type', 'image/%')
      } else if (mimeType === 'video') {
        query = query.like('mime_type', 'video/%')
      } else {
        query = query.eq('mime_type', mimeType)
      }
    }

    // Apply sorting and pagination
    query = query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    const { data: files, error } = await query

    if (error) {
      console.error('Error fetching media files:', error)
      return NextResponse.json(
        { error: 'Failed to fetch media files' },
        { status: 500 }
      )
    }

    // Get total count for pagination
    const { count: totalCount } = await supabase
      .from('media_files')
      .select('*', { count: 'exact', head: true })

    return NextResponse.json({
      success: true,
      data: files || [],
      pagination: {
        page,
        limit,
        total: totalCount || 0,
        totalPages: Math.ceil((totalCount || 0) / limit)
      }
    })

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/cms/media - 새 미디어 파일 업로드
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    // Get current user
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const formData = await request.formData()
    const file = formData.get('file') as File
    const folder = formData.get('folder') as string || 'uploads'
    const altText = formData.get('alt_text') as string || ''
    const caption = formData.get('caption') as string || ''

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Validate file size (10MB limit)
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size exceeds 10MB limit' },
        { status: 400 }
      )
    }

    // Validate file type
    const allowedTypes = [
      'image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif',
      'video/mp4', 'video/webm', 'video/ogg',
      'application/pdf'
    ]
    
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'File type not supported' },
        { status: 400 }
      )
    }

    // Generate unique filename
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 8)
    const fileExtension = file.name.split('.').pop()
    const filename = `${timestamp}_${randomString}.${fileExtension}`
    const filePath = `${folder}/${filename}`

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('media')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (uploadError) {
      console.error('Error uploading file:', uploadError)
      return NextResponse.json(
        { error: 'Failed to upload file' },
        { status: 500 }
      )
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from('media')
      .getPublicUrl(filePath)

    // Get image dimensions if it's an image
    let width: number | undefined
    let height: number | undefined

    if (file.type.startsWith('image/')) {
      try {
        // For now, we'll skip dimension detection and let the client handle it
        // In production, you might want to use a library like 'sharp' for server-side processing
      } catch (error) {
        console.warn('Could not get image dimensions:', error)
      }
    }

    // Save file info to database
    const { data: mediaFile, error: dbError } = await supabase
      .from('media_files')
      .insert({
        filename,
        original_name: file.name,
        mime_type: file.type,
        file_size: file.size,
        url: publicUrlData.publicUrl,
        alt_text: altText,
        caption,
        width,
        height,
        folder,
        uploaded_by: user.id
      })
      .select()
      .single()

    if (dbError) {
      console.error('Error saving media file to database:', dbError)
      
      // Clean up uploaded file
      await supabase.storage
        .from('media')
        .remove([filePath])

      return NextResponse.json(
        { error: 'Failed to save file information' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: mediaFile,
      message: 'File uploaded successfully'
    })

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}