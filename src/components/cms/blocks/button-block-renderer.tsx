'use client'

import { MousePointer } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { ContentBlock } from '@/types/cms'

interface ButtonBlockRendererProps {
  block: ContentBlock
  isEditing: boolean
  onUpdate: (updates: Partial<ContentBlock>) => void
}

export function ButtonBlockRenderer({ block, isEditing, onUpdate }: ButtonBlockRendererProps) {
  const buttonData = block.data.button || {
    text: '버튼 텍스트',
    url: '#',
    variant: 'default' as const,
    size: 'md' as const,
    external: false
  }

  const handleTextChange = (text: string) => {
    onUpdate({
      data: {
        ...block.data,
        button: {
          text,
          url: buttonData.url || '#',
          variant: buttonData.variant || 'default',
          size: buttonData.size || 'md',
          external: buttonData.external || false
        }
      }
    })
  }

  const handleUrlChange = (url: string) => {
    onUpdate({
      data: {
        ...block.data,
        button: {
          text: buttonData.text || '버튼 텍스트',
          url,
          variant: buttonData.variant || 'default',
          size: buttonData.size || 'md',
          external: buttonData.external || false
        }
      }
    })
  }

  const handleVariantChange = (variant: 'default' | 'secondary' | 'outline') => {
    onUpdate({
      data: {
        ...block.data,
        button: {
          text: buttonData.text || '버튼 텍스트',
          url: buttonData.url || '#',
          variant,
          size: buttonData.size || 'md',
          external: buttonData.external || false
        }
      }
    })
  }

  const handleSizeChange = (size: 'sm' | 'md' | 'lg') => {
    onUpdate({
      data: {
        ...block.data,
        button: {
          text: buttonData.text || '버튼 텍스트',
          url: buttonData.url || '#',
          variant: buttonData.variant || 'default',
          size,
          external: buttonData.external || false
        }
      }
    })
  }

  const handleExternalChange = (external: boolean) => {
    onUpdate({
      data: {
        ...block.data,
        button: {
          text: buttonData.text || '버튼 텍스트',
          url: buttonData.url || '#',
          variant: buttonData.variant || 'default',
          size: buttonData.size || 'md',
          external
        }
      }
    })
  }

  if (isEditing) {
    return (
      <div className="space-y-4 p-4">
        {/* Button Text */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            버튼 텍스트
          </label>
          <Input
            type="text"
            placeholder="버튼 텍스트"
            value={buttonData.text || ''}
            onChange={(e) => handleTextChange(e.target.value)}
          />
        </div>

        {/* Button URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            링크 URL
          </label>
          <Input
            type="url"
            placeholder="https://example.com 또는 /page"
            value={buttonData.url || ''}
            onChange={(e) => handleUrlChange(e.target.value)}
          />
        </div>

        {/* Button Variant */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            스타일
          </label>
          <div className="flex space-x-2">
            {[
              { value: 'default', label: '기본' },
              { value: 'secondary', label: '보조' },
              { value: 'outline', label: '외곽선' }
            ].map((variant) => (
              <button
                key={variant.value}
                onClick={() => handleVariantChange(variant.value as 'default' | 'secondary' | 'outline')}
                className={`
                  px-3 py-1 text-sm rounded border
                  ${(buttonData.variant || 'default') === variant.value
                    ? 'bg-blue-100 border-blue-300 text-blue-700'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                  }
                `}
              >
                {variant.label}
              </button>
            ))}
          </div>
        </div>

        {/* Button Size */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            크기
          </label>
          <div className="flex space-x-2">
            {[
              { value: 'sm', label: '작게' },
              { value: 'md', label: '보통' },
              { value: 'lg', label: '크게' }
            ].map((size) => (
              <button
                key={size.value}
                onClick={() => handleSizeChange(size.value as 'sm' | 'md' | 'lg')}
                className={`
                  px-3 py-1 text-sm rounded border
                  ${(buttonData.size || 'md') === size.value
                    ? 'bg-blue-100 border-blue-300 text-blue-700'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                  }
                `}
              >
                {size.label}
              </button>
            ))}
          </div>
        </div>

        {/* External Link */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="external-link"
            checked={buttonData.external || false}
            onChange={(e) => handleExternalChange(e.target.checked)}
            className="rounded border-gray-300"
          />
          <label htmlFor="external-link" className="text-sm text-gray-700">
            새 탭에서 열기
          </label>
        </div>

        {/* Preview */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            미리보기
          </label>
          <div className="p-4 bg-gray-50 rounded-lg">
            <Button
              variant={buttonData.variant || 'default'}
              size={buttonData.size === 'md' ? 'default' : buttonData.size || 'default'}
              className="pointer-events-none"
            >
              {buttonData.text || '버튼 텍스트'}
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Preview mode
  return (
    <div className="p-6 text-center">
      {buttonData.text && buttonData.url ? (
        <Button
          variant={buttonData.variant || 'default'}
          size={buttonData.size === 'md' ? 'default' : buttonData.size || 'default'}
          asChild
        >
          <a
            href={buttonData.url}
            target={buttonData.external ? '_blank' : undefined}
            rel={buttonData.external ? 'noopener noreferrer' : undefined}
          >
            {buttonData.text}
          </a>
        </Button>
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
          <MousePointer className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">버튼을 설정하세요</p>
        </div>
      )}
    </div>
  )
}