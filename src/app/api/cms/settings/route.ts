import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// GET /api/cms/settings - 사이트 설정 조회
export async function GET() {
  try {
    const supabase = await createClient()

    const { data: settings, error } = await supabase
      .from('site_settings')
      .select('*')
      .limit(1)
      .single()

    if (error) {
      console.error('Error fetching site settings:', error)
      return NextResponse.json(
        { error: 'Failed to fetch site settings' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: settings
    })

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT /api/cms/settings - 사이트 설정 업데이트
export async function PUT(request: NextRequest) {
  try {
    const supabase = await createClient()
    const body = await request.json()
    
    const {
      site_name,
      site_description,
      logo_url,
      favicon_url,
      primary_color,
      secondary_color,
      font_family,
      contact_info,
      seo
    } = body

    // Get current user
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    // Check if user has admin permissions
    const { data: adminUser } = await supabase
      .from('admin_users')
      .select('role')
      .eq('id', user.id)
      .eq('is_active', true)
      .single()

    if (!adminUser || !['super_admin', 'admin'].includes(adminUser.role)) {
      return NextResponse.json(
        { error: 'Admin permissions required' },
        { status: 403 }
      )
    }

    // Get existing settings
    const { data: existingSettings } = await supabase
      .from('site_settings')
      .select('id')
      .limit(1)
      .single()

    // Update data
    const updateData: Record<string, unknown> = {
      updated_by: user.id
    }

    if (site_name !== undefined) updateData.site_name = site_name
    if (site_description !== undefined) updateData.site_description = site_description
    if (logo_url !== undefined) updateData.logo_url = logo_url
    if (favicon_url !== undefined) updateData.favicon_url = favicon_url
    if (primary_color !== undefined) updateData.primary_color = primary_color
    if (secondary_color !== undefined) updateData.secondary_color = secondary_color
    if (font_family !== undefined) updateData.font_family = font_family
    if (contact_info !== undefined) updateData.contact_info = contact_info
    if (seo !== undefined) updateData.seo = seo

    let updatedSettings
    let error

    if (existingSettings) {
      // Update existing settings
      const result = await supabase
        .from('site_settings')
        .update(updateData)
        .eq('id', existingSettings.id)
        .select()
        .single()
      
      updatedSettings = result.data
      error = result.error
    } else {
      // Create new settings
      const result = await supabase
        .from('site_settings')
        .insert(updateData)
        .select()
        .single()
      
      updatedSettings = result.data
      error = result.error
    }

    if (error) {
      console.error('Error updating site settings:', error)
      return NextResponse.json(
        { error: 'Failed to update site settings' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: updatedSettings,
      message: 'Site settings updated successfully'
    })

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}