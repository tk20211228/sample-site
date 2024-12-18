"use client";

import { Loader2Icon } from "lucide-react";
import { useParams, usePathname } from "next/navigation";
import { useApps } from "../data/use-apps";
import { ManagementAppsColumns } from "./table/management-apps/management-apps-columns";
import ManagementAppsTable from "./table/management-apps/management-apps-table";
import { useEffect } from "react";

export default function ManagementAppsContent() {
  const pathname = usePathname();
  const params = useParams();
  const enterpriseName = "enterprises/" + params.id;
  const key = "/api/apps";
  const { apps, isLoading, isError, isValidating, mutate } = useApps(
    key,
    enterpriseName
  );
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
  if (!apps) return null;
  // console.log("apps", apps);

  return (
    <ManagementAppsTable
      columns={ManagementAppsColumns}
      data={apps}
      isValidating={isValidating}
    />
  );
}
