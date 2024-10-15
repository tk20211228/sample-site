import { AppConfig } from "@/app.config";
import { Button } from "@/components/ui/button";
import { Book, Info } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "../../../lib/utils";
import logo from "../../../public/images/logo.png";
import SingInButton from "./sign-in-button";

export default async function Header({ className }: { className?: string }) {
  return (
    <header
      className={cn("px-2 py-2 sm:py-4 flex items-center gap-1", className)}
    >
      <Button variant="ghost" className="text-lg" asChild>
        <Link href="/" className="flex items-center font-bold gap-2">
          <Image
            src={logo}
            alt=""
            className="size-8 dark:brightness-150 drop-shadow-lg"
            priority
          />
          {AppConfig.title}
        </Link>
      </Button>
      <nav className="flex ml-auto">
        <Button variant="ghost" className="gap-2" asChild>
          <Link href="/features" replace>
            <span className="hidden sm:block">特徴</span>
            <Info size={20} />
          </Link>
        </Button>
        <Button variant="ghost" className="gap-2" asChild>
          <Link href="/docs/books" replace>
            <span className="hidden sm:block">ドキュメント</span>
            <Book size={20} />
          </Link>
        </Button>
        <SingInButton />
      </nav>
    </header>
  );
}
