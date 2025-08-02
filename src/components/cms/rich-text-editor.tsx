'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import TextStyle from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import { 
  Bold, 
  Italic, 
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Link,
  Palette,
  Type
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface RichTextEditorProps {
  content: string
  onChange: (content: string) => void
  placeholder?: string
  className?: string
  editable?: boolean
}

export function RichTextEditor({
  content,
  onChange,
  placeholder = '텍스트를 입력하세요...',
  className,
  editable = true
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      TextStyle,
      Color.configure({
        types: ['textStyle'],
      }),
    ],
    content,
    editable,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    immediatelyRender: false,
  })

  if (!editor) {
    return null
  }

  const ToolbarButton = ({ 
    onClick, 
    isActive = false, 
    disabled = false, 
    children, 
    title 
  }: {
    onClick: () => void
    isActive?: boolean
    disabled?: boolean
    children: React.ReactNode
    title?: string
  }) => (
    <Button
      variant={isActive ? "default" : "ghost"}
      size="sm"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "p-2 h-8 w-8",
        isActive && "bg-blue-100 text-blue-700"
      )}
      title={title}
    >
      {children}
    </Button>
  )

  return (
    <div className={cn("border border-gray-300 rounded-lg overflow-hidden", className)}>
      {/* Toolbar */}
      {editable && (
        <div className="border-b border-gray-200 bg-gray-50 p-2">
          <div className="flex items-center space-x-1 flex-wrap gap-1">
            {/* Text Formatting */}
            <div className="flex items-center space-x-1">
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleBold().run()}
                isActive={editor.isActive('bold')}
                title="굵게 (Ctrl+B)"
              >
                <Bold className="w-4 h-4" />
              </ToolbarButton>
              
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleItalic().run()}
                isActive={editor.isActive('italic')}
                title="기울임 (Ctrl+I)"
              >
                <Italic className="w-4 h-4" />
              </ToolbarButton>
              
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                isActive={editor.isActive('underline')}
                title="밑줄 (Ctrl+U)"
              >
                <Underline className="w-4 h-4" />
              </ToolbarButton>
            </div>

            <div className="w-px h-6 bg-gray-300" />

            {/* Text Alignment */}
            <div className="flex items-center space-x-1">
              <ToolbarButton
                onClick={() => editor.chain().focus().setTextAlign('left').run()}
                isActive={editor.isActive({ textAlign: 'left' })}
                title="왼쪽 정렬"
              >
                <AlignLeft className="w-4 h-4" />
              </ToolbarButton>
              
              <ToolbarButton
                onClick={() => editor.chain().focus().setTextAlign('center').run()}
                isActive={editor.isActive({ textAlign: 'center' })}
                title="가운데 정렬"
              >
                <AlignCenter className="w-4 h-4" />
              </ToolbarButton>
              
              <ToolbarButton
                onClick={() => editor.chain().focus().setTextAlign('right').run()}
                isActive={editor.isActive({ textAlign: 'right' })}
                title="오른쪽 정렬"
              >
                <AlignRight className="w-4 h-4" />
              </ToolbarButton>
            </div>

            <div className="w-px h-6 bg-gray-300" />

            {/* Lists */}
            <div className="flex items-center space-x-1">
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                isActive={editor.isActive('bulletList')}
                title="글머리 기호"
              >
                <List className="w-4 h-4" />
              </ToolbarButton>
              
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                isActive={editor.isActive('orderedList')}
                title="번호 목록"
              >
                <ListOrdered className="w-4 h-4" />
              </ToolbarButton>
            </div>

            <div className="w-px h-6 bg-gray-300" />

            {/* Headings */}
            <div className="flex items-center space-x-1">
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                isActive={editor.isActive('heading', { level: 1 })}
                title="제목 1"
              >
                <span className="text-lg font-bold">H1</span>
              </ToolbarButton>
              
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                isActive={editor.isActive('heading', { level: 2 })}
                title="제목 2"
              >
                <span className="text-base font-bold">H2</span>
              </ToolbarButton>
              
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                isActive={editor.isActive('heading', { level: 3 })}
                title="제목 3"
              >
                <span className="text-sm font-bold">H3</span>
              </ToolbarButton>
            </div>

            <div className="w-px h-6 bg-gray-300" />

            {/* Text Color */}
            <div className="flex items-center space-x-1">
              <input
                type="color"
                onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
                value={editor.getAttributes('textStyle').color || '#000000'}
                className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
                title="텍스트 색상"
              />
            </div>
          </div>
        </div>
      )}

      {/* Editor Content */}
      <div className="p-4">
        <EditorContent 
          editor={editor}
          className={cn(
            "prose prose-sm max-w-none",
            "focus:outline-none",
            "[&_.ProseMirror]:outline-none",
            "[&_.ProseMirror]:min-h-[100px]",
            "[&_.ProseMirror_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)]",
            "[&_.ProseMirror_p.is-editor-empty:first-child::before]:text-gray-400",
            "[&_.ProseMirror_p.is-editor-empty:first-child::before]:float-left",
            "[&_.ProseMirror_p.is-editor-empty:first-child::before]:pointer-events-none",
            "[&_.ProseMirror_p.is-editor-empty:first-child::before]:h-0"
          )}
        />
      </div>
    </div>
  )
}