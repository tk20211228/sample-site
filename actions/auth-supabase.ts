"use server";

import { SupabaseAuthErrorCode } from "@/app/(auth)/data/supabase-error-code-ja";
import { authErrorMessage } from "@/app/(auth)/lib/displayAuthError";
import {
  signInFormSchema,
  signUpFormSchema,
} from "@/app/(auth)/schemas/sign-up-schema";
import { getUserContextData } from "@/lib/context/user-context";

import { getSeverDate } from "@/lib/date-fns/get-date";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { z } from "zod";

const host =
  process.env.NODE_ENV === "production" //本番環境にデプロイされていれば
    ? "https://sample-site-pearl.vercel.app/" // 本番環境の URL
    : "http://localhost:3000";

type SignIn = z.infer<typeof signInFormSchema>; // zod のスキーマにbrandメソッドを使って"SignIn"という名前がある
type SignUp = z.infer<typeof signUpFormSchema>;

export const signUpNewUser = async (formData: SignUp) => {
  const result = await signUpFormSchema.safeParseAsync(formData);
  if (result.success === false) {
    console.error(result.error);
    throw new Error("フォームデータの検証に失敗しました");
  }
  // フォームデータの検証に成功した場合, Supabase にユーザー登録を行う
  const supabase = await createClient();
  const { username, email, password } = formData;
  const now = getSeverDate();

  const userContextData = await getUserContextData();

  const {
    data: { user },
    error,
  } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${host}/welcome`, // メールアドレス確認後のリダイレクト先
      data: {
        username,
        created_at: now,
        ...userContextData,
      },
    },
  });

  console.error(error?.message);
  if (!user || error) {
    throw new Error(error?.message || "ユーザー登録に失敗しました");
  }

  const supabaseAdmin = createAdminClient();
  const { error: dbError } = await supabaseAdmin
    .from("usernames")
    .insert([{ id: user.id, email, username }]);
  if (dbError && dbError.code !== "23505") {
    console.error(dbError.message);
    // 23505 はすでにユーザー名が登録されている場合のエラーコード
    throw new Error(
      "サインアップ登録は完了しましたが、ユーザー名の登録に失敗しました。ログインする際はユーザー名とパスワードでログインできません。"
    );
  }

  // 登録したメールアドレスに確認メールを送信した旨を表示するページにリダイレクト
  redirect(`/sign-up/verify-email-address?id=${user.id}`);
};

async function signInWithEmail(formData: SignIn) {
  const { emailOrUsername: email, password } = formData;
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    console.error(error.message);
    if (error.code === "invalid_credentials") {
      throw new Error("メールアドレスまたはパスワードが違います");
    }
    const errorCode = error.code as SupabaseAuthErrorCode;
    throw new Error(await authErrorMessage(errorCode));
  }
}

async function signInWithUsername(formData: SignIn) {
  const supabaseAdmin = createAdminClient();
  const { emailOrUsername: username, password } = formData;
  const { data: user, error: dbError } = await supabaseAdmin
    .from("usernames")
    .select("id, email")
    .eq("username", username)
    .single();
  console.error(dbError?.message);
  if (!user) {
    throw new Error("ユーザー名またはパスワードが違います");
  }
  const supabase = await createClient();
  const { error: sigInError } = await supabase.auth.signInWithPassword({
    email: user.email,
    password,
  });
  if (sigInError) {
    console.error(sigInError.code);
    const errorCode = sigInError.code as SupabaseAuthErrorCode;
    throw new Error(await authErrorMessage(errorCode));
  }
}
export const signInWithEmailOrUsername = async (formData: SignIn) => {
  const safeParsedFormData = signInFormSchema.safeParse(formData);
  if (!safeParsedFormData.success) {
    throw new Error("フォームデータの検証に失敗しました");
  }
  // メールアドレスかユーザー名かを判断
  const isEmail = formData.emailOrUsername.includes("@");
  isEmail
    ? await signInWithEmail(safeParsedFormData.data)
    : await signInWithUsername(safeParsedFormData.data);
  redirect("/welcome");
};

export const resendSignUpOPT = async ({
  type,
  id,
}: {
  type: "signup" | "sms";
  id: string;
}) => {
  const supabaseAdmin = await createAdminClient();
  const supabase = await createClient();
  const { data, error } = await supabaseAdmin.auth.admin.getUserById(id);
  console.error(error?.message);
  if (!data) {
    throw new Error("user is required");
  }
  // OPTの再送信　https://supabase.com/docs/reference/javascript/auth-resend
  // メール認証の再送信
  if (type === "signup") {
    const email = data.user?.email;
    if (!email) {
      throw new Error("email is required");
    }
    const { error } = await supabase.auth.resend({
      type,
      email,
      options: {
        emailRedirectTo: `${host}/welcome`, // メールアドレス確認後のリダイレクト先
      },
    });
    if (error) {
      console.error(error.message);
      throw new Error(error.code);
    }
  }
  // SMS認証の再送信
  if (type === "sms") {
    const phone = data.user?.phone;
    if (!phone) {
      throw new Error("phone is required");
    }
    const { error } = await supabase.auth.resend({
      type,
      phone,
    });
    console.error(error?.message);
    if (error) {
      console.error(error.message);
      throw new Error(error.code);
    }
  }
  return { message: "再送の処理に成功しました。" };
};

export const resendAuthChangeOPT = async ({
  type,
  email,
  phone,
}: {
  type: "email_change" | "phone_change";
  email?: string;
  phone?: string;
}) => {
  const supabase = await createClient();
  if (type === "email_change" && email) {
    const { error } = await supabase.auth.resend({
      type,
      email,
    });
    if (error) {
      console.error(error.message);
      throw new Error(error.code);
    }
  }
  if (type === "phone_change" && phone) {
    const { error } = await supabase.auth.resend({
      type,
      phone,
    });
    console.error(error?.message);
    if (error) {
      console.error(error.message);
      throw new Error(error.code);
    }
  }
  return { message: "再送の処理に成功しました。" };
};

export async function resetPassword(email: string) {
  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${host}/update-password`, // パスワードリセット後のリダイレクト先
  });
  if (error) {
    console.error(error.message);
    throw new Error(error.code);
  }
  return { message: "ご登録のメールアドレスに確認メールを送信しました。" };
}