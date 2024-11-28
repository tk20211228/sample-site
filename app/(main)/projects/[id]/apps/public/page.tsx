import {
  getAndroidEnterpriseWebToken,
  // getAndroidManagementWebToken,
} from "@/actions/emm/get-web-token";
import { Loader2Icon } from "lucide-react";
import { getDbApps } from "../data/get-db-apps";
import PublicAppsIframe from "./components/public-apps-iframe";
import PublicAppsTable from "./components/table/public-apps-table";
import { publicAppsColumns } from "./components/table/public-apps-columns";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const enterpriseId = (await params).id;
  const enterpriseName = "enterprises/" + enterpriseId;
  const data = await getDbApps(enterpriseName);
  // console.log(data);
  // const token = await getAndroidManagementWebToken(enterpriseName); // Android Management API
  const token = await getAndroidEnterpriseWebToken(enterpriseName); // Android Enterprise API

  return (
    <div className="flex flex-row h-dvh p-1 border  space-x-1">
      <div className="w-1/4 overflow-hidden border rounded-lg  hidden lg:block">
        <PublicAppsTable columns={publicAppsColumns} initialData={data} />
      </div>

      {/* 回答　　*/}
      <div className="relative flex-1 border rounded-lg overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Loader2Icon className="animate-spin  size-10 text-muted-foreground/30" />
        </div>
        {token && (
          <PublicAppsIframe
            webToken={token}
            enterpriseName={enterpriseName ?? ""}
          />
        )}
      </div>
    </div>
  );
}
