/**
 * 공통 API 클라이언트
 * 모든 API 호출에 대한 중앙화된 처리를 제공합니다.
 */

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface ApiClientOptions extends RequestInit {
  timeout?: number
  skipAuth?: boolean
}

class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public response?: any
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

class ApiClient {
  private baseUrl: string = ''
  private defaultTimeout: number = 30000 // 30초

  /**
   * GET 요청
   */
  async get<T = any>(
    endpoint: string, 
    options: ApiClientOptions = {}
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'GET',
    })
  }

  /**
   * POST 요청
   */
  async post<T = any>(
    endpoint: string,
    data?: any,
    options: ApiClientOptions = {}
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  /**
   * PUT 요청
   */
  async put<T = any>(
    endpoint: string,
    data?: any,
    options: ApiClientOptions = {}
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  /**
   * PATCH 요청
   */
  async patch<T = any>(
    endpoint: string,
    data?: any,
    options: ApiClientOptions = {}
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  /**
   * DELETE 요청
   */
  async delete<T = any>(
    endpoint: string,
    options: ApiClientOptions = {}
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'DELETE',
    })
  }

  /**
   * 파일 업로드
   */
  async upload<T = any>(
    endpoint: string,
    formData: FormData,
    options: ApiClientOptions = {}
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: formData,
      // FormData를 사용할 때는 Content-Type을 설정하지 않음
      headers: {
        ...options.headers,
        'Content-Type': undefined as any,
      },
    })
  }

  /**
   * 기본 요청 메서드
   */
  private async request<T = any>(
    endpoint: string,
    options: ApiClientOptions = {}
  ): Promise<ApiResponse<T>> {
    const {
      timeout = this.defaultTimeout,
      skipAuth = false,
      headers = {},
      ...fetchOptions
    } = options

    // 타임아웃 설정
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeout)

    try {
      const url = endpoint.startsWith('http') 
        ? endpoint 
        : `${this.baseUrl}${endpoint}`

      // 기본 헤더 설정
      const defaultHeaders: HeadersInit = {
        'Content-Type': 'application/json',
        ...headers,
      }

      // Content-Type이 undefined인 경우 제거 (FormData 전송 시)
      if ((defaultHeaders as any)['Content-Type'] === undefined) {
        delete (defaultHeaders as any)['Content-Type']
      }

      const response = await fetch(url, {
        ...fetchOptions,
        headers: defaultHeaders,
        credentials: skipAuth ? 'omit' : 'include',
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      // 응답 처리
      const contentType = response.headers.get('content-type')
      let responseData: any

      if (contentType?.includes('application/json')) {
        responseData = await response.json()
      } else {
        responseData = await response.text()
      }

      // 에러 응답 처리
      if (!response.ok) {
        throw new ApiError(
          responseData?.error || responseData?.message || `HTTP ${response.status}`,
          response.status,
          responseData
        )
      }

      // 성공 응답
      return responseData as ApiResponse<T>
    } catch (error) {
      clearTimeout(timeoutId)

      // 타임아웃 에러
      if (error instanceof Error && error.name === 'AbortError') {
        throw new ApiError('요청 시간이 초과되었습니다.', 408)
      }

      // API 에러
      if (error instanceof ApiError) {
        throw error
      }

      // 네트워크 에러
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw new ApiError('네트워크 연결을 확인해주세요.', 0)
      }

      // 기타 에러
      throw new ApiError(
        error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.',
        0
      )
    }
  }
}

// 싱글톤 인스턴스
export const apiClient = new ApiClient()

// 에러 처리 유틸리티
export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError
}

// 공통 에러 메시지 처리
export function getErrorMessage(error: unknown): string {
  if (isApiError(error)) {
    return error.message
  }
  if (error instanceof Error) {
    return error.message
  }
  return '알 수 없는 오류가 발생했습니다.'
}