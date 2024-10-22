"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// import { toast } from "@/components/hooks/use-toast";
import { signInWithEmailOrUsername } from "@/actions/supabase-auth-actions";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import PasswordForm from "../../components/password-form";
import { signInFormSchema } from "../../schemas/sign-up-schema";

const schema = signInFormSchema;

type FormData = z.infer<typeof schema>;

export function SignInForm() {
  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(schema),
    defaultValues: {
      emailOrUsername: "kubokidev@gmail.com",
      password: "testTEST123!!",
    },
  });

  const onSubmit = async (data: FormData) => {
    await signInWithEmailOrUsername({
      emailOrUsername: data.emailOrUsername,
      password: data.password,
    }).then((res) => {
      if (res?.errorMessage) {
        alert(res.errorMessage);
        return;
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="emailOrUsername"
          render={({ field }) => (
            <FormItem>
              <FormLabel>メールアドレス or ユーザー名</FormLabel>
              <FormControl>
                <Input autoComplete="off" placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <PasswordForm
          form={form}
          name="password"
          autoComplete={"new-password"}
        />
        <Button
          disabled={
            !form.formState.isValid ||
            form.formState.isSubmitting ||
            form.formState.isValidating
          }
        >
          {form.formState.isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ログイン中...
            </>
          ) : (
            <>ログイン</>
          )}
        </Button>
      </form>
    </Form>
  );
}
