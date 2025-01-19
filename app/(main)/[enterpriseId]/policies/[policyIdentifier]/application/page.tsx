import { RouteParams } from "@/app/types/enterprise";
import AppContent from "./components/app-content";
import { getPolicyApps } from "./data/get-policy-apps";
import { ScrollArea } from "@radix-ui/react-scroll-area";
export default async function Page({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const enterpriseId = (await params).enterpriseId;
  const appsData = await getPolicyApps(enterpriseId);
  return (
    <div className="flex-1 h-dvh min-w-0">
      <AppContent appsData={appsData} />
    </div>
  );
}
