'use client'

import { useState } from 'react'
import { 
  Copy, 
  Trash2, 
  Settings,
  ChevronUp,
  ChevronDown
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCMSStore } from '@/hooks/useCMSStore'
import type { ContentBlock } from '@/types/cms'

// Block Components
import { TextBlockRenderer } from './blocks/text-block-renderer'
import { ImageBlockRenderer } from './blocks/image-block-renderer'
import { VideoBlockRenderer } from './blocks/video-block-renderer'
import { ButtonBlockRenderer } from './blocks/button-block-renderer'
import { HeroBlockRenderer } from './blocks/hero-block-renderer'
import { CardBlockRenderer } from './blocks/card-block-renderer'
import { TestimonialBlockRenderer } from './blocks/testimonial-block-renderer'
import { ProblemAwarenessBlockRenderer } from './blocks/problem-awareness-block-renderer'
import { SolutionBlockRenderer } from './blocks/solution-block-renderer'
import { SocialProofBlockRenderer } from './blocks/social-proof-block-renderer'
import { UrgencyBlockRenderer } from './blocks/urgency-block-renderer'
import { FAQBlockRenderer } from './blocks/faq-block-renderer'
import { StatsBlockRenderer } from './blocks/stats-block-renderer'
import { ValuesBlockRenderer } from './blocks/values-block-renderer'
import { MVCBlockRenderer } from './blocks/mvc-block-renderer'
import { PrinciplesBlockRenderer } from './blocks/principles-block-renderer'
import { TimelineBlockRenderer } from './blocks/timeline-block-renderer'
import { LocationsBlockRenderer } from './blocks/locations-block-renderer'
import { ProgramsBlockRenderer } from './blocks/programs-block-renderer'
import { ReviewsBlockRenderer } from './blocks/reviews-block-renderer'
import { ContactInfoBlockRenderer } from './blocks/contact-info-block-renderer'

interface BlockRendererProps {
  block: ContentBlock
  isEditing: boolean
  isHovered: boolean
}

export function BlockRenderer({ block, isEditing, isHovered }: BlockRendererProps) {
  const [showToolbar, setShowToolbar] = useState(false)
  
  const {
    selectedBlock,
    setSelectedBlock,
    updateBlock,
    deleteBlock,
    duplicateBlock,
    currentPage
  } = useCMSStore()

  const isSelected = selectedBlock === block.id
  const blockIndex = currentPage?.blocks.findIndex(b => b.id === block.id) ?? -1
  const totalBlocks = currentPage?.blocks.length ?? 0

  const handleSelect = () => {
    if (isEditing) {
      setSelectedBlock(block.id)
    }
  }

  const handleUpdate = (updates: Partial<ContentBlock>) => {
    updateBlock(block.id, updates)
  }

  const handleDelete = () => {
    deleteBlock(block.id)
  }

  const handleDuplicate = () => {
    duplicateBlock(block.id)
  }

  const handleMoveUp = () => {
    if (blockIndex > 0) {
      // Move block up
      const blocks = [...(currentPage?.blocks || [])]
      const temp = blocks[blockIndex]
      blocks[blockIndex] = blocks[blockIndex - 1]
      blocks[blockIndex - 1] = temp
      
      // Update orders
      blocks.forEach((b, index) => {
        updateBlock(b.id, { order: index })
      })
    }
  }

  const handleMoveDown = () => {
    if (blockIndex < totalBlocks - 1) {
      // Move block down
      const blocks = [...(currentPage?.blocks || [])]
      const temp = blocks[blockIndex]
      blocks[blockIndex] = blocks[blockIndex + 1]
      blocks[blockIndex + 1] = temp
      
      // Update orders
      blocks.forEach((b, index) => {
        updateBlock(b.id, { order: index })
      })
    }
  }

  const renderBlockContent = () => {
    switch (block.type) {
      case 'text':
        return (
          <TextBlockRenderer
            block={block}
            isEditing={isEditing}
            onUpdate={handleUpdate}
          />
        )
      case 'image':
        return (
          <ImageBlockRenderer
            block={block}
            isEditing={isEditing}
            onUpdate={handleUpdate}
          />
        )
      case 'video':
        return (
          <VideoBlockRenderer
            block={block}
            isEditing={isEditing}
            onUpdate={handleUpdate}
          />
        )
      case 'button':
        return (
          <ButtonBlockRenderer
            block={block}
            isEditing={isEditing}
            onUpdate={handleUpdate}
          />
        )
      case 'hero':
        return (
          <HeroBlockRenderer
            block={block}
            isEditing={isEditing}
            onUpdate={handleUpdate}
          />
        )
      case 'section':
        return (
          <TextBlockRenderer
            block={block}
            isEditing={isEditing}
            onUpdate={handleUpdate}
          />
        )
      case 'card':
        return (
          <CardBlockRenderer
            block={block}
            isEditing={isEditing}
            onUpdate={handleUpdate}
          />
        )
      case 'testimonial':
        return (
          <TestimonialBlockRenderer
            block={block}
            isEditing={isEditing}
            onUpdate={handleUpdate}
          />
        )
      case 'problem_awareness':
        return (
          <ProblemAwarenessBlockRenderer
            block={block}
            isEditing={isEditing}
          />
        )
      case 'solution':
        return (
          <SolutionBlockRenderer
            block={block}
            isEditing={isEditing}
          />
        )
      case 'social_proof':
        return (
          <SocialProofBlockRenderer
            block={block}
            isEditing={isEditing}
          />
        )
      case 'urgency':
        return (
          <UrgencyBlockRenderer
            block={block}
            isEditing={isEditing}
          />
        )
      case 'faq':
        return (
          <FAQBlockRenderer
            block={block}
            isEditing={isEditing}
          />
        )
      case 'stats':
        return (
          <StatsBlockRenderer
            block={block}
            isEditing={isEditing}
          />
        )
      case 'values':
        return (
          <ValuesBlockRenderer
            block={block}
            isEditing={isEditing}
          />
        )
      case 'mvc':
        return (
          <MVCBlockRenderer
            block={block}
            isEditing={isEditing}
          />
        )
      case 'principles':
        return (
          <PrinciplesBlockRenderer
            block={block}
            isEditing={isEditing}
          />
        )
      case 'timeline':
        return (
          <TimelineBlockRenderer
            block={block}
            isEditing={isEditing}
          />
        )
      case 'locations':
        return (
          <LocationsBlockRenderer
            block={block}
            isEditing={isEditing}
          />
        )
      case 'programs':
        return (
          <ProgramsBlockRenderer
            block={block}
            isEditing={isEditing}
          />
        )
      case 'reviews':
        return (
          <ReviewsBlockRenderer
            block={block}
            isEditing={isEditing}
          />
        )
      case 'contact_info':
        return (
          <ContactInfoBlockRenderer
            block={block}
            isEditing={isEditing}
          />
        )
      default:
        return (
          <div className="p-4 bg-gray-100 rounded-lg">
            <p className="text-gray-600">알 수 없는 블록 타입: {block.type}</p>
          </div>
        )
    }
  }

  return (
    <div
      className={`
        relative transition-all duration-200
        ${isEditing ? 'cursor-pointer' : ''}
        ${isSelected ? 'ring-2 ring-blue-500' : ''}
        ${isHovered && !isSelected ? 'ring-1 ring-gray-300' : ''}
      `}
      onClick={handleSelect}
      onMouseEnter={() => setShowToolbar(true)}
      onMouseLeave={() => setShowToolbar(false)}
    >
      {/* Block Content */}
      <div className={isEditing ? 'relative' : ''}>
        {renderBlockContent()}
      </div>

      {/* Editing Toolbar */}
      {isEditing && (isHovered || isSelected || showToolbar) && (
        <div className="absolute top-2 right-2 flex items-center space-x-1 bg-white shadow-lg rounded-lg border p-1 z-10">
          {/* Move Up */}
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              handleMoveUp()
            }}
            disabled={blockIndex === 0}
            className="p-1 h-auto"
            title="위로 이동"
          >
            <ChevronUp className="w-4 h-4" />
          </Button>

          {/* Move Down */}
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              handleMoveDown()
            }}
            disabled={blockIndex === totalBlocks - 1}
            className="p-1 h-auto"
            title="아래로 이동"
          >
            <ChevronDown className="w-4 h-4" />
          </Button>

          <div className="w-px h-4 bg-gray-300" />

          {/* Duplicate */}
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              handleDuplicate()
            }}
            className="p-1 h-auto"
            title="복제"
          >
            <Copy className="w-4 h-4" />
          </Button>

          {/* Properties */}
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              setSelectedBlock(block.id)
            }}
            className="p-1 h-auto"
            title="속성 편집"
          >
            <Settings className="w-4 h-4" />
          </Button>

          {/* Delete */}
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              handleDelete()
            }}
            className="p-1 h-auto text-red-600 hover:text-red-700 hover:bg-red-50"
            title="삭제"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* Selection Indicator */}
      {isEditing && isSelected && (
        <div className="absolute -top-3 left-0 bg-blue-500 text-white px-2 py-1 text-xs rounded-t-md font-medium">
          {block.type.charAt(0).toUpperCase() + block.type.slice(1)} 블록
        </div>
      )}
    </div>
  )
}