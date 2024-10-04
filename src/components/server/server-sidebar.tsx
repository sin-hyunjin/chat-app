import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ChannelType } from "@prisma/client";
import { redirect } from "next/navigation";
import { ServerHeader } from "./server-header";

interface ServerSidebarProps {
  serverId: string;
}

/**
 * ServerSidebar 컴포넌트는 특정 서버의 사이드바를 렌더링함
 * 
 * - `serverId`: 렌더링할 서버의 ID를 매개변수로 받음
 * 
 * 작동 과정:
 * 1. 현재 프로필 정보를 가져옵니다. 프로필이 없으면 홈으로 리디렉션 함
 * 2. 주어진 `serverId`로 데이터베이스에서 서버 정보를 검색
 * 3. 서버와 관련된 채널 및 멤버 정보를 포함
 * 4. 서버의 채널을 텍스트, 오디오, 비디오로 필터링 함
 * 5. 현재 사용자의 프로필 ID와 다른 멤버를 필터링하여 반환함
 
 
 */

export const ServerSidebar = async ({ serverId }: ServerSidebarProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }
  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  });

  const textChannels = server?.channels.filter(
    (channer) => channer.type === ChannelType.TEXT,
  );
  const audioChannels = server?.channels.filter(
    (channer) => channer.type === ChannelType.AUDIO,
  );
  const videoChannels = server?.channels.filter(
    (channer) => channer.type === ChannelType.VIDEO,
  );

  const members = server?.members.filter(
    (member) => member.profileId !== profile.id,
  );

  if (!server) {
    return redirect("/");
  }

  const role = server.members.find(
    (member) => member.profileId === profile.id,
  )?.role;

  return (
    <div className="flex h-full w-full flex-col bg-[#F2F3F5] text-primary dark:bg-[#2B2D31]">
      <ServerHeader server={server} role={role} />
    </div>
  );
};
