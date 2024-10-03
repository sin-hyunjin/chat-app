"use client";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { ActionTooltip } from "@/components/action-tooltip";

interface NavigationItemProps {
  id: string;
  imageUrl: string;
  name: string;
}

/**
 * 특정 서버를 클릭했을 때 해당 서버로 라우터 이동
 * 각 서버 아이템에 이미지와 이름을 표시, 선택된 서버는 스타일이 다르게 적용됨
 * `ActionTooltip`을 사용해 서버 이름 툴팁을 표시
 * `useParams`로 현재 선택된 서버 ID를 가져와 선택 여부에 따라 스타일 다르게 적용
 */

export const NavigationItem = ({ id, imageUrl, name }: NavigationItemProps) => {
  const params = useParams();
  const router = useRouter();

  const onClick = () => {
    router.push(`/servers/${id}`);
  };

  return (
    <ActionTooltip side="right" align="center" label={name}>
      <button onClick={onClick} className="group relative flex items-center">
        <div
          className={cn(
            "absolute left-0 w-[4px] rounded-r-full bg-primary transition-all",
            params?.serverId !== id && "group-hover:h-[20px]",
            params?.serverId === id ? "h-[36px]" : "h-[8px]",
          )}
        />
        <div
          className={cn(
            "group relative mx-3 mt-1 flex h-[48px] w-[48px] overflow-hidden rounded-[24px] transition-all group-hover:rounded-[16px]",
            params.serverId === id &&
              "rounded-[16px] bg-primary/10 text-primary",
          )}
        >
          <Image fill src={imageUrl} alt="Channel"></Image>
        </div>
      </button>
    </ActionTooltip>
  );
};
