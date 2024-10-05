"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModalStore } from "@/hooks/use-modal-store";

/**
 * InviteModal 컴포넌트:
 * 
 * 이 컴포넌트는 사용자가 "invite" 모달을 열었을 때 초대 모달 창을 표시합니다.
 * 
 * 주요 기능:
 * 1. **isModalOpen**: `useModalStore()`에서 모달의 상태와 타입을 가져와, 현재 모달이 열려 있는지 여부와 모달 타입이 "invite"인지 확인.
 * 2. **Dialog**: 모달 창을 열고 닫는 기능을 담당하는 컴포넌트. `open` 속성을 통해 모달이 열렸는지 여부를 결정하고, `onOpenChange`로 닫기 이벤트를 처리.
 * 3. **DialogContent**: 모달 내부의 콘텐츠를 담고 있는 부분. 이곳에서 배경색(`bg-white`), 텍스트 색(`text-black`), 패딩 등이 설정됨.
 * 4. **DialogHeader**: 모달의 제목과 설명이 위치하는 헤더 부분. 서버 이름과 이미지에 대한 설명을 포함.
 * 5. **DialogTitle**: 모달의 타이틀(커스텀 서버). 중앙에 위치한 큰 글씨로 서버 이름을 설정하는 부분을 안내.
 * 6. **DialogDescription**: 모달의 설명 부분. 서버 이름과 이미지를 나중에 언제든지 변경할 수 있음을 설명.
 * 
 
 */
export const InviteModal = () => {
  const { isOpen, onClose, type } = useModalStore();

  const isModalOpen = isOpen && type === "invite";

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden bg-white p-0 text-black">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-center text-2xl font-bold">
            커스텀 서버
          </DialogTitle>

          <DialogDescription className="text-center text-zinc-500">
            Give your server a personality with a name and an image. You can a
            always change it later.
          </DialogDescription>
        </DialogHeader>
        InviteModal
      </DialogContent>
    </Dialog>
  );
};
