"use client";

import { signUpNewUser } from "@/actions/supabase-auth-actions";
import { Input } from "@/components/ui/aceternity-input";
import { Label } from "@/components/ui/aceternity-label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface FormData {
  username: string;
  email: string;
  password: string;
}

export function SignUpFormClientSide() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // const day = new Date();
  // ダミーのユーザー情報を定義する ex)2024-1017-1641-00
  // const dummyUserName = `test${day.getFullYear()}-${day.getMonth()}${day.getDate()}-${day.getHours()}${day.getMinutes()}-${day.getSeconds()}`;
  const dummyUserName = `kubokidev`;
  const [formData, setFormData] = useState<FormData>({
    username: dummyUserName,
    email: `${dummyUserName}@gmail.com`,
    password: `test123!!`,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // フォームのデフォルトの動作を防ぐ
    setIsSubmitting(true);

    // フォームの値をログに出力
    console.log("フォーム送信値:", formData);

    try {
      const res = await signUpNewUser(formData);
      console.log("ユーザー登録成功:", res);
      router.push("/sign-up/verify-email-address");
    } catch (error) {
      console.error("ユーザー登録エラー:", error);
    } finally {
      setIsSubmitting(false);
      console.log("isSubmitting", isSubmitting);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-center text-xl text-neutral-800 dark:text-neutral-200">
        アカウントを新規作成
      </h2>
      <p className=" text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        アカウントを作成するには、ユーザー名とメールアドレスを入力してください。
      </p>
      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="userName">ユーザー名</Label>
          <Input
            id="userName"
            name="userName"
            autoComplete="off" // フォームの自動入力を無効にする
            placeholder="山田太郎"
            type="text"
            value={formData.username}
            onChange={handleInputChange}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">メールアドレス</Label>
          <Input
            id="email"
            name="email"
            autoComplete="off" // フォームの自動入力を無効にする
            placeholder="projectmayhem@fc.com"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">パスワード</Label>
          <Input
            id="password"
            name="password"
            placeholder="••••••••"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </LabelInputContainer>

        {/* <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Sign up &rarr;
          <BottomGradient />
        </button> */}

        <Button
          type="submit"
          className="text-md bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="animate-spin h-5 w-5" />
              <span>サインアップ中...</span>
            </div>
          ) : (
            <>
              Sign up &rarr;
              <BottomGradient />
            </>
          )}
        </Button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        <div className="flex flex-col space-y-4">
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
          >
            <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              GitHub
            </span>
            <BottomGradient />
          </button>
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              Google
            </span>
            <BottomGradient />
          </button>
        </div>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
