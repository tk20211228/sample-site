"use client";

import { useFormContext } from "react-hook-form";

// import { toast } from "@/components/hooks/use-toast";
import { signInWithEmailOrUsername } from "@/actions/auth-supabase";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import PasswordWithResetForm from "../../components/password-with-reset-form";
import { signInFormSchema } from "../../schemas/auth-validation";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useTransition } from "react";

const schema = signInFormSchema;

type FormData = {
  emailOrUserName: string;
  password: string;
};

export function SignInForm() {
  const router = useRouter();
  const [isLoading, startTransition] = useTransition();
  const form = useFormContext<FormData>();
  const onSubmit = async (formData: FormData) => {
    const parsedFormData = schema.parse(formData); //型にbrandメソッドを使って"SignIn"という名前があるため、zodのスキーマを使ってデータをパースする
    startTransition(async () => {
      await signInWithEmailOrUsername(parsedFormData)
        .then((path) => {
          router.push(path);
        })
        .catch(async (error) => {
          toast.error(error.message);
        });
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <FormField
        control={form.control}
        name="emailOrUserName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              メールアドレス {"  "}or {"  "}ユーザー名
            </FormLabel>
            <FormControl>
              <Input autoComplete="off" placeholder="" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <PasswordWithResetForm
        form={form}
        name="password"
        autoComplete={"new-password"}
      />
      <Button
        disabled={
          !form.formState.isValid ||
          form.formState.isSubmitting ||
          form.formState.isValidating ||
          isLoading
        }
      >
        {form.formState.isSubmitting || isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ログイン中...
          </>
        ) : (
          <>ログイン</>
        )}
      </Button>
      <Button
        variant="ghost"
        className="text-muted-foreground text-xs ml-4"
        asChild
      ></Button>
    </form>
  );
}
