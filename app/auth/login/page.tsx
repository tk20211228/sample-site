import { Button } from "@/components/ui/button";
import Link from "next/link";
import { GitHubLoginButton } from "./components/github-login-button";
import { UsernameLogin } from "./components/username-login";

export default async function Page() {
  return (
    <div className="flex h-[75vh] min-h-[600px]">
      <div className="flex flex-col gap-2 m-auto items-center">
        <GitHubLoginButton />
        <Button variant="ghost" className="border gap-2" asChild>
          <Link href="/auth/client-side-login">Client Side ログイン</Link>
        </Button>

        <div className="w-full flex items-center gap-4 my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="text-gray-700 font-medium">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <div className="flex-1">
          <UsernameLogin />
        </div>
      </div>
    </div>
  );
}
