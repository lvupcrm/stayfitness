'use client'

import { Video } from 'lucide-react'
import { Input } from '@/components/ui/input'
import type { ContentBlock } from '@/types/cms'

interface VideoBlockRendererProps {
  block: ContentBlock
  isEditing: boolean
  onUpdate: (updates: Partial<ContentBlock>) => void
}

export function VideoBlockRenderer({ block, isEditing, onUpdate }: VideoBlockRendererProps) {
  const videoData = block.data.video || {
    url: '',
    thumbnail: '',
    autoplay: false,
    controls: true
  }

  const handleFieldChange = (field: string, value: string | boolean) => {
    onUpdate({
      data: {
        ...block.data,
        video: {
          url: videoData.url || '',
          thumbnail: videoData.thumbnail || '',
          autoplay: videoData.autoplay || false,
          controls: videoData.controls !== undefined ? videoData.controls : true,
          [field]: value
        }
      }
    })
  }

  const getVideoId = (url: string) => {
    // YouTube URL patterns
    const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
    const match = url.match(youtubeRegex)
    return match ? match[1] : null
  }

  const getEmbedUrl = (url: string) => {
    const videoId = getVideoId(url)
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`
    }
    
    // Vimeo URL
    const vimeoRegex = /vimeo\.com\/(\d+)/
    const vimeoMatch = url.match(vimeoRegex)
    if (vimeoMatch) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}`
    }
    
    return url
  }

  // Removed unused getThumbnailUrl function

  if (isEditing) {
    return (
      <div className="space-y-4 p-4">
        {/* Video URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            동영상 URL
          </label>
          <Input
            type="url"
            placeholder="YouTube, Vimeo 또는 직접 링크 URL"
            value={videoData.url || ''}
            onChange={(e) => handleFieldChange('url', e.target.value)}
          />
          <p className="text-xs text-gray-500 mt-1">
            예: https://www.youtube.com/watch?v=VIDEO_ID
          </p>
        </div>

        {/* Thumbnail URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            썸네일 이미지 URL (선택사항)
          </label>
          <Input
            type="url"
            placeholder="https://example.com/thumbnail.jpg"
            value={videoData.thumbnail || ''}
            onChange={(e) => handleFieldChange('thumbnail', e.target.value)}
          />
          <p className="text-xs text-gray-500 mt-1">
            YouTube 동영상은 자동으로 썸네일이 생성됩니다
          </p>
        </div>

        {/* Video Options */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="autoplay"
              checked={videoData.autoplay || false}
              onChange={(e) => handleFieldChange('autoplay', e.target.checked)}
              className="rounded border-gray-300"
            />
            <label htmlFor="autoplay" className="text-sm text-gray-700">
              자동 재생
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="controls"
              checked={videoData.controls !== false}
              onChange={(e) => handleFieldChange('controls', e.target.checked)}
              className="rounded border-gray-300"
            />
            <label htmlFor="controls" className="text-sm text-gray-700">
              컨트롤 표시
            </label>
          </div>
        </div>

        {/* Preview */}
        {videoData.url && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              미리보기
            </label>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="aspect-video bg-black rounded-lg overflow-hidden max-w-md">
                {getVideoId(videoData.url) ? (
                  <iframe
                    src={getEmbedUrl(videoData.url)}
                    title="Video preview"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center text-white">
                      <Video className="w-12 h-12 mx-auto mb-2" />
                      <p className="text-sm">동영상 미리보기</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  // Preview mode
  return (
    <div className="p-6">
      {videoData.url ? (
        <div className="aspect-video bg-black rounded-lg overflow-hidden shadow-lg">
          {getVideoId(videoData.url) || videoData.url.includes('vimeo.com') ? (
            <iframe
              src={getEmbedUrl(videoData.url)}
              title="Video"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video
              src={videoData.url}
              controls={videoData.controls !== false}
              autoPlay={videoData.autoplay || false}
              className="w-full h-full object-cover"
              poster={videoData.thumbnail}
            />
          )}
        </div>
      ) : (
        <div className="aspect-video border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <Video className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg font-medium">동영상 URL을 입력하세요</p>
            <p className="text-gray-400 text-sm">YouTube, Vimeo 등을 지원합니다</p>
          </div>
        </div>
      )}
    </div>
  )
}