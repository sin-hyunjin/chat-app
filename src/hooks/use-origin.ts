import { useEffect, useState } from "react";

/**
 * useOrigin 커스텀 훅:
 *
 * 클라이언트 측에서 `window.location.origin`을 반환하는 훅입니다.
 *
 * 주요 기능:
 * 1. **mounted 상태**: 컴포넌트가 마운트된 후에만 `window.location.origin` 값을 반환.
 * 2. **서버/클라이언트 환경 처리**: 브라우저가 아닌 경우 빈 문자열을 반환하여 안전하게 처리.
 *
 * 사용 예시:
 * ```ts
 * const origin = useOrigin();
 * console.log(origin);  // 클라이언트 측에서만 'http://example.com' 반환
 * ```
 */

export const useOrigin = () => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : " ";

  if (!mounted) {
    return "";
  }
  return origin;
};
