import { z } from "zod";
import { passwordSchema } from "./password-schema";

export const signInFormSchema = z.object({
  emailOrUsername: z
    .string()
    .min(1, "メールアドレスまたはユーザー名を入力してください"),
  password: passwordSchema,
});

export const signUpFormSchema = z.object({
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
