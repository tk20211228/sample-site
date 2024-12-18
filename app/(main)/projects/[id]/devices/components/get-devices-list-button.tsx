"use client";

import { Button } from "@/components/ui/button";

import { useState, useTransition } from "react";
import { fetchDevicesFromGoogle } from "../data/device";
import { Loader2 } from "lucide-react";
import { Tables } from "@/types/database";

export type Device = Tables<"devices">;

export default function GetDevicesListButton({
  enterpriseId,
}: {
  enterpriseId: string;
}) {
  const [isPending, startTransition] = useTransition();
  const [deviceData, setDeviceData] = useState<Device[]>([]);
  const enterpriseName = `enterprises/${enterpriseId}`;
  const handleClick = async () => {
    startTransition(async () => {
      if (enterpriseName) {
        const devices = await fetchDevicesFromGoogle(enterpriseName);
        setDeviceData(devices.devices);
      }
    });
    // console.log("clicked");
  };
  console.log(deviceData);
  return (
    <div className="pb-2">
      <Button
        variant="outline"
        className="w-40"
        onClick={handleClick}
        disabled={isPending}
      >
        {isPending ? (
          <>
            <Loader2 className=" animate-spin" />
            取得中...
          </>
        ) : (
          "デバイス一覧を取得"
        )}
      </Button>
    </div>
  );
}
