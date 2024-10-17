"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import SignLoadingButton from "./components/sign-loading-button";
import SignLoginButton from "./components/sign-login-button";
import IsSignedIn from "./components/is-signed-in";
import IsSignedLoading from "./components/is-signed-loading";
import IsSignedOut from "./components/is-signed-out";

export default function Page() {
  return (
    <div className="flex flex-col container mt-5">
      <IsSignedLoading>
        <SignLoadingButton className="w-1/3 mx-auto mb-2" />
      </IsSignedLoading>
      <IsSignedOut>
        <SignLoginButton className="w-1/3 mx-auto mb-2" />
        <Button variant="ghost" className="w-1/3 mx-auto mb-2" asChild>
          <Link href="/sign-in">戻る</Link>
        </Button>
      </IsSignedOut>
      <IsSignedIn>
        {/* <ClientSideLogoutButton className="w-1/3 mx-auto mb-2" /> */}
        <Button className="w-1/3 mx-auto mb-2" asChild>
          <Link href="/emm">EMM コンソールへ</Link>
        </Button>
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
