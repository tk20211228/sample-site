import { Button } from "@/components/ui/button";
import { SignUpFormClientSide } from "./components/sign-up-form-client-side";
import Link from "next/link";

export default function Page() {
  return (
    <div className="container m-auto">
      <div className="flex flex-col gap-2 w-1/3 mx-auto items-center">
        <Button variant="outline" asChild>
          <Link href="/sign-up/form-client" className="">
            フォームをクライエント側で実行
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/sign-up/form-server" className="">
            フォームをサーバー側で実行
          </Link>
        </Button>
      </div>
    </div>
  );
}
