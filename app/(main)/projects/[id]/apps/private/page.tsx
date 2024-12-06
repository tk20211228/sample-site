import { Loader2Icon } from "lucide-react";
import { Suspense } from "react";
import PrivateAppIframe from "./components/private-app-iframe";
import PrivateAppsContent from "./components/private-apps-content";

export default async function Page() {
  // const enterpriseId = (await params).id;
  // const enterpriseName = "enterprises/" + enterpriseId;
  // const data = await getDbApps(enterpriseName);

  return (
    <div className="flex flex-row h-dvh space-x-1">
      <div className=" rounded-lg hidden lg:block py-1 pl-1">
        <Suspense fallback={<div>Loading...</div>}>
          <PrivateAppsContent />
        </Suspense>
      </div>
      <div className="flex-1 py-1 pr-1">
        <div className="relative w-full h-full rounded-lg overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Loader2Icon className="animate-spin size-10 text-muted-foreground/30" />
          </div>
          <PrivateAppIframe />
        </div>
      </div>
    </div>
  );
}
