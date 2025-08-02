'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Image as ImageIcon } from 'lucide-react'
import type { ContentBlock } from '@/types/cms'

interface CardBlockRendererProps {
  block: ContentBlock
  isEditing: boolean
  onUpdate: (updates: Partial<ContentBlock>) => void
}

export function CardBlockRenderer({ block, isEditing, onUpdate }: CardBlockRendererProps) {
  const cardData = block.data.card || {}

  const handleFieldChange = (field: string, value: string) => {
    onUpdate({
      data: {
        ...block.data,
        card: {
          ...cardData,
          [field]: value
        }
      }
    })
  }

  if (isEditing) {
    return (
      <div className="space-y-4 p-4">
        {/* Card Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            카드 제목
          </label>
          <Input
            type="text"
            placeholder="카드 제목을 입력하세요"
            value={cardData.title || ''}
            onChange={(e) => handleFieldChange('title', e.target.value)}
          />
        </div>

        {/* Card Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            카드 설명
          </label>
          <textarea
            placeholder="카드 설명을 입력하세요"
            value={cardData.description || ''}
            onChange={(e) => handleFieldChange('description', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows={3}
          />
        </div>

        {/* Card Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            카드 이미지 URL
          </label>
          <Input
            type="url"
            placeholder="https://example.com/image.jpg"
            value={cardData.image || ''}
            onChange={(e) => handleFieldChange('image', e.target.value)}
          />
        </div>

        {/* Card Link */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            링크 (선택사항)
          </label>
          <Input
            type="url"
            placeholder="https://example.com 또는 /page"
            value={cardData.link || ''}
            onChange={(e) => handleFieldChange('link', e.target.value)}
          />
        </div>

        {/* Card Icon */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            아이콘 (선택사항)
          </label>
          <Input
            type="text"
            placeholder="아이콘 이름 또는 이모지"
            value={cardData.icon || ''}
            onChange={(e) => handleFieldChange('icon', e.target.value)}
          />
        </div>

        {/* Preview */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            미리보기
          </label>
          <div className="p-4 bg-gray-50 rounded-lg">
            <Card className="max-w-sm">
              {cardData.image && (
                <div className="aspect-video overflow-hidden rounded-t-lg">
                  <img
                    src={cardData.image}
                    alt={cardData.title || ''}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  {cardData.icon && (
                    <span className="text-2xl">{cardData.icon}</span>
                  )}
                  <span>{cardData.title || '카드 제목'}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  {cardData.description || '카드 설명을 입력하세요'}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  // Preview mode
  const CardWrapper = cardData.link ? 'a' : 'div'

  return (
    <div className="p-6">
      <CardWrapper
        {...(cardData.link ? {
          href: cardData.link,
          className: "block hover:shadow-lg transition-shadow duration-200"
        } : {})}
      >
        <Card className="h-full">
          {cardData.image && (
            <div className="aspect-video overflow-hidden rounded-t-lg">
              <img
                src={cardData.image}
                alt={cardData.title || ''}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              {cardData.icon && (
                <span className="text-2xl">{cardData.icon}</span>
              )}
              <span>{cardData.title || '카드 제목을 입력하세요'}</span>
            </CardTitle>
          </CardHeader>
          
          <CardContent>
            <p className="text-gray-600">
              {cardData.description || '카드 설명을 입력하세요'}
            </p>
          </CardContent>
        </Card>
      </CardWrapper>
    </div>
  )
}