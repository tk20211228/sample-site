import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import WaveAnimation from "./client-side-login/components/wave-animation";
import { GitHubLoginButton } from "./components/github-login-button";
import { UsernameLogin } from "./components/username-login";
import SingleWelcome from "./images/single-welcome.webp";

export default async function Page() {
  return (
    <div>
      <div className="flex flex-row mt-32">
        <div className="basis-2/3 items-center hidden sm:block">
          <div className="flex flex-row justify-evenly">
            <div className="w-[578px]">
              <h1 className="text-7xl font-semibold leading-normal">
                Android を
                <br />
                しっかり管理する
              </h1>
              <ol className="text-2xl pt-10">
                Android端末をしっかり管理することで、以下のような課題を解決できます。
                <li>・情報漏洩対策</li>
                <li>・端末設定</li>
                <li>・アプリ管理</li>
              </ol>
            </div>

            <Image
              src={SingleWelcome}
              alt=""
              width={400}
              height={400}
              className="w-auto h-[500px] animate-[float_3s_ease-in-out_infinite]"
            />
          </div>
        </div>
        <div className="basis-1/3 my-auto flex justify-center items-center">
          <div className="flex flex-col gap-2 w-[300px]">
            <GitHubLoginButton className="w-full" />
            <Button
              variant="ghost"
              className="flex border gap-2 w-full"
              asChild
            >
              <Link href="/login/client-side-login">Client Side ログイン</Link>
            </Button>

            <div className="w-full flex items-center gap-4 my-4">
              <div className="flex-grow border-t text-muted-foreground"></div>
              <span className="text-muted-foreground">or</span>
              <div className="flex-grow border-t text-muted-foreground"></div>
            </div>

            <div className="flex-1">
              <UsernameLogin />
            </div>
          </div>
        </div>
      </div>
      <div>
        <WaveAnimation />
      </div>
    </div>
  );
}
