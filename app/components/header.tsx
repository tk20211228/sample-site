import { signOut } from "@/actions/auth";
import { AppConfig } from "@/app.config";
import { Button } from "@/components/ui/button";
import { Book, Info, LogIn, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "../../lib/utils";
import { currentUser } from "../data/auth";

export default async function Header({ className }: { className?: string }) {
  const user = await currentUser();
  return (
    <header
      className={cn("px-2 py-2 sm:py-4 flex items-center gap-1", className)}
    >
      <Button variant="ghost" className="text-lg" asChild>
        <Link href="/" className="flex items-center font-bold gap-2" replace>
          {/* ボタンからアイコンが飛び出る */}
          <Image
            src="/images/logo.png"
            alt={AppConfig.title}
            width={64}
            height={64}
            className="size-8 dark:brightness-150 drop-shadow-lg"
            priority
          />
          {AppConfig.title}
        </Link>
        {/* replace は履歴をのこさないため？' */}
      </Button>
      <nav className="flex ml-auto">
        <Button variant="ghost" className="gap-2">
          <p className="hidden sm:block">特徴</p>
          <Info size={20} />
        </Button>
        <Button variant="ghost" className="gap-2">
          <p className="hidden sm:block">ドキュメント</p>
          <Book size={20} />
        </Button>
        {user ? (
          <form action={signOut}>
            <Button variant="ghost" className="gap-2">
              <p className="hidden sm:block">ログアウト</p>
              <LogOut size={20} />
            </Button>
          </form>
        ) : (
          <Button variant="ghost" className="gap-2" asChild>
            <Link href="/auth/login">
              <p className="hidden sm:block">ログイン</p>
              <LogIn size={20} />
            </Link>
          </Button>
        )}
      </nav>
    </header>
  );
}
