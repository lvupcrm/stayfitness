import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function POST(req: NextRequest) {
  try {
    const { name, phone, program } = await req.json();
    if (!name || !phone) {
      return NextResponse.json({ error: '이름과 전화번호는 필수입니다.' }, { status: 400 });
    }

    // Supabase에 lead 데이터 저장
    const { error } = await supabase.from('lead').insert([{ name, phone, program }]);
    if (error) {
      return NextResponse.json({ error: 'DB 저장 중 오류가 발생했습니다.' }, { status: 500 });
    }

    // Slack Webhook 호출
    const webhookUrl = process.env.SLACK_WEBHOOK_URL;
    if (webhookUrl) {
      const slackRes = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: `새 리드 신청\n이름: ${name}\n전화: ${phone}\n관심 프로그램: ${program || '-'}\n`,
        }),
      });
      if (!slackRes.ok) {
        return NextResponse.json({ error: 'Slack 알림 전송 실패' }, { status: 500 });
      }
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : '서버 오류';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
} 