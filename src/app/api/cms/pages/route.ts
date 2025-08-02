import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import type { Page } from '@/types/cms'

// GET /api/cms/pages - 페이지 목록 조회
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { searchParams } = new URL(request.url)
    
    // Query parameters
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status') || 'all'
    const search = searchParams.get('search') || ''
    
    const offset = (page - 1) * limit

    // Build query
    let query = supabase
      .from('cms_pages')
      .select(`
        *,
        content_blocks (
          id,
          type,
          block_order,
          data,
          styles,
          is_active
        )
      `)

    // Apply filters
    if (status !== 'all') {
      query = query.eq('status', status)
    }

    if (search) {
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%,slug.ilike.%${search}%`)
    }

    // Apply sorting and pagination
    query = query
      .order('updated_at', { ascending: false })
      .range(offset, offset + limit - 1)

    const { data: pages, error } = await query

    if (error) {
      console.error('Error fetching pages:', error)
      return NextResponse.json(
        { error: 'Failed to fetch pages' },
        { status: 500 }
      )
    }

    // Get total count for pagination
    const { count: totalCount } = await supabase
      .from('cms_pages')
      .select('*', { count: 'exact', head: true })

    // Transform data to match Page interface
    const transformedPages: Page[] = pages?.map(page => ({
      ...page,
      blocks: page.content_blocks
        ?.filter((block: any) => block.is_active)
        ?.sort((a: any, b: any) => a.block_order - b.block_order)
        ?.map((block: any) => ({
          id: block.id,
          type: block.type,
          order: block.block_order,
          data: block.data,
          styles: block.styles,
          created_at: page.created_at,
          updated_at: page.updated_at
        })) || []
    })) || []

    return NextResponse.json({
      success: true,
      data: transformedPages,
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

// POST /api/cms/pages - 새 페이지 생성
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const body = await request.json()
    
    const {
      slug,
      title,
      description,
      meta_title,
      meta_description,
      meta_keywords,
      status = 'draft',
      template = 'default',
      blocks = []
    } = body

    // Validate required fields
    if (!slug || !title) {
      return NextResponse.json(
        { error: 'Slug and title are required' },
        { status: 400 }
      )
    }

    // Get current user
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    // Check if slug already exists
    const { data: existingPage } = await supabase
      .from('cms_pages')
      .select('id')
      .eq('slug', slug)
      .single()

    if (existingPage) {
      return NextResponse.json(
        { error: 'Page with this slug already exists' },
        { status: 409 }
      )
    }

    // Create page
    const { data: newPage, error: pageError } = await supabase
      .from('cms_pages')
      .insert({
        slug,
        title,
        description,
        meta_title,
        meta_description,
        meta_keywords,
        status,
        template,
        created_by: user.id,
        updated_by: user.id,
        published_at: status === 'published' ? new Date().toISOString() : null
      })
      .select()
      .single()

    if (pageError) {
      console.error('Error creating page:', pageError)
      return NextResponse.json(
        { error: 'Failed to create page' },
        { status: 500 }
      )
    }

    // Create content blocks if provided
    if (blocks.length > 0) {
      const blocksToInsert = blocks.map((block: any, index: number) => ({
        page_id: newPage.id,
        type: block.type,
        block_order: block.order || index,
        data: block.data,
        styles: block.styles
      }))

      const { error: blocksError } = await supabase
        .from('content_blocks')
        .insert(blocksToInsert)

      if (blocksError) {
        console.error('Error creating blocks:', blocksError)
        // Don't fail the entire request, just log the error
      }
    }

    // Log activity
    await supabase
      .from('content_activity_log')
      .insert({
        page_id: newPage.id,
        user_id: user.id,
        action: 'created',
        details: { title, slug },
        ip_address: request.headers.get('x-forwarded-for') || 'unknown',
        user_agent: request.headers.get('user-agent')
      })

    return NextResponse.json({
      success: true,
      data: newPage,
      message: 'Page created successfully'
    })

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}