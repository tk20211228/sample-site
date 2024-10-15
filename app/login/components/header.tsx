import { AppConfig } from "@/app.config";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { cn } from "../../../lib/utils";
import logo from "../../../public/images/logo.png";

export default async function Header({ className }: { className?: string }) {
  return (
    <header
      className={cn("px-2 py-4 sm:py-4 flex items-center gap-1", className)}
    >
      <Button variant="ghost" className="text-2xl" asChild>
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
    </header>
  );
}
