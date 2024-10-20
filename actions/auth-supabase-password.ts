"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const host =
  process.env.NODE_ENV === "production" //本番環境にデプロイされていれば、本番とみなす
    ? "https://sample-site-pearl.vercel.app/" // 本番環境の URL
    : "http://localhost:3000";

export const signUpNewUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${host}/emm`,
    },
  });
  if (!error) {
    console.log(data);
    return data;
  }
  console.error(error.message);
  return error.message;
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
