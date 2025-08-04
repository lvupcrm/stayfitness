// Mock CMS data for development without Supabase
import type { Page } from '@/types/cms'

// Mock page data - 실제 홈페이지 섹션들을 CMS에서 편집 가능하도록 구성
export const mockPageData: Page = {
  id: 'home-page',
  slug: 'home',
  title: 'STAY FITNESS 홈페이지',
  description: '체형교정과 통증개선에 특화된 프리미엄 피트니스',
  meta_title: 'STAY FITNESS - 체형교정과 통증개선의 새로운 기준',
  meta_description: '스테이피트니스는 체형교정과 통증개선에 특화된 프리미엄 피트니스입니다. 강남, 홍대, 잠실 지점에서 전문 트레이너의 1:1 맞춤 관리로 당신의 건강한 변화를 시작하세요.',
  meta_keywords: ['체형교정', '통증개선', '피트니스', '스테이피트니스', '강남', '홍대', '잠실'],
  status: 'published',
  template: 'default',
  featured_image: '/images/hero-poster.jpg',
  blocks: [
    {
      id: 'hero-block-1',
      type: 'hero',
      order: 0,
      data: {
        hero: {
          title: 'Not just fitness, It\'s transformation',
          subtitle: '체형교정과 통증개선의 새로운 기준\n스테이피트니스에서 시작하세요',
          backgroundVideo: '/videos/hero-bg.mp4',
          backgroundImage: '/images/hero-poster.jpg',
          ctaButton: {
            text: '무료 체험 신청하기',
            url: '/consultation'
          }
        }
      },
      styles: {
        backgroundColor: 'gradient-to-br from-slate-900 to-slate-800',
        textColor: '#ffffff',
        padding: { top: 0, bottom: 0 }
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'problem-awareness-block',
      type: 'problem_awareness',
      order: 1,
      data: {
        section: {
          title: '혹시 이런 고민이 있으신가요?',
          subtitle: '30-50대 여성 10명 중 8명이 겪는 공통 고민들입니다',
          problems: [
            {
              icon: '😫',
              title: '운동해도 변하지 않는 몸',
              description: '헬스장에서 열심히 운동해도 원하는 체형 변화가 없어서 포기하셨나요?'
            },
            {
              icon: '🏥',
              title: '만성 통증에 시달림',
              description: '어깨, 목, 허리 통증이 심해져도 어떻게 해야 할지 모르겠나요?'
            },
            {
              icon: '⚖️',
              title: '틀어진 체형과 자세',
              description: '골반 틀어짐, 굽은 어깨로 인해 옷 맵시도 살지 않나요?'
            },
            {
              icon: '😰',
              title: '잘못된 운동이 걱정',
              description: '혼자 운동하다 다칠까봐 무서워서 제대로 못하고 계신가요?'
            }
          ],
          callToAction: {
            title: '💡 이 모든 문제, 해결할 수 있습니다!',
            description: '스테이피트니스의 전문 체형교정·통증개선 프로그램으로\n\'진짜 내 몸\'의 변화를 경험해보세요',
            buttonText: '무료 상담 받기',
            buttonUrl: '/consultation'
          }
        }
      },
      styles: {
        backgroundColor: '#fafaf9',
        textColor: '#1c1917',
        padding: { top: 80, bottom: 80 }
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'solution-block',
      type: 'solution',
      order: 2,
      data: {
        section: {
          title: '스테이피트니스만의 차별화된 솔루션',
          subtitle: '체형교정과 통증개선을 위한 전문 시스템',
          solutions: [
            {
              icon: '🔬',
              title: '3D 체형 분석',
              description: '최첨단 장비로 정확한 체형 분석 후 개인 맞춤 프로그램 설계'
            },
            {
              icon: '👨‍⚕️',
              title: '전문 트레이너',
              description: '물리치료사, 운동처방사 자격을 보유한 전문가들의 1:1 관리'
            },
            {
              icon: '🏥',
              title: '의료진 협진',
              description: '정형외과 전문의와의 협진을 통한 안전하고 효과적인 운동'
            },
            {
              icon: '📊',
              title: '과학적 관리',
              description: '실시간 데이터 기반으로 운동 효과를 측정하고 최적화'
            }
          ]
        }
      },
      styles: {
        backgroundColor: '#ffffff',
        textColor: '#1c1917',
        padding: { top: 80, bottom: 80 }
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'social-proof-block',
      type: 'social_proof',
      order: 3,
      data: {
        section: {
          title: '이미 많은 분들이 변화를 경험했습니다',
          subtitle: '실제 회원님들의 생생한 후기',
          testimonials: [
            {
              name: '김○○님 (42세, 직장인)',
              content: '10년간 고생했던 목과 어깨 통증이 3개월 만에 80% 이상 개선되었어요. 정말 감사합니다.',
              rating: 5,
              program: '체형교정 프로그램',
              beforeAfter: {
                before: '만성 목·어깨 통증',
                after: '80% 이상 통증 개선'
              }
            },
            {
              name: '박○○님 (38세, 주부)',
              content: '출산 후 틀어진 골반과 복부 비만이 고민이었는데, 6개월 만에 완전히 달라졌어요!',
              rating: 5,
              program: '산후 체형교정',
              beforeAfter: {
                before: '골반 틀어짐, 복부 비만',
                after: '정상 체형 회복'
              }
            },
            {
              name: '이○○님 (45세, 사업가)',
              content: '바쁜 일정에도 효율적인 1:1 관리로 허리 디스크 증상이 많이 좋아졌습니다.',
              rating: 5,
              program: '통증개선 프로그램',
              beforeAfter: {
                before: '허리 디스크 증상',
                after: '일상생활 불편함 해소'
              }
            }
          ],
          achievements: {
            title: '스테이피트니스 성과',
            stats: [
              { number: '2,847', label: '누적 회원수' },
              { number: '95%', label: '통증 개선율' },
              { number: '4.9', label: '만족도 평점' },
              { number: '98%', label: '재등록률' }
            ]
          }
        }
      },
      styles: {
        backgroundColor: '#f8fafc',
        textColor: '#1e293b',
        padding: { top: 80, bottom: 80 }
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'urgency-block',
      type: 'urgency',
      order: 4,
      data: {
        section: {
          title: '지금 시작하세요!',
          subtitle: '한정된 기회를 놓치지 마세요',
          offers: [
            {
              title: '무료 체험 프로그램',
              description: '3D 체형분석 + 1:1 상담 + 맞춤 운동 체험',
              originalPrice: '150,000원',
              discountPrice: '무료',
              validUntil: '이달 말까지',
              limitation: '매일 선착순 3명'
            }
          ],
          urgencyMessages: [
            '⏰ 매일 선착순 3명만 신청 가능',
            '🎯 개인별 맞춤 분석으로 정확한 솔루션 제공',
            '💪 전문가와 함께하는 안전한 운동',
            '📞 지금 바로 신청하고 변화를 시작하세요'
          ],
          callToAction: {
            title: '무료 체험 신청하기',
            subtitle: '단 3분이면 신청 완료!',
            buttonText: '지금 신청하기',
            buttonUrl: '/consultation',
            phoneNumber: '1588-0000'
          }
        }
      },
      styles: {
        backgroundColor: 'gradient-to-r from-blue-600 to-purple-600',
        textColor: '#ffffff',
        padding: { top: 80, bottom: 80 }
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'faq-block',
      type: 'faq',
      order: 5,
      data: {
        section: {
          title: '자주 묻는 질문',
          subtitle: '궁금한 점들을 확인해보세요',
          faqs: [
            {
              question: '운동 경험이 전혀 없어도 괜찮나요?',
              answer: '물론입니다! 스테이피트니스는 초보자도 안전하게 시작할 수 있도록 개인별 맞춤 프로그램을 제공합니다. 전문 트레이너가 기초부터 차근차근 가르쳐드립니다.'
            },
            {
              question: '통증이 심한데 운동해도 되나요?',
              answer: '통증 부위와 정도를 정확히 파악한 후, 의료진과 협진을 통해 안전한 범위 내에서 운동을 진행합니다. 오히려 올바른 운동을 통해 통증 개선에 도움이 됩니다.'
            },
            {
              question: '몇 개월 정도 다녀야 효과를 볼 수 있나요?',
              answer: '개인차가 있지만, 통증의 경우 4-8주, 체형 변화는 2-3개월부터 체감하실 수 있습니다. 정확한 분석 후 예상 기간을 안내해드립니다.'
            },
            {
              question: '가격은 어떻게 되나요?',
              answer: '개인별 맞춤 프로그램에 따라 가격이 달라집니다. 무료 상담을 통해 정확한 비용을 안내해드리며, 다양한 할인 혜택도 제공하고 있습니다.'
            },
            {
              question: '주차는 가능한가요?',
              answer: '모든 지점에서 무료 주차가 가능합니다. 강남점 2시간, 홍대점·잠실점 3시간 무료 주차를 제공합니다.'
            }
          ]
        }
      },
      styles: {
        backgroundColor: '#ffffff',
        textColor: '#1f2937',
        padding: { top: 80, bottom: 80 }
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