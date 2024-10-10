"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModalStore } from "@/hooks/use-modal-store";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckIcon, Copy, RefreshCw } from "lucide-react";
import { useOrigin } from "@/hooks/use-origin";
import { useState } from "react";
import axios from "axios";

/**
 * InviteModal 컴포넌트:
 *
 * 이 컴포넌트는 사용자가 서버의 초대 링크를 확인, 복사, 그리고 새로운 링크로 생성할 수 있는 모달 창을 제공.
 *
 * 주요 기능:
 * 1. **useModalStore()**: 전역 상태를 관리하며, 모달의 열림 상태, 타입, 서버 데이터를 가져옴. 모달이 "invite" 타입일 때만 표시.
 * 2. **useOrigin()**: 현재 도메인(origin)을 가져와 초대 링크 URL을 구성.
 * 3. **Dialog**: Radix UI의 Dialog 컴포넌트를 이용해 모달을 제어.
 * 4. **DialogContent**: 모달 내부의 콘텐츠를 표시. 초대 링크와 복사 및 재생성 기능을 포함.
 * 5. **Invite URL**: 서버 데이터에서 초대 코드를 사용해 초대 링크를 구성.
 * 6. **onCopy()**: 초대 링크를 클립보드에 복사하고, 복사 완료 후 상태를 변경
 * 7. **onNew()**: Axios를 이용해 서버 초대 링크를 재생성하는 요청을 보냄. 새로운 초대 링크를 응답받으면 상태를 업데이트해 모달에 표시.
 * 8. **isLoading**: 서버 요청 중 로딩 상태를 관리하여 버튼의 비활성화 처리 및 사용자 경험 향상.
 *
 * @returns {JSX.Element} - 친구 초대 링크를 복사하거나 새로 생성할 수 있는 모달 창 UI를 반환
 */

export const InviteModal = () => {
  //1. **useModalStore()**: 전역 상태를 관리하며, 모달의 열림 상태, 타입, 서버 데이터를 가져옴. 모달이 "invite" 타입일 때만 표시.
  const { onOpen, isOpen, onClose, type, data } = useModalStore();
  //2. **useOrigin()**: 현재 도메인(origin)을 가져와 초대 링크 URL을 구성.
  const origin = useOrigin();

  const isModalOpen = isOpen && type === "invite";
  const { server } = data;

  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 5. **Invite URL**: 서버 데이터에서 초대 코드를 사용해 초대 링크를 구성.
  const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

  // 6. **onCopy()**: 초대 링크를 클립보드에 복사하고, 복사 완료 후 상태를 변경
  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  // 7.**onNew()**: Axios를 이용해 서버 초대 링크를 재생성하는 요청을 보냄. 새로운 초대 링크를 응답받으면 상태를 업데이트해 모달에 표시.
  const onNew = async () => {
    try {
      setIsLoading(true);
      const response = await axios.patch(
        `/api/servers/${server?.id}/invite-code`,
      );

      onOpen("invite", { server: response.data });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden bg-white p-0 text-black">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-center text-2xl font-bold">
            Invite Friends
          </DialogTitle>
        </DialogHeader>
        {/* 친구초대 링크 생성*/}
        <div className="p-6">
          <Label className="text-xs font-bold uppercase text-zinc-500 dark:text-secondary/70">
            Server invite link
          </Label>
          <div className="mt-2 flex items-center gap-x-2">
            <Input
              readOnly
              disabled={isLoading}
              className="border-0 bg-zinc-300/50 text-black focus-visible:ring-0 focus-visible:ring-offset-0"
              value={inviteUrl}
            />

            {/* 링크 복사 버튼 */}
            <Button disabled={isLoading} size="icon" onClick={onCopy}>
              {copied ? (
                <CheckIcon className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
          <Button
            disabled={isLoading}
            onClick={onNew}
            variant="link"
            size="sm"
            className="mt-4 text-xs text-zinc-500"
          >
            Generate a new link
            <RefreshCw className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
