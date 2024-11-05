"use server";

import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createAndroidManagementClient } from "./androidmanagement";
import { encryptData } from "./crypto";

// export const getSignUpUrlSample1 = async () => {
//   const androidmanagement = createAndroidManagementClient();
//   try {
//     const res = await androidmanagement.signupUrls.create({
//       callbackUrl: process.env.EMM_SIGNUP_URL + "/api/emm/callback",
//       projectId: process.env.EMM_PROJECT_ID,
//     });
//     console.log(res.data);
//     if (res.data.url) {
//       redirect(res.data.url);
//     }
//   } catch (error) {
//     console.error("Error creating signup URL:", error);
//     throw error;
//   }
// };

// export const getSignUpUrlSample2 = async () => {
//   const androidmanagement = createAndroidManagementClient();
//   await androidmanagement.signupUrls
//     .create({
//       callbackUrl: process.env.EMM_SIGNUP_URL + "/api/emm/callback",
//       projectId: process.env.EMM_PROJECT_ID,
//     })
//     .then((res) => {
//       console.log(res.data);
//       if (res.data.url) {
//         redirect(res.data.url);
//       }
//     })
//     .catch((error) => {
//       if (error.message === "NEXT_REDIRECT") {
//         return;
//       }
//       console.error("Error creating signup URL:", error.message);
//       throw new Error(error.message);
//     });
// };

const host =
  process.env.NODE_ENV === "production" //本番環境にデプロイされていれば、本番とみなす
    ? "https://sample-site-pearl.vercel.app/" // 本番環境の URL
    : process.env.EMM_SIGNUP_URL; // ローカル環境の URL

export const getSignUpUrl = async (id: string) => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("User not found");
  }
  const androidmanagement = createAndroidManagementClient();
  const { data } = await androidmanagement.signupUrls
    .create({
      // callbackUrl: process.env.EMM_SIGNUP_URL + "/api/emm/callback",
      callbackUrl: `${host}/api/emm/callback`,
      projectId: process.env.EMM_PROJECT_ID,
    })
    .catch((error) => {
      console.error("Error creating signup URL:", error.message);
      throw new Error(error.message);
    });
  console.log("data", data);
  if (!data.url) {
    throw new Error("Signup URL not found");
  }
  if (!data.name) {
    throw new Error("Signup URL name not found");
  }

  // URLを暗号化してCookieに保存
  const cookieStore = await cookies();
  const encryptedUrl = encryptData({ name: data.name, id }); // セキュリティのため暗号化
  // console.log("暗号化:", encryptedUrl);

  cookieStore.set("emm_signup_object", encryptedUrl, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 3600, // 1時間で有効期限切れ
    path: "/",
  });

  // // enterprisesテーブルにsignupUrlを保存
  // const supabase = await createClient();
  // const { data: enterprise, error } = await supabase
  //   .from("enterprises")
  //   .insert([
  //     {
  //       signup_url_name: data.url,
  //     },
  //   ])
  //   .select()
  //   .single();

  // if (error) {
  //   console.error("Signup URL insert error:", error);
  //   throw new Error("Signup URL insert error");
  // }
  redirect(data.url);
};
