"use client";

import { useParams, usePathname } from "next/navigation";
import useSWR from "swr";
import { getDbApps } from "../../data/get-db-apps";
import { Loader2Icon } from "lucide-react";
import AppsTable from "../../components/table/apps-table";
import { appsColumns } from "../../components/table/apps-columns";
import { useApps } from "../../data/use-apps";

export default function PrivateAppsContent() {
  // const pathname = usePathname();
  const params = useParams();
  const enterpriseId = params.id;
  const enterpriseName = "enterprises/" + enterpriseId;
  const key = "/api/apps/private";
  const { apps, isLoading, isError } = useApps(key, enterpriseName, "PRIVATE");

  if (isError) return <div>エラーが発生しました</div>;
  if (isLoading) return <Loader2Icon className="animate-spin" />;
  if (!apps) return null;
  // console.log("apps", apps);

  // const { data, isLoading, error } = useSWR("/api/public", () =>
  //   getDbApps(enterpriseName)
  // );

  // if (error) return <div>エラーが発生しました</div>;
  // if (isLoading) return <Loader2Icon className="animate-spin" />;
  // if (!data) return null;
  // console.log("data", data);

  return <AppsTable columns={appsColumns} data={apps} />;
}
