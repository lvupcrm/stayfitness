'use client'

import { useState } from 'react'
import { 
  GripVertical, 
  ChevronDown, 
  ChevronRight,
  Type,
  Image,
  Video,
  MousePointer,
  Layout,
  MessageSquare,
  Grid
} from 'lucide-react'
import { useCMSStore } from '@/hooks/useCMSStore'
import type { ContentBlock } from '@/types/cms'

const blockIcons = {
  text: Type,
  image: Image,
  video: Video,
  button: MousePointer,
  hero: Layout,
  section: Grid,
  card: Layout,
  testimonial: MessageSquare
}

export function PageLayers() {
  const [expandedBlocks, setExpandedBlocks] = useState<Set<string>>(new Set())
  
  const {
    currentPage,
    selectedBlock,
    setSelectedBlock,
    moveBlock
  } = useCMSStore()

  const blocks = currentPage?.blocks || []

  const toggleExpanded = (blockId: string) => {
    const newExpanded = new Set(expandedBlocks)
    if (newExpanded.has(blockId)) {
      newExpanded.delete(blockId)
    } else {
      newExpanded.add(blockId)
    }
    setExpandedBlocks(newExpanded)
  }

  const getBlockTitle = (block: ContentBlock) => {
    switch (block.type) {
      case 'text':
        return block.data.text?.heading || block.data.text?.content?.slice(0, 30) || '텍스트 블록'
      case 'hero':
        return block.data.hero?.title || '히어로 섹션'
      case 'button':
        return block.data.button?.text || '버튼'
      case 'image':
        return block.data.image?.alt || '이미지'
      case 'video':
        return '동영상'
      case 'card':
        return block.data.card?.title || '카드'
      case 'testimonial':
        return `${block.data.testimonial?.author || '고객'} 후기`
      default:
        return `${block.type} 블록`
    }
  }

  const handleMoveUp = (index: number) => {
    if (index > 0) {
      moveBlock(index, index - 1)
    }
  }

  const handleMoveDown = (index: number) => {
    if (index < blocks.length - 1) {
      moveBlock(index, index + 1)
    }
  }

  if (blocks.length === 0) {
    return (
      <div className="text-center py-8">
        <Grid className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">레이어가 없습니다</h3>
        <p className="text-gray-600">블록을 추가하면 여기에 표시됩니다</p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-900">페이지 레이어</h3>
        <span className="text-xs text-gray-500">{blocks.length}개 블록</span>
      </div>

      <div className="space-y-1">
        {blocks.map((block, index) => {
          const Icon = blockIcons[block.type] || Type
          const isSelected = selectedBlock === block.id
          const isExpanded = expandedBlocks.has(block.id)

          return (
            <div
              key={block.id}
              className={`
                group border rounded-lg transition-all duration-200
                ${isSelected 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300 bg-white'
                }
              `}
            >
              {/* Block Header */}
              <div
                className="flex items-center p-3 cursor-pointer"
                onClick={() => setSelectedBlock(block.id)}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleExpanded(block.id)
                  }}
                  className="mr-2 p-1 hover:bg-gray-100 rounded"
                >
                  {isExpanded ? (
                    <ChevronDown className="w-3 h-3" />
                  ) : (
                    <ChevronRight className="w-3 h-3" />
                  )}
                </button>

                <Icon className={`w-4 h-4 mr-3 ${isSelected ? 'text-blue-600' : 'text-gray-500'}`} />
                
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${isSelected ? 'text-blue-900' : 'text-gray-900'}`}>
                    {getBlockTitle(block)}
                  </p>
                  <p className="text-xs text-gray-500">
                    {block.type} • 순서 {index + 1}
                  </p>
                </div>

                {/* Block Controls */}
                <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleMoveUp(index)
                    }}
                    disabled={index === 0}
                    className="p-1 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                    title="위로 이동"
                  >
                    <ChevronDown className="w-3 h-3 rotate-180" />
                  </button>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleMoveDown(index)
                    }}
                    disabled={index === blocks.length - 1}
                    className="p-1 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                    title="아래로 이동"
                  >
                    <ChevronDown className="w-3 h-3" />
                  </button>

                  <GripVertical className="w-3 h-3 text-gray-400 cursor-move" />
                </div>
              </div>

              {/* Block Details */}
              {isExpanded && (
                <div className="px-3 pb-3 border-t border-gray-100">
                  <div className="pt-3 space-y-2">
                    <div className="text-xs text-gray-600">
                      <div className="flex justify-between">
                        <span>생성: {new Date(block.created_at).toLocaleDateString()}</span>
                        <span>수정: {new Date(block.updated_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    {/* Block specific details */}
                    <div className="text-xs text-gray-700">
                      {block.type === 'text' && block.data.text?.content && (
                        <p className="truncate">내용: {block.data.text.content.replace(/<[^>]*>/g, '').slice(0, 50)}...</p>
                      )}
                      {block.type === 'image' && block.data.image?.url && (
                        <p className="truncate">이미지: {block.data.image.url}</p>
                      )}
                      {block.type === 'button' && block.data.button?.url && (
                        <p className="truncate">링크: {block.data.button.url}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}