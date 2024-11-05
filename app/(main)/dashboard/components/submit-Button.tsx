"use client"; // 一時的にクライエントサイドのみで実行する

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

export default function SubmitButton({}) {
  const status = useFormStatus();
  return (
    <Button disabled={status.pending}>
      {status.pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          実行中...
        </>
      ) : (
        "enterprise IDを作成"
      )}
    </Button>
  );
}
