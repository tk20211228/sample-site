"use client";

import { Button } from "@/components/ui/button";

import { Loader2 } from "lucide-react";
import { useTransition } from "react";
import { usePoliciesTableData } from "../../apps/data/use-policies-table";
import { getSyncedPolicies } from "../../policies/data/policy";
import { useEnterprise } from "../../providers/enterprise";

export default function SyncPoliciesButton() {
  const [isPending, startTransition] = useTransition();
  const { enterpriseId } = useEnterprise();
  // const { setPolicyTableData } = usePolicy();
  const enterpriseName = `enterprises/${enterpriseId}`;
  const key = `/api/policies/table/${enterpriseName}`;
  const { mutate } = usePoliciesTableData(key, enterpriseName);
  const handleClick = async () => {
    startTransition(async () => {
      if (enterpriseName) {
        const data = await getSyncedPolicies(enterpriseName);
        mutate(data, false);
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
