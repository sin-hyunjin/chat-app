"use client";

import { Plus } from "lucide-react";
import { ActionTooltip } from "@/components/action-tooltip";
import { useModalStore } from "@/hooks/use-modal-store";

/**
 * 사이드바에서 서버 추가 버튼을 렌더링
 * `ActionTooltip`을 사용하여 버튼에 'Add a server' 툴팁을 표시
 * 버튼에 호버하면 스타일이 변경되며, 아이콘과 배경색이 전환됨
 */

export const NavigationAction = () => {
  const { onOpen } = useModalStore();

  console.log(onOpen);
  return (
    <div>
      <ActionTooltip side="right" align="center" label="Add a server">
        <button
          className="group flex items-center"
          onClick={() => onOpen("createServer")}
        >
          <div className="mx-3 flex h-[48px] w-[48px] items-center justify-center overflow-hidden rounded-[24px] bg-background transition-all group-hover:rounded-[16px] group-hover:bg-emerald-500 dark:bg-neutral-700">
            <Plus
              className="text-emerald-500 transition group-hover:text-white"
              size={25}
            />
          </div>
        </button>
      </ActionTooltip>
    </div>
  );
};
