import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

interface DatabaseBlock {
  id: string
  type: string
  block_order: number
  data: unknown
  styles: unknown
  is_active: boolean
  created_at: string
  updated_at: string
}

interface ContentBlockInput {
  id?: string
  type: string
  order: number
  data: unknown
  styles?: unknown
}

interface DatabasePage {
  id: string
  slug: string
  title: string
  description?: string
  meta_title?: string
  meta_description?: string
  meta_keywords?: string
  status: string
  template?: string
  featured_image?: string
  content_blocks?: DatabaseBlock[]
  created_at: string
  updated_at: string
  created_by: string
  updated_by?: string
  version_number: number
}

// GET /api/cms/pages/[slug] - 특정 페이지 조회
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const params = await context.params
  try {
    const supabase = await createClient()
    const { searchParams } = new URL(request.url)
    const includeBlocks = searchParams.get('include_blocks') !== 'false'

    let query = supabase
      .from('cms_pages')
      .select(includeBlocks ? `
        *,
        content_blocks (
          id,
          type,
          block_order,
          data,
          styles,
          is_active,
          created_at,
          updated_at
        )
      ` : '*')
      .eq('slug', params.slug)

    // Only show published pages for public access
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      query = query.eq('status', 'published')
    }

    const { data: page, error } = await query.single()

    if (error || !page) {
      if (error?.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Page not found' },
          { status: 404 }
        )
      }
      console.error('Error fetching page:', error)
      return NextResponse.json(
        { error: 'Failed to fetch page' },
        { status: 500 }
      )
    }

    // Type assertion for Supabase result - use unknown first for safety
    const pageData = page as unknown as DatabasePage

    // Transform data to match Page interface
    const transformedPage = {
      id: pageData.id,
      slug: pageData.slug,
      title: pageData.title,
      description: pageData.description,
      meta_title: pageData.meta_title,
      meta_description: pageData.meta_description,
      meta_keywords: pageData.meta_keywords ? pageData.meta_keywords.split(',').map(k => k.trim()) : undefined,
      status: pageData.status as 'draft' | 'published' | 'archived',
      template: pageData.template as 'default' | 'landing' | 'blog' | 'about' | undefined,
      featured_image: pageData.featured_image,
      created_at: pageData.created_at,
      updated_at: pageData.updated_at,
      created_by: pageData.created_by,
      updated_by: pageData.updated_by,
      version_number: pageData.version_number,
      blocks: includeBlocks ? (pageData.content_blocks
        ?.filter((block: DatabaseBlock) => block.is_active)
        ?.sort((a: DatabaseBlock, b: DatabaseBlock) => a.block_order - b.block_order)
        ?.map((block: DatabaseBlock) => ({
          id: block.id,
          type: block.type as 'text' | 'image' | 'video' | 'button' | 'section' | 'hero' | 'card' | 'testimonial',
          order: block.block_order,
          data: block.data,
          styles: block.styles,
          created_at: block.created_at,
          updated_at: block.updated_at
        })) || []) : undefined
    }

    return NextResponse.json({
      success: true,
      data: transformedPage
    })

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT /api/cms/pages/[slug] - 페이지 업데이트
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const params = await context.params
  try {
    const supabase = await createClient()
    const body = await request.json()
    
    const {
      title,
      description,
      meta_title,
      meta_description,
      meta_keywords,
      status,
      blocks
    } = body

    // Get current user
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    // Get existing page
    const { data: existingPage, error: fetchError } = await supabase
      .from('cms_pages')
      .select('id, status, version_number')
      .eq('slug', params.slug)
      .single()

    if (fetchError || !existingPage) {
      return NextResponse.json(
        { error: 'Page not found' },
        { status: 404 }
      )
    }

    // Update page
    const updateData: Record<string, unknown> = {
      updated_by: user.id
    }

    if (title !== undefined) updateData.title = title
    if (description !== undefined) updateData.description = description
    if (meta_title !== undefined) updateData.meta_title = meta_title
    if (meta_description !== undefined) updateData.meta_description = meta_description
    if (meta_keywords !== undefined) updateData.meta_keywords = meta_keywords
    
    if (status !== undefined) {
      updateData.status = status
      if (status === 'published' && existingPage.status !== 'published') {
        updateData.published_at = new Date().toISOString()
      }
    }

    const { data: updatedPage, error: updateError } = await supabase
      .from('cms_pages')
      .update(updateData)
      .eq('id', existingPage.id)
      .select()
      .single()

    if (updateError) {
      console.error('Error updating page:', updateError)
      return NextResponse.json(
        { error: 'Failed to update page' },
        { status: 500 }
      )
    }

    // Update blocks if provided
    if (blocks && Array.isArray(blocks)) {
      // First, deactivate all existing blocks
      await supabase
        .from('content_blocks')
        .update({ is_active: false })
        .eq('page_id', existingPage.id)

      // Insert/update new blocks
      const blocksToUpsert = blocks.map((block: ContentBlockInput, index: number) => ({
        id: block.id || undefined,
        page_id: existingPage.id,
        type: block.type,
        block_order: block.order !== undefined ? block.order : index,
        data: block.data,
        styles: block.styles,
        is_active: true
      }))

      const { error: blocksError } = await supabase
        .from('content_blocks')
        .upsert(blocksToUpsert, { 
          onConflict: 'id',
          ignoreDuplicates: false
        })

      if (blocksError) {
        console.error('Error updating blocks:', blocksError)
      }
    }

    // Create version backup
    const { data: blockData } = await supabase
      .from('content_blocks')
      .select('*')
      .eq('page_id', existingPage.id)
      .eq('is_active', true)

    await supabase
      .from('content_versions')
      .insert({
        page_id: existingPage.id,
        version_number: (existingPage.version_number || 0) + 1,
        title: updatedPage.title,
        blocks_data: blockData || [],
        created_by: user.id,
        notes: `Auto-saved version`
      })

    // Log activity
    await supabase
      .from('content_activity_log')
      .insert({
        page_id: existingPage.id,
        user_id: user.id,
        action: status === 'published' ? 'published' : 'updated',
        details: { title, status },
        ip_address: request.headers.get('x-forwarded-for') || 'unknown',
        user_agent: request.headers.get('user-agent')
      })

    return NextResponse.json({
      success: true,
      data: updatedPage,
      message: 'Page updated successfully'
    })

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE /api/cms/pages/[slug] - 페이지 삭제
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
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

    // Get existing page
    const { data: existingPage, error: fetchError } = await supabase
      .from('cms_pages')
      .select('id, title')
      .eq('slug', params.slug)
      .single()

    if (fetchError || !existingPage) {
      return NextResponse.json(
        { error: 'Page not found' },
        { status: 404 }
      )
    }

    // Log activity before deletion
    await supabase
      .from('content_activity_log')
      .insert({
        page_id: existingPage.id,
        user_id: user.id,
        action: 'deleted',
        details: { title: existingPage.title, slug: params.slug },
        ip_address: request.headers.get('x-forwarded-for') || 'unknown',
        user_agent: request.headers.get('user-agent')
      })

    // Delete page (cascade will handle blocks, versions, etc.)
    const { error: deleteError } = await supabase
      .from('cms_pages')
      .delete()
      .eq('id', existingPage.id)

    if (deleteError) {
      console.error('Error deleting page:', deleteError)
      return NextResponse.json(
        { error: 'Failed to delete page' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Page deleted successfully'
    })

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}