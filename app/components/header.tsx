import { AppConfig } from "@/app.config";
import { Button } from "@/components/ui/button";
import { Book, Info, LogIn } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "../../lib/utils";

export default function Header({ className }: { className?: string }) {
  return (
    <header
      className={cn("px-2 py-2 sm:py-4 flex items-center gap-1", className)}
    >
      <Button variant="ghost" className="text-xl sm:text-3xl" asChild>
        <Link href="/" className="flex items-center gap-2" replace>
          {/* ボタンからアイコンが飛び出る */}
          <Image
            src="/images/logo.png"
            alt={AppConfig.title}
            width={64}
            height={64}
            className="size-8 sm:size-16 dark:brightness-150 drop-shadow-lg"
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
        <Button variant="ghost" className="gap-2">
          <p className="hidden sm:block">ログイン</p>
          <LogIn size={20} />
        </Button>
      </nav>
      {/* ここはナビでよいのか？ */}
    </header>
  );
}
