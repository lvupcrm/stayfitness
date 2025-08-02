'use client'

import { useDrop } from 'react-dnd'
import { Plus } from 'lucide-react'

interface DropZoneProps {
  index: number
  onDrop: (item: { type: string; [key: string]: unknown }) => void
}

export function DropZone({ index, onDrop }: DropZoneProps) {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: 'block',
    drop: (item: { type: string; [key: string]: unknown }, monitor) => {
      if (!monitor.didDrop()) {
        onDrop(item)
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop(),
    }),
  }))

  const isActive = isOver && canDrop

  return (
    <div
      ref={drop}
      className={`
        relative h-3 -my-1.5 group transition-all duration-200
        ${isActive ? 'h-16' : 'hover:h-8'}
      `}
    >
      <div
        className={`
          absolute inset-x-0 top-1/2 transform -translate-y-1/2
          border-2 border-dashed transition-all duration-200
          ${isActive
            ? 'border-blue-500 bg-blue-50 h-12 rounded-lg'
            : 'border-transparent group-hover:border-gray-300 h-1'
          }
        `}
      >
        {isActive && (
          <div className="flex items-center justify-center h-full">
            <div className="flex items-center space-x-2 text-blue-600 font-medium">
              <Plus className="w-4 h-4" />
              <span>여기에 블록 추가</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}