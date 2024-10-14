"use server";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export const signIn = async (idToken: string) => {
  const body = new URLSearchParams();
  body.append("id_token", idToken);
  body.append("client_id", process.env.LIFF_CHANNEL_ID!);

  //LIFF トークンを検証＆ID情報を取得
  const liffToken = await fetch("https://api.line.me/oauth2/v2.1/verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  }).then((res) => res.json());

  // JWT のソースを取得
  const src = {
    and: "authenticate",
    exp: liffToken.exp,
    sub: liffToken.sub,
    email: liffToken.email,
    app_metadata: {
      provider: "liff",
      nama: liffToken.nama,
      picture: liffToken.picture,
    },
    user_metadata: null,
    role: "authenticated",
  };

  // JWT の署名(安全なJWTであることが保証される)＆トークンを生成
  const token = jwt.sign(src, process.env.SUPABASE_JWT_SECRET!);

  // JWT をクッキーにセット
  cookies().set("token", token);
};
