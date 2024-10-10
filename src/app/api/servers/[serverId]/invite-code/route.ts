import { v4 as uuidv4 } from "uuid";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

/**
 * PATCH  API 핸들러:
 *
 * 이 함수는 특정 서버의 초대 링크를 UUID로 생성하여 업데이트하는 기능을 담당.
 *
 * 주요 기능:
 * 1. **currentProfile()**: 현재 사용자의 프로필을 확인하고, 인증되지 않은 경우 401 상태 코드와 함께 "Unauthorized" 응답을 반환.
 *
 * 2. **params.serverId**: 요청 경로에서 서버 ID를 받아와 존재하지 않을 경우 400 상태 코드와 함께 "Server ID Missing" 응답을 반환.
 *
 * 3. **db.server.update()**: 데이터베이스에서 해당 서버 ID와 프로필 ID가 일치하는 서버의 초대 코드를 UUID로 생성된 새로운 값으로 업데이트.
 *
 * @param {object} params - 서버 ID를 포함한 요청 매개변수 객체
 * @returns {NextResponse} - 성공 시 JSON 형식의 서버 정보 또는 실패 시 적절한 상태 코드와 메시지를 반환
 */
export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string } },
) {
  try {
    const profile = await currentProfile();
    //  1. **currentProfile()**:
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    //  2. **params.serverId**:
    if (!params.serverId) {
      return new NextResponse("Server ID Missing", { status: 400 });
    }
    // 3.  **db.server.update()**
    const server = await db.server.update({
      where: {
        id: params.serverId,
        profileId: profile.id,
      },
      data: {
        inviteCode: uuidv4(),
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.error("[SERVER_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
