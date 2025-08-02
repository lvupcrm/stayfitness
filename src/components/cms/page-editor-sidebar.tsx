'use client'

import { useState } from 'react'
import { 
  Plus, 
  Search,
  Layers,
  Palette,
  Settings
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BlockLibrary } from './block-library'
import { BlockProperties } from './block-properties'
import { PageLayers } from './page-layers'
import { useCMSStore } from '@/hooks/useCMSStore'

export function PageEditorSidebar() {
  const [activeTab, setActiveTab] = useState('blocks')
  const [searchTerm, setSearchTerm] = useState('')
  
  const { selectedBlock } = useCMSStore()

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-gray-200">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="blocks" className="flex items-center space-x-1">
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">블록</span>
            </TabsTrigger>
            <TabsTrigger value="layers" className="flex items-center space-x-1">
              <Layers className="w-4 h-4" />
              <span className="hidden sm:inline">레이어</span>
            </TabsTrigger>
            <TabsTrigger value="properties" className="flex items-center space-x-1">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">속성</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Sidebar Content */}
      <div className="flex-1 overflow-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          {/* Blocks Tab */}
          <TabsContent value="blocks" className="m-0 h-full">
            <div className="p-4">
              {/* Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="블록 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Block Library */}
              <BlockLibrary searchTerm={searchTerm} />
            </div>
          </TabsContent>

          {/* Layers Tab */}
          <TabsContent value="layers" className="m-0 h-full">
            <div className="p-4">
              <PageLayers />
            </div>
          </TabsContent>

          {/* Properties Tab */}
          <TabsContent value="properties" className="m-0 h-full">
            <div className="p-4">
              {selectedBlock ? (
                <BlockProperties blockId={selectedBlock} />
              ) : (
                <div className="text-center py-8">
                  <Palette className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    블록을 선택하세요
                  </h3>
                  <p className="text-gray-600">
                    편집할 블록을 클릭하면 속성을 수정할 수 있습니다
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}