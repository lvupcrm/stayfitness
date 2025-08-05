'use client'

import { useState, useRef, useEffect } from 'react'
import { Check, X, Edit3 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface InlineEditorProps {
  value: string
  onSave: (newValue: string) => void
  onCancel?: () => void
  isEditing: boolean
  onToggleEdit: () => void
  type?: 'text' | 'textarea' | 'title'
  className?: string
  placeholder?: string
  multiline?: boolean
}

export function InlineEditor({
  value,
  onSave,
  onCancel,
  isEditing,
  onToggleEdit,
  type = 'text',
  className = '',
  placeholder = '텍스트를 입력하세요...',
  multiline = false
}: InlineEditorProps) {
  const [editValue, setEditValue] = useState(value)
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      if (type === 'text' || type === 'title') {
        ;(inputRef.current as HTMLInputElement).select()
      }
    }
  }, [isEditing, type])

  useEffect(() => {
    setEditValue(value)
  }, [value])

  const handleSave = () => {
    onSave(editValue)
    onToggleEdit()
  }

  const handleCancel = () => {
    setEditValue(value)
    onToggleEdit()
    onCancel?.()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault()
      handleSave()
    }
    if (e.key === 'Escape') {
      handleCancel()
    }
  }

  if (!isEditing) {
    return (
      <div 
        className={`group relative ${className}`}
        onClick={onToggleEdit}
      >
        <div className="cursor-pointer hover:bg-blue-50 hover:ring-2 hover:ring-blue-200 rounded p-1 transition-all">
          {value || <span className="text-gray-400 italic">{placeholder}</span>}
        </div>
        <Button
          size="sm"
          variant="ghost"
          className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0 bg-blue-500 text-white hover:bg-blue-600"
          onClick={(e) => {
            e.stopPropagation()
            onToggleEdit()
          }}
        >
          <Edit3 className="h-3 w-3" />
        </Button>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      {multiline || type === 'textarea' ? (
        <textarea
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full p-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          rows={4}
        />
      ) : (
        <input
          ref={inputRef as React.RefObject<HTMLInputElement>}
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={`w-full p-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            type === 'title' ? 'text-2xl font-bold' : ''
          }`}
        />
      )}
      
      <div className="flex gap-1 mt-2">
        <Button
          size="sm"
          onClick={handleSave}
          className="h-8 px-3 bg-green-500 hover:bg-green-600 text-white"
        >
          <Check className="h-3 w-3 mr-1" />
          저장
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={handleCancel}
          className="h-8 px-3"
        >
          <X className="h-3 w-3 mr-1" />
          취소
        </Button>
      </div>
    </div>
  )
}

interface InlineImageEditorProps {
  src: string
  alt: string
  onSave: (newSrc: string, newAlt: string) => void
  isEditing: boolean
  onToggleEdit: () => void
  className?: string
}

export function InlineImageEditor({
  src,
  alt,
  onSave,
  isEditing,
  onToggleEdit,
  className = ''
}: InlineImageEditorProps) {
  const [editSrc, setEditSrc] = useState(src)
  const [editAlt, setEditAlt] = useState(alt)

  useEffect(() => {
    setEditSrc(src)
    setEditAlt(alt)
  }, [src, alt])

  const handleSave = () => {
    onSave(editSrc, editAlt)
    onToggleEdit()
  }

  const handleCancel = () => {
    setEditSrc(src)
    setEditAlt(alt)
    onToggleEdit()
  }

  if (!isEditing) {
    return (
      <div className={`group relative ${className}`} onClick={onToggleEdit}>
        <img 
          src={src} 
          alt={alt} 
          className="cursor-pointer hover:ring-2 hover:ring-blue-300 transition-all rounded"
        />
        <Button
          size="sm"
          variant="ghost"
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0 bg-blue-500 text-white hover:bg-blue-600"
          onClick={(e) => {
            e.stopPropagation()
            onToggleEdit()
          }}
        >
          <Edit3 className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  return (
    <div className={`space-y-3 ${className}`}>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          이미지 URL
        </label>
        <input
          type="url"
          value={editSrc}
          onChange={(e) => setEditSrc(e.target.value)}
          placeholder="https://example.com/image.jpg"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          대체 텍스트 (Alt)
        </label>
        <input
          type="text"
          value={editAlt}
          onChange={(e) => setEditAlt(e.target.value)}
          placeholder="이미지 설명"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex gap-2">
        <Button
          size="sm"
          onClick={handleSave}
          className="bg-green-500 hover:bg-green-600 text-white"
        >
          <Check className="h-4 w-4 mr-1" />
          저장
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={handleCancel}
        >
          <X className="h-4 w-4 mr-1" />
          취소
        </Button>
      </div>

      {editSrc && (
        <div className="mt-3">
          <p className="text-sm text-gray-600 mb-2">미리보기:</p>
          <img 
            src={editSrc} 
            alt={editAlt}
            className="max-w-sm max-h-40 object-cover rounded border"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.style.display = 'none'
            }}
          />
        </div>
      )}
    </div>
  )
}