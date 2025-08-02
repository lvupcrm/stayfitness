'use client'

import { Star, MessageSquare } from 'lucide-react'
import { Input } from '@/components/ui/input'
import type { ContentBlock } from '@/types/cms'

interface TestimonialBlockRendererProps {
  block: ContentBlock
  isEditing: boolean
  onUpdate: (updates: Partial<ContentBlock>) => void
}

export function TestimonialBlockRenderer({ block, isEditing, onUpdate }: TestimonialBlockRendererProps) {
  const testimonialData = block.data.testimonial || {}

  const handleFieldChange = (field: string, value: string | number) => {
    onUpdate({
      data: {
        ...block.data,
        testimonial: {
          ...testimonialData,
          [field]: value
        }
      }
    })
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ))
  }

  if (isEditing) {
    return (
      <div className="space-y-4 p-4">
        {/* Testimonial Content */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            후기 내용
          </label>
          <textarea
            placeholder="고객 후기를 입력하세요"
            value={testimonialData.content || ''}
            onChange={(e) => handleFieldChange('content', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows={4}
          />
        </div>

        {/* Author Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            고객 이름
          </label>
          <Input
            type="text"
            placeholder="고객 이름을 입력하세요"
            value={testimonialData.author || ''}
            onChange={(e) => handleFieldChange('author', e.target.value)}
          />
        </div>

        {/* Author Position */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            직책/소속 (선택사항)
          </label>
          <Input
            type="text"
            placeholder="직책이나 소속을 입력하세요"
            value={testimonialData.position || ''}
            onChange={(e) => handleFieldChange('position', e.target.value)}
          />
        </div>

        {/* Avatar */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            프로필 이미지 URL (선택사항)
          </label>
          <Input
            type="url"
            placeholder="https://example.com/avatar.jpg"
            value={testimonialData.avatar || ''}
            onChange={(e) => handleFieldChange('avatar', e.target.value)}
          />
        </div>

        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            평점
          </label>
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              {Array.from({ length: 5 }, (_, i) => (
                <button
                  key={i}
                  onClick={() => handleFieldChange('rating', i + 1)}
                  className="focus:outline-none"
                >
                  <Star
                    className={`w-6 h-6 ${
                      i < (testimonialData.rating || 0) 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-gray-300 hover:text-yellow-300'
                    }`}
                  />
                </button>
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {testimonialData.rating || 0}/5
            </span>
          </div>
        </div>

        {/* Preview */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            미리보기
          </label>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="bg-white p-6 rounded-lg shadow-sm border max-w-md">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  {testimonialData.avatar ? (
                    <img
                      src={testimonialData.avatar}
                      alt={testimonialData.author || ''}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                      <MessageSquare className="w-6 h-6 text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-1 mb-2">
                    {renderStars(testimonialData.rating || 0)}
                  </div>
                  <p className="text-gray-800 mb-3">
                    "{testimonialData.content || '고객 후기를 입력하세요'}"
                  </p>
                  <div className="text-sm">
                    <p className="font-medium text-gray-900">
                      {testimonialData.author || '고객 이름'}
                    </p>
                    {testimonialData.position && (
                      <p className="text-gray-600">
                        {testimonialData.position}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Preview mode
  return (
    <div className="p-6">
      <div className="bg-white p-8 rounded-xl shadow-lg border max-w-2xl mx-auto">
        <div className="flex items-start space-x-6">
          <div className="flex-shrink-0">
            {testimonialData.avatar ? (
              <img
                src={testimonialData.avatar}
                alt={testimonialData.author || ''}
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                <MessageSquare className="w-8 h-8 text-gray-400" />
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center space-x-1 mb-4">
              {renderStars(testimonialData.rating || 5)}
            </div>
            
            <blockquote className="text-lg text-gray-800 mb-6 italic">
              "{testimonialData.content || '훌륭한 서비스였습니다! 추천합니다.'}"
            </blockquote>
            
            <div>
              <p className="font-semibold text-gray-900 text-lg">
                {testimonialData.author || '고객 이름'}
              </p>
              {testimonialData.position && (
                <p className="text-gray-600">
                  {testimonialData.position}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}