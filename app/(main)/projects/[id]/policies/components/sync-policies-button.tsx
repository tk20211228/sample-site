"use client";

import { Button } from "@/components/ui/button";

import { Loader2 } from "lucide-react";
import { useTransition } from "react";
import { useEnterprise } from "../../providers/enterprise";
import { usePolicy } from "../../providers/policy";
import { getSyncedPolicies } from "../data/policy";

export default function SyncPoliciesButton() {
  const [isPending, startTransition] = useTransition();
  const { enterpriseId } = useEnterprise();
  const { setPolicyTableData } = usePolicy();
  const enterpriseName = `enterprises/${enterpriseId}`;
  const handleClick = async () => {
    startTransition(async () => {
      if (enterpriseName) {
        const data = await getSyncedPolicies(enterpriseName);
        setPolicyTableData(data);
        console.log("Policies data", data);
      }
    });
  };

  // console.log("policiesData", policiesData);
  return (
    <Button
      variant="outline"
      className=" h-8 hidden lg:flex"
      onClick={handleClick}
      disabled={isPending}
    >
      {isPending ? (
        <>
          <Loader2 className="mr-2 animate-spin" />
          同期中...
        </>
      ) : (
        "Googleサーバーと同期 (リリースする時は削除するボタン)"
      )}
    </Button>
  );
}
