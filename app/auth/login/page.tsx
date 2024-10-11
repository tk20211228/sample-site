import { Button } from "@/components/ui/button";
import Link from "next/link";
import { GitHubLoginButton } from "./components/github-login-button";
import { UsernameLogin } from "./components/username-login";

export default async function Page() {
  return (
    <div className="flex h-[75vh] min-h-[600px]">
      <div className="flex flex-col gap-2 m-auto items-center">
        <GitHubLoginButton className="w-full" />
        <Button variant="ghost" className="flex border gap-2 w-full" asChild>
          <Link href="/auth/client-side-login">Client Side ログイン</Link>
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
  );
}
