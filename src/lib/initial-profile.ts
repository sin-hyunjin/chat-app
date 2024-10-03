import { auth, currentUser } from "@clerk/nextjs/server";

import { db } from "@/lib/db";

/**
 * 현재 사용자의 프로필을 확인하고, 존재하지 않으면 새로 생성하는 함수.
 *
 * 1. 현재 로그인된 사용자 정보를 Clerk에서 가져옴.
 * 2. 사용자가 로그인되어 있지 않으면 로그인 페이지로 리다이렉트 (권장되는 방식은 auth().redirectToSignIn()).
 * 3. 사용자의 프로필이 데이터베이스에 존재하면 해당 프로필을 반환.
 * 4. 프로필이 없으면 새로 생성하고 반환.
 */

export const initialProfile = async () => {
  const user = await currentUser();

  if (!user) {
    return auth().redirectToSignIn();
  }
  // 해당 사용자의 프로필 정보를 데이터베이스에서 찾음
  const profile = await db.profile.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (profile) {
    return profile;
  }

  // 프로필이 없을 경우 새로운 프로필을 생성
  const newProfile = await db.profile.create({
    data: {
      userId: user.id,
      name: `${user.firstName} ${user.lastName}`,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
    },
  });
  return newProfile;
};
