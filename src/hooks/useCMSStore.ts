'use client'

import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { Page, ContentBlock, EditorState } from '@/types/cms'

interface CMSStore extends EditorState {
  // Current page data
  currentPage: Page | null
  pages: Page[]
  
  // Editor state
  draggedBlock: ContentBlock | null
  hoveredBlockId: string | null
  
  // Loading states
  isLoading: boolean
  isSaving: boolean
  isDeleting: boolean
  
  // Actions
  loadInitialData: () => Promise<void>
  setCurrentPage: (page: Page | null) => void
  setPages: (pages: Page[]) => void
  setSelectedBlock: (blockId: string | null) => void
  setSelectedPage: (pageId: string | null) => void
  setIsEditing: (editing: boolean) => void
  setIsPreview: (preview: boolean) => void
  setIsDirty: (dirty: boolean) => void
  setClipboard: (block: ContentBlock | null) => void
  setDraggedBlock: (block: ContentBlock | null) => void
  setHoveredBlockId: (blockId: string | null) => void
  
  // Page operations
  addBlock: (block: Omit<ContentBlock, 'id' | 'created_at' | 'updated_at'>) => void
  updateBlock: (blockId: string, updates: Partial<ContentBlock>) => void
  deleteBlock: (blockId: string) => void
  moveBlock: (fromIndex: number, toIndex: number) => void
  duplicateBlock: (blockId: string) => void
  
  // Save operations
  savePage: () => Promise<void>
  savePageAs: (title: string, slug: string) => Promise<void>
  publishPage: () => Promise<void>
  
  // Utility functions
  togglePreview: () => void
  resetEditor: () => void
  
  // Undo/Redo
  history: Page[]
  historyIndex: number
  addToHistory: (page: Page) => void
  undo: () => void
  redo: () => void
  canUndo: () => boolean
  canRedo: () => boolean
}

export const useCMSStore = create<CMSStore>()(
  devtools(
    (set, get) => ({
      // Initial state
      currentPage: null,
      pages: [],
      selectedBlock: undefined,
      selectedPage: undefined,
      isEditing: false,
      isPreview: false,
      isDirty: false,
      clipboard: undefined,
      draggedBlock: null,
      hoveredBlockId: null,
      isLoading: false,
      isSaving: false,
      isDeleting: false,
      history: [],
      historyIndex: -1,

      // Actions
      setCurrentPage: (page) => {
        set({ currentPage: page })
        if (page) {
          get().addToHistory(page)
        }
      },

      // Load initial data
      loadInitialData: async () => {
        const { currentPage } = get()
        if (currentPage) return // Already loaded

        set({ isLoading: true })
        
        try {
          // Check if Supabase is available
          const hasSupabase = process.env.NEXT_PUBLIC_SUPABASE_URL && 
                              process.env.NEXT_PUBLIC_SUPABASE_URL !== 'your_supabase_url_here'

          if (!hasSupabase) {
            // Use mock data for development
            const { mockPageData, mockPagesList } = await import('@/lib/mock-cms-data')
            
            set({ 
              currentPage: mockPageData,
              pages: mockPagesList,
              isLoading: false 
            })
            
            get().addToHistory(mockPageData)
            console.log('✅ Mock data loaded successfully')
          }
        } catch (error) {
          console.error('Error loading initial data:', error)
          set({ isLoading: false })
        }
      },

      setPages: (pages) => set({ pages }),
      setSelectedBlock: (blockId) => set({ selectedBlock: blockId }),
      setSelectedPage: (pageId) => set({ selectedPage: pageId }),
      setIsEditing: (editing) => set({ isEditing: editing }),
      setIsPreview: (preview) => set({ isPreview: preview }),
      setIsDirty: (dirty) => set({ isDirty: dirty }),
      setClipboard: (block) => set({ clipboard: block }),
      setDraggedBlock: (block) => set({ draggedBlock: block }),
      setHoveredBlockId: (blockId) => set({ hoveredBlockId: blockId }),

      // Block operations
      addBlock: (blockData) => {
        const { currentPage } = get()
        if (!currentPage) return

        const newBlock: ContentBlock = {
          ...blockData,
          id: `block_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }

        const updatedPage = {
          ...currentPage,
          blocks: [...currentPage.blocks, newBlock]
        }

        set({ 
          currentPage: updatedPage,
          isDirty: true 
        })
        get().addToHistory(updatedPage)
      },

      updateBlock: (blockId, updates) => {
        const { currentPage } = get()
        if (!currentPage) return

        const updatedBlocks = currentPage.blocks.map(block =>
          block.id === blockId 
            ? { ...block, ...updates, updated_at: new Date().toISOString() }
            : block
        )

        const updatedPage = {
          ...currentPage,
          blocks: updatedBlocks
        }

        set({ 
          currentPage: updatedPage,
          isDirty: true 
        })
        get().addToHistory(updatedPage)
      },

      deleteBlock: (blockId) => {
        const { currentPage } = get()
        if (!currentPage) return

        const updatedBlocks = currentPage.blocks.filter(block => block.id !== blockId)
        const updatedPage = {
          ...currentPage,
          blocks: updatedBlocks
        }

        set({ 
          currentPage: updatedPage,
          isDirty: true,
          selectedBlock: undefined
        })
        get().addToHistory(updatedPage)
      },

      moveBlock: (fromIndex, toIndex) => {
        const { currentPage } = get()
        if (!currentPage) return

        const blocks = [...currentPage.blocks]
        const [movedBlock] = blocks.splice(fromIndex, 1)
        blocks.splice(toIndex, 0, movedBlock)

        // Update order property
        const updatedBlocks = blocks.map((block, index) => ({
          ...block,
          order: index,
          updated_at: new Date().toISOString()
        }))

        const updatedPage = {
          ...currentPage,
          blocks: updatedBlocks
        }

        set({ 
          currentPage: updatedPage,
          isDirty: true 
        })
        get().addToHistory(updatedPage)
      },

      duplicateBlock: (blockId) => {
        const { currentPage } = get()
        if (!currentPage) return

        const blockToDuplicate = currentPage.blocks.find(block => block.id === blockId)
        if (!blockToDuplicate) return

        const duplicatedBlock: ContentBlock = {
          ...blockToDuplicate,
          id: `block_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }

        const blockIndex = currentPage.blocks.findIndex(block => block.id === blockId)
        const updatedBlocks = [
          ...currentPage.blocks.slice(0, blockIndex + 1),
          duplicatedBlock,
          ...currentPage.blocks.slice(blockIndex + 1)
        ]

        const updatedPage = {
          ...currentPage,
          blocks: updatedBlocks
        }

        set({ 
          currentPage: updatedPage,
          isDirty: true 
        })
        get().addToHistory(updatedPage)
      },

      // Save operations
      savePage: async () => {
        const { currentPage } = get()
        if (!currentPage) return

        set({ isSaving: true })

        try {
          // Check if Supabase is available
          const hasSupabase = process.env.NEXT_PUBLIC_SUPABASE_URL && 
                              process.env.NEXT_PUBLIC_SUPABASE_URL !== 'your_supabase_url_here'

          if (hasSupabase) {
            // Use real API
            const response = await fetch(`/api/cms/pages/${currentPage.slug}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                title: currentPage.title,
                description: currentPage.description,
                meta_title: currentPage.meta_title,
                meta_description: currentPage.meta_description,
                meta_keywords: currentPage.meta_keywords,
                status: currentPage.status,
                blocks: currentPage.blocks
              }),
            })

            if (!response.ok) {
              throw new Error('Failed to save page')
            }

            const result = await response.json()
            
            set({ 
              isDirty: false,
              currentPage: { ...currentPage, ...result.data }
            })
          } else {
            // Use mock save for development
            const { mockSavePage } = await import('@/lib/mock-cms-data')
            const savedPage = await mockSavePage(currentPage)
            
            set({ 
              isDirty: false,
              currentPage: savedPage
            })
            
            console.log('✅ Mock save successful:', savedPage.title)
          }

        } catch (error) {
          console.error('Error saving page:', error)
          throw error
        } finally {
          set({ isSaving: false })
        }
      },

      savePageAs: async (title, slug) => {
        const { currentPage } = get()
        if (!currentPage) return

        set({ isSaving: true })

        try {
          const response = await fetch('/api/cms/pages', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              slug,
              title,
              description: currentPage.description,
              meta_title: currentPage.meta_title,
              meta_description: currentPage.meta_description,
              meta_keywords: currentPage.meta_keywords,
              status: 'draft',
              blocks: currentPage.blocks
            }),
          })

          if (!response.ok) {
            throw new Error('Failed to create page')
          }

          const result = await response.json()
          
          set({ 
            isDirty: false,
            currentPage: result.data
          })

        } catch (error) {
          console.error('Error creating page:', error)
          throw error
        } finally {
          set({ isSaving: false })
        }
      },

      publishPage: async () => {
        const { currentPage } = get()
        if (!currentPage) return

        await get().savePage()
        
        const response = await fetch(`/api/cms/pages/${currentPage.slug}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            status: 'published'
          }),
        })

        if (!response.ok) {
          throw new Error('Failed to publish page')
        }

        const result = await response.json()
        set({ 
          currentPage: { ...currentPage, ...result.data }
        })
      },

      // Utility functions
      togglePreview: () => {
        set(state => ({ isPreview: !state.isPreview }))
      },

      resetEditor: () => {
        set({
          currentPage: null,
          selectedBlock: undefined,
          selectedPage: undefined,
          isEditing: false,
          isPreview: false,
          isDirty: false,
          clipboard: undefined,
          draggedBlock: null,
          hoveredBlockId: null,
          history: [],
          historyIndex: -1
        })
      },

      // History management
      addToHistory: (page: Page) => {
        const { history, historyIndex } = get()
        const newHistory = history.slice(0, historyIndex + 1)
        newHistory.push(page)
        
        // Limit history to 50 items
        if (newHistory.length > 50) {
          newHistory.shift()
        }
        
        set({
          history: newHistory,
          historyIndex: newHistory.length - 1
        })
      },

      undo: () => {
        const { history, historyIndex } = get()
        if (historyIndex > 0) {
          const previousPage = history[historyIndex - 1]
          set({
            currentPage: previousPage,
            historyIndex: historyIndex - 1,
            isDirty: true
          })
        }
      },

      redo: () => {
        const { history, historyIndex } = get()
        if (historyIndex < history.length - 1) {
          const nextPage = history[historyIndex + 1]
          set({
            currentPage: nextPage,
            historyIndex: historyIndex + 1,
            isDirty: true
          })
        }
      },

      canUndo: () => {
        const { historyIndex } = get()
        return historyIndex > 0
      },

      canRedo: () => {
        const { history, historyIndex } = get()
        return historyIndex < history.length - 1
      },

    }),
    {
      name: 'cms-store',
    }
  )
)