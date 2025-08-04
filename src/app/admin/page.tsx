'use client'

import { useState } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/components/ui/tabs'
import { Button } from '@/components/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/components/ui/card'
import { Input } from '@/components/components/ui/input'
import { Label } from '@/components/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/components/ui/select'
import { ScrollArea } from '@/components/components/ui/scroll-area'
import {
  ChevronDown,
  PencilLine,
  Image as ImageIcon,
  Type,
  Square,
  Grid2X2,
  Monitor,
  Save,
  Eye
} from 'lucide-react'

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('hero')
  const [previewMode, setPreviewMode] = useState(false)

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-800">STAY FITNESS</h1>
          <p className="text-sm text-gray-500">콘텐츠 관리자</p>
        </div>
        
        <ScrollArea className="h-[calc(100vh-80px)] p-4">
          <nav className="space-y-2">
            <Button variant="ghost" className="w-full justify-start">
              <Grid2X2 className="w-4 h-4 mr-2" />
              대시보드
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Monitor className="w-4 h-4 mr-2" />
              페이지 관리
            </Button>
          </nav>
        </ScrollArea>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">페이지 빌더</h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => setPreviewMode(!previewMode)}>
                <Eye className="w-4 h-4 mr-2" />
                {previewMode ? '수정 모드' : '미리보기'}
              </Button>
              <Button>
                <Save className="w-4 h-4 mr-2" />
                변경사항 저장
              </Button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden">
          <div className="flex h-full">
            {/* Editor Panel */}
            <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
              <div className="p-4 border-b border-gray-200">
                <Select defaultValue="hero">
                  <SelectTrigger>
                    <SelectValue placeholder="섹션 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hero">Hero 섹션</SelectItem>
                    <SelectItem value="features">특징 섹션</SelectItem>
                    <SelectItem value="programs">프로그램 섹션</SelectItem>
                    <SelectItem value="trainers">트레이너 섹션</SelectItem>
                    <SelectItem value="contact">문의 섹션</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>섹션 제목</Label>
                    <Input placeholder="제목을 입력하세요" />
                  </div>

                  <div className="space-y-2">
                    <Label>부제목</Label>
                    <Input placeholder="부제목을 입력하세요" />
                  </div>

                  <div className="space-y-2">
                    <Label>배경 색상</Label>
                    <Select defaultValue="white">
                      <SelectTrigger>
                        <SelectValue placeholder="배경 색상 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="white">흰색</SelectItem>
                        <SelectItem value="gray">회색</SelectItem>
                        <SelectItem value="primary">주요 색상</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>텍스트 정렬</Label>
                    <Select defaultValue="left">
                      <SelectTrigger>
                        <SelectValue placeholder="텍스트 정렬 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="left">왼쪽</SelectItem>
                        <SelectItem value="center">가운데</SelectItem>
                        <SelectItem value="right">오른쪽</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </ScrollArea>
            </div>

            {/* Preview Area */}
            <div className="flex-1 bg-gray-50 p-8 overflow-auto">
              <div className="max-w-6xl mx-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>Hero 섹션</CardTitle>
                    <CardDescription>홈페이지 메인 섹션입니다.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                        <ImageIcon className="w-8 h-8 text-gray-400" />
                      </div>
                      <div className="space-y-2">
                        <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}