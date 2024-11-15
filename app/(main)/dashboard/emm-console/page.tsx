"use client";

import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import { useTransition } from "react";

export default function Page() {
  const [isPending, startTransition] = useTransition();
  const handleClick = async () => {
    startTransition(async () => {
      console.log("test");
    });
  };
  return (
    <div>
      <div className="flex flex-row gap-2 border-b-2 border-gray-200 pb-2">
        <Button
          variant="outline"
          className=""
          onClick={handleClick}
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Loader2Icon className=" animate-spin" />
              取得中...
            </>
          ) : (
            "managed Google Play を開く"
          )}
        </Button>
      </div>
    </div>
  );
}
