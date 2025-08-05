/**
 * 타입 통합 내보내기
 * 모든 타입 정의를 중앙에서 관리합니다.
 */

// 도메인별 타입
export * from './admin'
export * from './trainer'
export * from './content'

// 기존 레거시 타입 (호환성 유지)
export interface LeadFormData {
  name: string
  phone: string
  program: string | null
}

// CMS 타입 (기존 코드와의 호환성을 위해 기존 구조 유지)
export * from './cms'

// 새로 추가된 공통 타입 (개선된 구조)
// 기존 코드와 충돌을 피하기 위해 선택적으로 export
export type {
  ID,
  Timestamps,
  BaseEntity,
  ApiResponse,
  FormField,
  FormState,
  LoadingState,
  AsyncState,
  Optional,
  RequiredFields,
  DeepPartial,
  ValueOf,
  NonEmptyArray,
  BaseComponentProps,
  InteractiveComponentProps,
  SearchParams,
  FilterOption,
  SortOption,
  Permission,
  Role,
  User,
  AppSettings,
  Location,
  ContactInfo
} from './common'