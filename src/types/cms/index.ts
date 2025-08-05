/**
 * CMS 타입 통합 내보내기
 */

// 기본 CMS 타입 (MediaFile 제외하고 export)
export type {
  CMSEntity,
  Page,
  PageMeta,
  PageSettings,
  BlockType,
  ContentBlock,
  BlockStyles,
  BlockSettings,
  EditorState,
  EditorHistory,
  Template,
  MediaLibraryItem,
  MediaFolder
} from './base'

// 블록 타입
export * from './blocks'