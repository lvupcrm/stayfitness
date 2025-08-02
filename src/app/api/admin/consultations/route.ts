import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// Get all consultations for admin
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { searchParams } = new URL(request.url)
    
    // Query parameters
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status')
    const search = searchParams.get('search')
    const sortBy = searchParams.get('sortBy') || 'created_at'
    const sortOrder = searchParams.get('sortOrder') || 'desc'
    
    const offset = (page - 1) * limit

    // Build query
    let query = supabase
      .from('consultations')
      .select(`
        *,
        user_profiles!inner(
          name,
          email,
          phone
        )
      `)

    // Apply filters
    if (status && status !== 'all') {
      query = query.eq('status', status)
    }

    if (search) {
      query = query.or(`
        user_profiles.name.ilike.%${search}%,
        user_profiles.email.ilike.%${search}%,
        user_profiles.phone.ilike.%${search}%,
        preferred_time.ilike.%${search}%,
        message.ilike.%${search}%
      `)
    }

    // Apply sorting
    query = query.order(sortBy, { ascending: sortOrder === 'asc' })

    // Apply pagination
    query = query.range(offset, offset + limit - 1)

    const { data: consultations, error } = await query

    if (error) {
      console.error('Error fetching consultations:', error)
      return NextResponse.json(
        { error: 'Failed to fetch consultations' },
        { status: 500 }
      )
    }

    // Get total count for pagination
    const { count: totalCount } = await supabase
      .from('consultations')
      .select('*', { count: 'exact', head: true })

    return NextResponse.json({
      consultations: consultations || [],
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