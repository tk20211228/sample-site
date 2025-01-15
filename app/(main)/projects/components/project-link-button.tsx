import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LayoutDashboardIcon } from "lucide-react";
import Link from "next/link";

export default function ProjectLinkButton({
  mode,
  isActive,
}: {
  mode?: "hover";
  isActive?: boolean;
}) {
  return (
    <Button
      variant="ghost"
      className={cn("relative gap-2", isActive && "bg-accent")}
      asChild
    >
      <Link href="/projects">
        <LayoutDashboardIcon size={20} className="absolute left-3" />
        <span
          className={cn(
            mode === "hover" &&
              "opacity-0 group-hover:opacity-100 transition-all"
          )}
        >
          プロジェクト
        </span>
      </Link>
    </Button>
  );
}
