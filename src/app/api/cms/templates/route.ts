import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// GET /api/cms/templates - 콘텐츠 템플릿 목록 조회
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { searchParams } = new URL(request.url)
    
    // Query parameters
    const category = searchParams.get('category') || 'all'
    const includeSystem = searchParams.get('include_system') !== 'false'
    
    // Build query
    let query = supabase
      .from('content_templates')
      .select('*')
      .order('created_at', { ascending: false })

    // Apply filters
    if (category !== 'all') {
      query = query.eq('category', category)
    }

    if (!includeSystem) {
      query = query.eq('is_system', false)
    }

    const { data: templates, error } = await query

    if (error) {
      console.error('Error fetching templates:', error)
      return NextResponse.json(
        { error: 'Failed to fetch templates' },
        { status: 500 }
      )
    }

    // Transform template_data to blocks format
    const transformedTemplates = templates?.map(template => ({
      ...template,
      blocks: template.template_data || []
    })) || []

    return NextResponse.json({
      success: true,
      data: transformedTemplates
    })

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/cms/templates - 새 템플릿 생성
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const body = await request.json()
    
    const {
      name,
      description,
      category,
      preview_image,
      blocks = []
    } = body

    // Validate required fields
    if (!name || !category) {
      return NextResponse.json(
        { error: 'Name and category are required' },
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

    // Create template
    const { data: newTemplate, error: templateError } = await supabase
      .from('content_templates')
      .insert({
        name,
        description,
        category,
        preview_image,
        template_data: blocks,
        is_system: false,
        created_by: user.id
      })
      .select()
      .single()

    if (templateError) {
      console.error('Error creating template:', templateError)
      return NextResponse.json(
        { error: 'Failed to create template' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: {
        ...newTemplate,
        blocks: newTemplate.template_data || []
      },
      message: 'Template created successfully'
    })

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}