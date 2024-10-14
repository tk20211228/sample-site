import { AppConfig } from "@/app.config";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SiLine } from "@icons-pack/react-simple-icons";
import { MessageSquareMore, PawPrint, Server } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="sticky top-full">
      <div className="flex flex-col lg:flex-row py-4 items-center justify-center px-4 gap-2">
        <div>
          <a className="text-muted-foreground">&copy; {AppConfig.company}</a>
          <Button variant="ghost" asChild>
            <Link href="/terms">利用規約</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/privacy">プライバシーポリシー</Link>
          </Button>
          <Button variant="ghost">特定商法表示</Button>
          <Button variant="ghost">言語</Button>
        </div>
        <div className="mr-auto ml-4 sm:ml-12 md:ml-[180px] lg:mr-0 lg:ml-0">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" asChild size="icon">
                  <Link href="/pokemon" aria-label="ポケモン">
                    <PawPrint size={18} />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>ポケモン</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Button variant="outline" asChild size="icon" className="ml-2">
            <Link href="/comments" aria-label="コメント">
              <MessageSquareMore size={18} />
            </Link>
          </Button>
          <Button variant="outline" asChild size="icon" className="ml-2">
            <Link href="/storage" aria-label="ストレージ">
              <Server size={18} />
            </Link>
          </Button>
          <Button variant="outline" asChild size="icon" className="ml-2">
            <Link href="/line" aria-label="line">
              <SiLine size={18} />
            </Link>
          </Button>
        </div>
      </div>
    </footer>
  );
}
