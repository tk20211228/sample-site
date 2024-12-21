import { Suspense } from "react";
import DevicesContent from "./components/devices-content";
import { fetchDevicesFromDB } from "./data/device";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const enterpriseName = "enterprises/" + id;
  const devices = await fetchDevicesFromDB(enterpriseName);
  // const devices = [
  //   {
  //     id: "123",
  //     device_name: "device1",
  //     display_name: "device1",
  //     policy_name: null,
  //     state: "active",
  //     lastSyncTime: new Date().toISOString(),
  //     policyCompliant: "true",
  //     enrollmentTime: new Date().toISOString(),
  //     lastStatusReportTime: new Date().toISOString(),
  //     created_at: new Date().toISOString(),
  //     updated_at: new Date().toISOString(),
  //   },
  // ];

  return (
    <div className="flex h-dvh space-x-1">
      <Suspense fallback={<div>Loading...</div>}>
        <DevicesContent data={devices} />
      </Suspense>
    </div>
  );
}
