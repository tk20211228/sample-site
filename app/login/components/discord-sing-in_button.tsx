import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SiDiscord } from "@icons-pack/react-simple-icons";

export default function DiscordSingInButton({
  className,
}: {
  className?: string;
}) {
  return (
    <div>
      <Button variant="outline" className={cn("", className)}>
        <SiDiscord size={20} className="mr-4" />
        ログイン
      </Button>
    </div>
  );
}
