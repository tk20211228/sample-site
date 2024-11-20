"use client";

import { Button } from "@/components/ui/button";

import { useState, useTransition } from "react";
import { getPolicies } from "../data/policy";
import { Loader2 } from "lucide-react";
import { Tables } from "@/types/database";

// export type Device = Tables<"devices">;

export default function GetPolicesListButton({
  enterpriseId,
}: {
  enterpriseId: string;
}) {
  const [isPending, startTransition] = useTransition();
  const [policiesData, setPoliciesData] = useState<[]>([]);
  const enterpriseName = `enterprises/${enterpriseId}`;
  const handleClick = async () => {
    startTransition(async () => {
      if (enterpriseName) {
        const data = await getPolicies(enterpriseName);
        console.log("Policies data", data);

        // setPoliciesData(data);
      }
    });
  };

  // console.log("policiesData", policiesData);
  return (
    <div className="pb-2">
      <Button
        variant="outline"
        className=""
        onClick={handleClick}
        disabled={isPending}
      >
        {isPending ? (
          <>
            <Loader2 className=" animate-spin" />
            取得中...
          </>
        ) : (
          "googleapisからポリシー一覧を取得"
        )}
      </Button>
    </div>
  );
}
