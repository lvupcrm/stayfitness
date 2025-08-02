import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// GET /api/cms/media/[id] - 특정 미디어 파일 조회
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params
  try {
    const supabase = await createClient()

    const { data: mediaFile, error } = await supabase
      .from('media_files')
      .select('*')
      .eq('id', params.id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Media file not found' },
          { status: 404 }
        )
      }
      console.error('Error fetching media file:', error)
      return NextResponse.json(
        { error: 'Failed to fetch media file' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: mediaFile
    })

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT /api/cms/media/[id] - 미디어 파일 정보 업데이트
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params
  try {
    const supabase = await createClient()
    const body = await request.json()
    
    const {
      alt_text,
      caption,
      folder
    } = body

    // Get current user
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    // Get existing media file
    const { data: existingFile, error: fetchError } = await supabase
      .from('media_files')
      .select('*')
      .eq('id', params.id)
      .single()

    if (fetchError || !existingFile) {
      return NextResponse.json(
        { error: 'Media file not found' },
        { status: 404 }
      )
    }

    // Update media file info
    const updateData: Record<string, unknown> = {}

    if (alt_text !== undefined) updateData.alt_text = alt_text
    if (caption !== undefined) updateData.caption = caption
    if (folder !== undefined) updateData.folder = folder

    const { data: updatedFile, error: updateError } = await supabase
      .from('media_files')
      .update(updateData)
      .eq('id', params.id)
      .select()
      .single()

    if (updateError) {
      console.error('Error updating media file:', updateError)
      return NextResponse.json(
        { error: 'Failed to update media file' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: updatedFile,
      message: 'Media file updated successfully'
    })

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE /api/cms/media/[id] - 미디어 파일 삭제
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params
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

    // Get existing media file
    const { data: existingFile, error: fetchError } = await supabase
      .from('media_files')
      .select('*')
      .eq('id', params.id)
      .single()

    if (fetchError || !existingFile) {
      return NextResponse.json(
        { error: 'Media file not found' },
        { status: 404 }
      )
    }

    // Extract file path from URL
    const url = new URL(existingFile.url)
    const pathSegments = url.pathname.split('/')
    const bucketIndex = pathSegments.findIndex(segment => segment === 'media')
    const filePath = pathSegments.slice(bucketIndex + 1).join('/')

    // Delete from Supabase Storage
    const { error: storageError } = await supabase.storage
      .from('media')
      .remove([filePath])

    if (storageError) {
      console.error('Error deleting file from storage:', storageError)
      // Continue with database deletion even if storage deletion fails
    }

    // Delete from database
    const { error: deleteError } = await supabase
      .from('media_files')
      .delete()
      .eq('id', params.id)

    if (deleteError) {
      console.error('Error deleting media file from database:', deleteError)
      return NextResponse.json(
        { error: 'Failed to delete media file' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Media file deleted successfully'
    })

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}