import { RouteParams } from "@/app/types/enterprise";
import DeviceGeneralForm from "./components/device-general-form";

export default async function Page({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const policyId = (await params).policyId;

  return (
    <div>
      <DeviceGeneralForm policyId={policyId} />
    </div>
  );
}
