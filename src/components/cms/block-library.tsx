'use client'

import { useDrag } from 'react-dnd'
import { 
  Type, 
  Image, 
  Video, 
  MousePointer, 
  Layout,
  MessageSquare,
  Grid,
  Heading,
  AlignLeft,
  AlertTriangle,
  Target,
  Users,
  Zap,
  HelpCircle,
  BarChart3,
  Award,
  Clock,
  MapPin,
  Star,
  Phone
} from 'lucide-react'
import { useCMSStore } from '@/hooks/useCMSStore'
import type { ContentBlock } from '@/types/cms'

interface BlockType {
  id: string
  type: ContentBlock['type']
  name: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  category: 'basic' | 'layout' | 'content' | 'media' | 'homepage' | 'about' | 'locations' | 'programs' | 'reviews'
  defaultData: Record<string, unknown>
}

const blockTypes: BlockType[] = [
  // Basic Blocks
  {
    id: 'text',
    type: 'text',
    name: '텍스트',
    description: '일반 텍스트 블록',
    icon: Type,
    category: 'basic',
    defaultData: {
      text: {
        content: '여기에 텍스트를 입력하세요.',
        alignment: 'left'
      }
    }
  },
  {
    id: 'heading',
    type: 'text',
    name: '제목',
    description: '제목 텍스트',
    icon: Heading,
    category: 'basic',
    defaultData: {
      text: {
        heading: '제목을 입력하세요',
        content: '',
        alignment: 'left'
      }
    }
  },
  {
    id: 'button',
    type: 'button',
    name: '버튼',
    description: '클릭 가능한 버튼',
    icon: MousePointer,
    category: 'basic',
    defaultData: {
      button: {
        text: '버튼 텍스트',
        url: '#',
        variant: 'primary',
        size: 'md'
      }
    }
  },

  // Media Blocks
  {
    id: 'image',
    type: 'image',
    name: '이미지',
    description: '이미지 블록',
    icon: Image,
    category: 'media',
    defaultData: {
      image: {
        url: 'https://via.placeholder.com/400x300',
        alt: '이미지 설명'
      }
    }
  },
  {
    id: 'video',
    type: 'video',
    name: '비디오',
    description: '비디오 플레이어',
    icon: Video,
    category: 'media',
    defaultData: {
      video: {
        url: '',
        autoplay: false,
        controls: true
      }
    }
  },

  // Layout Blocks
  {
    id: 'hero',
    type: 'hero',
    name: '히어로 섹션',
    description: '대형 배너 섹션',
    icon: Layout,
    category: 'layout',
    defaultData: {
      hero: {
        title: '메인 제목',
        subtitle: '부제목을 입력하세요',
        ctaButton: {
          text: '지금 시작하기',
          url: '#'
        }
      }
    }
  },
  {
    id: 'section',
    type: 'section',
    name: '섹션',
    description: '일반 섹션 블록',
    icon: Grid,
    category: 'layout',
    defaultData: {
      text: {
        heading: '섹션 제목',
        content: '섹션 내용을 입력하세요.'
      }
    }
  },

  // Content Blocks
  {
    id: 'card',
    type: 'card',
    name: '카드',
    description: '카드형 콘텐츠',
    icon: AlignLeft,
    category: 'content',
    defaultData: {
      card: {
        title: '카드 제목',
        description: '카드 설명을 입력하세요',
        image: 'https://via.placeholder.com/300x200'
      }
    }
  },
  {
    id: 'testimonial',
    type: 'testimonial',
    name: '후기',
    description: '고객 후기 블록',
    icon: MessageSquare,
    category: 'content',
    defaultData: {
      testimonial: {
        content: '훌륭한 서비스였습니다!',
        author: '고객 이름',
        position: '직책',
        rating: 5
      }
    }
  },

  // Homepage Sections
  {
    id: 'problem_awareness',
    type: 'problem_awareness',
    name: '문제점 인식',
    description: '고객의 문제점을 제시하는 섹션',
    icon: AlertTriangle,
    category: 'homepage',
    defaultData: {
      section: {
        title: '혹시 이런 고민이 있으신가요?',
        subtitle: '많은 분들이 겪는 공통 고민들입니다',
        problems: [
          {
            icon: '😫',
            title: '문제점 1',
            description: '문제점에 대한 설명을 입력하세요'
          }
        ],
        callToAction: {
          title: '이 모든 문제, 해결할 수 있습니다!',
          description: '전문적인 솔루션으로 문제를 해결하세요',
          buttonText: '해결책 알아보기',
          buttonUrl: '/consultation'
        }
      }
    }
  },
  {
    id: 'solution',
    type: 'solution',
    name: '솔루션 제시',
    description: '문제 해결 방법을 제시하는 섹션',
    icon: Target,
    category: 'homepage',
    defaultData: {
      section: {
        title: '차별화된 솔루션',
        subtitle: '전문적인 시스템으로 문제를 해결합니다',
        solutions: [
          {
            icon: '🔬',
            title: '솔루션 1',
            description: '솔루션에 대한 설명을 입력하세요'
          }
        ]
      }
    }
  },
  {
    id: 'social_proof',
    type: 'social_proof',
    name: '사회적 증명',
    description: '실제 성과와 후기를 보여주는 섹션',
    icon: Users,
    category: 'homepage',
    defaultData: {
      section: {
        title: '이미 많은 분들이 변화를 경험했습니다',
        subtitle: '실제 고객들의 생생한 후기',
        testimonials: [
          {
            name: '김○○님',
            content: '정말 만족스러운 결과였습니다!',
            rating: 5,
            program: '기본 프로그램',
            beforeAfter: {
              before: '이전 상태',
              after: '개선된 상태'
            }
          }
        ],
        achievements: {
          title: '우리의 성과',
          stats: [
            { number: '95%', label: '만족도' }
          ]
        }
      }
    }
  },
  {
    id: 'urgency',
    type: 'urgency',
    name: '긴급성/한정성',
    description: '특별 혜택과 긴급성을 강조하는 섹션',
    icon: Zap,
    category: 'homepage',
    defaultData: {
      section: {
        title: '지금 시작하세요!',
        subtitle: '한정된 기회를 놓치지 마세요',
        offers: [
          {
            title: '특별 혜택',
            description: '지금만 받을 수 있는 특별한 혜택',
            originalPrice: '100,000원',
            discountPrice: '무료',
            validUntil: '이달 말까지',
            limitation: '선착순 10명'
          }
        ],
        urgencyMessages: [
          '⏰ 한정된 시간',
          '🎯 특별한 기회'
        ],
        callToAction: {
          title: '지금 신청하기',
          subtitle: '간단한 신청으로 시작하세요',
          buttonText: '지금 신청하기',
          buttonUrl: '/consultation',
          phoneNumber: '1588-0000'
        }
      }
    }
  },
  {
    id: 'faq',
    type: 'faq',
    name: 'FAQ',
    description: '자주 묻는 질문과 답변 섹션',
    icon: HelpCircle,
    category: 'homepage',
    defaultData: {
      section: {
        title: '자주 묻는 질문',
        subtitle: '궁금한 점들을 확인해보세요',
        faqs: [
          {
            question: '자주 묻는 질문 1',
            answer: '답변을 입력하세요'
          }
        ]
      }
    }
  },

  // About Page Blocks
  {
    id: 'stats',
    type: 'stats',
    name: '통계',
    description: '숫자로 보여주는 성과 섹션',
    icon: BarChart3,
    category: 'about',
    defaultData: {
      stats: {
        title: '우리의 성과',
        subtitle: '숫자로 확인하는 신뢰도',
        items: [
          { number: '95%', label: '만족도', description: '고객 만족도' },
          { number: '1000+', label: '고객 수', description: '누적 고객 수' }
        ]
      }
    }
  },
  {
    id: 'values',
    type: 'values',
    name: '핵심 가치',
    description: '회사의 차별점과 가치 제시',
    icon: Award,
    category: 'about',
    defaultData: {
      values: {
        title: '우리만의 차별점',
        subtitle: '특별한 가치를 제공합니다',
        items: [
          {
            icon: 'Heart',
            title: '고객 중심',
            description: '고객의 만족이 최우선입니다'
          }
        ]
      }
    }
  },
  {
    id: 'mvc',
    type: 'mvc',
    name: 'Mission & Vision',
    description: '사명, 비전, 핵심가치 섹션',
    icon: Target,
    category: 'about',
    defaultData: {
      mvc: {
        title: 'MVC - 우리는 무엇을 하고, 왜 하는가',
        subtitle: '우리의 사명, 비전, 핵심가치',
        items: [
          {
            title: 'Mission',
            subtitle: '우리의 사명',
            description: '고객에게 최고의 가치를 제공합니다',
            icon: 'Target'
          }
        ]
      }
    }
  },
  {
    id: 'principles',
    type: 'principles',
    name: '운영 원칙',
    description: '회사 운영 원칙과 규칙',
    icon: Users,
    category: 'about',
    defaultData: {
      principles: {
        title: '일하는 원칙',
        subtitle: '우리가 지키는 원칙들',
        items: [
          '고객 만족이 최우선입니다',
          '정직하고 투명하게 운영합니다'
        ]
      }
    }
  },
  {
    id: 'timeline',
    type: 'timeline',
    name: '연혁',
    description: '회사의 성장 과정과 역사',
    icon: Clock,
    category: 'about',
    defaultData: {
      timeline: {
        title: '우리의 성장 스토리',
        subtitle: '지금까지의 발걸음',
        milestones: [
          {
            year: '2024',
            title: '회사 설립',
            description: '새로운 시작을 알리는 첫걸음'
          }
        ]
      }
    }
  },
  {
    id: 'contact_info',
    type: 'contact_info',
    name: '연락처 정보',
    description: '연락처 및 소셜미디어 정보',
    icon: Phone,
    category: 'about',
    defaultData: {
      contact_info: {
        title: '연락처 및 소셜미디어',
        subtitle: '다양한 채널로 소통하세요',
        contacts: [
          {
            icon: 'Phone',
            label: '전화문의',
            value: '02-1234-5678',
            link: 'tel:02-1234-5678'
          }
        ],
        tagline: {
          title: '우리와 함께하세요',
          subtitle: 'COMPANY NAME'
        }
      }
    }
  },

  // Locations Page Blocks
  {
    id: 'locations',
    type: 'locations',
    name: '지점 안내',
    description: '여러 지점 정보와 시설 안내',
    icon: MapPin,
    category: 'locations',
    defaultData: {
      locations: {
        title: '지점 안내',
        subtitle: '가까운 지점을 찾아보세요',
        locations: [
          {
            id: 'main',
            name: '본점',
            address: '서울특별시 강남구 테헤란로 123',
            phone: '02-1234-5678',
            hours: '09:00-18:00',
            image: '/images/location-main.jpg',
            description: '메인 지점입니다',
            features: ['주차 가능', '최신 시설'],
            facilities: [
              {
                icon: 'Dumbbell',
                name: '운동 시설',
                description: '최신 운동 기구 완비'
              }
            ],
            trainers: [
              {
                id: 1,
                name: '김트레이너',
                specialty: '전문 트레이닝',
                experience: '5년',
                rating: 4.9,
                image: '/images/trainer1.jpg',
                certifications: ['자격증1', '자격증2'],
                achievements: '다수의 성공 사례'
              }
            ]
          }
        ]
      }
    }
  },

  // Programs Page Blocks
  {
    id: 'programs',
    type: 'programs',
    name: '프로그램',
    description: '다양한 프로그램 소개',
    icon: Target,
    category: 'programs',
    defaultData: {
      programs: {
        title: '프로그램 안내',
        subtitle: '다양한 프로그램을 만나보세요',
        programs: [
          {
            name: '기본 프로그램',
            description: '기초부터 시작하는 프로그램',
            image: {
              src: '/images/program1.jpg',
              alt: '기본 프로그램'
            },
            price: '월 10만원',
            duration: '60분',
            participants: '1:1 개인',
            level: '초급~중급'
          }
        ]
      }
    }
  },

  // Reviews Page Blocks
  {
    id: 'reviews',
    type: 'reviews',
    name: '후기',
    description: '고객 후기 모음',
    icon: Star,
    category: 'reviews',
    defaultData: {
      reviews: {
        title: '고객 후기',
        subtitle: '실제 고객들의 생생한 후기',
        reviews: [
          {
            name: '김고객',
            content: '정말 만족스러운 서비스였습니다!',
            rating: 5,
            program: '기본 프로그램',
            image: '/images/customer1.jpg',
            date: '2024-01-15'
          }
        ]
      }
    }
  }
]

interface BlockLibraryProps {
  searchTerm: string
}

interface DraggableBlockProps {
  blockType: BlockType
}

function DraggableBlock({ blockType }: DraggableBlockProps) {
  const addBlock = useCMSStore(state => state.addBlock)

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'block',
    item: { 
      type: blockType.type,
      data: blockType.defaultData
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }))

  const handleAddBlock = () => {
    addBlock({
      type: blockType.type,
      order: 0, // Will be set correctly by the store
      data: blockType.defaultData
    })
  }

  return (
    <div
      ref={drag as unknown as React.Ref<HTMLDivElement>}
      className={`
        block-item p-3 border-2 border-dashed border-gray-300 rounded-lg cursor-move
        hover:border-blue-400 hover:bg-blue-50 transition-colors
        ${isDragging ? 'opacity-50' : ''}
      `}
      onClick={handleAddBlock}
    >
      <div className="flex items-center space-x-3">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
            <blockType.icon className="w-5 h-5 text-gray-600" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-gray-900 truncate">
            {blockType.name}
          </h3>
          <p className="text-xs text-gray-500 truncate">
            {blockType.description}
          </p>
        </div>
      </div>
    </div>
  )
}

export function BlockLibrary({ searchTerm }: BlockLibraryProps) {
  const filteredBlocks = blockTypes.filter(block =>
    block.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    block.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const categories = [
    { id: 'basic', name: '기본 블록', icon: Type },
    { id: 'layout', name: '레이아웃', icon: Layout },
    { id: 'content', name: '콘텐츠', icon: AlignLeft },
    { id: 'media', name: '미디어', icon: Image },
    { id: 'homepage', name: '홈페이지 섹션', icon: Target },
    { id: 'about', name: '소개 페이지', icon: Award },
    { id: 'locations', name: '지점 안내', icon: MapPin },
    { id: 'programs', name: '프로그램', icon: Target },
    { id: 'reviews', name: '후기', icon: Star }
  ]

  return (
    <div className="space-y-6">
      {categories.map(category => {
        const categoryBlocks = filteredBlocks.filter(block => block.category === category.id)
        
        if (categoryBlocks.length === 0) return null

        return (
          <div key={category.id}>
            <div className="flex items-center space-x-2 mb-3">
              <category.icon className="w-4 h-4 text-gray-600" />
              <h3 className="text-sm font-semibold text-gray-900">
                {category.name}
              </h3>
            </div>
            <div className="space-y-2">
              {categoryBlocks.map(blockType => (
                <DraggableBlock key={blockType.id} blockType={blockType} />
              ))}
            </div>
          </div>
        )
      })}

      {filteredBlocks.length === 0 && (
        <div className="text-center py-8">
          <Grid className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            블록을 찾을 수 없습니다
          </h3>
          <p className="text-gray-600">
            다른 검색어로 시도해보세요
          </p>
        </div>
      )}
    </div>
  )
}