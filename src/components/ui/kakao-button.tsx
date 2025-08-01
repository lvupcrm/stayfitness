import { trackKakaoClick } from "@/lib/analytics";

interface KakaoButtonProps {
  location: string;
  className?: string;
  children?: React.ReactNode;
}

const kakaoUrl = process.env.NEXT_PUBLIC_KAKAO_URL || "https://pf.kakao.com/_default";

export function KakaoButton({ location, className = "", children = "카카오톡 상담하기" }: KakaoButtonProps) {
  const handleKakaoClick = () => {
    window.open(kakaoUrl, "_blank");
    trackKakaoClick(location);
  };

  return (
    <button
      className={`bg-green-700 hover:bg-green-800 text-white font-bold rounded-full px-12 py-4 shadow-none text-lg transition-colors duration-200 ${className}`}
      onClick={handleKakaoClick}
    >
      {children}
    </button>
  );
}