import { v4 as uuidv4 } from "uuid";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { MemberRole } from "@prisma/client";

/**
 * POST 함수는 서버 생성 요청을 처리
 * - 클라이언트로부터 요청 본문을 JSON 형식으로 받아 name과 imageUrl을 추출
 * - 현재 사용자 프로필을 가져와 인증을 확인
 * - 프로필이 없으면 401 Unauthorized 응답을 반환
 * - 데이터베이스에 새 서버를 생성
 * - 서버 생성 시, 프로필 ID, 서버 이름, 이미지 URL, 초대 코드 및 멤버를 함께 생성
 * - 생성된 서버 정보를 JSON 형식으로 반환
 * - 오류가 발생하면 로그를 출력하고 500 Internal Server Error 응답을 반환
 */

export async function POST(req: Request) {
  try {
    const { name, imageUrl } = await req.json();
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // 데이터베이스에 새 서버를 생성
    const server = await db.server.create({
      data: {
        profileId: profile.id,
        name,
        imageUrl,
        inviteCode: uuidv4(),
        channels: {
          create: [{ name: "general", profileId: profile.id }],
        },
        members: {
          create: [{ profileId: profile.id, role: MemberRole.ADMIN }],
        },
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log("[SERVERS_POST]", error);
    return new NextResponse("Internal ERROR", { status: 500 });
  }
}
