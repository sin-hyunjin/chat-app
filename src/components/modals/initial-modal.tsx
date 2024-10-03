"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import { useEffect, useState } from "react";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Server name is requierd.",
  }),
  imageUrl: z.string().min(1, {
    message: "Server image is requierd.",
  }),
});

/**
 * InitialModal 컴포넌트는 사용자에게 서버 이름과 이미지를 입력받는 모달 창을 렌더링하는 역할
 *
 * 1. Zod를 사용해 서버 이름과 이미지를 검증하는 스키마를 정의하고, react-hook-form을 통해 폼 상태를 관리
 * 2. 사용자가 모달 창에 접근하면 서버 이름과 이미지를 입력할 수 있는 폼을 표시
 * 3. 폼은 제출 시 데이터 유효성을 검사하고, 검증이 통과되면 제출된 데이터를 콘솔에 출력 (추후 실제 처리 로직을 추가 가능).
 * 4. 모달은 서버 이름과 이미지를 필수로 입력받도록 하며, 추후 이미지를 업로드하는 기능이 추가될 예정
 * 5. 모달 컴포넌트는 클라이언트 사이드에서만 렌더링되며, 초기에는 모달이 렌더링되지 않고 마운트된 후에만 표시
 */

export const InitialModal = () => {
  // 컴포넌트가 마운트되었는지 여부를 추적하는 상태 변수
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });

  // 폼이 제출 중인지 확인
  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  if (!isMounted) {
    return null;
  }
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
                TODO : 이미지 업로드 기능
              </div>

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
