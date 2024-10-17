import { Button } from "@/components/ui/button";

import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

export default function SignLoadingButton({
  className,
  variant = "ghost",
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
        supabase.auth.signInAnonymously();
      }}
      variant={variant}
      className={cn("border gap-2", className)}
      disabled={false}
    >
      loading...
    </Button>
  );
}
