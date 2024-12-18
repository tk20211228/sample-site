"use client";

import { Button } from "@/components/ui/button";

import { Loader2 } from "lucide-react";
import { useTransition } from "react";
import { useDevices } from "../../apps/data/use-devices";
import { useEnterprise } from "../../providers/enterprise";
import { getSyncedDevices } from "../data/get-synced-devices";

export default function SyncDevicesButton() {
  const [isPending, startTransition] = useTransition();
  const { enterpriseName } = useEnterprise();
  const key = "/api/devices";
  const { mutate } = useDevices(key, enterpriseName);

  const handleClick = async () => {
    startTransition(async () => {
      if (enterpriseName) {
        const data = await getSyncedDevices(enterpriseName);
        mutate(data);
        console.log("Devices data", data);
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
