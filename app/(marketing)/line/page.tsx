"use client";

import { useEffect, useState } from "react";
import liff from "@line/liff";
import { signIn } from "@/actions/auth-liff";

export default function Page() {
  const [idToken, setIdToken] = useState<string | null>(null);
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    liff.init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID! }).then(() => {
      if (liff.isLoggedIn()) {
        const idToken = liff.getIDToken(); //ログインしたしユーザー情報を含んだJWTトークン
        if (idToken) {
          setIdToken(idToken); // idTokenをステートに設定
          signIn(idToken).then((user) => {
            setUser(user);
          });
        }
      } else {
        // liff.login(); // ログインしていない場合はログイン処理を行う
      }
    });
  }, []);

  return (
    <div>
      <h1>LINEからのアクセス画面</h1>
      <p>{idToken ? "トークンが取得できました。" : "トークンはありません。"}</p>
      {idToken && <p>idToken: {idToken}</p>}
      {user && <p>ユーザー情報: {JSON.stringify(user)}</p>}
    </div>
  );
}
