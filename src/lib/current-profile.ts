import { auth } from "@clerk/nextjs/server";
import { db } from "./db";

/**
 * currentProfile 함수는 현재 로그인한 사용자의 프로필 정보를 데이터베이스에서 조회함
 * - auth()를 호출하여 현재 사용자의 userId를 가져옴
 * - userId가 존재하지 않을 경우 null을 반환하여 인증되지 않은 사용자를 처리
 * - userId가 유효하면 데이터베이스에서 해당 userId에 대한 프로필 정보를 조회하고 반환
 */
export const currentProfile = async () => {
  const { userId } = auth();

  if (!userId) {
    return null;
  }

  const profile = await db.profile.findUnique({
    where: {
      userId,
    },
  });
  return profile;
};
