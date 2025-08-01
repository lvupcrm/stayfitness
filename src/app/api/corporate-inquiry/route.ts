import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const { 
      companyName,
      contactName,
      phone,
      email,
      employeeCount,
      serviceType,
      budget,
      message,
      createdAt 
    } = body

    // 필수 필드 검증
    if (!companyName || !contactName || !phone || !email || !employeeCount || !serviceType || !message) {
      return NextResponse.json(
        { error: '필수 정보가 누락되었습니다.' },
        { status: 400 }
      )
    }

    // 기업 웰니스 문의 데이터 저장
    const { error } = await supabase
      .from('corporate_inquiries')
      .insert([
        {
          company_name: companyName,
          contact_name: contactName,
          phone,
          email,
          employee_count: employeeCount,
          service_types: JSON.stringify(serviceType),
          budget: budget || '',
          message,
          status: 'pending',
          priority: getInquiryPriority(employeeCount, serviceType),
          created_at: createdAt
        }
      ])

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: '기업 웰니스 문의 저장 중 오류가 발생했습니다.' },
        { status: 500 }
      )
    }

    // 성공 응답
    return NextResponse.json({
      success: true,
      message: '기업 웰니스 문의가 성공적으로 전송되었습니다.',
      data: {
        companyName,
        contactName,
        serviceTypes: serviceType,
        expectedResponse: '2-3 영업일 이내에 전담 컨설턴트가 연락드리겠습니다.',
        nextSteps: [
          '문의 접수 확인',
          '기업 분석 및 솔루션 설계',
          '무료 컨설팅 진행',
          '맞춤형 제안서 제공',
          '파일럿 프로그램 실행'
        ],
        benefits: [
          '무료 초기 컨설팅',
          '맞춤형 솔루션 제공',
          '전문 트레이너 배정',
          '성과 측정 및 보고',
          '지속적인 프로그램 개선'
        ]
      }
    })

  } catch (err: unknown) {
    console.error('Corporate inquiry API error:', err)
    const errorMessage = err instanceof Error ? err.message : '서버 오류가 발생했습니다.'
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}

// 문의 우선순위 결정 함수
function getInquiryPriority(employeeCount: string, serviceTypes: string[]): 'high' | 'medium' | 'low' {
  // 대기업 (300명 이상) 또는 종합 서비스 요청 시 높은 우선순위
  if (employeeCount === '300-500' || employeeCount === '500+' || serviceTypes.length >= 4) {
    return 'high'
  }
  
  // 중간 규모 기업 (50-300명) 시 중간 우선순위
  if (employeeCount === '50-100' || employeeCount === '100-300') {
    return 'medium'
  }
  
  // 소규모 기업 시 일반 우선순위
  return 'low'
}

export async function GET() {
  return NextResponse.json({
    message: 'Corporate Wellness API is running',
    services: [
      {
        id: 'onsite-fitness',
        name: '사내 피트니스 센터 운영',
        description: '전문 트레이너가 기업에 직접 방문하여 맞춤형 운동 프로그램을 제공',
        targetCompanies: '50명 이상 기업',
        duration: '3개월 이상 계약',
        pricing: '상담 후 견적 제공'
      },
      {
        id: 'wellness-program',
        name: '종합 웰니스 프로그램',
        description: '운동, 영양, 스트레스 관리를 포함한 종합적인 직원 건강관리',
        targetCompanies: '전 규모 기업',
        duration: '6개월 이상 권장',
        pricing: '월 직원당 3-5만원'
      },
      {
        id: 'health-seminars',
        name: '건강 교육 세미나',
        description: '직원들의 건강 인식 개선을 위한 전문가 세미나',
        targetCompanies: '전 규모 기업',
        duration: '1회성 또는 정기 진행',
        pricing: '회당 50-200만원'
      }
    ],
    benefits: {
      productivity: '평균 23% 향상',
      healthCare: '의료비 15-30% 절감',
      satisfaction: '직원 만족도 40% 증가',
      attendance: '결근율 25% 감소'
    },
    contactInfo: {
      phone: '02-0000-0000',
      email: 'corporate@stayfitness.com',
      hours: '평일 09:00-18:00',
      response: '2-3 영업일 이내 연락'
    }
  })
}