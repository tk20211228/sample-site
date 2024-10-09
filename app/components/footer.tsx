import { AppConfig } from "@/app.config";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PawPrint } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="sticky top-full border-t ">
      <div className="flex py-4 items-center justify-center px-4 gap-2">
        <div>
          <Button variant="ghost">
            <p className="text-muted-foreground">&copy; {AppConfig.company}</p>
          </Button>
          <Button variant="ghost">
            <Link href="/terms">利用規約</Link>
          </Button>
          <Button variant="ghost">
            <Link href="/privacy">プライバシーポリシー</Link>
          </Button>
          <Button variant="ghost">特定商法表示</Button>
          <Button variant="ghost">言語</Button>
        </div>
        <div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" asChild size="icon">
                  <Link href="/pokemon" replace>
                    <PawPrint size={18} />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>ポケモン</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div>
          <ModeToggle />
        </div>
      </div>
    </footer>
  );
}
