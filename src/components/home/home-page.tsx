'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { trackPageView } from '@/lib/analytics'
import './home-page.css'

export function HomePage() {
  const pathname = usePathname()
  
  useEffect(() => {
    trackPageView(pathname)
  }, [pathname])

  return (
    <div className="frame-16867">
      {/* Navigation */}
      <div className="frame-16868">
        <div className="div">홈</div>
        <div className="pt">PT</div>
        <div className="div2">지점</div>
        <div className="div3">필라테스</div>
        <div className="b-a">b &amp; a</div>
        <div className="div4">채용</div>
        <div className="div5">헬스</div>
        <div className="ellipse-54"></div>
      </div>

      {/* Hero Section */}
      <div className="stay-healthy-stay-here">stay healthy, stay here</div>
      <div className="div6">스테이피트니스에서 시작하세요.</div>
      <div className="div7">현재 스테이를 방문하신 고객분들의 공통 사례입니다.</div>
      <div className="div8">건강이 머무르는 공간</div>
      <div className="click">체험click</div>

      {/* Problem Section */}
      <div className="div9">혹시 이중 해당하세요?</div>
      <div className="div10">현재 스테이를 방문하신 고객분들의 공통 사례입니다.</div>

      {/* Customer Testimonials */}
      <div className="div11">실제 회원님들의 생생한 후기</div>
      <div className="div11">실제 회원님들의 생생한 후기</div>
      <div className="div11">실제 회원님들의 생생한 후기</div>

      {/* Stats Section */}
      <div className="div12">스테이피트니스 성과</div>
      <div className="pt-1-800">
        실제 PT고객님들의 솔직 후기
        <br />
        네이버리뷰 1,800건 +
      </div>
      <div className="_100-before-after">
        신뢰도 100%
        <br />
        Before &amp; after
      </div>
      <div className="pt-23">누적 PT회원(23년 ~)</div>
      <div className="div13">만족도 평점</div>
      <div className="div14">재등록의사</div>
      <div className="_1-100">1,100+</div>
      <div className="_4-8">4.8</div>
      <div className="_90">90% +</div>

      {/* PT Features */}
      <div className="pt2">스테이피트니스만의 차별화된 PT</div>
      <div className="div15">이미 많은 분들이 변화를 경험했습니다</div>
      <div className="line-51"></div>
      <div className="line-52"></div>
      <div className="line-53"></div>
      <div className="line-54"></div>

      {/* Problem Cards */}
      <div className="frame-16887">
        <div className="div16">"홈트로는 한계가 있어요"</div>
        <div className="div17">
          혼자서 운동하니, 변화도 없고
          <br />
          '이게 맞나'싶어요.
        </div>
      </div>

      <div className="frame-16888">
        <div className="div16">"간헐적 단식 부작용이에요"</div>
        <div className="div17">
          잘못된 식습관으로 다이어트를 하니
          <br />
          요요도 오고 더 힘들어졌어요.
        </div>
      </div>

      <div className="frame-16891">
        <div className="div18">이 모든 문제, 해결할 수 있습니다!</div>
        <div className="_180">
          우리 몸은 정확한 운동, 건강한 식사로 180도 달라집니다.
          <br />
          '내 몸'을 위해 신청해보세요.
        </div>
        <div className="frame-16892"></div>
      </div>

      <div className="frame-16889">
        <div className="div16">"이렇게 살다간 죽겠어요"</div>
        <div className="div17">
          가정일, 근무만 하다보니
          <br />
          건강은 뒷전 이였어요.
        </div>
      </div>

      <div className="frame-16890">
        <div className="div16">"체형 개선이 필요해요"</div>
        <div className="div17">
          일 할때 만성통증, 이제는 하루종일 불편하고
          <br />
          얼른 개선하고싶어요.
        </div>
      </div>

      {/* Service Features */}
      <div className="frame-168922">
        <div className="pt3">PT일지 작성</div>
        <div className="no">
          서명만 받고 끝? NO
          <br />
          운동한 루틴을 트레이너가 정리
        </div>
      </div>

      <div className="frame-16893">
        <div className="div16">체형평가</div>
        <div className="div17">
          맞춤 수업의 첫번째는 고객의 신체 파악
          <br />
          최첨단 장비로 체형평가(둔전점)
        </div>
      </div>

      <div className="frame-16894">
        <div className="div16">기능평가</div>
        <div className="div17">
          근육의 가동범위는 모두가 다르기에
          <br />
          운동 전, 기능평가는 필수
        </div>
      </div>

      <div className="frame-16895">
        <div className="div16">지속적인 관리</div>
        <div className="no">
          운동만 알려주는건 NO
          <br />
          라이프 스타일을 고려하여 관리
        </div>
      </div>

      {/* Testimonial Images */}
      <div className="frame-16902">
        <img className="mask-group" src="/images/mask-group0.svg" />
        <div className="ellipse-57"></div>
      </div>

      {/* Customer Reviews */}
      <div className="frame-16907">
        <div className="div19">목적: 다이어트</div>
        <div className="div20">
          "저의 체형에 맞게, 저의 속도에 맞게 천천히,
          <br />
          하지만 정확하게 잘 알여주셔서 쉽게 배울 수 있었어요"
        </div>
        <div className="div21">만족도:🌟🌟🌟🌟🌟</div>
      </div>

      <div className="frame-16908">
        <div className="div22">목적: 운동의 습관화</div>
        <div className="div20">
          "컨디션 체크부터 자극이 들어오는 근육 설명,
          <br />
          피티가 없는 날에도 루틴을 주시는 센스!"
        </div>
        <div className="div21">만족도:🌟🌟🌟🌟🌟</div>
      </div>

      {/* Categories */}
      <div className="div23">다이어트</div>
      <div className="div24">바디프로필</div>
      <div className="div25">체형교정</div>

      <div className="frame-16909">
        <div className="div26">목적: 건강관리</div>
        <div className="div27">
          "처음 약속해주신대로
          <br />
          정말 기적을 만들어주셨습니다."
        </div>
        <div className="div21">만족도:🌟🌟🌟🌟🌟</div>
      </div>

      <div className="frame-16910">
        <div className="div26">목적: 근력향상</div>
        <div className="div20">
          "수업도 재밌게 진행해 주시고
          <br />
          운동의 기본, 하나하나 안놓치고 잡아주세요"
        </div>
        <div className="div21">만족도:🌟🌟🌟🌟🌟</div>
      </div>

      <div className="frame-16911">
        <div className="div26">목적: 바디프로필</div>
        <div className="div28">
          "일단 와보세요.. 죽여줍니다.
          <br />
          이제 운동 오려고 반차도 쓰는 제가 되었습니다!"
        </div>
        <div className="div21">만족도:🌟🌟🌟🌟🌟</div>
      </div>

      {/* Gallery Images */}
      <div className="frame-16904">
        <img className="mask-group2" src="/images/mask-group1.svg" />
      </div>
      <div className="frame-16905">
        <img className="mask-group3" src="/images/mask-group2.svg" />
      </div>
      <div className="frame-16906">
        <img className="mask-group4" src="/images/mask-group3.svg" />
      </div>
      <div className="frame-16903">
        <img className="mask-group5" src="/images/mask-group4.svg" />
      </div>

      {/* CTA Section */}
      <div className="frame-16917">
        <div className="div29">매일 한정된 기회를 놓치지 마세요</div>
        <div className="_1-1">체형분석(필요시)+1:1 상담 + 맞춤 운동 체험</div>
        <div className="_80-000">80,000원</div>
        <div className="_2">매일 선착순 2명만 신청 가능</div>
        <div className="div30">부담없이 받아보세요</div>
        <div className="div31">만족감있는 첫 시작</div>
        <div className="div32">지금 바로 신청하고 변화를 시작하세요</div>
        <div className="pt4">체험 PT 프로그램</div>
        <div className="div33">무료</div>
        <div className="div34">지금 시작하세요!</div>
        <div className="line-57"></div>
      </div>

      {/* Bottom Images */}
      <img className="arrow-26" src="/images/arrow-260.svg" />
      <div className="div35">순서를 바꾸면 어떨지?</div>
      <img className="image-423" src="/images/image-4230.png" />
      <img className="image-422" src="/images/image-4220.png" />
      <img className="image-421" src="/images/image-4210.png" />
    </div>
  )
}