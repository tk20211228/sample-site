import ManagementAppsTable from "./components/table/management-apps-apps-table";
import { ManagementAppsColumns } from "./components/table/management-apps-columns";
import { getDbApps } from "./data/get-db-apps";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const enterpriseId = (await params).id;
  const enterpriseName = "enterprises/" + enterpriseId;
  const data = await getDbApps(enterpriseName);
  return (
    <div className="flex flex-row h-dvh p-1 border space-x-1">
      <ManagementAppsTable columns={ManagementAppsColumns} initialData={data} />
    </div>
  );
}
