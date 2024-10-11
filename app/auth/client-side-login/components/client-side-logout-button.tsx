import { Button } from "@/components/ui/button";

import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

export default function ClientSideLogoutButton({
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
  return (
    <Button
      onClick={() => {
        supabase.auth.signOut();
      }}
      variant={variant}
      className={cn("", className)}
    >
      ログアウト
    </Button>
  );
}
