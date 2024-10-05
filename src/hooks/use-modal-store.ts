import { Server } from "@prisma/client";
import { create } from "zustand";

/**
 * Modal 상태 관리 스토어를 설정함
 *
 * ModalType: 사용할 수 있는 모달 타입을 정의함. 현재는 "createServer"만 지원함.
 * ModalStore 인터페이스: 모달의 타입, 열림 상태, 모달을 여는 함수 및 닫는 함수를 포함한 상태 구조를 설정함.
 *
 * useModalStore: zustand의 create 함수를 사용해서 모달 상태를 관리하는 스토어를 설정함.
 * - type: 현재 열려 있는 모달의 타입. 열려 있는 모달이 없으면 null임.
 * - isOpen: 모달의 열림 상태를 나타내는 불리언 값임.
 * - onOpen: 모달을 여는 함수로, 모달의 타입을 인자로 받음.
 * - onClose: 모달을 닫는 함수임.
 *
 * 초기 상태:
 * - type은 null로 설정해 모달이 열려 있지 않음을 나타냄.
 * - isOpen은 false로 설정해 모달이 닫혀 있음을 나타냄.
 */

export type ModalType = "createServer" | "invite";

interface ModalData {
  server?: Server;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));
