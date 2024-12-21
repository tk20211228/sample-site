"use client";

import { Loader2Icon } from "lucide-react";
import { useParams, usePathname } from "next/navigation";
import { useEffect } from "react";
// import { useDevices } from "../../apps/data/use-devices";
import { deviceColumns } from "./devices-table-columns";
import DeviceTable from "./device-table";
import { DeviceTableType } from "@/app/(main)/types/device";
import { fetchDevicesFromDB } from "../data/device";
import useSWR from "swr";

export default function DevicesContent({ data }: { data: DeviceTableType[] }) {
  // const pathname = usePathname();
  const params = useParams();
  const enterpriseName = "enterprises/" + params.id;
  const key = "/api/devices";
  const {
    data: devices,
    error,
    isLoading,
    // mutate,
    // isValidating,
  } = useSWR<DeviceTableType[]>(key, () => fetchDevicesFromDB(enterpriseName), {
    fallbackData: data,
    // dedupingInterval: 3600000, // enterpriseIdが同じ場合は1時間、関数を実行しない
    // revalidateOnFocus: false, // タブ移動しても関数を実行しない　//iframeの操作も検知されるため、追加。
    revalidateIfStale: false, // 追加: キャッシュが古くても再検証しない ※画面のレンダリング時のデータ更新を防ぐため
    // revalidateOnMount: true, //  コンポーネントマウント時に必ず再検証
    // keepPreviousData: false, // 前のデータを保持しない
  });
  if (error) return <div>エラーが発生しました</div>;
  if (isLoading)
    return (
      <div className="relative w-full h-full rounded-lg overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Loader2Icon className="animate-spin size-10 text-muted-foreground/50" />
        </div>
      </div>
    );
  if (!devices) return null;

  return <DeviceTable columns={deviceColumns} data={devices} />;
}
