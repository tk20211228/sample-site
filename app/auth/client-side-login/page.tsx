"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import ClientSideLoginButton from "./components/client-side-login-button";
import ClientSideLogoutButton from "./components/client-side-logout-button";
import Header from "./components/header";
import IsSignedIn from "./components/is-signed-in";
import IsSignedOut from "./components/is-signed-out";

export default function Page() {
  return (
    <div className="flex flex-col container">
      <Header />
      <h1 className="text-center py-5">ログイン/ログアウト 画面</h1>
      <IsSignedOut>
        <ClientSideLoginButton className="w-1/3 mx-auto mb-2" />
        <Button variant="ghost" className="w-1/3 mx-auto mb-2" asChild>
          <Link href="/auth/login">戻る</Link>
        </Button>
      </IsSignedOut>
      <IsSignedIn>
        <ClientSideLogoutButton className="w-1/3 mx-auto mb-2" />
        <Button variant="ghost" className="w-1/3 mx-auto mb-2" asChild>
          <Link href="/" replace>
            ホームへ
          </Link>
        </Button>
      </IsSignedIn>
      <IsSignedIn>
        <div className="mb-10">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore
          dignissimos nam soluta adipisci consequuntur. Atque sed dignissimos
          quam porro tempore neque quo exercitationem voluptatum a. Voluptates
          nulla accusamus doloremque possimus!
        </div>
        <div className="text-center">ログインしています。</div>
      </IsSignedIn>
    </div>
  );
}
