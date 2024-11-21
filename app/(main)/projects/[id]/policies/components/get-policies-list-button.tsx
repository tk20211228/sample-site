"use client";

import { Button } from "@/components/ui/button";

import { Loader2 } from "lucide-react";
import { useTransition } from "react";
import { usePolicy } from "../../providers/policy";
import { getSyncedPolicies } from "../data/policy";
import { PoliciesDbTableSchema } from "../types/policy";

export default function GetPolicesListButton({
  enterpriseId,
  data,
}: {
  enterpriseId: string;
  data: PoliciesDbTableSchema[];
}) {
  const [isPending, startTransition] = useTransition();
  const { setPolicyTableData } = usePolicy();
  const enterpriseName = `enterprises/${enterpriseId}`;
  const handleClick = async () => {
    startTransition(async () => {
      if (enterpriseName) {
        const data = await getSyncedPolicies(enterpriseName);
        setPolicyTableData(data);
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
            <Loader2 className="mr-2 animate-spin" />
            同期中...
          </>
        ) : (
          "Googleサーバーとポリシー情報を同期"
        )}
      </Button>
    </div>
  );
}
