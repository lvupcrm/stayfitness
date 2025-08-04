import { NextRequest, NextResponse } from 'next/server'
import type { PageContent, PageSection, ContentBlock } from '@/types/content'

// Mock data - 실제로는 데이터베이스에서 관리
let pageContent: PageContent = {
  id: 'home-page',
  title: 'STAY FITNESS',
  description: '건강한 라이프스타일을 위한 최고의 선택',
  metaTitle: 'STAY FITNESS - 프리미엄 피트니스 센터',
  metaDescription: '전문 트레이너와 함께하는 맞춤형 피트니스 프로그램',
  sections: [
    {
      id: 'hero',
      type: 'hero',
      title: '당신의 건강한 변화를 함께합니다',
      subtitle: '전문 트레이너와 함께하는 맞춤형 프로그램',
      content: '최고의 시설과 전문 트레이너가 함께하는 STAY FITNESS에서 건강한 변화를 시작하세요.',
      imageUrl: '/images/hero.jpg',
      backgroundColor: '#ffffff',
      textColor: '#1a1a1a',
      order: 0,
      isVisible: true,
      updatedAt: new Date().toISOString()
    },
    {
      id: 'features',
      type: 'features',
      title: '왜 STAY FITNESS인가요?',
      content: '최고의 시설과 전문 트레이너, 다양한 프로그램을 제공합니다.',
      backgroundColor: '#f8f9fa',
      textColor: '#1a1a1a',
      order: 1,
      isVisible: true,
      updatedAt: new Date().toISOString()
    }
  ],
  blocks: [],
  isPublished: true,
  publishedAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
}

// GET /api/admin/content
export async function GET() {
  return NextResponse.json({ success: true, data: pageContent })
}

// POST /api/admin/content
export async function POST(request: NextRequest) {
  try {
    const updates = await request.json()
    
    // 실제로는 데이터베이스 업데이트 로직이 들어갈 자리
    if (updates.sections) {
      pageContent.sections = updates.sections
    }
    if (updates.blocks) {
      pageContent.blocks = updates.blocks
    }
    pageContent.updatedAt = new Date().toISOString()

    return NextResponse.json({ 
      success: true, 
      message: '콘텐츠가 업데이트되었습니다.',
      data: pageContent 
    })

  } catch (error) {
    console.error('Content update error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: '콘텐츠 업데이트 중 오류가 발생했습니다.' 
      },
      { status: 500 }
    )
  }
}

// PUT /api/admin/content/publish
export async function PUT(request: NextRequest) {
  try {
    const { publish } = await request.json()
    
    pageContent.isPublished = publish
    pageContent.publishedAt = publish ? new Date().toISOString() : undefined
    pageContent.updatedAt = new Date().toISOString()

    return NextResponse.json({ 
      success: true, 
      message: publish ? '콘텐츠가 발행되었습니다.' : '콘텐츠가 임시저장되었습니다.',
      data: pageContent 
    })

  } catch (error) {
    console.error('Content publish error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: '콘텐츠 발행 중 오류가 발생했습니다.' 
      },
      { status: 500 }
    )
  }
}