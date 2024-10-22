"use server";

import { signUpFormSchema } from "@/app/(auth)/schemas/sign-up-schema";
import { getSeverDate } from "@/lib/date-fns/get-date";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { string } from "zod";

const host =
  process.env.NODE_ENV === "production" //本番環境にデプロイされていれば
    ? "https://sample-site-pearl.vercel.app/" // 本番環境の URL
    : "http://localhost:3000";

export const signUpNewUser = async (formData: {
  username: string;
  email: string;
  password: string;
}) => {
  // formDataの内容を検証する
  const schema = signUpFormSchema;
  const result = await schema.safeParseAsync(formData);
  const now = getSeverDate();
  if (result.success === false) {
    console.error(result.error);
    const errors = result.error.issues.map((issue) => ({
      path: issue.path.join(","),
      message: issue.message,
    }));
    // ex)
    // [
    //   {
    //     path: 'username',
    //     message: 'ユーザー名には英数字とアンダースコア(_)のみ使用できます'
    //   }
    // ]
    // エラーメッセージを文字列として結合
    const errorMessage = errors
      .map((err) => `${err.path}: ${err.message}`)
      .join("\n");
    return {
      errorMessage: `
        フォームデータの検証に失敗しました。
        ${errorMessage}
        ※ 実行日時: ${now}`,
    };
  }
  // フォームデータの検証に成功した場合, Supabase にユーザー登録を行う
  const supabase = createClient();
  const { username, email, password } = formData;
  const {
    data: { user },
    error,
  } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${host}/welcome`, // メールアドレス確認後のリダイレクト先
    },
  });
  console.error(error?.message);
  if (error) {
    return {
      errorMessage: `
      サインアップに失敗しました。
      ※ Status Code:${error?.status}
      ※ 実行日時: ${now}`,
    };
  }
  // エラーなくユーザーが登録された場合、DBにユーザー情報を保存
  if (!error && user) {
    const supabaseAdmin = createAdminClient();
    const { error } = await supabaseAdmin
      .from("usernames")
      .insert([{ id: user.id, email, username }]);
    console.error(error?.message);
  }
  // 登録したメールアドレスに確認メールを送信した旨を表示するページにリダイレクト
  redirect("/sign-up/verify-email-address");
};

export const signInWithEmail = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    console.error(error.message);
    const messages: {
      [key: string]: string;
    } = {
      "Email not confirmed": "メールアドレスが確認されていません",
      "Invalid login credentials": "メールアドレスまたはパスワードが違います",
    };
    return {
      errorMessage:
        (error.message && messages[error.message]) ||
        "原因不明な理由によりログインできませんでした。",
    };
  }
  redirect("/welcome");
};

export const signInWithUsername = async (
  username: string,
  password: string
) => {
  const supabaseAdmin = createAdminClient();
  const { data: user, error: selectError } = await supabaseAdmin
    .from("usernames")
    .select("id, email")
    .eq("username", username)
    .single();

  console.error(selectError?.message);
  if (!user) {
    return {
      errorMessage: "ユーザー名またはパスワードが違います",
    };
  }
  const supabase = createClient();
  const { error: sigInError } = await supabase.auth.signInWithPassword({
    email: user.email,
    password,
  });

  if (sigInError) {
    console.error(sigInError.message);
    const messages: {
      [key: string]: string;
    } = {
      "Email not confirmed": "メールアドレスが確認されていません",
      "Invalid login credentials": "メールアドレスまたはパスワードが違います",
    };
    return {
      errorMessage:
        (sigInError.message && messages[sigInError.message]) ||
        "原因不明な理由によりログインできませんでした。",
    };
  }
  redirect("/welcome");
};
export const signInWithEmailOrUsername = async ({
  emailOrUsername,
  password,
}: {
  emailOrUsername: string;
  password: string;
}) => {
  // メールアドレスかユーザー名かを判断
  const isEmail = emailOrUsername.includes("@");

  if (isEmail) {
    // メールアドレスの場合
    return signInWithEmail({ email: emailOrUsername, password });
  } else {
    // ユーザー名の場合
    return signInWithUsername(emailOrUsername, password);
  }
};
