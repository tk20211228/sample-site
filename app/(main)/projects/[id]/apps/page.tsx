import { Suspense } from "react";
import ManagementAppsContent from "./components/management-apps-content";

export default async function Page() {
  return (
    <div className="flex flex-row h-dvh p-1 border space-x-1 overflow-hidden">
      <Suspense fallback={<div>Loading...</div>}>
        <ManagementAppsContent />
      </Suspense>
    </div>
  );
}
