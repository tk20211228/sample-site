"use client";

import { signUpNewUser } from "@/actions/supabase-auth-actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { passwordSchema } from "../../schemas/password-schema";

const schema = z.object({
  username: z
    .string()
    .trim() // 先頭と末尾の空白を削除
    .min(4, "ユーザー名は4文字以上で設定してください")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "ユーザー名には英数字とアンダースコア(_)のみ使用できます"
    ),
  email: z.string().email("有効なメールアドレスを入力してください"),
  password: passwordSchema,
});

type FormData = z.infer<typeof schema>;

export default function UsernamePasswordSignUpForm() {
  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(schema),
    defaultValues: {
      username: "kubokidev",
      email: "kubokidev@gmail.com",
      password: "testTEST123!!",
      // username: "",
      // email: "",
      // password: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    await signUpNewUser(data).then((res) => {
      if (res?.errorMessage) {
        alert(res.errorMessage);
        return;
      }
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center pb-4">新規アカウント作成</CardTitle>
        <CardDescription>
          ユーザー名とメールアドレス、パスワードを入力してください。
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* react-hook-formのuseFormフックから返されたフォームの状態と関数を、
          shadcn/uiのFormコンポーネントに渡している。{...form}はスプレッド構文を使用して、
          formオブジェクトのすべてのプロパティをFormコンポーネントに渡している */}
        <Form {...form}>
          {/* form.handleSubmitは、フォームのバリデーションを行い、
            バリデーションが成功した場合にのみonSubmit関数を実行 */}
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              // フォームのコントロール（入力フィールドの管理）をFormFieldコンポーネントに渡しています。
              // form.controlは、react-hook-formが提供する機能で、フォームの各フィールドの状態や検証ルールを管理しています。
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ユーザー名</FormLabel>
                  <FormControl>
                    {/* {...field}は、react-hook-formのuseFormフックから提供されるfieldオブジェクトの
                      プロパティ（value, onChange, onBlur, nameなど）をInputコンポーネントに渡しています。
                      これにより、入力フィールドとreact-hook-formの状態管理が連携します。 */}
                    <Input
                      autoComplete="off"
                      placeholder="山田太郎"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>メールアドレス</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      placeholder="test@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>パスワード</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="new-password"
                      placeholder="abcABC123!!"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              disabled={
                !form.formState.isValid || // フォームのバリデーションが成功していない場合はボタンを無効にする(初期状態)
                form.formState.isSubmitting || // フォームが送信中の場合はボタンを無効にする
                form.formState.isValidating // フォームのバリデーションが実行中の場合はボタンを無効にする
              }
            >
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  サインアップ中...
                </>
              ) : (
                <>新規アカウント作成</>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
