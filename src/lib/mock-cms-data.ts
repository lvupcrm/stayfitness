// Mock CMS data for development without Supabase
import type { Page } from '@/types/cms'

// Mock page data - 실제 홈페이지 섹션들을 CMS에서 편집 가능하도록 구성
export const mockPageData: Page = {
  id: 'home-page',
  slug: 'home',
  title: 'STAY FITNESS 홈페이지',
  description: '체형교정과 통증개선에 특화된 프리미엄 피트니스',
  meta_title: 'STAY FITNESS - 체형교정과 통증개선의 새로운 기준',
  meta_description: '스테이피트니스는 체형교정과 통증개선에 특화된 프리미엄 피트니스입니다. 강남, 홍대, 잠실 지점에서 전문 트레이너의 1:1 맞춤 관리로 당신의 건강한 변화를 시작하세요.',
  meta_keywords: ['체형교정', '통증개선', '피트니스', '스테이피트니스', '강남', '홍대', '잠실'],
  status: 'published',
  template: 'default',
  featured_image: '/images/hero-poster.jpg',
  blocks: [
    {
      id: 'hero-block-1',
      type: 'hero',
      order: 0,
      data: {
        hero: {
          title: 'Not just fitness, It\'s transformation',
          subtitle: '체형교정과 통증개선의 새로운 기준\n스테이피트니스에서 시작하세요',
          backgroundVideo: '/videos/hero-bg.mp4',
          backgroundImage: '/images/hero-poster.jpg',
          ctaButton: {
            text: '무료 체험 신청하기',
            url: '/consultation'
          }
        }
      },
      styles: {
        backgroundColor: 'gradient-to-br from-slate-900 to-slate-800',
        textColor: '#ffffff',
        padding: { top: 0, bottom: 0 }
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'problem-awareness-block',
      type: 'problem_awareness',
      order: 1,
      data: {
        section: {
          title: '혹시 이런 고민이 있으신가요?',
          subtitle: '30-50대 여성 10명 중 8명이 겪는 공통 고민들입니다',
          problems: [
            {
              icon: '😫',
              title: '운동해도 변하지 않는 몸',
              description: '헬스장에서 열심히 운동해도 원하는 체형 변화가 없어서 포기하셨나요?'
            },
            {
              icon: '🏥',
              title: '만성 통증에 시달림',
              description: '어깨, 목, 허리 통증이 심해져도 어떻게 해야 할지 모르겠나요?'
            },
            {
              icon: '⚖️',
              title: '틀어진 체형과 자세',
              description: '골반 틀어짐, 굽은 어깨로 인해 옷 맵시도 살지 않나요?'
            },
            {
              icon: '😰',
              title: '잘못된 운동이 걱정',
              description: '혼자 운동하다 다칠까봐 무서워서 제대로 못하고 계신가요?'
            }
          ],
          callToAction: {
            title: '💡 이 모든 문제, 해결할 수 있습니다!',
            description: '스테이피트니스의 전문 체형교정·통증개선 프로그램으로\n\'진짜 내 몸\'의 변화를 경험해보세요',
            buttonText: '무료 상담 받기',
            buttonUrl: '/consultation'
          }
        }
      },
      styles: {
        backgroundColor: '#fafaf9',
        textColor: '#1c1917',
        padding: { top: 80, bottom: 80 }
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'solution-block',
      type: 'solution',
      order: 2,
      data: {
        section: {
          title: '스테이피트니스만의 차별화된 솔루션',
          subtitle: '체형교정과 통증개선을 위한 전문 시스템',
          solutions: [
            {
              icon: '🔬',
              title: '3D 체형 분석',
              description: '최첨단 장비로 정확한 체형 분석 후 개인 맞춤 프로그램 설계'
            },
            {
              icon: '👨‍⚕️',
              title: '전문 트레이너',
              description: '물리치료사, 운동처방사 자격을 보유한 전문가들의 1:1 관리'
            },
            {
              icon: '🏥',
              title: '의료진 협진',
              description: '정형외과 전문의와의 협진을 통한 안전하고 효과적인 운동'
            },
            {
              icon: '📊',
              title: '과학적 관리',
              description: '실시간 데이터 기반으로 운동 효과를 측정하고 최적화'
            }
          ]
        }
      },
      styles: {
        backgroundColor: '#ffffff',
        textColor: '#1c1917',
        padding: { top: 80, bottom: 80 }
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'social-proof-block',
      type: 'social_proof',
      order: 3,
      data: {
        section: {
          title: '이미 많은 분들이 변화를 경험했습니다',
          subtitle: '실제 회원님들의 생생한 후기',
          testimonials: [
            {
              name: '김○○님 (42세, 직장인)',
              content: '10년간 고생했던 목과 어깨 통증이 3개월 만에 80% 이상 개선되었어요. 정말 감사합니다.',
              rating: 5,
              program: '체형교정 프로그램',
              beforeAfter: {
                before: '만성 목·어깨 통증',
                after: '80% 이상 통증 개선'
              }
            },
            {
              name: '박○○님 (38세, 주부)',
              content: '출산 후 틀어진 골반과 복부 비만이 고민이었는데, 6개월 만에 완전히 달라졌어요!',
              rating: 5,
              program: '산후 체형교정',
              beforeAfter: {
                before: '골반 틀어짐, 복부 비만',
                after: '정상 체형 회복'
              }
            },
            {
              name: '이○○님 (45세, 사업가)',
              content: '바쁜 일정에도 효율적인 1:1 관리로 허리 디스크 증상이 많이 좋아졌습니다.',
              rating: 5,
              program: '통증개선 프로그램',
              beforeAfter: {
                before: '허리 디스크 증상',
                after: '일상생활 불편함 해소'
              }
            }
          ],
          achievements: {
            title: '스테이피트니스 성과',
            stats: [
              { number: '2,847', label: '누적 회원수' },
              { number: '95%', label: '통증 개선율' },
              { number: '4.9', label: '만족도 평점' },
              { number: '98%', label: '재등록률' }
            ]
          }
        }
      },
      styles: {
        backgroundColor: '#f8fafc',
        textColor: '#1e293b',
        padding: { top: 80, bottom: 80 }
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'urgency-block',
      type: 'urgency',
      order: 4,
      data: {
        section: {
          title: '지금 시작하세요!',
          subtitle: '한정된 기회를 놓치지 마세요',
          offers: [
            {
              title: '무료 체험 프로그램',
              description: '3D 체형분석 + 1:1 상담 + 맞춤 운동 체험',
              originalPrice: '150,000원',
              discountPrice: '무료',
              validUntil: '이달 말까지',
              limitation: '매일 선착순 3명'
            }
          ],
          urgencyMessages: [
            '⏰ 매일 선착순 3명만 신청 가능',
            '🎯 개인별 맞춤 분석으로 정확한 솔루션 제공',
            '💪 전문가와 함께하는 안전한 운동',
            '📞 지금 바로 신청하고 변화를 시작하세요'
          ],
          callToAction: {
            title: '무료 체험 신청하기',
            subtitle: '단 3분이면 신청 완료!',
            buttonText: '지금 신청하기',
            buttonUrl: '/consultation',
            phoneNumber: '1588-0000'
          }
        }
      },
      styles: {
        backgroundColor: 'gradient-to-r from-blue-600 to-purple-600',
        textColor: '#ffffff',
        padding: { top: 80, bottom: 80 }
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'faq-block',
      type: 'faq',
      order: 5,
      data: {
        section: {
          title: '자주 묻는 질문',
          subtitle: '궁금한 점들을 확인해보세요',
          faqs: [
            {
              question: '운동 경험이 전혀 없어도 괜찮나요?',
              answer: '물론입니다! 스테이피트니스는 초보자도 안전하게 시작할 수 있도록 개인별 맞춤 프로그램을 제공합니다. 전문 트레이너가 기초부터 차근차근 가르쳐드립니다.'
            },
            {
              question: '통증이 심한데 운동해도 되나요?',
              answer: '통증 부위와 정도를 정확히 파악한 후, 의료진과 협진을 통해 안전한 범위 내에서 운동을 진행합니다. 오히려 올바른 운동을 통해 통증 개선에 도움이 됩니다.'
            },
            {
              question: '몇 개월 정도 다녀야 효과를 볼 수 있나요?',
              answer: '개인차가 있지만, 통증의 경우 4-8주, 체형 변화는 2-3개월부터 체감하실 수 있습니다. 정확한 분석 후 예상 기간을 안내해드립니다.'
            },
            {
              question: '가격은 어떻게 되나요?',
              answer: '개인별 맞춤 프로그램에 따라 가격이 달라집니다. 무료 상담을 통해 정확한 비용을 안내해드리며, 다양한 할인 혜택도 제공하고 있습니다.'
            },
            {
              question: '주차는 가능한가요?',
              answer: '모든 지점에서 무료 주차가 가능합니다. 강남점 2시간, 홍대점·잠실점 3시간 무료 주차를 제공합니다.'
            }
          ]
        }
      },
      styles: {
        backgroundColor: '#ffffff',
        textColor: '#1f2937',
        padding: { top: 80, bottom: 80 }
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ],
  published_at: new Date().toISOString(),
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  created_by: 'mock-user',
  updated_by: 'mock-user',
  version_number: 1
}

// Mock About page data
export const mockAboutPageData: Page = {
  id: 'about-page',
  slug: 'about',
  title: '회사소개',
  description: 'STAY FITNESS에 대해 알아보세요',
  meta_title: 'STAY FITNESS 회사소개 - 체형교정 전문 피트니스',
  meta_description: '스테이피트니스는 체형교정과 통증개선에 특화된 전문 피트니스 센터입니다. 우리의 철학과 가치, 성장 과정을 확인해보세요.',
  meta_keywords: ['스테이피트니스', '회사소개', '체형교정', '전문피트니스', '미션', '비전'],
  status: 'published',
  template: 'about',
  blocks: [
    {
      id: 'about-stats-block',
      type: 'stats',
      order: 0,
      data: {
        stats: {
          title: '숫자로 보는 스테이피트니스',
          subtitle: '신뢰할 수 있는 전문성과 경험',
          items: [
            { number: '2,847', label: '누적 회원수', description: '2019년부터 현재까지' },
            { number: '95%', label: '통증 개선율', description: '3개월 프로그램 기준' },
            { number: '4.9', label: '평균 만족도', description: '5점 만점 기준' },
            { number: '98%', label: '재등록률', description: '첫 프로그램 완료 후' },
            { number: '3', label: '직영 지점', description: '강남·홍대·잠실' },
            { number: '15', label: '전문 트레이너', description: '자격증 보유 전문가' }
          ]
        }
      },
      styles: {
        backgroundColor: '#ffffff',
        textColor: '#1c1917'
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'about-values-block',
      type: 'values',
      order: 1,
      data: {
        values: {
          title: '스테이피트니스만의 차별점',
          subtitle: '왜 우리를 선택해야 할까요?',
          items: [
            {
              icon: 'Heart',
              title: '개인 맞춤 케어',
              description: '획일적인 운동이 아닌, 개인의 체형과 상태에 맞춘 완전 맞춤 프로그램을 제공합니다.'
            },
            {
              icon: 'Shield',
              title: '의료진 협진 시스템',
              description: '정형외과 전문의와의 협진을 통해 안전하고 효과적인 운동 솔루션을 제공합니다.'
            },
            {
              icon: 'Target',
              title: '과학적 분석 기반',
              description: '3D 체형분석, InBody 측정 등 최첨단 장비를 통한 정확한 현상 파악과 개선 방안 제시'
            },
            {
              icon: 'Users',
              title: '전문 트레이너진',
              description: '물리치료사, 운동처방사 등 전문 자격증을 보유한 트레이너들의 1:1 전담 관리'
            },
            {
              icon: 'Award',
              title: '검증된 프로그램',
              description: '수년간의 임상 경험을 바탕으로 검증된 체형교정 및 통증개선 프로그램 운영'
            },
            {
              icon: 'Clock',
              title: '지속적인 관리',
              description: '운동 중뿐만 아니라 일상생활에서의 자세 교정과 생활 습관 개선까지 종합 관리'
            }
          ]
        }
      },
      styles: {
        backgroundColor: '#f8fafc',
        textColor: '#1e293b'
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'about-mvc-block',
      type: 'mvc',
      order: 2,
      data: {
        mvc: {
          title: '스테이피트니스는 무엇을 하고, 왜 하는가',
          subtitle: '우리의 사명, 비전, 핵심가치',
          items: [
            {
              title: 'Mission',
              subtitle: '우리의 사명',
              description: '모든 사람이 건강하고 아름다운 몸으로 자신감 있게 살아갈 수 있도록, 체형교정과 통증개선의 전문적이고 과학적인 솔루션을 제공한다.',
              icon: 'Target'
            },
            {
              title: 'Vision',
              subtitle: '우리의 비전',
              description: '2030년까지 대한민국 체형교정 전문 피트니스의 선도 기업이 되어, 건강한 사회를 만드는 데 기여한다.',
              icon: 'Eye'
            },
            {
              title: 'Core Values',
              subtitle: '핵심 가치',
              description: '전문성(Expertise), 신뢰성(Trust), 혁신(Innovation), 배려(Care)를 바탕으로 고객에게 최고의 가치를 제공한다.',
              icon: 'Heart'
            }
          ]
        }
      },
      styles: {
        backgroundColor: '#ffffff',
        textColor: '#1c1917'
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'about-principles-block',
      type: 'principles',
      order: 3,
      data: {
        principles: {
          title: '스테이피트니스 운영 원칙',
          subtitle: '우리가 지키는 약속들',
          items: [
            '고객의 안전을 최우선으로 하며, 무리한 운동보다는 점진적이고 지속 가능한 개선을 추구합니다.',
            '개인의 체형과 상태에 맞는 완전 맞춤형 프로그램만을 제공하며, 획일적인 운동은 하지 않습니다.',
            '모든 운동 과정은 과학적 근거와 의료진 협진을 바탕으로 하여 안전성과 효과성을 보장합니다.',
            '정직하고 투명한 상담을 통해 고객이 올바른 선택을 할 수 있도록 돕습니다.',
            '지속적인 교육과 연구를 통해 더 나은 서비스를 제공하기 위해 끊임없이 노력합니다.',
            '고객의 개인정보와 프라이버시를 철저히 보호하며, 신뢰받는 파트너가 되겠습니다.'
          ]
        }
      },
      styles: {
        backgroundColor: '#f1f5f9',
        textColor: '#334155'
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'about-timeline-block',
      type: 'timeline',
      order: 4,
      data: {
        timeline: {
          title: '스테이피트니스 성장 스토리',
          subtitle: '지금까지의 발걸음',
          milestones: [
            {
              year: '2019',
              title: '스테이피트니스 설립',
              description: '체형교정 전문 피트니스 센터로 첫 걸음을 내딛었습니다. 강남점 오픈과 함께 체계적인 체형분석 시스템을 도입했습니다.'
            },
            {
              year: '2020',
              title: '의료진 협진 시스템 구축',
              description: '정형외과 전문의와의 협진 시스템을 구축하여 더욱 안전하고 전문적인 서비스를 제공하기 시작했습니다.'
            },
            {
              year: '2021',
              title: '홍대점 오픈 및 프로그램 확장',
              description: '홍대점을 오픈하며 서비스 지역을 확대했고, 다양한 연령층과 증상에 맞는 프로그램을 개발했습니다.'
            },
            {
              year: '2022',
              title: '3D 체형분석 시스템 도입',
              description: '최첨단 3D 체형분석 장비를 도입하여 더욱 정확한 진단과 맞춤 솔루션을 제공하게 되었습니다.'
            },
            {
              year: '2023',
              title: '잠실점 오픈 및 누적 회원수 2,000명 돌파',
              description: '잠실점 오픈으로 3개 지점 체제를 완성했으며, 누적 회원수 2,000명을 돌파했습니다.'
            },
            {
              year: '2024',
              title: '디지털 헬스케어 서비스 런칭',
              description: '앱 기반 운동 관리 시스템과 온라인 상담 서비스를 도입하여 더욱 편리한 서비스를 제공하고 있습니다.'
            }
          ]
        }
      },
      styles: {
        backgroundColor: '#ffffff',
        textColor: '#1f2937'
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'about-contact-block',
      type: 'contact_info',
      order: 5,
      data: {
        contact_info: {
          title: '연락처 및 소셜미디어',
          subtitle: '다양한 채널로 소통하세요',
          contacts: [
            {
              icon: 'Phone',
              label: '대표 전화',
              value: '1588-0000',
              link: 'tel:1588-0000'
            },
            {
              icon: 'Mail',
              label: '이메일 문의',
              value: 'info@stayfitness.co.kr',
              link: 'mailto:info@stayfitness.co.kr'
            },
            {
              icon: 'MessageCircle',
              label: '카카오톡 상담',
              value: '@stayfitness',
              link: 'http://pf.kakao.com/_stayfitness'
            },
            {
              icon: 'Instagram',
              label: '인스타그램',
              value: '@stay_fitness_official',
              link: 'https://instagram.com/stay_fitness_official'
            },
            {
              icon: 'Youtube',
              label: '유튜브',
              value: 'STAY FITNESS TV',
              link: 'https://youtube.com/@stayfitnessTV'
            },
            {
              icon: 'Facebook',
              label: '페이스북',
              value: 'STAY FITNESS',
              link: 'https://facebook.com/stayfitness'
            }
          ],
          tagline: {
            title: '건강한 변화, 우리와 함께하세요',
            subtitle: 'STAY FITNESS'
          }
        }
      },
      styles: {
        backgroundColor: '#f8fafc',
        textColor: '#1e293b'
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ],
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  created_by: 'mock-user',
  updated_by: 'mock-user',
  version_number: 1
}

// Mock pages list
export const mockPagesList: Page[] = [
  mockPageData,
  mockAboutPageData,
  // Mock Locations page data
{
    id: 'locations-page',
    slug: 'locations',
    title: '지점안내',
    description: '전국 스테이피트니스 지점을 확인하세요',
    meta_title: 'STAY FITNESS 지점안내 - 강남, 홍대, 잠실점',
    meta_description: '스테이피트니스 전국 지점 안내. 강남점, 홍대점, 잠실점의 위치, 시설 정보, 전문 트레이너를 확인하세요.',
    meta_keywords: ['스테이피트니스', '지점안내', '강남점', '홍대점', '잠실점', '피트니스센터'],
    status: 'published',
    template: 'default',
    blocks: [
      {
        id: 'locations-main-block',
        type: 'locations',
        order: 0,
        data: {
          locations: {
            title: '지점 안내',
            subtitle: '가까운 스테이피트니스를 찾아보세요',
            locations: [
              {
                id: 'gangnam',
                name: '강남점',
                address: '서울특별시 강남구 테헤란로 123',
                phone: '02-1234-5678',
                hours: '06:00-23:00',
                image: '/images/location-gangnam.jpg',
                description: '강남 업무지구 중심에 위치한 프리미엄 지점',
                features: ['지하철 2호선 역삼역 1분', '무료 주차 2시간', '최신 운동기구', '샤워시설 완비', '라커룸', '개인 PT룸 3개'],
                facilities: [
                  {
                    icon: 'Dumbbell',
                    name: '웨이트 트레이닝 존',
                    description: '최신 웨이트 머신과 프리웨이트 구역으로 구성된 전문 트레이닝 공간'
                  },
                  {
                    icon: 'Users',
                    name: '그룹 운동 스튜디오',
                    description: '요가, 필라테스, 에어로빅 등 다양한 그룹 운동을 위한 넓은 스튜디오'
                  },
                  {
                    icon: 'Waves',
                    name: '스트레칭 존',
                    description: '운동 전후 스트레칭과 마사지볼을 이용한 셀프케어 공간'
                  },
                  {
                    icon: 'Car',
                    name: '무료 주차장',
                    description: '회원 전용 무료 주차공간 (2시간 무료, 추가 시간당 1,000원)'
                  },
                  {
                    icon: 'Coffee',
                    name: '휴게 공간',
                    description: '운동 후 휴식을 취할 수 있는 카페테리아 및 라운지'
                  },
                  {
                    icon: 'Shield',
                    name: '보안 시설',
                    description: '24시간 CCTV 및 스마트 도어락으로 안전한 운동환경 제공'
                  }
                ],
                trainers: [
                  {
                    id: 1,
                    name: '김민수 트레이너',
                    specialty: '체형교정 및 통증개선',
                    experience: '8년',
                    rating: 4.9,
                    image: '/images/trainer-kim.jpg',
                    certifications: ['생활스포츠지도사', '운동처방사', '물리치료사'],
                    achievements: '국가대표 선수 재활 경험, SBS 건강프로그램 출연'
                  },
                  {
                    id: 2,
                    name: '박지영 트레이너',
                    specialty: '다이어트 및 바디컨디셔닝',
                    experience: '6년',
                    rating: 4.8,
                    image: '/images/trainer-park.jpg',
                    certifications: ['생활스포츠지도사', '영양사', 'NSCA-CPT'],
                    achievements: '미스코리아 트레이닝 담당, 연예인 전담 트레이너'
                  },
                  {
                    id: 3,
                    name: '이상훈 트레이너',
                    specialty: '근력강화 및 기능성 훈련',
                    experience: '10년',
                    rating: 4.9,
                    image: '/images/trainer-lee.jpg',
                    certifications: ['생활스포츠지도사', 'ACSM-CPT', 'FMS Level2'],
                    achievements: '프로야구 선수 트레이닝, 올림픽 대표팀 피지컬 코치'
                  }
                ]
              },
              {
                id: 'hongdae',
                name: '홍대점',
                address: '서울특별시 마포구 홍익로 456',
                phone: '02-2345-6789',
                hours: '06:00-23:00',
                image: '/images/location-hongdae.jpg',
                description: '젊은 에너지가 넘치는 홍대 핫플레이스',
                features: ['지하철 2호선 홍익대입구역 3분', '무료 주차 3시간', '24시간 운영존', '여성전용 운동구역', '키즈존', '개인 PT룸 2개'],
                facilities: [
                  {
                    icon: 'Dumbbell',
                    name: '24시간 운영 존',
                    description: '새벽, 심야 시간대에도 자유롭게 이용 가능한 무인 운동구역'
                  },
                  {
                    icon: 'Users',
                    name: '여성 전용 구역',
                    description: '여성 회원들만을 위한 프라이빗하고 안전한 운동 공간'
                  },
                  {
                    icon: 'Waves',
                    name: '요가 & 필라테스 스튜디오',
                    description: '요가매트, 소도구가 완비된 전문 요가 및 필라테스 공간'
                  },
                  {
                    icon: 'Coffee',
                    name: '프로틴 바',
                    description: '운동 후 단백질 보충을 위한 프로틴 쉐이크 및 건강식품 판매'
                  },
                  {
                    icon: 'Wifi',
                    name: '스마트 시설',
                    description: '무료 WiFi, 스마트 미러, 앱 연동 운동기구 등 스마트 시설'
                  },
                  {
                    icon: 'Car',
                    name: '넓은 주차공간',
                    description: '회원 전용 주차장 (3시간 무료, 발렛파킹 서비스)'
                  }
                ],
                trainers: [
                  {
                    id: 4,
                    name: '최은정 트레이너',
                    specialty: '여성 전용 트레이닝',
                    experience: '5년',
                    rating: 4.8,
                    image: '/images/trainer-choi.jpg',
                    certifications: ['생활스포츠지도사', '요가지도자', '필라테스지도자'],
                    achievements: '여성 피트니스 전문, 산후비만 관리 전문가'
                  },
                  {
                    id: 5,
                    name: '정태우 트레이너',
                    specialty: '크로스핏 및 기능성 훈련',
                    experience: '7년',
                    rating: 4.9,
                    image: '/images/trainer-jung.jpg',
                    certifications: ['크로스핏 Level1', 'NSCA-CSCS', '생활스포츠지도사'],
                    achievements: '크로스핏 대회 우승, 기능성훈련 전문가'
                  }
                ]
              },
              {
                id: 'jamsil',
                name: '잠실점',
                address: '서울특별시 송파구 올림픽로 789',
                phone: '02-3456-7890',
                hours: '06:00-23:00',
                image: '/images/location-jamsil.jpg',
                description: '롯데타워가 보이는 프리미엄 스카이 피트니스',
                features: ['지하철 2/8호선 잠실역 5분', '무료 주차 3시간', '스카이라운지', '사우나', '마사지실', '개인 PT룸 4개'],
                facilities: [
                  {
                    icon: 'Dumbbell',
                    name: '프리미엄 웨이트존',
                    description: '최고급 수입 운동기구로 구성된 프리미엄 웨이트 트레이닝 구역'
                  },
                  {
                    icon: 'Waves',
                    name: '스카이 라운지',
                    description: '롯데타워 전망을 감상하며 휴식할 수 있는 프리미엄 라운지'
                  },
                  {
                    icon: 'Users',
                    name: '사우나 & 스파',
                    description: '핀란드식 사우나와 스팀룸, 냉온 교대욕 시설'
                  },
                  {
                    icon: 'Coffee',
                    name: '프리미엄 카페',
                    description: '바리스타가 내리는 커피와 건강한 브런치 메뉴 제공'
                  },
                  {
                    icon: 'Shield',
                    name: '마사지 & 케어룸',
                    description: '전문 마사지사의 스포츠 마사지 및 재활 케어 서비스'
                  },
                  {
                    icon: 'Car',
                    name: 'VIP 주차서비스',
                    description: '발렛파킹 서비스와 전기차 충전시설 완비'
                  }
                ],
                trainers: [
                  {
                    id: 6,
                    name: '황지훈 트레이너',
                    specialty: '재활 및 체형교정',
                    experience: '12년',
                    rating: 5.0,
                    image: '/images/trainer-hwang.jpg',
                    certifications: ['물리치료사', '운동처방사', 'PRI 인증'],
                    achievements: '재활의학과 협진, 척추측만증 교정 전문가'
                  },
                  {
                    id: 7,
                    name: '서미경 트레이너',
                    specialty: '필라테스 & 발레핏',
                    experience: '9년',
                    rating: 4.9,
                    image: '/images/trainer-seo.jpg',
                    certifications: ['국제필라테스지도자', '발레지도자', '요가지도자'],
                    achievements: '국립발레단 출신, 셀럽 전담 트레이너'
                  },
                  {
                    id: 8,
                    name: '안성민 트레이너',
                    specialty: '고강도 인터벌 트레이닝',
                    experience: '6년',
                    rating: 4.8,
                    image: '/images/trainer-ahn.jpg',
                    certifications: ['ACSM-CPT', 'HIIT 전문지도자', '영양상담사'],
                    achievements: 'HIIT 프로그램 개발, 체지방 감량 전문가'
                  }
                ]
              }
            ]
          }
        },
        styles: {
          backgroundColor: '#f8fafc',
          textColor: '#1e293b'
        },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    created_by: 'mock-user',
    updated_by: 'mock-user',
    version_number: 1
  },
  // Mock Programs page data
  {
    id: 'programs-page',
    slug: 'programs',
    title: '프로그램',
    description: '다양한 피트니스 프로그램을 확인하세요',
    meta_title: 'STAY FITNESS 프로그램 - 개인 맞춤 트레이닝',
    meta_description: '스테이피트니스의 다양한 프로그램을 확인하세요. 개인 PT, 그룹 운동, 체형교정, 통증개선 등 전문 프로그램 제공.',
    meta_keywords: ['스테이피트니스', '프로그램', '개인PT', '그룹운동', '체형교정', '통증개선'],
    status: 'published',
    template: 'default',
    blocks: [
      {
        id: 'programs-main-block',
        type: 'programs',
        order: 0,
        data: {
          programs: {
            title: '프로그램 안내',
            subtitle: '당신에게 맞는 최적의 프로그램을 찾아보세요',
            programs: [
              {
                name: '체형교정 프로그램',
                description: '개인별 체형 분석을 통한 맞춤형 교정 프로그램으로 올바른 자세와 균형잡힌 몸을 만들어드립니다.',
                image: {
                  src: '/images/program-posture.jpg',
                  alt: '체형교정 프로그램'
                },
                price: '월 380,000원',
                duration: '60분',
                participants: '1:1 개인',
                level: '모든 레벨',
                features: ['3D 체형분석', '개인 맞춤 운동처방', '자세교정 훈련', '생활습관 개선'],
                schedule: '주 2-3회',
                benefits: ['체형 불균형 개선', '만성통증 완화', '자세 교정', '근력 강화']
              },
              {
                name: '통증개선 프로그램',
                description: '목, 어깨, 허리 등 만성통증 완화를 위한 전문 재활운동 프로그램입니다.',
                image: {
                  src: '/images/program-pain.jpg',
                  alt: '통증개선 프로그램'
                },
                price: '월 420,000원',
                duration: '50분',
                participants: '1:1 개인',
                level: '초급~중급',
                features: ['통증 원인 분석', '재활운동 처방', '물리치료사 협진', '홈케어 지도'],
                schedule: '주 2-3회',
                benefits: ['통증 완화', '가동범위 개선', '근력 회복', '재발 방지']
              },
              {
                name: '다이어트 프로그램',
                description: '건강한 체중감량과 바디라인 개선을 위한 종합 다이어트 프로그램입니다.',
                image: {
                  src: '/images/program-diet.jpg',
                  alt: '다이어트 프로그램'
                },
                price: '월 350,000원',
                duration: '60분',
                participants: '1:1 개인',
                level: '모든 레벨',
                features: ['체성분 분석', '맞춤 운동계획', '식단 관리', '주간 모니터링'],
                schedule: '주 3-4회',
                benefits: ['체중 감량', '체지방 감소', '근육량 증가', '기초대사량 향상']
              },
              {
                name: '근력강화 프로그램',
                description: '체계적인 웨이트 트레이닝을 통한 근력 및 근지구력 향상 프로그램입니다.',
                image: {
                  src: '/images/program-strength.jpg',
                  alt: '근력강화 프로그램'
                },
                price: '월 320,000원',
                duration: '60분',
                participants: '1:1 개인',
                level: '초급~고급',
                features: ['근력 테스트', '단계별 훈련', '보조제 상담', '성과 모니터링'],
                schedule: '주 3-4회',
                benefits: ['근력 증가', '근지구력 향상', '운동능력 개선', '부상 예방']
              },
              {
                name: '그룹 필라테스',
                description: '소그룹으로 진행되는 필라테스 클래스로 코어 강화와 유연성 향상에 중점을 둡니다.',
                image: {
                  src: '/images/program-pilates.jpg',
                  alt: '그룹 필라테스'
                },
                price: '월 180,000원',
                duration: '50분',
                participants: '최대 6명',
                level: '초급~중급',
                features: ['소도구 활용', '호흡법 교육', '자세교정', '스트레칭'],
                schedule: '주 2-3회',
                benefits: ['코어 강화', '유연성 향상', '자세 개선', '스트레스 완화']
              },
              {
                name: '시니어 건강관리',
                description: '50세 이상 중장년층을 위한 안전하고 효과적인 건강관리 프로그램입니다.',
                image: {
                  src: '/images/program-senior.jpg',
                  alt: '시니어 건강관리'
                },
                price: '월 280,000원',
                duration: '50분',
                participants: '1:1 개인',
                level: '초급',
                features: ['건강상태 체크', '저강도 운동', '균형감각 훈련', '관절가동성 향상'],
                schedule: '주 2-3회',
                benefits: ['체력 향상', '근감소 예방', '균형감각 개선', '만성질환 관리']
              }
            ]
          }
        },
        styles: {
          backgroundColor: '#ffffff',
          textColor: '#1c1917'
        },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    created_by: 'mock-user',
    updated_by: 'mock-user',
    version_number: 1
  },
  // Mock Reviews page data
  {
    id: 'reviews-page',
    slug: 'reviews',
    title: '고객후기',
    description: '실제 고객들의 생생한 후기를 확인하세요',
    meta_title: 'STAY FITNESS 고객후기 - 실제 성공 사례',
    meta_description: '스테이피트니스 실제 회원들의 생생한 후기와 성공 사례를 확인하세요. 체형교정, 통증개선, 다이어트 등 다양한 성과 스토리.',
    meta_keywords: ['스테이피트니스', '고객후기', '성공사례', '체형교정후기', '다이어트후기', '통증개선후기'],
    status: 'published',
    template: 'default',
    blocks: [
      {
        id: 'reviews-main-block',
        type: 'reviews',
        order: 0,
        data: {
          reviews: {
            title: '고객 후기',
            subtitle: '스테이피트니스와 함께한 실제 회원님들의 생생한 변화 스토리',
            reviews: [
              {
                name: '김민지님',
                age: 32,
                program: '체형교정 프로그램',
                content: '출산 후 심하게 틀어진 골반과 어깨 비대칭으로 고생했는데, 6개월간의 체형교정 프로그램으로 완전히 달라졌어요. 이제 옷도 예쁘게 떨어지고 자신감도 생겼습니다!',
                rating: 5,
                period: '6개월',
                image: '/images/review-kim.jpg',
                date: '2024-01-15',
                results: ['골반 교정 완료', '어깨 높이 균형 회복', '허리둘레 5cm 감소'],
                beforeAfter: {
                  before: '골반 틀어짐, 어깨 비대칭',
                  after: '균형잡힌 체형, 자세 개선'
                }
              },
              {
                name: '박상훈님',
                age: 45,
                program: '통증개선 프로그램',
                content: '20년간 괴롭혔던 만성 목과 어깨 통증이 3개월 만에 80% 이상 개선되었습니다. 이제 밤에도 편하게 잘 수 있고, 일상생활이 완전히 달라졌어요.',
                rating: 5,
                period: '3개월',
                image: '/images/review-park.jpg',
                date: '2024-02-20',
                results: ['목 통증 80% 개선', '어깨 결림 해소', '수면의 질 향상'],
                beforeAfter: {
                  before: '만성 목어깨 통증, 수면장애',
                  after: '통증 해소, 편안한 일상'
                }
              },
              {
                name: '이소영님',
                age: 28,
                program: '다이어트 프로그램',
                content: '결혼식을 앞두고 시작한 다이어트가 대성공이었어요! 4개월 동안 12kg 감량하면서도 근육량은 오히려 늘어났습니다. 드레스 핏이 완벽했어요!',
                rating: 5,
                period: '4개월',
                image: '/images/review-lee.jpg',
                date: '2024-03-10',
                results: ['체중 12kg 감량', '체지방률 8% 감소', '근육량 2kg 증가'],
                beforeAfter: {
                  before: '체중 68kg, 체지방률 32%',
                  after: '체중 56kg, 체지방률 24%'
                }
              },
              {
                name: '정태진님',
                age: 38,
                program: '근력강화 프로그램',
                content: '운동을 해도 근육이 늘지 않아 고민이었는데, 전문적인 프로그램과 식단관리로 6개월 만에 완전히 다른 몸을 만들었습니다. 벤치프레스 40kg 증가!',
                rating: 5,
                period: '6개월',
                image: '/images/review-jung.jpg',
                date: '2024-01-05',
                results: ['근육량 8kg 증가', '벤치프레스 120kg 달성', '체지방률 5% 감소'],
                beforeAfter: {
                  before: '마른 체형, 근력 부족',
                  after: '탄탄한 근육, 강한 체력'
                }
              },
              {
                name: '최은하님',
                age: 52,
                program: '시니어 건강관리',
                content: '나이가 들면서 계단 오르기도 힘들었는데, 시니어 프로그램을 통해 체력이 20대처럼 돌아왔어요. 등산도 할 수 있게 되었고, 건강 검진 결과도 모두 정상!',
                rating: 5,
                period: '8개월',
                image: '/images/review-choi.jpg',
                date: '2023-12-15',
                results: ['체력 40% 향상', '무릎 통증 해소', '골밀도 증가'],
                beforeAfter: {
                  before: '체력 저하, 관절 통증',
                  after: '활기찬 일상, 건강한 몸'
                }
              },
              {
                name: '한지우님',
                age: 35,
                program: '그룹 필라테스',
                content: '직장인이라 시간이 부족했는데, 그룹 필라테스로 효율적으로 운동할 수 있어서 좋았어요. 코어 근력이 강해지면서 허리 통증도 사라지고 몸의 균형감각도 좋아졌습니다.',
                rating: 4,
                period: '5개월',
                image: '/images/review-han.jpg',
                date: '2024-02-28',
                results: ['코어 근력 강화', '허리 통증 완화', '유연성 40% 향상'],
                beforeAfter: {
                  before: '코어 근력 부족, 허리 통증',
                  after: '탄탄한 코어, 균형잡힌 몸'
                }
              },
              {
                name: '김동현님',
                age: 41,
                program: '체형교정 프로그램',
                content: '라운드숄더와 거북목이 심해서 늘 피곤했는데, 체형교정을 받으면서 완전히 달라졌어요. 회사 동료들도 인상이 달라졌다고 하네요. 자신감도 많이 생겼습니다!',
                rating: 5,
                period: '4개월',
                image: '/images/review-kim-dong.jpg',
                date: '2024-01-20',
                results: ['거북목 교정', '라운드숄더 개선', '키 2cm 증가'],
                beforeAfter: {
                  before: '거북목, 라운드숄더',
                  after: '바른 자세, 당당한 인상'
                }
              },
              {
                name: '송미란님',
                age: 29,
                program: '다이어트 프로그램',
                content: '요요 없는 건강한 다이어트를 찾다가 스테이피트니스를 알게 되었어요. 단순히 살만 빼는 게 아니라 건강한 생활습관까지 만들어주셔서 1년이 지난 지금도 유지하고 있어요!',
                rating: 5,
                period: '5개월',
                image: '/images/review-song.jpg',
                date: '2023-11-10',
                results: ['체중 15kg 감량', '요요 없이 1년 유지', '생활습관 개선'],
                beforeAfter: {
                  before: '체중 72kg, 불규칙한 생활',
                  after: '체중 57kg, 건강한 라이프스타일'
                }
              }
            ]
          }
        },
        styles: {
          backgroundColor: '#f8fafc',
          textColor: '#1e293b'
        },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    created_by: 'mock-user',
    updated_by: 'mock-user',
    version_number: 1
  }
]

// Mock save function
export const mockSavePage = async (page: Page): Promise<Page> => {
  console.log('Mock saving page:', page.title)
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Return updated page with new timestamp
  return {
    ...page,
    updated_at: new Date().toISOString(),
    version_number: page.version_number + 1
  }
}

// Mock authentication
export const mockAuth = {
  isAuthenticated: true,
  user: {
    id: 'mock-user',
    email: 'admin@stayfitness.com',
    name: 'CMS 관리자'
  }
}