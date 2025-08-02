import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// GET /api/cms/blocks/[id] - 특정 블록 조회
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params
  try {
    const supabase = await createClient()

    const { data: block, error } = await supabase
      .from('content_blocks')
      .select('*')
      .eq('id', params.id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Block not found' },
          { status: 404 }
        )
      }
      console.error('Error fetching block:', error)
      return NextResponse.json(
        { error: 'Failed to fetch block' },
        { status: 500 }
      )
    }

    // Transform data to match ContentBlock interface
    const transformedBlock = {
      id: block.id,
      type: block.type,
      order: block.block_order,
      data: block.data,
      styles: block.styles,
      created_at: block.created_at,
      updated_at: block.updated_at
    }

    return NextResponse.json({
      success: true,
      data: transformedBlock
    })

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT /api/cms/blocks/[id] - 블록 업데이트
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params
  try {
    const supabase = await createClient()
    const body = await request.json()
    
    const {
      type,
      order,
      data,
      styles
    } = body

    // Get current user
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    // Get existing block
    const { data: existingBlock, error: fetchError } = await supabase
      .from('content_blocks')
      .select('*')
      .eq('id', params.id)
      .single()

    if (fetchError || !existingBlock) {
      return NextResponse.json(
        { error: 'Block not found' },
        { status: 404 }
      )
    }

    // Update block
    const updateData: any = {}

    if (type !== undefined) updateData.type = type
    if (order !== undefined) updateData.block_order = order
    if (data !== undefined) updateData.data = data
    if (styles !== undefined) updateData.styles = styles

    const { data: updatedBlock, error: updateError } = await supabase
      .from('content_blocks')
      .update(updateData)
      .eq('id', params.id)
      .select()
      .single()

    if (updateError) {
      console.error('Error updating block:', updateError)
      return NextResponse.json(
        { error: 'Failed to update block' },
        { status: 500 }
      )
    }

    // Transform response
    const transformedBlock = {
      id: updatedBlock.id,
      type: updatedBlock.type,
      order: updatedBlock.block_order,
      data: updatedBlock.data,
      styles: updatedBlock.styles,
      created_at: updatedBlock.created_at,
      updated_at: updatedBlock.updated_at
    }

    return NextResponse.json({
      success: true,
      data: transformedBlock,
      message: 'Block updated successfully'
    })

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE /api/cms/blocks/[id] - 블록 삭제 (비활성화)
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

    // Get existing block
    const { data: existingBlock, error: fetchError } = await supabase
      .from('content_blocks')
      .select('*')
      .eq('id', params.id)
      .single()

    if (fetchError || !existingBlock) {
      return NextResponse.json(
        { error: 'Block not found' },
        { status: 404 }
      )
    }

    // Soft delete by setting is_active to false
    const { error: deleteError } = await supabase
      .from('content_blocks')
      .update({ is_active: false })
      .eq('id', params.id)

    if (deleteError) {
      console.error('Error deleting block:', deleteError)
      return NextResponse.json(
        { error: 'Failed to delete block' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Block deleted successfully'
    })

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}