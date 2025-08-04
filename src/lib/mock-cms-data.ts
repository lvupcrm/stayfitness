// Mock CMS data for development without Supabase
import type { Page } from '@/types/cms'

// Mock page data
export const mockPageData: Page = {
  id: 'home-page',
  slug: 'home',
  title: 'STAY FITNESS 홈페이지',
  description: '건강한 라이프스타일을 위한 최고의 선택',
  meta_title: 'STAY FITNESS - 프리미엄 피트니스 센터',
  meta_description: '전문 트레이너와 함께하는 맞춤형 피트니스 프로그램',
  meta_keywords: ['피트니스', '헬스', '트레이너', 'STAY FITNESS'],
  status: 'published',
  template: 'default',
  featured_image: '/images/hero.jpg',
  blocks: [
    {
      id: 'hero-block-1',
      type: 'hero',
      order: 0,
      data: {
        hero: {
          title: '당신의 건강한 변화를 함께합니다',
          subtitle: '전문 트레이너와 함께하는 맞춤형 프로그램',
          backgroundImage: '/images/hero.jpg',
          ctaButton: {
            text: '시작하기',
            url: '/consultation'
          }
        }
      },
      styles: {
        backgroundColor: '#ffffff',
        textColor: '#1a1a1a',
        padding: { top: 60, bottom: 60 }
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'text-block-1',
      type: 'text',
      order: 1,
      data: {
        text: {
          heading: '왜 STAY FITNESS인가요?',
          content: '최고의 시설과 전문 트레이너, 다양한 프로그램을 제공합니다.',
          alignment: 'center'
        }
      },
      styles: {
        backgroundColor: '#f8f9fa',
        textColor: '#1a1a1a',
        padding: { top: 40, bottom: 40 }
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'card-block-1',
      type: 'card',
      order: 2,
      data: {
        card: {
          title: '전문 트레이너',
          description: '경험이 풍부한 전문 트레이너들이 여러분의 목표 달성을 도와드립니다.',
          image: '/images/trainer.jpg',
          icon: '💪'
        }
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ],
  published_at: new Date().toISOString(),
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  created_by: 'mock-user',
  updated_by: 'mock-user',
  version_number: 1
}

// Mock pages list
export const mockPagesList: Page[] = [
  mockPageData,
  {
    id: 'about-page',
    slug: 'about',
    title: '회사소개',
    description: 'STAY FITNESS에 대해 알아보세요',
    status: 'published',
    template: 'default',
    blocks: [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    created_by: 'mock-user',
    version_number: 1
  },
  {
    id: 'programs-page',
    slug: 'programs',
    title: '프로그램',
    description: '다양한 피트니스 프로그램을 확인하세요',
    status: 'draft',
    template: 'default',
    blocks: [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    created_by: 'mock-user',
    version_number: 1
  }
]

// Mock save function
export const mockSavePage = async (page: Page): Promise<Page> => {
  console.log('Mock saving page:', page.title)
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Return updated page with new timestamp
  return {
    ...page,
    updated_at: new Date().toISOString(),
    version_number: page.version_number + 1
  }
}

// Mock authentication
export const mockAuth = {
  isAuthenticated: true,
  user: {
    id: 'mock-user',
    email: 'admin@stayfitness.com',
    name: 'CMS 관리자'
  }
}