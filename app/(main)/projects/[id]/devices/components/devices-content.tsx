"use client";

import { Loader2Icon } from "lucide-react";
import { useParams, usePathname } from "next/navigation";
import { useEffect } from "react";
import { useDevices } from "../../apps/data/use-devices";
import { deviceColumns } from "./devices-table-columns";
import DeviceTable from "./device-table";

export default function DevicesContent() {
  const pathname = usePathname();
  const params = useParams();
  const enterpriseName = "enterprises/" + params.id;
  const key = "/api/devices";
  const {
    devices,
    isLoading,
    isError,
    // isValidating,
    mutate,
  } = useDevices(key, enterpriseName);
  // パス変更時にデータを再取得
  useEffect(() => {
    mutate();
  }, [pathname, mutate]);

  if (isError) return <div>エラーが発生しました</div>;
  if (isLoading)
    return (
      <div className="relative w-full h-full rounded-lg overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Loader2Icon className="animate-spin size-10 text-muted-foreground/50" />
        </div>
      </div>
    );
  if (!devices) return null;
  // console.log("apps", apps);

  return (
    <DeviceTable
      columns={deviceColumns}
      data={devices}
      // isValidating={isValidating}
    />
  );
}
