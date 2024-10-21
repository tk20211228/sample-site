import { Button } from "@/components/ui/button";
import Link from "next/link";
import UsernamePasswordSignUpForm from "./components/username-password-sign-up-form";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center m-auto pt-2 lg:pt-10">
      <div className="flex flex-row justify-items-center w-full px-4 lg:w-1/3">
        <UsernamePasswordSignUpForm />
      </div>
      <div className="flex flex-wrap gap-2 w-1/3 mx-auto items-center pt-2">
        <Button variant="link" className="underline" asChild>
          <Link href="/sign-up/form-client">
            ※フォームをReactHookのみで実装
          </Link>
        </Button>
        {/* <Button variant="link" className="underline" asChild>
          <Link href="/sign-up/form-server">※フォームをサーバー側で実装</Link>
        </Button> */}
      </div>
    </div>
  );
}
