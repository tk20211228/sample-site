import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SiLine } from "@icons-pack/react-simple-icons";

export default function LineSingInButton({
  className,
}: {
  className?: string;
}) {
  return (
    <div>
      <Button variant="outline" className={cn("", className)}>
        <SiLine size={20} className="mr-4" />
        ログイン
      </Button>
    </div>
  );
}
