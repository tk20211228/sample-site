import { Button } from "@/components/ui/button";

import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function ClientSideLoginButton({
  className,
  variant,
}: {
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null;
}) {
  const supabase = createClient();
  const router = useRouter();
  return (
    <Button
      onClick={() => {
        supabase.auth.signInAnonymously().then(() => {
          router.push("/emm");
        });
      }}
      variant={variant}
      className={cn("", className)}
    >
      匿名 ログイン
    </Button>
  );
}
