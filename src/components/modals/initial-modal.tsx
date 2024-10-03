"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FileUpload } from "../file-upload";

/**
 * formSchema: 서버 이름과 이미지를 검증하기 위한 Zod 스키마
 * 1. name 필드는 최소 1자 이상이어야 하며, 없을 경우 오류 메시지를 표시
 * 2. imageUrl 필드도 최소 1자 이상이어야 하며, 없을 경우 오류 메시지를 표시
 */

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Server name is requierd.",
  }),
  imageUrl: z.string().min(1, {
    message: "Server image is requierd.",
  }),
});

/**
 * InitialModal 컴포넌트:
 * 1. 서버 이름과 이미지를 입력하는 모달 창을 제공
 * 2. Zod를 사용해 입력을 검증하고, react-hook-form을 통해 폼 상태를 관리
 * 3. 사용자가 서버 이름과 이미지를 입력하고 제출할 수 있음
 * 4. 이미지 업로드는 FileUpload 컴포넌트를 통해 처리
 * 5. 모달은 컴포넌트가 클라이언트 측에 마운트된 후에만 렌더링됨
 */
export const InitialModal = () => {
  /**
   * isMounted: 컴포넌트가 마운트되었는지 여부를 추적하는 상태
   * 초기 상태는 false이며, useEffect를 통해 마운트 후 true로 설정
   */
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const router = useRouter();
  /**
   * useForm: react-hook-form을 사용해 폼 상태를 관리
   * - resolver: Zod 스키마를 사용한 폼 검증
   * - defaultValues: 서버 이름과 이미지 URL의 기본 값을 설정
   */
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      imageUrl: "",
      name: "",
    },
  });

  /**
   * isLoading: 폼이 제출 중인 상태를 나타내는 변수
   * formState.isSubmitting 값을 참조하여 폼 제출 중일 때 버튼을 비활성화
   */
  const isLoading = form.formState.isSubmitting;
  /**
   * onSubmit: 폼 제출 시 호출되는 비동기 함수
   * 입력된 서버 이름과 이미지 URL을 콘솔에 출력 (추후 추가 로직 삽입 가능)
   */
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post("/api/servers", values);
      form.reset();
      router.refresh;
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  if (!isMounted) {
    return null;
  }

  /**
   * Dialog 렌더: 모달 창을 렌더링
   * - DialogHeader: 모달의 상단 헤더를 정의 (서버 이름과 이미지 설명 포함)
   * - DialogContent: 모달 본문에 서버 이미지 업로드와 이름 입력 필드를 포함
   * - Form: 폼 전체를 감싸는 컴포넌트
   * - DialogFooter: 하단에 제출 버튼을 배치
   */
  return (
    <Dialog open>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            커스텀 서버
          </DialogTitle>

          <DialogDescription className="text-center text-zinc-500">
            Give your server a personality with a name and an image. You can a
            always change it later.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              <div className="flex items-center justify-center text-center">
                {/**
                 * FormField: 이미지 URL을 입력 받는 필드
                 * - FileUpload 컴포넌트로 이미지 업로드 기능을 제공
                 * - 업로드된 이미지 URL이 폼 상태에 저장됨
                 */}
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FileUpload
                          endpoint="messageFile"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/**
               * FormField: 서버 이름을 입력 받는 필드
               * - 사용자가 입력한 서버 이름이 폼 상태에 저장됨
               */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                    <FormLabel>서버 이름</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        placeholder="Enter Server name"
                        {...field}
                      ></Input>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="bg-gray-100 px-6 py-4">
              <Button variant="primary" disabled={isLoading}>
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
