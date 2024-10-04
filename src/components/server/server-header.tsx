"use client";
import { ServerWithMemberWithProfiles } from "@/types";
import { MemberRole } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  PlusCircle,
  Settings,
  Trash,
  UserPlus,
  Users,
} from "lucide-react";

interface ServerHeaderProps {
  server: ServerWithMemberWithProfiles;
  role?: MemberRole;
}

/**
 * ServerHeader 컴포넌트: 서버 정보를 표시하고,
 * 사용자의 역할에 따라 다양한 드롭다운 메뉴 항목을 제공
 * - 서버 이름 표시
 * - ADMIN 또는 MODERATOR 역할에 따라 다양한 관리 기능 제공
 *   - 사람 초대
 *   - 서버 설정
 *   - 멤버 관리
 *   - 채널 생성
 *   - 서버 삭제 또는 서버 나가기 옵션 제공
 */

export const ServerHeader = ({ server, role }: ServerHeaderProps) => {
  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none" asChild>
        <button className="text-md flex w-full items-center border-b-2 border-neutral-200 px-3 font-semibold transition hover:bg-zinc-700/10 dark:border-neutral-800 dark:hover:bg-zinc-700/50">
          {server.name} {/* 서버 이름 표시 */}
          <ChevronDown className="ml-auto h-5 w-5" />{" "}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 space-y-[2px] text-xs font-medium text-black dark:text-neutral-400">
        {/* 사용자가 MODERATOR인 경우 "Invite People" 항목 표시 */}
        {isModerator && (
          <DropdownMenuItem className="cursor-pointer px-3 py-2 text-sm text-indigo-600 dark:text-indigo-400">
            Invite People
            <UserPlus className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        )}
        {/* 사용자가 ADMIN인 경우 "Server Settings" 항목 표시 */}
        {isAdmin && (
          <DropdownMenuItem className="cursor-pointer px-3 py-2 text-sm">
            Server Settings
            <Settings className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        )}
        {/* 사용자가 ADMIN인 경우 "Manage Members" 항목 표시 */}
        {isAdmin && (
          <DropdownMenuItem className="cursor-pointer px-3 py-2 text-sm">
            Manage Members
            <Users className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        )}
        {/* 사용자가 MODERATOR인 경우 "Create Channel" 항목 표시 */}
        {isModerator && (
          <DropdownMenuItem className="cursor-pointer px-3 py-2 text-sm">
            Create Chnnel
            <PlusCircle className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        )}
        {isModerator && <DropdownMenuSeparator />}{" "}
        {/* MODERATOR인 경우 구분선 표시 */}
        {/* 사용자가 ADMIN인 경우 "Delete Server" 항목 표시 */}
        {isAdmin && (
          <DropdownMenuItem className="cursor-pointer px-3 py-2 text-sm text-rose-500">
            Delete Server
            <Trash className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        )}
        {/* 사용자가 ADMIN이 아닌 경우 "Leave Server" 항목 표시 */}
        {!isAdmin && (
          <DropdownMenuItem className="cursor-pointer px-3 py-2 text-sm text-rose-500">
            Leave Server
            <Trash className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
