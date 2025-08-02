'use client'

import { useDrop } from 'react-dnd'
import { Plus } from 'lucide-react'
import { useCMSStore } from '@/hooks/useCMSStore'
import { BlockRenderer } from './block-renderer'
import { DropZone } from './drop-zone'

export function PageCanvas() {
  const { 
    currentPage, 
    isPreview, 
    addBlock,
    hoveredBlockId,
    setHoveredBlockId 
  } = useCMSStore()

  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: 'block',
    drop: (item: { type: string; [key: string]: unknown }, monitor) => {
      if (!monitor.didDrop()) {
        // Add block at the end
        addBlock({
          type: item.type,
          order: currentPage?.blocks.length || 0,
          data: item.data
        })
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop(),
    }),
  }))

  if (!currentPage) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">페이지를 불러올 수 없습니다</h3>
          <p className="text-gray-600">페이지 데이터를 확인해주세요</p>
        </div>
      </div>
    )
  }

  const blocks = currentPage.blocks || []

  return (
    <div className="h-full bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white min-h-full shadow-sm">
        <div
          ref={drop}
          className={`
            relative min-h-full p-6
            ${isOver && canDrop ? 'bg-blue-50 border-2 border-dashed border-blue-300' : ''}
            ${isPreview ? 'pointer-events-none' : ''}
          `}
        >
          {blocks.length === 0 ? (
            // Empty State
            <div className="flex flex-col items-center justify-center h-96 text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <Plus className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                페이지가 비어있습니다
              </h3>
              <p className="text-gray-600 mb-6 max-w-md">
                왼쪽 사이드바에서 블록을 드래그하거나 클릭해서 페이지를 만들어보세요
              </p>
              {!isPreview && (
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <div className="w-4 h-4 bg-blue-500 rounded"></div>
                  <span>블록을 여기로 드래그하세요</span>
                </div>
              )}
            </div>
          ) : (
            // Blocks Rendering
            <div className="space-y-0">
              {blocks.map((block, index) => (
                <div key={block.id} className="relative">
                  {/* Drop Zone Before Block */}
                  {!isPreview && (
                    <DropZone
                      index={index}
                      onDrop={(item) => {
                        addBlock({
                          type: item.type,
                          order: index,
                          data: item.data
                        })
                      }}
                    />
                  )}

                  {/* Block Content */}
                  <div
                    className={`
                      relative group
                      ${!isPreview ? 'hover:ring-2 hover:ring-blue-400 hover:ring-opacity-50' : ''}
                    `}
                    onMouseEnter={() => !isPreview && setHoveredBlockId(block.id)}
                    onMouseLeave={() => !isPreview && setHoveredBlockId(null)}
                  >
                    <BlockRenderer
                      block={block}
                      isEditing={!isPreview}
                      isHovered={hoveredBlockId === block.id}
                    />
                  </div>

                  {/* Drop Zone After Last Block */}
                  {!isPreview && index === blocks.length - 1 && (
                    <DropZone
                      index={index + 1}
                      onDrop={(item) => {
                        addBlock({
                          type: item.type,
                          order: index + 1,
                          data: item.data
                        })
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Canvas Drop Indicator */}
          {isOver && canDrop && blocks.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium">
                여기에 블록을 놓으세요
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}