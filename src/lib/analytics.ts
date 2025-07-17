// Kakao 상담 버튼 클릭 이벤트 트래킹 함수
export function trackKakaoClick(location: string) {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", "kakao_click", {
      event_category: "engagement",
      event_label: location, // 예: 'floating', 'intro_section', ...
    });
  }
} 