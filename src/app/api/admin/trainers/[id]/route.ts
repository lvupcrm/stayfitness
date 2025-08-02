import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// Update trainer application status
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params
  try {
    const supabase = createClient()
    const body = await request.json()
    const { status, notes, interview_date, feedback } = body

    // Validate status
    const validStatuses = ['pending', 'reviewing', 'interview_scheduled', 'hired', 'rejected']
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      )
    }

    // Update trainer application
    const updateData: Record<string, string> = {
      status,
      updated_at: new Date().toISOString()
    }

    if (notes !== undefined) updateData.admin_notes = notes
    if (interview_date) updateData.interview_date = interview_date
    if (feedback !== undefined) updateData.feedback = feedback

    const { data, error } = await supabase
      .from('trainer_applications')
      .update(updateData)
      .eq('id', params.id)
      .select()
      .single()

    if (error) {
      console.error('Error updating trainer application:', error)
      return NextResponse.json(
        { error: 'Failed to update trainer application' },
        { status: 500 }
      )
    }

    return NextResponse.json({ application: data })

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Delete trainer application
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params
  try {
    const supabase = createClient()

    const { error } = await supabase
      .from('trainer_applications')
      .delete()
      .eq('id', params.id)

    if (error) {
      console.error('Error deleting trainer application:', error)
      return NextResponse.json(
        { error: 'Failed to delete trainer application' },
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