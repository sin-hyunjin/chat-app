"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

/**
 * ActionTooltip 컴포넌트는 주어진 자식 요소에 툴팁을 추가하는 역할을 함.
 *
 * @param {string} label - 툴팁에 표시될 텍스트.
 * @param {React.ReactNode} children - 툴팁이 적용될 자식 요소.
 * @param {"top" | "right" | "bottom" | "left"} [side] - 툴팁의 위치를 결정함. 기본값은 'top'임.
 * @param {"start" | "center" | "end"} align - 툴팁의 정렬을 설정함.
 *
 * 사용 방법:
 * <ActionTooltip label="툴팁 내용" side="bottom" align="center">
 *   <버튼>Hover me!</버튼>
 * </ActionTooltip>
 *
 * 이 컴포넌트는 툴팁 제공자(TooltipProvider)를 사용하여 툴팁을 관리하며,
 * TooltipTrigger를 통해 자식 요소에 마우스를 올리면 툴팁이 표시됨.
 * TooltipContent는 툴팁의 내용을 정의하며, side와 align을 통해 위치와 정렬을 설정함.
 */

interface ActionTooltipProps {
  label: string;
  children: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align: "start" | "center" | "end";
}

export const ActionTooltip = ({
  label,
  children,
  side,
  align,
}: ActionTooltipProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={50}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={side} align={align}>
          <p className="text-sm font-semibold capitalize">
            {label.toLowerCase()}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
