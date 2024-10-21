"use server";

import { getSeverDate } from "@/lib/date-fns/get-date";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const host =
  process.env.NODE_ENV === "production" //本番環境にデプロイされていれば、本番とみなす
    ? "https://sample-site-pearl.vercel.app/" // 本番環境の URL
    : "http://localhost:3000";

export const signUpNewUser = async (formData: {
  username: string;
  email: string;
  password: string;
}) => {
  const supabase = createClient();
  const { email, password } = formData;
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${host}/welcome`, // メールアドレス確認後のリダイレクト先
    },
  });

  if (!error) {
    redirect("/sign-up/verify-email-address"); // 登録したメールアドレスに確認メールを送信した旨を表示するページにリダイレクト
  }
  console.error(error.message);
  console.log(error?.status && error?.code);
  const now = getSeverDate();
  return {
    errorMessage: `
    サインアップに失敗しました。
    ※ Status Code:${error?.status}
    ※ 実行日時: ${now}`,
  };
};

export const signInWithEmail = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email, //" example@email.com",
    password, // "example-password",
  });
  if (!error) {
    // redirect user to specified redirect URL or root of app
    redirect("/emm");
  }
  console.error(error.message);
  redirect("/error");
};

export const signInWithUsername = async (
  username: string,
  password: string
) => {
  const supabaseAdmin = createAdminClient();
};
