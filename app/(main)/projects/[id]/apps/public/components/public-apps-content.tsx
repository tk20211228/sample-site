"use client";

import { Loader2Icon } from "lucide-react";
import { useParams } from "next/navigation";
import { appsColumns } from "../../components/table/apps-columns";
import AppsTable from "../../components/table/apps-table";
import { useApps } from "../../data/use-apps";

export default function PublicAppsContent() {
  const params = useParams();
  const enterpriseName = "enterprises/" + params.id;
  const appType = "PUBLIC";
  const key = "/api/apps/" + appType;
  const { apps, isLoading, isError } = useApps(key, enterpriseName, appType);

  if (isError) return <div>エラーが発生しました</div>;
  if (isLoading)
    return (
      <div className=" relative w-[330px] h-full rounded-lg overflow-hidden">
        <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Loader2Icon className="animate-spin size-10 text-muted-foreground/30" />
        </div>
      </div>
    );
  if (!apps) return null;

  return <AppsTable columns={appsColumns} data={apps} />;
}
