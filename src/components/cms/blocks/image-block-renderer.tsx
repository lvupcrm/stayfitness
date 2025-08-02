'use client'

import { useState } from 'react'
import { Image as ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { ContentBlock } from '@/types/cms'

interface ImageBlockRendererProps {
  block: ContentBlock
  isEditing: boolean
  onUpdate: (updates: Partial<ContentBlock>) => void
}

export function ImageBlockRenderer({ block, isEditing, onUpdate }: ImageBlockRendererProps) {
  const [isUploading, setIsUploading] = useState(false)
  const imageData = block.data.image || {
    url: '',
    alt: '',
    caption: '',
    width: 0,
    height: 0
  }

  const handleImageUpload = async (file: File) => {
    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('alt_text', imageData.alt || '')

      const response = await fetch('/api/cms/media', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        throw new Error('업로드 실패')
      }

      const result = await response.json()
      if (result.success) {
        onUpdate({
          data: {
            ...block.data,
            image: {
              ...imageData,
              url: result.data.url,
              width: result.data.width,
              height: result.data.height
            }
          }
        })
      }
    } catch (error) {
      console.error('Image upload error:', error)
      alert('이미지 업로드에 실패했습니다')
    } finally {
      setIsUploading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleImageUpload(file)
    }
  }

  const handleUrlChange = (url: string) => {
    onUpdate({
      data: {
        ...block.data,
        image: {
          ...imageData,
          url
        }
      }
    })
  }

  const handleAltChange = (alt: string) => {
    onUpdate({
      data: {
        ...block.data,
        image: {
          ...imageData,
          alt
        }
      }
    })
  }

  const handleCaptionChange = (caption: string) => {
    onUpdate({
      data: {
        ...block.data,
        image: {
          ...imageData,
          caption
        }
      }
    })
  }

  if (isEditing) {
    return (
      <div className="space-y-4 p-4">
        {/* Image Upload/URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            이미지
          </label>
          
          {imageData.url ? (
            <div className="space-y-3">
              <div className="relative">
                <img
                  src={imageData.url}
                  alt={imageData.alt || ''}
                  className="w-full max-w-md h-auto rounded-lg border"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleUrlChange('')}
                  className="absolute top-2 right-2"
                >
                  변경
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {/* File Upload */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <div className="space-y-2">
                  <label className="cursor-pointer">
                    <span className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                      {isUploading ? '업로드 중...' : '파일 선택'}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      disabled={isUploading}
                      className="hidden"
                    />
                  </label>
                  <p className="text-sm text-gray-500">
                    또는 URL을 입력하세요
                  </p>
                </div>
              </div>

              {/* URL Input */}
              <Input
                type="url"
                placeholder="https://example.com/image.jpg"
                value={imageData.url || ''}
                onChange={(e) => handleUrlChange(e.target.value)}
              />
            </div>
          )}
        </div>

        {/* Alt Text */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            대체 텍스트 (접근성)
          </label>
          <Input
            type="text"
            placeholder="이미지 설명"
            value={imageData.alt || ''}
            onChange={(e) => handleAltChange(e.target.value)}
          />
        </div>

        {/* Caption */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            캡션 (선택사항)
          </label>
          <Input
            type="text"
            placeholder="이미지 캡션"
            value={imageData.caption || ''}
            onChange={(e) => handleCaptionChange(e.target.value)}
          />
        </div>
      </div>
    )
  }

  // Preview mode
  return (
    <div className="p-6">
      {imageData.url ? (
        <figure className="space-y-2">
          <img
            src={imageData.url}
            alt={imageData.alt || ''}
            className="w-full h-auto rounded-lg shadow-sm"
            style={{
              maxWidth: imageData.width || 'none',
              maxHeight: imageData.height || 'none'
            }}
          />
          {imageData.caption && (
            <figcaption className="text-sm text-gray-600 text-center italic">
              {imageData.caption}
            </figcaption>
          )}
        </figure>
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
          <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">이미지를 추가하세요</p>
        </div>
      )}
    </div>
  )
}