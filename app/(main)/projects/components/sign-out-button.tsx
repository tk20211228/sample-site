"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2Icon, LogOutIcon } from "lucide-react";
import { useFormStatus } from "react-dom";

export default function SignOutButton({ mode }: { mode?: "hover" }) {
  const status = useFormStatus();
  return (
    <Button
      variant="ghost"
      className={cn(
        "relative gap-2 transition-all duration-200 w-full",
        mode === "hover" && "group-hover:w-full"
      )}
    >
      {status.pending ? (
        <>
          <Loader2Icon
            size={20}
            className={cn("animate-spin absolute left-3")}
          />
          <span
            className={cn(
              mode === "hover" && "opacity-0 transition group-hover:opacity-100"
            )}
          >
            サインアウト中...
          </span>
        </>
      ) : (
        <>
          <LogOutIcon size={20} className="absolute left-3" />
          <span
            className={cn(
              mode === "hover" && "opacity-0 transition group-hover:opacity-100"
            )}
          >
            サインアウト
          </span>
        </>
      )}
    </Button>
  );
}
