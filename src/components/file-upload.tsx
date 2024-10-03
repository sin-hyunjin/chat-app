"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { UploadDropzone } from "@/lib/uploadthing";
import "@uploadthing/react/styles.css";

interface FileUploadProps {
  endpoint: "messageFile" | "serverImage";
  value: string;
  onChange: (url?: string) => void;
}

/**
 * FileUpload 컴포넌트는 파일 업로드 기능을 제공하며, 업로드된 파일의 미리보기를 보여줌
 * - value가 존재하고 파일 타입이 pdf가 아닌 경우, 업로드된 이미지의 미리보기를 표시
 * - 미리보기 이미지 옆에 삭제 버튼을 제공하여 사용자가 파일을 삭제가능
 * - 파일이 없거나 pdf 파일일 경우, UploadDropzone 컴포넌트를 통해 파일을 업로드할 수 있는 영역을 렌더링 함
 */
export const FileUpload = ({ endpoint, value, onChange }: FileUploadProps) => {
  const fileType = value?.split(".").pop();

  /**
   * 파일이 존재하고, 확장자가 pdf가 아닐 경우 이미지 미리보기와 삭제 버튼을 렌더링
   */

  if (value && fileType !== "pdf") {
    return (
      <div className="relative h-20 w-20">
        <Image fill src={value} alt="Upload" className="rounded-full" />
        <button
          onClick={() => {
            onChange("");
          }}
          className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }
  /**
   * 파일이 없거나 pdf 파일일 경우 UploadDropzone 컴포넌트를 렌더링
   * - 업로드가 완료되면 onChange를 호출하여 업로드된 파일의 URL을 업데이트
   * - 업로드 중 오류가 발생하면 콘솔에 에러 로그를 출력
   */
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].appUrl);
      }}
      onUploadError={(error: Error) => {
        console.log(error);
      }}
    />
  );
};
