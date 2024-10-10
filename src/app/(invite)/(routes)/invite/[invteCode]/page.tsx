import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

interface InviteCodePageProps {
  params: {
    inviteCode: string; // 초대 코드 매개변수 정의
  };
}

/**
 * InviteCodePage 컴포넌트:
 *
 * 사용자가 초대 링크를 통해 서버에 가입하는 페이지.
 *
 * 주요 기능:
 * 1. 현재 사용자 프로필을 가져오고, 인증되지 않은 경우 로그인 페이지로 리디렉션.
 * 2. 초대 코드가 없는 경우 홈 페이지로 리디렉션.
 * 3. 초대 코드가 이미 사용 중인 서버가 있는지 확인.
 * 4. 사용자가 초대 코드를 통해 서버에 추가되고, 해당 서버로 리디렉션.
 */
const InviteCodePage = async ({ params }: InviteCodePageProps) => {
  // 현재 사용자 프로필 가져오기
  const profile = await currentProfile();

  // 프로필이 없는 경우 로그인 페이지로 리디렉션
  if (!profile) {
    return auth().redirectToSignIn();
  }

  // 초대 코드가 없는 경우 홈 페이지로 리디렉션
  if (!params.inviteCode) {
    return redirect("/");
  }

  // 초대 코드로 서버를 찾고, 해당 서버에 이미 가입한 사용자가 있는지 확인
  const existingServer = await db.server.findFirst({
    where: {
      inviteCode: params.inviteCode, // 초대 코드로 서버 찾기
      members: {
        some: {
          profileId: profile.id, // 현재 프로필 ID로 가입 여부 확인
        },
      },
    },
  });

  // 이미 서버에 가입한 경우 해당 서버로 리디렉션
  if (existingServer) {
    return redirect(`/servers/${existingServer.id}`);
  }

  // 서버에 새로운 회원 추가
  const server = await db.server.update({
    where: {
      inviteCode: params.inviteCode, // 초대 코드로 서버 찾기
    },
    data: {
      members: {
        create: [
          {
            profileId: profile.id, // 현재 프로필 ID로 새로운 회원 추가
          },
        ],
      },
    },
  });

  // 서버에 성공적으로 추가된 경우 해당 서버로 리디렉션
  if (server) {
    return redirect(`/servers/${server.id}`);
  }

  // 모든 조건을 만족하지 못한 경우 기본 Invite 메시지 표시
  return <div>Invite</div>;
};

export default InviteCodePage;
