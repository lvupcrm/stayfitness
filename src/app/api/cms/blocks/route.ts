import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// GET /api/cms/blocks - 특정 페이지의 블록 목록 조회
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { searchParams } = new URL(request.url)
    
    const pageId = searchParams.get('page_id')
    const activeOnly = searchParams.get('active_only') !== 'false'

    if (!pageId) {
      return NextResponse.json(
        { error: 'page_id parameter is required' },
        { status: 400 }
      )
    }

    // Build query
    let query = supabase
      .from('content_blocks')
      .select('*')
      .eq('page_id', pageId)
      .order('block_order', { ascending: true })

    if (activeOnly) {
      query = query.eq('is_active', true)
    }

    const { data: blocks, error } = await query

    if (error) {
      console.error('Error fetching blocks:', error)
      return NextResponse.json(
        { error: 'Failed to fetch blocks' },
        { status: 500 }
      )
    }

    // Transform data to match ContentBlock interface
    const transformedBlocks = blocks?.map(block => ({
      id: block.id,
      type: block.type,
      order: block.block_order,
      data: block.data,
      styles: block.styles,
      created_at: block.created_at,
      updated_at: block.updated_at
    })) || []

    return NextResponse.json({
      success: true,
      data: transformedBlocks
    })

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/cms/blocks - 새 블록 생성
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const body = await request.json()
    
    const {
      page_id,
      type,
      order,
      data,
      styles
    } = body

    // Validate required fields
    if (!page_id || !type || !data) {
      return NextResponse.json(
        { error: 'page_id, type, and data are required' },
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

    // Check if page exists
    const { data: page, error: pageError } = await supabase
      .from('cms_pages')
      .select('id')
      .eq('id', page_id)
      .single()

    if (pageError || !page) {
      return NextResponse.json(
        { error: 'Page not found' },
        { status: 404 }
      )
    }

    // If no order specified, append to end
    let blockOrder = order
    if (blockOrder === undefined) {
      const { data: lastBlock } = await supabase
        .from('content_blocks')
        .select('block_order')
        .eq('page_id', page_id)
        .eq('is_active', true)
        .order('block_order', { ascending: false })
        .limit(1)
        .single()

      blockOrder = (lastBlock?.block_order || 0) + 1
    }

    // Create block
    const { data: newBlock, error: blockError } = await supabase
      .from('content_blocks')
      .insert({
        page_id,
        type,
        block_order: blockOrder,
        data,
        styles,
        is_active: true
      })
      .select()
      .single()

    if (blockError) {
      console.error('Error creating block:', blockError)
      return NextResponse.json(
        { error: 'Failed to create block' },
        { status: 500 }
      )
    }

    // Transform response
    const transformedBlock = {
      id: newBlock.id,
      type: newBlock.type,
      order: newBlock.block_order,
      data: newBlock.data,
      styles: newBlock.styles,
      created_at: newBlock.created_at,
      updated_at: newBlock.updated_at
    }

    return NextResponse.json({
      success: true,
      data: transformedBlock,
      message: 'Block created successfully'
    })

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT /api/cms/blocks - 여러 블록 순서 업데이트
export async function PUT(request: NextRequest) {
  try {
    const supabase = await createClient()
    const body = await request.json()
    
    const { blocks } = body

    if (!Array.isArray(blocks)) {
      return NextResponse.json(
        { error: 'blocks must be an array' },
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

    // Update blocks in batch
    const updates = blocks.map((block, index) => ({
      id: block.id,
      block_order: index,
      data: block.data,
      styles: block.styles
    }))

    const { data: updatedBlocks, error: updateError } = await supabase
      .from('content_blocks')
      .upsert(updates, { onConflict: 'id' })
      .select()

    if (updateError) {
      console.error('Error updating blocks:', updateError)
      return NextResponse.json(
        { error: 'Failed to update blocks' },
        { status: 500 }
      )
    }

    // Transform response
    const transformedBlocks = updatedBlocks?.map(block => ({
      id: block.id,
      type: block.type,
      order: block.block_order,
      data: block.data,
      styles: block.styles,
      created_at: block.created_at,
      updated_at: block.updated_at
    })) || []

    return NextResponse.json({
      success: true,
      data: transformedBlocks,
      message: 'Blocks updated successfully'
    })

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}