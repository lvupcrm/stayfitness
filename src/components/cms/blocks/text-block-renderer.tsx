'use client'

import { RichTextEditor } from '../rich-text-editor'
import type { ContentBlock } from '@/types/cms'

interface TextBlockRendererProps {
  block: ContentBlock
  isEditing: boolean
  onUpdate: (updates: Partial<ContentBlock>) => void
}

export function TextBlockRenderer({ block, isEditing, onUpdate }: TextBlockRendererProps) {
  const textData = block.data.text || {}

  const handleContentChange = (content: string) => {
    onUpdate({
      data: {
        ...block.data,
        text: {
          ...textData,
          content
        }
      }
    })
  }

  const handleHeadingChange = (heading: string) => {
    onUpdate({
      data: {
        ...block.data,
        text: {
          ...textData,
          heading
        }
      }
    })
  }

  const getAlignment = () => {
    return textData.alignment || 'left'
  }

  if (isEditing) {
    return (
      <div className="space-y-4 p-4">
        {/* Heading Editor */}
        {textData.heading !== undefined && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              제목
            </label>
            <input
              type="text"
              value={textData.heading || ''}
              onChange={(e) => handleHeadingChange(e.target.value)}
              placeholder="제목을 입력하세요"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {/* Content Editor */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            내용
          </label>
          <RichTextEditor
            content={textData.content || ''}
            onChange={handleContentChange}
            placeholder={textData.heading !== undefined ? "내용을 입력하세요..." : "텍스트를 입력하세요..."}
            className="min-h-[120px]"
          />
        </div>

        {/* Alignment Options */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            정렬
          </label>
          <div className="flex space-x-2">
            {['left', 'center', 'right'].map((align) => (
              <button
                key={align}
                onClick={() => onUpdate({
                  data: {
                    ...block.data,
                    text: {
                      ...textData,
                      alignment: align as 'left' | 'center' | 'right'
                    }
                  }
                })}
                className={`
                  px-3 py-1 text-sm rounded border
                  ${getAlignment() === align
                    ? 'bg-blue-100 border-blue-300 text-blue-700'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                  }
                `}
              >
                {align === 'left' ? '왼쪽' : align === 'center' ? '가운데' : '오른쪽'}
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Preview mode
  return (
    <div 
      className={`
        p-6 
        ${getAlignment() === 'center' ? 'text-center' : 
          getAlignment() === 'right' ? 'text-right' : 'text-left'}
      `}
      style={block.styles ? {
        backgroundColor: block.styles.backgroundColor,
        color: block.styles.textColor,
        padding: block.styles.padding ? 
          `${block.styles.padding.top || 0}px ${block.styles.padding.right || 0}px ${block.styles.padding.bottom || 0}px ${block.styles.padding.left || 0}px` :
          undefined
      } : undefined}
    >
      {textData.heading && (
        <h2 className="text-2xl font-bold mb-4">
          {textData.heading}
        </h2>
      )}
      
      {textData.content && (
        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: textData.content }}
        />
      )}
      
      {!textData.heading && !textData.content && (
        <p className="text-gray-500 italic">
          텍스트를 입력하세요
        </p>
      )}
    </div>
  )
}