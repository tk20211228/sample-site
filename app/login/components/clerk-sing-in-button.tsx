import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SiClerk } from "@icons-pack/react-simple-icons";

export default function ClerkSingInButton({
  className,
}: {
  className?: string;
}) {
  return (
    <div>
      <Button variant="outline" className={cn("", className)}>
        <SiClerk size={20} className="mr-4" />
        ログイン
      </Button>
    </div>
  );
}
