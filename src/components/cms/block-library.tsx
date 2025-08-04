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
  HelpCircle
} from 'lucide-react'
import { useCMSStore } from '@/hooks/useCMSStore'
import type { ContentBlock } from '@/types/cms'

interface BlockType {
  id: string
  type: ContentBlock['type']
  name: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  category: 'basic' | 'layout' | 'content' | 'media' | 'homepage'
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
    { id: 'homepage', name: '홈페이지 섹션', icon: Target }
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