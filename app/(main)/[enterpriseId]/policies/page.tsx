import { RouteParams } from "@/app/types/enterprise";
import PoliciesContent from "./components/policy-content";
import { getPoliciesFromDB } from "./data/get-policies";

export default async function Page({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const enterpriseId = (await params).enterpriseId;
  const policies = await getPoliciesFromDB({ enterpriseId });

  return (
    <div className="flex h-dvh">
      <PoliciesContent data={policies} enterpriseId={enterpriseId} />
    </div>
  );
}
