import { getAndroidEnterpriseWebToken } from "@/actions/emm/get-web-token";
import { Loader2Icon } from "lucide-react";
import { getDbApps } from "../data/get-db-apps";
import { publicAppsColumns } from "./components/table/public-apps-columns";
import PublicAppsTable from "./components/table/public-apps-table";
import PublicAppsIframe from "./components/public-apps-iframe";

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
    <div className="flex flex-row h-dvh space-x-1">
      <div className=" rounded-lg hidden lg:block py-1 pl-1">
        <PublicAppsTable
          columns={publicAppsColumns}
          initialData={data}
          className=""
        />
      </div>
      <div className="flex-1 py-1 pr-1">
        <div className="relative w-full h-full rounded-lg overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Loader2Icon className="animate-spin size-10 text-muted-foreground/30" />
          </div>
          {token && (
            <PublicAppsIframe
              webToken={token}
              enterpriseName={enterpriseName ?? ""}
              className=""
            />
          )}
        </div>
      </div>
    </div>
  );
}
