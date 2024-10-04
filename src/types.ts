import { Member, Profile, Server } from "@prisma/client";

/**
 * ServerWithMemberWithProfiles 타입은 Server와 관련된 멤버 및 프로필 정보를 포함합니다.
 *
 * - `Server`: 서버의 기본 정보를 포함하는 Prisma 모델.
 * - `members`: 서버의 멤버 배열로, 각 멤버는 아래와 같은 정보를 포함합니다.
 *   - `Member`: 멤버의 기본 정보를 포함하는 Prisma 모델.
 *   - `profile`: 멤버의 프로필 정보를 포함하는 Prisma 모델.
 *     - `Profile`:
 *       - `name`: 프로필 소유자의 이름.
 *       - `id`: 프로필의 고유 식별자.
 *       - `imageUrl`: 프로필 이미지의 URL.
 *       - `createdAt`: 프로필 생성 날짜.
 *       - `updatedAt`: 프로필 마지막 수정 날짜.
 *       - `userId`: 프로필 소유자의 사용자 ID.
 *       - `email`: 프로필 소유자의 이메일 주소.
 */

export type ServerWithMemberWithProfiles = Server & {
  members: (Member & { profile: Profile })[];
};
