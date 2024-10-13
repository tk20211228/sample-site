import { AppConfig } from "@/app.config";
import { Button } from "@/components/ui/button";
import { Book } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import LogoutButton from "./logout-button";
import { cn } from "@/lib/utils";

export default async function Header({ className }: { className?: string }) {
  return (
    <header
      className={cn("px-2 py-2 sm:py-4 flex items-center gap-1", className)}
    >
      <Button variant="ghost" className="text-lg" asChild>
        <Link href="/" className="flex items-center font-bold gap-2" replace>
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
      </Button>
      <div className="flex ml-auto">
        <Button variant="ghost" className="gap-2">
          <p className="hidden sm:block">ドキュメント</p>
          <Book size={20} />
        </Button>
        <LogoutButton />
      </div>
    </header>
  );
}
