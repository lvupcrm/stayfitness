'use client'

import { useState } from 'react'
import { 
  Palette,
  Type,
  Layout,
  Spacing,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Settings
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useCMSStore } from '@/hooks/useCMSStore'
import type { ContentBlockStyles } from '@/types/cms'

interface BlockPropertiesProps {
  blockId: string
}

export function BlockProperties({ blockId }: BlockPropertiesProps) {
  const { currentPage, updateBlock } = useCMSStore()
  
  const block = currentPage?.blocks.find(b => b.id === blockId)
  
  if (!block) {
    return (
      <div className="text-center py-8">
        <Settings className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500">블록을 찾을 수 없습니다</p>
      </div>
    )
  }

  const styles = block.styles || {}

  const updateStyles = (newStyles: Partial<ContentBlockStyles>) => {
    updateBlock(blockId, {
      styles: {
        ...styles,
        ...newStyles
      }
    })
  }

  const updatePadding = (side: 'top' | 'bottom' | 'left' | 'right', value: number) => {
    updateStyles({
      padding: {
        ...styles.padding,
        [side]: value
      }
    })
  }

  const updateMargin = (side: 'top' | 'bottom' | 'left' | 'right', value: number) => {
    updateStyles({
      margin: {
        ...styles.margin,
        [side]: value
      }
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">블록 속성</h3>
        <p className="text-sm text-gray-600">
          {block.type} 블록의 스타일을 편집합니다
        </p>
      </div>

      <Tabs defaultValue="style" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="style" className="flex items-center space-x-1">
            <Palette className="w-4 h-4" />
            <span>스타일</span>
          </TabsTrigger>
          <TabsTrigger value="layout" className="flex items-center space-x-1">
            <Layout className="w-4 h-4" />
            <span>레이아웃</span>
          </TabsTrigger>
        </TabsList>

        {/* Style Tab */}
        <TabsContent value="style" className="space-y-6">
          {/* Background Color */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              배경 색상
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={styles.backgroundColor || '#ffffff'}
                onChange={(e) => updateStyles({ backgroundColor: e.target.value })}
                className="w-12 h-8 border border-gray-300 rounded cursor-pointer"
              />
              <Input
                type="text"
                value={styles.backgroundColor || ''}
                onChange={(e) => updateStyles({ backgroundColor: e.target.value })}
                placeholder="#ffffff"
                className="flex-1"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => updateStyles({ backgroundColor: undefined })}
              >
                초기화
              </Button>
            </div>
          </div>

          {/* Text Color */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              텍스트 색상
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={styles.textColor || '#000000'}
                onChange={(e) => updateStyles({ textColor: e.target.value })}
                className="w-12 h-8 border border-gray-300 rounded cursor-pointer"
              />
              <Input
                type="text"
                value={styles.textColor || ''}
                onChange={(e) => updateStyles({ textColor: e.target.value })}
                placeholder="#000000"
                className="flex-1"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => updateStyles({ textColor: undefined })}
              >
                초기화
              </Button>
            </div>
          </div>

          {/* Border Radius */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              모서리 둥글기
            </label>
            <div className="flex items-center space-x-3">
              <Input
                type="number"
                min="0"
                max="50"
                value={styles.borderRadius || 0}
                onChange={(e) => updateStyles({ borderRadius: parseInt(e.target.value) || 0 })}
                className="w-20"
              />
              <span className="text-sm text-gray-500">px</span>
              <input
                type="range"
                min="0"
                max="50"
                value={styles.borderRadius || 0}
                onChange={(e) => updateStyles({ borderRadius: parseInt(e.target.value) })}
                className="flex-1"
              />
            </div>
          </div>

          {/* Font Size */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              글자 크기
            </label>
            <select
              value={styles.fontSize || 'base'}
              onChange={(e) => updateStyles({ fontSize: e.target.value as any })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="xs">매우 작게 (12px)</option>
              <option value="sm">작게 (14px)</option>
              <option value="base">보통 (16px)</option>
              <option value="lg">크게 (18px)</option>
              <option value="xl">매우 크게 (20px)</option>
              <option value="2xl">특대 (24px)</option>
              <option value="3xl">초대형 (30px)</option>
            </select>
          </div>

          {/* Font Weight */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              글자 두께
            </label>
            <select
              value={styles.fontWeight || 'normal'}
              onChange={(e) => updateStyles({ fontWeight: e.target.value as any })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="normal">보통</option>
              <option value="medium">중간</option>
              <option value="semibold">약간 굵게</option>
              <option value="bold">굵게</option>
            </select>
          </div>
        </TabsContent>

        {/* Layout Tab */}
        <TabsContent value="layout" className="space-y-6">
          {/* Padding */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              안쪽 여백 (Padding)
            </label>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">위</label>
                  <Input
                    type="number"
                    min="0"
                    value={styles.padding?.top || 0}
                    onChange={(e) => updatePadding('top', parseInt(e.target.value) || 0)}
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">아래</label>
                  <Input
                    type="number"
                    min="0"
                    value={styles.padding?.bottom || 0}
                    onChange={(e) => updatePadding('bottom', parseInt(e.target.value) || 0)}
                    placeholder="0"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">왼쪽</label>
                  <Input
                    type="number"
                    min="0"
                    value={styles.padding?.left || 0}
                    onChange={(e) => updatePadding('left', parseInt(e.target.value) || 0)}
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">오른쪽</label>
                  <Input
                    type="number"
                    min="0"
                    value={styles.padding?.right || 0}
                    onChange={(e) => updatePadding('right', parseInt(e.target.value) || 0)}
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Margin */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              바깥쪽 여백 (Margin)
            </label>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">위</label>
                  <Input
                    type="number"
                    value={styles.margin?.top || 0}
                    onChange={(e) => updateMargin('top', parseInt(e.target.value) || 0)}
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">아래</label>
                  <Input
                    type="number"
                    value={styles.margin?.bottom || 0}
                    onChange={(e) => updateMargin('bottom', parseInt(e.target.value) || 0)}
                    placeholder="0"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">왼쪽</label>
                  <Input
                    type="number"
                    value={styles.margin?.left || 0}
                    onChange={(e) => updateMargin('left', parseInt(e.target.value) || 0)}
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">오른쪽</label>
                  <Input
                    type="number"
                    value={styles.margin?.right || 0}
                    onChange={(e) => updateMargin('right', parseInt(e.target.value) || 0)}
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Reset Button */}
          <div className="pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => updateBlock(blockId, { styles: {} })}
              className="w-full"
            >
              모든 스타일 초기화
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}