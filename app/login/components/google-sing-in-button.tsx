import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SiGoogle } from "@icons-pack/react-simple-icons";

export default function GoogleSingInButton({
  className,
}: {
  className?: string;
}) {
  return (
    <div>
      <Button variant="outline" className={cn("", className)}>
        <SiGoogle size={20} className="mr-4" />
        ログイン
      </Button>
    </div>
  );
}
