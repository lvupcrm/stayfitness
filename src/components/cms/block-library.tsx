'use client'

import { useDrag } from 'react-dnd'
import { 
  Type, 
  Image, 
  Video, 
  MousePointer, 
  Layout,
  Star,
  MessageSquare,
  Grid,
  Heading,
  AlignLeft
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCMSStore } from '@/hooks/useCMSStore'
import type { ContentBlock } from '@/types/cms'

interface BlockType {
  id: string
  type: ContentBlock['type']
  name: string
  description: string
  icon: React.ComponentType<any>
  category: 'basic' | 'layout' | 'content' | 'media'
  defaultData: any
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
      ref={drag}
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
    { id: 'media', name: '미디어', icon: Image }
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