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
import { Copy, RefreshCw } from "lucide-react";

/**
 * InviteModal 컴포넌트:
 *
 * 이 컴포넌트는 사용자가 초대 모달을 열 때, 친구 초대 링크를 생성하고 복사할 수 있는 기능을 제공
 *
 * 주요 기능:
 * 1. **isModalOpen**: `useModalStore()`를 사용하여 현재 모달이 열려 있는지(`isOpen`)와 모달 타입이 "invite"인지(`type`) 확인.
 *    이 두 조건이 충족되면 모달이 열림
 *
 * 2. **Dialog**: 모달 창을 제공하는 컴포넌트로, `open` 속성으로 모달이 열려 있는지 여부를 설정하고,
 *    `onOpenChange`를 통해 모달을 닫는 이벤트 핸들러를 연결.
 *
 * 3. **DialogContent**: 모달 내부 콘텐츠를 담는 컴포넌트로, 모달의 스타일(배경, 패딩, 텍스트 색상 등)을 설정.
 *
 * 4. **DialogHeader**: 모달의 헤더 부분을 구성하며, 여기에는 타이틀을 포함.
 *
 * 5. **DialogTitle**: 모달의 제목으로, 중앙에 배치된 큰 텍스트로 "Invite Friends"라는 내용을 표시.
 *
 * 6. **친구초대 링크 생성**:
 *    - **Label**: 서버 초대 링크에 대한 라벨을 추가하여 설명.
 *    - **Input**: 초대 링크를 보여주는 입력 필드. 사용자 편의를 위해 복사 기능이 제공됩니다. 링크는 `value` 속성을 통해 고정된 값을 가진다.
 *    - **Copy 버튼**: 초대 링크를 복사하는 기능을 제공하며, `Copy` 아이콘과 함께 `Button` 컴포넌트로 구성 됨.
 *
 * 7. **새로운 링크 생성 버튼**:
 *    - 사용자가 새로운 초대 링크를 생성할 수 있는 링크 생성 버튼을 추가. `RefreshCw` 아이콘이 함께 표시되며,
 *      해당 버튼을 클릭하면 새로운 링크를 생성할 수 있음을 나타냄.
 */
export const InviteModal = () => {
  const { isOpen, onClose, type } = useModalStore();

  const isModalOpen = isOpen && type === "invite";

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
            = Server invite link
          </Label>
          <div className="mt-2 flex items-center gap-x-2">
            <Input
              className="border-0 bg-zinc-300/50 text-black focus-visible:ring-0 focus-visible:ring-offset-0"
              value="invite-link"
            />
            <Button size="icon">
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <Button
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
