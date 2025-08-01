import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const { name, phone, email, consultationType, preferredTime, message, createdAt } = body

    // 필수 필드 검증
    if (!name || !phone || !email || !consultationType || !preferredTime) {
      return NextResponse.json(
        { error: '필수 정보가 누락되었습니다.' },
        { status: 400 }
      )
    }

    // 상담 예약 데이터 저장
    const { error } = await supabase
      .from('consultations')
      .insert([
        {
          name,
          phone,
          email,
          consultation_type: consultationType,
          preferred_time: preferredTime,
          message: message || '',
          status: 'pending',
          created_at: createdAt
        }
      ])

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: '상담 예약 저장 중 오류가 발생했습니다.' },
        { status: 500 }
      )
    }

    // 성공 응답과 함께 추가 정보 제공
    return NextResponse.json({
      success: true,
      message: '상담 예약이 성공적으로 완료되었습니다.',
      data: {
        consultationType,
        preferredTime,
        expectedResponse: '24시간 이내에 연락드리겠습니다.'
      }
    })

  } catch (err: unknown) {
    console.error('Consultation API error:', err)
    const errorMessage = err instanceof Error ? err.message : '서버 오류가 발생했습니다.'
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Consultation API is running',
    availableTypes: ['coffee-chat', 'phone-call', 'video-call', 'visit'],
    availableTimes: [
      '09:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00',
      '14:00 - 15:00', '15:00 - 16:00', '16:00 - 17:00',
      '17:00 - 18:00', '18:00 - 19:00', '19:00 - 20:00'
    ]
  })
}