import { Button } from "@/components/ui/button";
import { Book } from "lucide-react";

import HeaderLogoButton from "@/components/header-logo-button";
import { cn } from "@/lib/utils";
import LogoutButton from "./logout-button";

export default async function Header({ className }: { className?: string }) {
  return (
    <header
      className={cn("px-2 py-2 sm:py-4 flex items-center gap-1", className)}
    >
      <HeaderLogoButton />
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
