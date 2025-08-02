import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// Update consultation status
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params
  try {
    const supabase = await createClient()
    const body = await request.json()
    const { status, notes } = body

    // Validate status
    const validStatuses = ['pending', 'confirmed', 'completed', 'cancelled']
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      )
    }

    // Update consultation
    const { data, error } = await supabase
      .from('consultations')
      .update({
        status,
        admin_notes: notes,
        updated_at: new Date().toISOString()
      })
      .eq('id', params.id)
      .select(`
        *,
        user_profiles!inner(
          name,
          email,
          phone
        )
      `)
      .single()

    if (error) {
      console.error('Error updating consultation:', error)
      return NextResponse.json(
        { error: 'Failed to update consultation' },
        { status: 500 }
      )
    }

    return NextResponse.json({ consultation: data })

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Delete consultation
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params
  try {
    const supabase = await createClient()

    const { error } = await supabase
      .from('consultations')
      .delete()
      .eq('id', params.id)

    if (error) {
      console.error('Error deleting consultation:', error)
      return NextResponse.json(
        { error: 'Failed to delete consultation' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}