"use server";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export const signIn = async (idToken: string) => {
  const body = new URLSearchParams();
  body.append("id_token", idToken);
  body.append("client_id", process.env.LIFF_CHANNEL_ID!);
  console.log("body", body.toString()); //id_token=xxxxxxxxxxxx&client_id=xxxxxxxx のような文字列になる

  //LIFF トークンを検証＆ID情報を取得
  const liffToken = await fetch("https://api.line.me/oauth2/v2.1/verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  }).then((res) => res.json());

  console.log("liffToken", liffToken); // ログインした情報があれば、ログインしたユーザーの情報が取得できる
  // liffToken {
  //   iss: 'https://access.line.me',
  //   sub: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  //   aud: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  //   exp: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  //   iat: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  //   name: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  // }

  // JWT のソースを取得
  const src = {
    and: "authenticate",
    exp: liffToken.exp,
    sub: liffToken.sub,
    email: liffToken.email,
    app_metadata: {
      provider: "liff",
      nama: liffToken.name,
      picture: liffToken.picture,
    },
    user_metadata: null,
    role: "authenticated",
  };

  console.log("src", src);

  // JWTの署名＆トークンを生成
  const token = jwt.sign(src, process.env.SUPABASE_JWT_SECRET!);
  console.log("token", token);
  // このトークンには、srcの情報が含まれていて、だれでも閲覧できる。
  // JWT の署名は、supabaseのJWT_SECRETの秘密鍵を使用することで、 supabase側で同じ秘密鍵を使用して検証できる。

  // JWT をクッキーにセット
  cookies().set("token", token);

  return liffToken;
};
