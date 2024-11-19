"use client";

import { Button } from "@/components/ui/button";
import { Loader2Icon, LogOutIcon } from "lucide-react";
import { useFormStatus } from "react-dom";

export default function SignOutButton() {
  const status = useFormStatus();
  return (
    <Button
      variant="ghost"
      className="relative gap-2 group-hover:w-full transition-all duration-200"
    >
      {status.pending ? (
        <>
          <Loader2Icon size={20} className="animate-spin absolute left-2" />
          <span className="opacity-0 transition group-hover:opacity-100">
            サインアウト中...
          </span>
        </>
      ) : (
        <>
          <LogOutIcon size={20} className="absolute left-2" />
          <span className="opacity-0 transition group-hover:opacity-100">
            サインアウト
          </span>
        </>
      )}
    </Button>
  );
}
