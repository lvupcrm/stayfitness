import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const { 
      name, 
      phone, 
      email, 
      experience, 
      specialization, 
      certification,
      introduction,
      motivation,
      availableTime,
      portfolio,
      workStyle,
      createdAt 
    } = body

    // 필수 필드 검증
    if (!name || !phone || !email || !experience || !specialization || !introduction || !motivation || !availableTime || !workStyle) {
      return NextResponse.json(
        { error: '필수 정보가 누락되었습니다.' },
        { status: 400 }
      )
    }

    // 트레이너 지원서 데이터 저장
    const { error } = await supabase
      .from('trainer_applications')
      .insert([
        {
          name,
          phone,
          email,
          experience_level: experience,
          specializations: JSON.stringify(specialization),
          certifications: certification || '',
          introduction,
          motivation,
          available_times: JSON.stringify(availableTime),
          portfolio_url: portfolio || '',
          work_style: workStyle,
          status: 'pending',
          application_type: 'direct', // direct or talent_pool
          created_at: createdAt
        }
      ])

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: '트레이너 지원서 저장 중 오류가 발생했습니다.' },
        { status: 500 }
      )
    }

    // 성공 응답
    return NextResponse.json({
      success: true,
      message: '트레이너 지원서가 성공적으로 제출되었습니다.',
      data: {
        name,
        experience,
        specializations: specialization,
        workStyle,
        expectedResponse: '3-5일 이내에 검토 후 연락드리겠습니다.',
        nextSteps: [
          '지원서 검토',
          '1차 전화/화상 면접',
          '실기 테스트',
          '최종 면접'
        ]
      }
    })

  } catch (err: unknown) {
    console.error('Trainer application API error:', err)
    const errorMessage = err instanceof Error ? err.message : '서버 오류가 발생했습니다.'
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}

// Talent Pool 등록을 위한 별도 엔드포인트
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, phone, email, interests, message } = body

    // Talent Pool 데이터 저장
    const { error } = await supabase
      .from('trainer_applications')
      .insert([
        {
          name,
          phone,
          email,
          introduction: message || '인재풀 등록',
          motivation: interests || '향후 기회를 위한 등록',
          experience_level: 'not_specified',
          specializations: JSON.stringify([]),
          available_times: JSON.stringify([]),
          work_style: 'flexible',
          status: 'talent_pool',
          application_type: 'talent_pool',
          created_at: new Date().toISOString()
        }
      ])

    if (error) {
      console.error('Talent Pool error:', error)
      return NextResponse.json(
        { error: '인재풀 등록 중 오류가 발생했습니다.' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: '인재풀에 성공적으로 등록되었습니다.',
      data: {
        name,
        status: 'talent_pool',
        expectedContact: '적합한 포지션이 생기면 먼저 연락드리겠습니다.'
      }
    })

  } catch (err: unknown) {
    console.error('Talent Pool API error:', err)
    const errorMessage = err instanceof Error ? err.message : '서버 오류가 발생했습니다.'
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Trainer Application API is running',
    availablePositions: [
      {
        title: '퍼스널 트레이너',
        type: 'full-time',
        requirements: ['생활스포츠지도사 또는 관련 자격증', '3년 이상 경력', '고객 응대 능력']
      },
      {
        title: '그룹 클래스 강사',
        type: 'part-time',
        requirements: ['해당 운동 전문 자격증', '그룹 수업 경험', '리더십']
      },
      {
        title: '재활 운동 전문가',
        type: 'consulting',
        requirements: ['물리치료사 또는 운동처방사', '재활 운동 경력', '의료진과의 협업 경험']
      }
    ],
    applicationProcess: [
      '온라인 지원서 제출',
      '서류 심사 (3-5일)',
      '1차 면접 (전화/화상)',
      '실기 테스트',
      '최종 면접',
      '최종 합격 통보'
    ]
  })
}