'use client';

import { trackKakaoClick } from "@/lib/analytics";

const kakaoUrl = process.env.NEXT_PUBLIC_KAKAO_URL || "https://pf.kakao.com/_default";

const KakaoFloatingButton: React.FC = () => {
  const handleClick = () => {
    window.open(kakaoUrl, "_blank");
    trackKakaoClick("floating");
  };

  return (
    <button
      className="fixed bottom-6 right-6 z-50 bg-yellow-400 hover:bg-yellow-500 text-black rounded-full shadow-lg px-6 py-3 flex items-center gap-2 transition-colors duration-200"
      aria-label="카카오톡 상담하기"
      onClick={handleClick}
    >
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" aria-hidden="true">
        <ellipse cx="12" cy="12" rx="12" ry="12" fill="#3C1E1E"/>
        <path d="M12 6C8.13 6 5 8.61 5 11.77c0 1.7 1.13 3.2 2.89 4.18-.09.34-.57 2.13-.6 2.28 0 0-.01.03.01.05.02.02.04.01.05.01.07 0 2.28-.6 2.65-.75.66.1 1.34.16 2 .16 3.87 0 7-2.61 7-5.77S15.87 6 12 6z" fill="#FFE812"/>
      </svg>
      <span className="font-semibold">카카오톡 상담</span>
    </button>
  );
};

export default KakaoFloatingButton; 