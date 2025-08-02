'use client'

import { useState } from 'react'
import { Image as ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { ContentBlock } from '@/types/cms'

interface HeroBlockRendererProps {
  block: ContentBlock
  isEditing: boolean
  onUpdate: (updates: Partial<ContentBlock>) => void
}

export function HeroBlockRenderer({ block, isEditing, onUpdate }: HeroBlockRendererProps) {
  const [isUploading, setIsUploading] = useState(false)
  const heroData = block.data.hero || {}

  const handleTitleChange = (title: string) => {
    onUpdate({
      data: {
        ...block.data,
        hero: {
          ...heroData,
          title
        }
      }
    })
  }

  const handleSubtitleChange = (subtitle: string) => {
    onUpdate({
      data: {
        ...block.data,
        hero: {
          ...heroData,
          subtitle
        }
      }
    })
  }

  const handleBackgroundImageChange = (backgroundImage: string) => {
    onUpdate({
      data: {
        ...block.data,
        hero: {
          ...heroData,
          backgroundImage
        }
      }
    })
  }

  const handleCtaChange = (field: string, value: string) => {
    onUpdate({
      data: {
        ...block.data,
        hero: {
          ...heroData,
          ctaButton: {
            ...heroData.ctaButton,
            [field]: value
          }
        }
      }
    })
  }

  const handleImageUpload = async (file: File) => {
    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('alt_text', '히어로 배경 이미지')

      const response = await fetch('/api/cms/media', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        throw new Error('업로드 실패')
      }

      const result = await response.json()
      if (result.success) {
        handleBackgroundImageChange(result.data.url)
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

  if (isEditing) {
    return (
      <div className="space-y-6 p-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            메인 제목
          </label>
          <Input
            type="text"
            placeholder="메인 제목을 입력하세요"
            value={heroData.title || ''}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="text-lg"
          />
        </div>

        {/* Subtitle */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            부제목
          </label>
          <Input
            type="text"
            placeholder="부제목을 입력하세요"
            value={heroData.subtitle || ''}
            onChange={(e) => handleSubtitleChange(e.target.value)}
          />
        </div>

        {/* Background Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            배경 이미지
          </label>
          
          {heroData.backgroundImage ? (
            <div className="space-y-3">
              <div className="relative">
                <img
                  src={heroData.backgroundImage}
                  alt="히어로 배경"
                  className="w-full h-32 object-cover rounded-lg border"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleBackgroundImageChange('')}
                  className="absolute top-2 right-2"
                >
                  제거
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {/* File Upload */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <div className="space-y-2">
                  <label className="cursor-pointer">
                    <span className="bg-blue-600 text-white px-3 py-1 text-sm rounded-md hover:bg-blue-700 transition-colors">
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
                  <p className="text-xs text-gray-500">
                    또는 URL을 입력하세요
                  </p>
                </div>
              </div>

              {/* URL Input */}
              <Input
                type="url"
                placeholder="https://example.com/background.jpg"
                value={heroData.backgroundImage || ''}
                onChange={(e) => handleBackgroundImageChange(e.target.value)}
              />
            </div>
          )}
        </div>

        {/* CTA Button */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            액션 버튼 (선택사항)
          </label>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Input
                type="text"
                placeholder="버튼 텍스트"
                value={heroData.ctaButton?.text || ''}
                onChange={(e) => handleCtaChange('text', e.target.value)}
              />
            </div>
            <div>
              <Input
                type="url"
                placeholder="버튼 링크"
                value={heroData.ctaButton?.url || ''}
                onChange={(e) => handleCtaChange('url', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Preview */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            미리보기
          </label>
          <div className="border rounded-lg overflow-hidden">
            <div
              className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 text-center"
              style={{
                backgroundImage: heroData.backgroundImage ? `url(${heroData.backgroundImage})` : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {heroData.backgroundImage && (
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
              )}
              <div className="relative z-10">
                <h1 className="text-2xl font-bold mb-2">
                  {heroData.title || '메인 제목'}
                </h1>
                {heroData.subtitle && (
                  <p className="text-lg opacity-90 mb-4">
                    {heroData.subtitle}
                  </p>
                )}
                {heroData.ctaButton?.text && (
                  <Button variant="secondary" size="lg">
                    {heroData.ctaButton.text}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Preview mode
  return (
    <div
      className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 px-6 text-center"
      style={{
        backgroundImage: heroData.backgroundImage ? `url(${heroData.backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '400px'
      }}
    >
      {heroData.backgroundImage && (
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      )}
      
      <div className="relative z-10 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          {heroData.title || '메인 제목을 입력하세요'}
        </h1>
        
        {heroData.subtitle && (
          <p className="text-xl md:text-2xl opacity-90 mb-8 max-w-2xl mx-auto">
            {heroData.subtitle}
          </p>
        )}
        
        {heroData.ctaButton?.text && heroData.ctaButton?.url && (
          <Button 
            variant="secondary" 
            size="lg"
            asChild
            className="text-lg px-8 py-3"
          >
            <a href={heroData.ctaButton.url}>
              {heroData.ctaButton.text}
            </a>
          </Button>
        )}
      </div>
    </div>
  )
}